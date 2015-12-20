var App = App || {};

document.addEventListener("DOMContentLoaded", function() {

    'use strict';

    App.init = function() {
        this.mainSlider = $('.b-main-slider > .frame > .slidee');
        this.mainSliderLeftButton = $('.b-main-slider .i-left');
        this.mainSliderRightButton = $('.b-main-slider .i-right');
        this.flagLeft = true;
        this.flagRight = true;

        this.sidebarMenuParent = $('.menu .parent');
        this.deleteBlock = $('.b-wrap-compare-blocks .delete');
        this.portfolioSliderLi = $('.g-portfolio .b-block-slider');

        this.mainSliderIndex = (function() {
            var index = 1;
            App.mainSlider.children().children().each(function() {
                $(this).css({'opacity': 1});
            })
        }());
    };

    App.animMainSlider = function(vector) {
        if(vector == 'back' && App.flagLeft) {
            App.flagLeft = false;
            $(".b-main-slider ul li:first").addClass('focus');
            $(".b-main-slider ul li:first").insertBefore($(".b-main-slider .main-ul li:last"));

            $(".b-main-slider ul li:last").animate({
                'opacity' : 0
            }, 700, function() {
                $(".b-main-slider ul li:last").insertBefore($(".b-main-slider ul li.focus"));
                $(this).css({'opacity' : 1});
                $(".b-main-slider ul li.focus").removeClass('focus');
                App.flagLeft = true;
            });
        }
        if(vector == 'next' && App.flagRight) {
            App.flagRight = false;
            console.log($(this));
            $(".b-main-slider ul li:first").insertBefore($(".b-main-slider ul li:eq(1)"), $(".b-main-slider ul li:last"));
            $(".b-main-slider ul li:first").insertBefore(App.mainSlider.children().children().first().siblings(':first'));

            $(".b-main-slider ul li:last").animate({
                'opacity' : 0
            }, 700, function() {
                $(".b-main-slider ul li:last").insertBefore($(".b-main-slider ul li:first"), $(".b-main-slider ul li:last"));
                $(this).css({'opacity' : 1});
                App.flagRight = true;
            });
            //});
        }

    };

    App.happen = function() {
        App.mainSliderLeftButton.on('click', function() {App.animMainSlider('back')});
        App.mainSliderRightButton.on('click', function() {App.animMainSlider('next')});
    };

    App.checkbox = function() {
        $('.b-filter input[type=checkbox]').css({'opacity': 0}).wrap('<span class="wrap-checkbox"></span>');

        $('.wrap-checkbox').click(function() {
            $(this).toggleClass('active');
        });

        $('.b-filter .wrap-item .text').click(function() {
            $(this).siblings('.wrap-checkbox').toggleClass('active');
        })
    };

    App.sidebar = function() {
        var active = false;
        App.sidebarMenuParent.on('click', function(e) {
            e.preventDefault();


            if (!active) {
                active = true;
                $(e.currentTarget).siblings().slideToggle();
                $(this).find('.beforeElem').css({'display' : 'block'});

                setTimeout(function(){
                    $(this).find('.beforeElem').css({'display' : 'none'});
                    $(e.currentTarget).toggleClass('active-menu');
                    active = false;
                },400);

                if($(e.currentTarget).hasClass('active-menu'))
                    $(this).find('.beforeElem').css({'display': 'none'});
            }
        })
    };

    App.portfolioSlider = function() {

        //App.portfolioSliderLi.find('li').on('click', function() {
        //
        //    this.bgUrl = $(this).children().data('big');
        //
        //    App.portfolioSliderLi.find('.image').css({'background': 'url(' + this.bgUrl + ') no-repeat','backgroundSize' : 'cover'});
        //    App.portfolioSliderLi.find('li').each(function() {
        //        $(this).removeClass();
        //    });
        //
        //    $(this).addClass('active');
        //});
        $('.g-portfolio .b-block-slider').find('.i-left').on('click', function() {

            var indexImg = $('.slidee li.active').index('li');
            var lengthImg = $('.slidee li').length;

            if(indexImg <= 4 || indexImg >= lengthImg + 3) {
                return false;
            } else {
                App.bgUrl = $('.g-portfolio .slidee .active').prev().find('span').data('big');
                App.portfolioSliderLi.find('.image').css({'background': 'url(' + App.bgUrl + ') no-repeat','backgroundSize' : 'cover'});
            }
        });
        $('.g-portfolio .b-block-slider').find('.i-right').on('click', function() {

            var indexImg = $('.slidee li.active').index('li');
            var lengthImg = $('.slidee li').length;

            if(indexImg <= 4 || indexImg >= lengthImg + 3) {
                return false;
            } else {
                App.bgUrl = $('.g-portfolio .slidee .active').next().find('span').data('big');
                App.portfolioSliderLi.find('.image').css({'background': 'url(' + App.bgUrl + ') no-repeat','backgroundSize' : 'cover'});
            }
        });

        var $frame  = $('.basic3');
        $frame.sly({
            horizontal: 1,
            itemNav: 'forceCentered',
            smart: 1,
            activateMiddle: 1,
            mouseDragging: 0,
            touchDragging: 0,
            releaseSwing: 1,
            startAt: 1,
            scrollBy: 1,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,

            // Buttons
            prev: $frame.parents('.slide-wrapper').find('.i-left'),
            next: $frame.parents('.slide-wrapper').find('.i-right')
        });
    };

    App.catalogSlider = function() {
        $('.catalog-slide a img').on('click', function() {
            var bigUrl = $(this).data('big');
            $('.main-slide .image-fancy').attr('href', bigUrl);
            $('.main-slide .image-fancy img').attr({'src': bigUrl});
        })
    };

    App.fancybox = function() {
        $('.feedback').fancybox({
            minWidth: 630,
            minHeight: 670,
            padding: 0,
            tpl: {
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close myClose" href="javascript:;"></a>'
            }
        });

        $('.image-fancy').fancybox({
            maxWidth: 890,
            maxHeight: 890,
            minWidth: 890,
            tpl: {
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close myCloseAnother" href="javascript:;"></a>'
            },
            beforeClose: function() {
                var url = $('.fancybox-image').attr('src');
                console.log(url);
                $('.main-slide .image-fancy').attr('src', url);
            }
        });
    };

    App.compare = function() {
        $('.main-option .deployment').on('click', function(e) {
            e.preventDefault();
            var button = $('.b-product-bottom');
            var link = $('.main-option .deployment');
            var state = $('.main-option .deployment').hasClass('unhidden').toString();
            console.log(e);

            switch(state) {
                case 'false' : {
                    button.slideDown();
                    link.html('Свернуть сравнение');
                    link.removeClass('hide');
                    link.addClass('unhidden');
                    break;
                }
                case 'true' : {
                    button.slideUp();
                    link.html('Развернуть');
                    link.removeClass('unhidden');
                    link.addClass('hide');
                    break;
                }
            }
        });

        $('.b-wrap-compare-blocks .wrap .item').on('mouseover', function() {
            var index = $(this).index();
            index = index+1;
            //console.log(index);
            $(this).css({'background': '#221805'});
            $('.b-wrap-compare-blocks').find('.item:nth-child(' + index +')').css({'background': '#221805'});
        });

        $('.b-wrap-compare-blocks .wrap .item').on('mouseout', function() {
            var index = $(this).index();
            index = index+1;
            $(this).css({'background': 'none'});
            $('.b-wrap-compare-blocks').find('.item:nth-child(' + index +')').css({'background': 'none'});
        });

        App.deleteBlock.on('click', function(e) {
            e.preventDefault();
            $(this).parent().parent().parent().fadeOut();
        })
    };

    App.activity = function() {
        var frame = [];
        $('.wrap-slider .right-block .b-partners .basic').each(function(index) {
            $(this).attr('id', 'sly' + index);
            frame[index] = $('#sly' + index);
            console.log(frame[index]);
            frame[index].sly({
                horizontal: 1,
                itemNav: 'basic',
                smart: 1,
                activateOn: 'click',
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 3,
                activatePageOn: 'click',
                speed: 300,
                elasticBounds: 1,
                easing: 'easeOutExpo',
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
                scrollBar: frame[index].siblings('.scrollbar'),
                prevPage: frame[index].parents('.slide-wrapper').find('.i-left'),
                nextPage: frame[index].parents('.slide-wrapper').find('.i-right')
            });
        })
    };

    App.init();
    App.happen();
    App.fancybox();
    App.sidebar();
    App.checkbox();
    App.compare();
    App.activity();
    App.portfolioSlider();
    App.catalogSlider();


    var $frame  = $('.basic');
    $frame.sly({
        horizontal: 1,
        itemNav: 'basic',
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 0,
        activatePageOn: 'click',
        speed: 300,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,
        scrollBar: $frame.siblings('.scrollbar'),
        prevPage: $frame.parents('.slide-wrapper').find('.i-left'),
        nextPage: $frame.parents('.slide-wrapper').find('.i-right')
    });

    var $frame  = $('.basic1');
    $frame.sly({
        horizontal: 1,
        itemNav: 'basic',
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 3,
        activatePageOn: 'click',
        speed: 300,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,
        scrollBar: $frame.siblings('.scrollbar'),
        prevPage: $frame.parents('.slide-wrapper').find('.i-left'),
        nextPage: $frame.parents('.slide-wrapper').find('.i-right')
    });

    var $frame  = $('.basic2');
    $frame.sly({
        horizontal: 1,
        itemNav: 'basic',
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 3,
        activatePageOn: 'click',
        speed: 700,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,
        scrollBar: $frame.siblings('.scrollbar'),
        prevPage: $frame.parents('.slide-wrapper').find('.i-left'),
        nextPage: $frame.parents('.slide-wrapper').find('.i-right')
    });
});