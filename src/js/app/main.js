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
        },
        breakpoints: {
          480: {
            spaceBetween: 10
          }
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
        fillOpacity: 1
      })

      const $mapping = $('.mapping')
      const hoverClass = 'hover'
      const getDistrict = ((position) => {
        return $mapping.find('.mapping-district[data-position=' + position + ']')
      })
      $map
        .on('mouseover.maphilight', (e) => { getDistrict(e.target.dataset.position).addClass(hoverClass) })
        .on('mouseout.maphilight', (e) => { getDistrict(e.target.dataset.position).removeClass(hoverClass) })
    }

    // мобильное меню
    {
      const $mobileButton = $('.js-mobile')
      $mobileButton.on('click', (e) => {
        const $this = $(e.currentTarget)
        $this.toggleClass('active')
        $(e.currentTarget.dataset.target).slideToggle()
      })

      $(window).resize((e) => {
        if (e.currentTarget.innerWidth > 1024) {
          $('.header-bottom').removeAttr('style')
          $mobileButton.removeClass('active')
        }
      })
    }

  })
})(jQuery, Swiper)
