// $('.main-slider__wrap').slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     dots: true,
//     cssEase: 'ease-in-out',
//     focusOnSelect: false,
//     infinite: true,
//     responsive: [
//         {
//             breakpoint: 1025,
//             settings: {
//                 arrows: false,
//             }
//         },
//     ]
// })
//
// $('.main-slider__wrap').removeClass('initialize');
"use strict";
"use strict";

var checkResize = function checkResize() {
  return window.innerWidth > 768;
};

var scrollTopButton = function scrollTopButton() {
  if ($(this).scrollTop() > 100) {
    if ($('.button-top').is(':hidden')) {
      $('.button-top').css({
        opacity: 1
      }).fadeIn('slow');
    }
  } else {
    $('.button-top').stop(true, false).fadeOut('fast');
  }
};

var scrollToTop = function scrollToTop() {
  $('html, body').stop().animate({
    scrollTop: 0
  }, 300);
};

var init = function init() {
  var isDesktop = checkResize();

  if (isDesktop) {
    $(window).on('scroll', scrollTopButton);
    $('.button-top').on('click', scrollToTop);
  }

  $(window).resize(init);
};

init();
"use strict";

function openTabContent(evt) {
  evt.preventDefault();
  var parentTab = $(this).closest('.tab');
  var tabContent = parentTab.find('.tab__content');

  if ($(this).hasClass('opened')) {
    $(this).removeClass('opened');
    tabContent.slideUp();
    return;
  }

  $('.tab__btn').removeClass('opened');
  $('.tab__content').removeAttr('style');
  $(this).addClass('opened');
  tabContent.slideDown();
}

$('.tab__btn').on('click', openTabContent);