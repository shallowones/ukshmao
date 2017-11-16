'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import imageMin from 'gulp-imagemin';

import less from 'gulp-less';
import LessAutoPrefix from 'less-plugin-autoprefix';
import LessPluginCleanCSS from 'less-plugin-clean-css';

import del from 'del';
import browserSync from 'browser-sync';

import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

browserSync.create();

const plumberOptions = {
  errorHandler: notify.onError()
};
const develop = true;

export const clean = () => del('./build');

export function jsApp () {
  return gulp.src('./src/js/app/**/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./build/js/app/'))
}

export function jsVendor () {
  return gulp
    .src('./src/js/vendor/**/**/*')
    .pipe(gulp.dest('./build/js/vendor/'))
}

export function images() {
  let path = [
    './src/images/*.jpg',
    './src/images/*.png',
    './src/images/*.ico',
    './src/images/*.svg'
  ];
  return gulp.src(path, {since: gulp.lastRun('images')})
    .pipe(imageMin({
      svgoPlugins: [{
        convertPathData: false
      }]
    }))
    .pipe(gulp.dest('./build/images'));
}

export function styles() {
  let autoPrefix = new LessAutoPrefix({
    browsers: [
      '> 1%',
      'last 2 versions',
      'Firefox ESR',
      'Opera 12.1'
    ]
  });
  let plugins = [autoPrefix];

  if (!develop) {
    let cleanCSS = new LessPluginCleanCSS({ advanced: true });
    plugins.push(cleanCSS);
  }

  return gulp.src('./src/styles/*.less', {since: gulp.lastRun('styles')})
    .pipe(plumber(plumberOptions))
    .pipe(less({
      paths: ['node_modules'],
      plugins: plugins
    }))
    .pipe(gulp.dest('./build/css'));
}

export function views() {
  let path = [
    './src/views/*.pug',
    '!./src/views/layout.pug'
  ];
  return gulp.src(path, {since: gulp.lastRun('views')})
    .pipe(plumber(plumberOptions))
    .pipe(pug({
      pretty: true,
      data: {
        dev: develop
      }
    }))
    .pipe(gulp.dest('./build'));
}

export function fonts () {
  return gulp
    .src('./src/fonts/*')
    .pipe(gulp.dest('./build/fonts/'))
}

export function watch() {
  gulp.watch('./src/views/**/*.pug', views)
  gulp.watch('./src/images/**/*', images)
  gulp.watch('./src/styles/**/*.less', styles)
  gulp.watch('./src/js/app/**/*.js', jsApp)
}

export function serve() {
  browserSync.init({
    server: './build'
  });
  browserSync.watch('./build/**/*.*').on('change', browserSync.reload);
}

export const build = gulp.parallel(views, fonts, styles, images , jsVendor, jsApp);

export default gulp.series(
  clean,
  build,
  gulp.parallel(serve, watch)
);
