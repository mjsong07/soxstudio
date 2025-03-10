$(window).load(function() {
    $('.homeSlider').iosSlider({
        desktopClickDrag: true,
        snapToChildren: true,
        infiniteSlider: true,
        snapSlideCenter: true,
        responsiveSlides: true,
        responsiveSlideContainer: true,
        navSlideSelector: '.slideSelectors .item',
        navPrevSelector: '.prev',
        navNextSelector: '.next',
        onSlideChange: slideChange,
        autoSlide: true,
        scrollbar: null,
        scrollbarMargin: '0',
        scrollbarBorderRadius: '0',
        startAtSlide: '1',
        keyboardControls: true,
        autoSlide: false,
        onSliderResize: sliderResize,
        onSliderLoaded: sliderResize
    });

    function slideChange(args) {
        $('.slideSelectors').each(function(){
            $(this).find('.item.selected').removeClass('selected');
            $(this).find('.item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
        });
    }
});

function sliderResize(args) {
    var articleHeight = $('.homeSlider .item:eq(0) article').outerHeight(true);
    var footerHeight = $('.homeSlider .item:eq(0) .article-footer').outerHeight(true);
    var setHeight = articleHeight + footerHeight;

    $('.homeSlider').css({
        height: (setHeight - 4) + 'px'
    });
    $('.homeSlider div.item').css({
        height: setHeight + 'px'
    });
}

sliderResize();