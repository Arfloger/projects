  function scrollNav() {
    $("a[href^='#nav']").on('click', function () {
      var _href = $(this).attr("href");
      $("html, body").animate({
        scrollTop: $(_href).offset().top - 100 + "px"
      });
      return false;
    });
  }

  if (window.innerWidth > 768) {
    scrollNav();
  }

  $('.reward-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    lazyLoad: 'ondemand',
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
    },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
    }
  ]
  });

  $('.reward-slider').removeClass('hidden');

  var yCoard;
  $('.burger').click(function (evt) {
    if (!$(this).hasClass('active')) {
      yCoard = window.pageYOffset;
      $(this).addClass('active')
      $('.nav-list').addClass('active');
      $('body').addClass('no-scroll');
      $('body').css({
        top: -yCoard + 'px'
      });
    } else {
      $('.burger').removeClass('active')
      $('.nav-list').removeClass('active');
      $('body').removeClass('no-scroll');
      $('body').removeAttr('style');
      window.scrollTo(0, yCoard);
    }
  });

  $('.main-header .nav-list__link').click(function () {
    $('.burger').removeClass('active');
    $('.nav-list').removeClass('active');
    $('body').removeClass('no-scroll');
    $('body').removeAttr('style');
    var _href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(_href).offset().top - 100 + "px"
    });
  });

  $(window).scroll(function () {
    var scrolled = $(window).scrollTop();
    $('.bubles').css('top', (0 - (scrolled * .5)) + 'px');
    $('.bubles-right').css('top', (0 - (scrolled * .5) + 3200) + 'px');
    $('.bubles-left').css('top', (0 - (scrolled * .5) + 3200) + 'px');
    $('.dust').css('top', (0 - (scrolled * .5)) + 'px');

    if ($(this).scrollTop() > $(".free").offset().top - 400) {
      $(".free__lead").addClass('animation-show');
    }
  });

  $(window).resize(function () {
    if (window.innerWidth > 768) {
      scrollNav();
    }
  });
