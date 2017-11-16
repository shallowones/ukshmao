(function ($, Swiper) {
  $(function () {

    // иницилизация верхнего слайдера на главной
    {
      new Swiper('.js-top-slider', {
        slidesPerView: 1,
        direction: 'vertical',
        loop: true,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    }

    // инициализация нижнего слайдера на главной
    {
      new Swiper('.js-bottom-slider', {
        slidesPerView: 'auto',
        spaceBetween: 40,
        loop: true,
        autoplay: {
          delay: 3000
        }
      })
    }

    // инициализация полигон-карты
    {
      const $imgMap = $('img[usemap]')
      const $map = $($imgMap.attr('usemap'))
      $imgMap.maphilight({
        strokeOpacity: 0,
        strokeWidth: 0,
        fillColor: '00994a',
        fillOpacity: 1,
        /*shadow: true,
        shadowX: 0,
        shadowY: 10,
        alwaysOn: true,
        shadowOpacity: 0.5,
        shadowRadius: 20*/
      })
      /*$map.find('area').hover(() => {
        console.log('ok')
      })*/
    }

  })
})(jQuery, Swiper)
