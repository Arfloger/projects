const checkResize = () => window.innerWidth > 768

const scrollTopButton = function() {
  if ($(this).scrollTop() > 100) {
    if ($('.button-top').is(':hidden')) {
      $('.button-top').css({opacity : 1}).fadeIn('slow')
    }
  } else {
    $('.button-top').stop(true, false).fadeOut('fast')
  }
}

const scrollToTop = function() {
  $('html, body').stop().animate({scrollTop : 0}, 300)
}


const init = function() {
const isDesktop = checkResize()
  if (isDesktop) {
    $(window).on('scroll', scrollTopButton)
    $('.button-top').on('click', scrollToTop)
  }
  $(window).resize(init)
}

init()
