function openTabContent(evt) {
  evt.preventDefault();
  const parentTab = $(this).closest('.tab');
  const tabContent = parentTab.find('.tab__content');

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