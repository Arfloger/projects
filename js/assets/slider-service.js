const serviceSlider = $('.slider-service');

if (serviceSlider.length > 0) {
  const sliderCounter = $('.service__counter')
  const maxCounter = $('.reviews__item').length;
  sliderCounter.text(`01 / ${maxCounter > 9 ? maxCounter : '0' + maxCounter}`)

  serviceSlider.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow: $('.slider-pagination--prev'),
    nextArrow: $('.slider-pagination--next'),
  });

  serviceSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    const currentIndex = nextSlide + 1
    sliderCounter.text(`${currentIndex > 9 ? currentIndex : '0' + currentIndex} / ${maxCounter > 9 ? maxCounter : '0' + maxCounter}`)
  });

}