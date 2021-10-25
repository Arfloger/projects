const reviewsSlider = $('.slider-reviews');

if (reviewsSlider.length > 0) {
  const sliderCounter = $('.reviews__counter')
  const maxCounter = $('.reviews__item').length;
  sliderCounter.text(`01 / ${maxCounter > 9 ? maxCounter : '0' + maxCounter}`)

  reviewsSlider.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow: $('.slider-pagination--prev'),
    nextArrow: $('.slider-pagination--next'),
  });

  reviewsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    const currentIndex = nextSlide + 1
    sliderCounter.text(`${currentIndex > 9 ? currentIndex : '0' + currentIndex} / ${maxCounter > 9 ? maxCounter : '0' + maxCounter}`)
  });

}