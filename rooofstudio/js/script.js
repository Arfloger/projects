$('.index-nav use').mouseenter(function () {
    $(this).closest('div').addClass('hover')
})

$('.index-nav use').mouseleave(function () {
    $(this).closest('div').removeClass('hover')
})