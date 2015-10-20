/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.01.2015 19:40
 */


Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() {
        return that.apply(this, arguments);
    };
    for( key in this ) {
        temp[key] = this[key];
    }
    return temp;
};
$.U = $.U || {};

// ==== UTILS ====
(function ($, window, undefined) {

    '$:nomunge'; // Used by YUI compressor.

    $.U.ScrollbarWidth = function() {
        var parent,
            width,
            child;
        parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
        child = parent.children();
        width = child.innerWidth() - child.height( 99 ).innerWidth();
        parent.remove();
        return width;
    };

    $.fn.hasVerticalScrollBar = function() {
        return this.get(0) ? this.get(0).scrollHeight > this.innerHeight() : false;
    }

})(jQuery, this);

// PRELOADER
(function ($, window, undefined) {

    $.U.globalPreloader = null;
    $.U.ShowGlobalPreloader = function(){
        if(!$.U.globalPreloader){
            var pre = document.createElement('div');
            pre.className = "gloader fico_loader";
            $.U.globalPreloader = pre;
        }
        document.body.appendChild($.U.globalPreloader);
    }
    $.U.HideGlobalPreloader = function(){
        if($.U.globalPreloader){
            if($.U.globalPreloader.parentNode){
                document.body.removeChild($.U.globalPreloader);
            }
        }
    }

    // TODO: fix preloader script

    $.preloaderDefaults = {
        fixed: false,
        isDark: false
    };
    $.fn.UShowPreloader = function(options){
        console.log('$$$$$$$$$$$$$ ------ SHOW PRELOADER');
        if(!this.length){
            return;
        }
        options = options || {};
        /*if(this[0].tagName == 'A'){
            this
                .addClass('fico_loader')
                .addClass('load')
            ;
            return;
        }*/
        var position = this.css('position');
        if(!position || position == 'static') {
            this.css('position', 'relative');
        }
        var $preloader = this.find('>.js-preloader');
        if(!$preloader.length){
            var pre = '<div class="js-preloader b-preloader-overlay' +
                (options.fixed ? ' b-preloader-overlay__fixed' : '') +
                ' b-preloader-overlay__light' +
                (options.isDark ? 'b-preloader-overlay__dark' : '') +
                '"' +
                (options.noBackground ? ' style="background-color: transparent;"' : '') +
                '><i class="fico-loader animate-spin"></i></div>';
            $preloader = $(pre);
        }
        this
            .append($preloader)
        ;
        if(options.topCentered) {
            var $p = $preloader.parent();
            var pos = $p.position();
            var w = $p.width();
            $preloader.height( ($(window).height() - pos.top) );
            /*$preloader.find('i')
                .css('top', ($(window).height() - pos.top)/2)*/
            ;
        }
        /*$preloader.css({opacity:0}).animate(
            {opacity:1}
           ,{duration:500, easing:'easeOutExpo'}
        );*/
    };
    $.fn.UHidePreloader = function(){
        var that = this;
        var $preloader = this.find('>.js-preloader');
        if($preloader.length) {
            /*$preloader.animate({opacity: 0}
                ,{duration: 500, easing: 'easeInExpo', complete: function () {
                    $(this).remove();
                }
            });*/
            $preloader.remove();
        }
        /*this
            .removeClass('fico_loader')
            .removeClass('load')
        ;*/
    };
    $.fn.UHasPreloader = function(){
        return this.hasClass('js-preloader') || this.find('>.js-preloader').length;
    };
})(jQuery, this);



// ==== Tooltip ====
(function ($, window, undefined) {

    // plugin
    $.U.Tooltip = function (text, settings) {

        var opts = $.extend({}, $.U.Tooltip.defaults, settings),
            $body = $(document.body),
            messageTemplate = '<div id="tooltip" class="tooltip">\
				<i class="ico ico_tooltip_close"></i>\
				<div class="tooltip__content">{message}</div>\
			</div>',
            timeout = $.U.Tooltip.timeout,
            tooltip;

        function makeTooltip(text){
            if(!text) return;
            tooltip = messageTemplate.replace('{message}', text);
            $body.append( $(tooltip).hide().fadeIn(150) );
        }
        function updateTooltip(text){
            resetTimer();
            if(text){
                $(opts.messageId).find(opts.messageSelector).text(text);
            }
            $(opts.messageId).fadeIn(150);
        }
        function resetTimer(){
            if( timeout ) clearTimeout(timeout);
        }
        function showTooltip(text){
            var $message = $(opts.messageId);
            if(!$message.length) {
                makeTooltip(text);
            } else {
                updateTooltip(text);
            }
            resetTimer();
            timerClose();
        }
        function linkTooltip(){
            var $th = $(this),
                link = $th.attr("href"),
                text = $th.data("text"),
                messageText = $(link).text() || text;

            showTooltip(messageText);
            return false;
        }
        function hideTooltip(e, callback){
            resetTimer();
            if (callback) {
                $(opts.messageId).fadeOut(opts.fadeTime, function(){ callback(); });
            } else {
                $(opts.messageId).fadeOut(opts.fadeTime);
            }
        }
        function timerClose(){
            $.U.Tooltip.timeout = setTimeout(hideTooltip, opts.destroyTime);
        }
        function setEvents(){
            $body
                .on('mouseenter.tooltip', opts.messageId, resetTimer)
                .on('click.tooltip', opts.messageId + ' ' + opts.closeSelector, hideTooltip)
                .on('click.tooltip', opts.showSelector, linkTooltip);
        }
        function destroy(e){
            var callback = function(){
                $(opts.messageId).remove();
                $body.off('.tooltip');
            };
            hideTooltip(e, callback);
        }
        (function init(){
            showTooltip(text);
            setEvents();
        })();
    };

    $.U.Tooltip.timeout = null;

    $.U.Tooltip.defaults = {
        messageId : 		"#tooltip"
        ,messageSelector :  ".tooltip__content"
        ,showSelector :		".tooltip_link"
        ,closeSelector :	".ico_tooltip_close"
        ,fadeTime :			300
        ,destroyTime :		3000
    };

})(jQuery, this);


// (social icons accordion)
(function($){

    $.U.CollapsibleBaloon = null;

    $.fn.UBindCollapsibleBaloon = function(containerClass){
        var th = this,
            containerClass = containerClass ? containerClass : '.ui_btn__arr',
            elem = th.find(containerClass);

        var showContainer = function(e) {
            e.stopPropagation();
            var $th = $(this);

            $.U.CollapsibleBaloon = $th;
            $th.toggleClass('ui_btn__open');
        };
        var hideContainer = function() {
            //console.log($.U.CollapsibleBaloon);
            if ($.U.CollapsibleBaloon && $.U.CollapsibleBaloon.length) {
                $.U.CollapsibleBaloon.removeClass('ui_btn__open');
                $.U.CollapsibleBaloon = null;
            }
        };
        var stopContainerClick = function(e) {
            e.stopPropagation();
        };

        $.fn.UUnbindCollapsibleBaloon(containerClass, true);

        $(document.body).on('click.collapsibleBaloon', containerClass, showContainer);
        $(document.body).on('click.collapsibleBaloon', containerClass + "> .baloon", stopContainerClick);
        $(document.body).on('click.collapsibleBaloon', hideContainer);
    };

    $.fn.UUnbindCollapsibleBaloon = function(containerClass, canRemove){
        containerClass = containerClass ? containerClass : '.ui_btn__arr';
        if( !$(document.body).find(containerClass).length || canRemove) {
            $(document.body).off('.collapsibleBaloon');
        }
    };

    $.fn.USelectorReset = function(){
        this.parents('.e-select').removeClass('e-select__selected').removeClass('e-select__active').removeClass('e-select__disabled');
    };

    $.fn.USelectorSelected = function(){
        this.parents('.e-select').addClass('e-select__selected');
    };

    $.fn.USelectorActive = function(){
        this.parents('.e-select').addClass('e-select__active');
    };

    $.fn.USelectorInactive = function(){
        this.parents('.e-select').removeClass('e-select__active');
    };

    $.fn.USelectorDisable = function(){
        this
            .attr('disabled', 'disabled')
            .parents('.e-select')
                .addClass('e-select__disabled')
        ;
    };

    $.fn.USelectorEnable = function(){
        this
            .removeAttr('disabled')
            .parents('.e-select')
                .removeClass('e-select__disabled');
    };

    /*$.fn.USelectorActivate = function(){
        var $el = $(this);
        var setSelectText = function(){
            var th = $(this),
                children = th.children('option'),
                selected = children.filter(':selected'),
                th_text = selected.text(),
                th_class = selected.data('class') || "",
                th_classes = th.data('classes') || "";

            //console.log(th_classes, children.length);

            if (!th_classes) {
                $.each(children, function(){
                    th_classes += ( $(this).attr("data-class") || "" ) + " ";
                });
                th.data('classes', th_classes);
            }
            //console.log(th_classes);
            var val = th.val();
            if(!val) {
                th.USelectorInactive();
            }else{
                th.USelectorActive();
            }
            th
                .parents('.f_text__container')
                .removeClass(th_classes)
                .addClass(th_class)
                .trigger('blur.ui')
                .find('.f_text__input')
                .text(th_text);
        };
        $el.each(function(){
            setSelectText.call(this);
        });
        $el.on('change.ui', setSelectText);
    };*/

    /*$.fn.USelectorDisable = function(){
        var $items = $(this);
        $items.each(function(){
            var $el = $(this);
            var container = $el.parents('.f_text__container');
            container
                .addClass('f_text__container__disabled')
                .find('.f_text__input')
                .text($el.find('option:first').text())
                .addClass('f_text__disabled');
            $el
                .attr('disabled', 'disabled')
                .find(':selected')
                .removeAttr('selected');
        });
    };

    $.fn.USelectorEnable = function(){
        var $items = $(this);
        $items.each(function(){
            var $el = $(this);
            var container = $el.parents('.f_text__container');
            container.removeClass('f_text__container__disabled');
            container.find('.f_text__input').removeClass('f_text__disabled');
            $el.removeAttr('disabled');
        });
    };*/

    $.fn.USelectorShowListLoading = function(){
        $(this)
            .closest('.f_text__container')
            .addClass('loader');
    };

    $.fn.USelectorHideListLoading = function(){
        $(this)
            .closest('.f_text__container')
            .removeClass('loader');
    };

})(jQuery);


// Form Errors
(function ($, window, undefined) {
    $.U.onFormFieldError = function (e, clone) {
        $(e.currentTarget).UFormFieldErrorHide();
        if (clone){
            clone.UFormFieldErrorHide();
        }
    };
    $.fn.UDisableButton = function(message, num){
        this.addClass('b-btn__disabled');
    };
    $.fn.UEnableButton = function(message, num){
        this.removeClass('b-btn__disabled');
    };
    $.fn.UShowInvalidField = function(message, num){
        this.addClass('e-input__invalid');
    };
    $.fn.UHideInvalidField = function(message, num){
        this.removeClass('e-input__invalid');
    };
    $.fn.UFormFieldErrorShow = function(message, num){
        this.parents('.e-input-wrapper').addClass("e-input-wrapper__invalid");

        var _this = this;
        var $labels = this.siblings('.js-error-label');
        var $cloneField = this.siblings('input[name="password-text"]');

        var intRegex = /^\d+$/;
        var errorNum = num;
        var messageIsNum = intRegex.test(message);

        if($labels.length) {
            this.addClass('f_text__err');
            $cloneField.addClass('f_text__err');
            $labels.addClass('hidden');
            var $label;
            if(!intRegex.test(errorNum) && messageIsNum) {
                errorNum = parseInt(message);
            }
            if(intRegex.test(errorNum)){
                $label = $labels.filter('.error-'+errorNum);
                if(!$label.length){
                    $label = $labels.first();
                }
            }else{
                $label = $labels.first();
            }
            $label.removeClass("hidden");
            if(message && !messageIsNum){
                $label.text(message);
            }

            this.on('click', function(e){
                $.U.onFormFieldError(e, $cloneField);
            });
            $cloneField.on('click', function(e){
                $.U.onFormFieldError(e, _this);
            });
            return;
        }
        var $parent = this.parents('[data-error]');
        $parent.addClass('b_form_input__invalid');
        if(message && !messageIsNum){
            $parent.attr('data-error', message);
        }else{
            $parent.attr('data-error', $parent.data('default-error'));
        }
    };
    $.fn.UFormFieldErrorHide = function () {

        this.parents('.f_text__container').removeClass("field_has_error");

        this.parents('[data-error]').removeClass('b_form_input__invalid');

        var $texts = this.siblings('.f_text__input');
        $texts.removeClass('f_text__err');
        this.off('click', $.U.onFormFieldError);
        this.removeClass('f_text__err');
        this.siblings('.js-error-label').addClass("hidden");

    };
    $.fn.UFormFieldErrorLabelHide = function(){

        this.parents('[data-error]').removeClass('b_form_input__invalid');

        var $texts = this.siblings('.f_text__input');
        $texts.removeClass('f_text__err');
        this.siblings('.js-error-label').addClass("hidden");
    }

})(jQuery, this);


// ==== NEW GALLERY ====
(function ($, window, undefined) {

    "use strict";

    var gallery = {};
    gallery.galOpts = {
        activeItem:         'active-item',
        start:              0,
        big:                false,
        callback:           null,
        baseWidth:          465,
        baseHeight:         316,
        bigCarousel: {
            interval:       false
        },
        showOnOver:         false
    };

    $.fn.galleryNext = function () { $(this).data('UGallerySlider').next(); };
    $.fn.galleryPrev = function () { $(this).data('UGallerySlider').prev(); };
    $.fn.galleryMove = function (a) { $(this).data('UGallerySlider').move(a - 1, true); };

    function GallerySlider(elem, s) {

        var _this = 			this,
            $window = 			$(window),
            $body = 			$(document.body),
            $galleryContainer = $( s.galleryContainerSel, elem),
            $bigImageContainer= $( s.bigImageContainerSel, elem),
            $bigImageArea =	    $( s.bigImageAreaSel, elem),
            $galerySlider = 	$( s.galerySliderSel, elem),
            $galeryList = 		$( s.galeryListSel, elem),
            $galeryLinks = 		$( s.galeryLinksSel, elem),
            $galeryCounter =    $( s.galeryCounterSel, elem),
            $galeryCurNum =     $( s.galeryCurNumSel, elem),
            $galeryCount =      $( s.galeryCountSel, elem),
            $galeryTitle = 		$( s.galeryTitleSel, elem),
            $galeryDescription =$( s.galeryDescriptionSel, elem),
        //$galeryClose = 		$( s.galeryCloseSel, elem),
        //$galeryPrev = 		$( s.galeryPrevSel, elem),
        //$galeryNext = 		$( s.galeryNextSel, elem),
            $galeryListContainer = $( s.galeryListContainerSel, elem),
            galeryLinksLength = $galeryLinks.length,
            start =             s.start_id,
            startHash =         s.hash,
            videoAspectRatio =  1.77777,
            index =             0,
            isMobile =          elem.data('mobile')
            ;

        var contW = $bigImageContainer.width();
        var marginTop = parseInt($galleryContainer.css('margin-top'));
        var paddingTop = parseInt($galleryContainer.css('padding-top'));
        //$galerySlider.width(contW);

        setSizes();

        function generateVideo(link){
            $bigImageArea.html('<div class="g_video_out"><iframe width="560" height="315" src="' + link + '" frameborder="0" allowfullscreen></iframe></div>');
            setSizes(self);
        }

        function generateImage(link){

            var $img = $bigImageArea.find('img');
            if($img.length){
                $img
                    .attr("src",link)
                ;
            }else{
                $bigImageArea
                    .html('<img src="' + link + '" alt="" title="" />')
                ;
            }
            /*$bigImg
             .hide()
             .fadeIn(300)
             ;*/

            //centerMainImage();
            setSizes(self);
        }

        function preloadImage(src, callback){
            //$bigImageArea.UShowPreloader();
            var self = this,
                img = new Image(),
                $img = $(img)
                ;
            elem.trigger('Preloading', img, src);


            $img.load(function(){
                $bigImageArea.UHidePreloader();
                _this.sizes = [ img.width, img.height, img.width/img.height ];
                if (callback) {
                    callback.call(img, src);
                }
                //setSizes.call(self);
                elem.trigger('Preloaded', img, src);
            })
            setTimeout(function(){
                $img.attr('src', src).error(function(err){
                    console.error("ERROR SET SRC FOR IMAGE: "+src);
                });
            }, 0);
        }

        function centerMainImage(){
            var $img = $bigImageArea.find('img');
            var $p = $img.parent();
            var off = ($p.height() - $img.height()) /2;
            $img.css({'margin-top': off});
            /*if(off < 0){
             }else{
             $p.height($p.height() - off*2);
             }*/
        }


        function setSizes() {
            var ww = $(window).width();
            var wh = $(window).height();

            var sizes = _this.sizes;

            var hasPost = $('.post-container', $galeryDescription).length;


            var offset = marginTop + paddingTop;

            var $bigImage = $($bigImageArea).first();
            var $bigVideo = $($bigImageArea).find('iframe');

            var w = ww - 220;
            var h = wh - ($galerySlider.is(":visible") ? $galerySlider.outerHeight(true) : 0) - offset - 100;//(hasPost ? 100 : 0);


            //var listW = $galeryList.width();

            /*if(listW < contW){
             $galeryListContainer.width(listW);
             }*/

            if(h < 50){
                return;
            }

            $galleryContainer.width(w);
            $bigImageContainer.height(h);

            if($bigVideo.length) {
                $bigImage.width("auto").height(h);
                $bigVideo.height(h);
                return;
            }

            if(!sizes || !sizes.length){
                return;
            }

            var imageRatio = sizes[2];
            var contRatio = w/h;

            var imgW, imgH;

            if(imageRatio > contRatio){
                if(sizes[0] <= w){
                    imgW = sizes[0];
                    imgH = sizes[1];
                }else {
                    imgW = w;
                    imgH = w / imageRatio;
                }
            }else{
                if(sizes[1] <= h){
                    imgW = sizes[0];
                    imgH = sizes[1];
                }else {
                    imgW = h * imageRatio;
                    imgH = h;
                }
            }

            //$bigImage.width(imgW).height(imgH);
            $bigImageContainer.height("auto");

            if($galleryContainer.length) {
                $galleryContainer.width("auto");
                var newMargin = (wh - $galleryContainer.height() - 60) / 2;

                console.log("SIZES: " + wh + "-" + $galleryContainer.height());
                if (newMargin > marginTop) {
                    $galleryContainer.css({"margin-top": newMargin});
                } else {
                    $galleryContainer.css({"margin-top": marginTop});
                }
            }

        }

        function setActive(e, not_moved) {

            e.preventDefault();
            if(s.staticFullImage) {
                return;
            }
            //console.log(this, not_moved);
            var $this = $(this);
            var th = $this;
            if(th.prop("tagName") != "A"){
                th = th.find('a');
            }
            if (th.hasClass(s.activeItem)) {
                return false;
            }
            var link = th.attr('href'),
                id = th.data('id'),
                img = th.find('img'),
                type = th.data('type'),
                hash = th.data('hash'),
                linkIndex = $galeryLinks.index($this);

            _this.hash = hash;
            _this.index = linkIndex;


            $galeryCurNum.html(_this.index+1);
            $bigImageArea.data("id", hash);
            $bigImageArea.data("hash", hash);

            elem.trigger('Selected', id);
            if (type == "video") {
                if (s.big) {
                    _this.sizes = [0, 0, videoAspectRatio];
                    generateVideo(link);
                    setSizes();
                } else {
                    generateImage(img.attr("src"));
                }
            } else {
                preloadImage(link, generateImage);
            }
            //moveToHash(hash);
            move( linkIndex, not_moved );
            $galeryTitle.text( linkIndex + 1 + ' из ' + galeryLinksLength);

            /* elem trigger */
            elem.trigger('Showed', th.data(), linkIndex);
            /* ## elem trigger */
        }

        this.s = s;
        this.index = parseInt( start ) || index;

        var getItemByHash = function(hash){
            var $hashEl = $galeryLinks.filter('[data-hash='+hash+']'),
                $itemFromHash = $hashEl.length ? $hashEl : $galeryLinks.eq(0);

            return $itemFromHash;
        };
        var getItemIndexByHash = function(linksArray, hash){
            var i, l, resIndex, item;
            for (i=0, l=linksArray.length; i<l; i+=1){
                item = linksArray[i];
                if (item.hasOwnProperty("hash") && item.hash === hash) {
                    resIndex = i;
                    break;
                }
            }
            return resIndex;
        };
        var resizeGallery = function(){
            setSizes( false );
            //$galerySlider.tinycarousel(s.bigCarousel);
        };
        var moveToHash = function(hash){
            //_this.index = ind || _this.index;
            _this.hash = hash;
            $galeryLinks.removeClass(s.activeItem);
            var $f = getItemByHash(hash);
            $f.addClass(s.activeItem);
            _this.index = $f.index();
            $galerySlider.mycarousel_move( _this.index + 1 );
        };
        var move = function(ind, not_moved){
            _this.index = ind || _this.index;
            $galeryLinks.removeClass(s.activeItem);
            $galeryLinks.eq( _this.index ).addClass(s.activeItem);
            //console.log(not_moved, !not_moved);
            if(!not_moved) {
                $galerySlider.mycarousel_move( _this.index + 1 );
            }
        };
        var destroy = function(){
            elem.off('.gallery');
            $window.off('.gallery');
            unlockGallery();
            elem.data('UGallerySlider', null);
            elem.removeData('UGallerySlider');
            elem = null;
            return false;
        };
        var updateCurrentPreview = function(){
            var $el = $galeryLinks.eq( _this.index);
            //,id = $el.data('id');
            $el.trigger('click');
        };
        var prev = function(e){
            if(e){
                e.preventDefault();
            }
            _this.index = _this.index == 0 ? galeryLinksLength-1 : _this.index-1;
            updateCurrentPreview();
        };
        var next = function(e){
            if(e){
                e.preventDefault();
            }
            _this.index = _this.index == galeryLinksLength-1 ? 0 : _this.index+1;
            updateCurrentPreview();
        };
        var remove = function(id){
            //console.log(_this.index);

            $galeryLinks
                .filter('[data-id="' + id + '"]')
                .parent()
                .remove();

            $galerySlider = 	$( s.galerySliderSel, elem);
            $galeryLinks = 		$( s.galeryLinksSel, elem);
            galeryLinksLength = $galeryLinks.length;

            if (_this.index >= galeryLinksLength-1) {
                _this.index = galeryLinksLength-1;
            }
            resizeGallery();
            updateCurrentPreview();
        };
        var lockGallery = function(){
            var width_old = $body.width();
            $body.addClass('fancybox-lock');
            var width_new = $body.width();
            $body.css('margin-right', width_new - width_old + "px");
        };
        var unlockGallery = function(){
            $body
                .css('margin-right','')
                .removeClass('fancybox-lock');
        };


        var selectBigImage = function(e){
            e.preventDefault();

            var files = [];

            $galeryLinks.each(function(index){
                var data = $(this).data();
                if (!_.has(data, 'original')) {
                    data.original = $(this).attr("href");
                }
                files.push(data);
            });

            elem.trigger('TheBigClick', {files: files, index: _this.index});
        };

        function init() {

            if ( s.big || !!$bigImageContainer.length ) {
                lockGallery();
                $window.on('resize.gallery', resizeGallery );
            }
            elem.on('click.gallery', s.galeryLinksSel, function(e){
                setActive.call(this, e, true);
            });
            if(s.showOnOver) {
                elem.on('mouseenter.gallery', s.galeryLinksSel, function (e) {
                    setActive.call(this, e, true);
                });
            }
            elem.on('click.gallery', s.galeryPrevSel, prev);
            elem.on('click.gallery', s.galeryNextSel, next);

            if(s.bigSlideNext) {
                elem.on('click.gallery', s.bigImageAreaSel, next);
            }else{
                elem.on('click.gallery', s.bigImageAreaSel, selectBigImage);
            }
            //elem.on('click.gallery', s.galeryCloseSel, destroy);

            var files = [],
                descList = [];

            $galeryLinks.each(function(index){
                var data = $(this).data();
                if(data.hash){
                    files.push(data);
                }
                var desc = $(this).data("desc");
                if(desc){
                    descList[index] = desc;
                }
            });
            if(!files.length){
                var data = _.omit($bigImageArea.data(),["files","desc"]);
                data.image = $bigImageArea.attr("href");
                data.original = $bigImageArea.attr("href");
                files.push(data);
            }
            if(files.length > 1){
                $galeryCount.html(files.length);
                $galeryCounter.show();
            }else{
                $galeryCounter.hide();
            }
            $bigImageArea
                .data("files", files)
                .data("desc", descList);

            var startIndex = startHash?
                getItemIndexByHash(files, startHash):
                _this.index;

            if(!isMobile) {
                var carouselParams = {
                    pager: true,
                    interval: false,
                    intervaltime: 0,
                    animationTime: 500,
                    noMirror: true,
                    start: startIndex
                };
                $galerySlider.mycarousel(carouselParams);
            }
            /*$galerySlider.tinycarousel({
             interval:false,
             start:startIndex+1
             });*/
            $galeryLinks.eq( startIndex ).trigger('click');

            $galeryListContainer.find("img").lazyload({ container: $galeryListContainer});
        }

        // Public API
        $.extend(_this, {
            init: init,
            destroy: destroy,
            prev: prev,
            next: next,
            move: move,
            resizeGallery: resizeGallery,
            remove: remove
        });
        return init(s);
    };

    // plugin
    $.fn.UGallerySlider = function (settings) {
        var opts = $.extend({}, gallery.galOpts, $.fn.UGallerySlider.defaults, settings);
        this.each(function () {
            var $this = $(this);
            $this.data('UGallerySlider', new GallerySlider($this, opts));
        });
        return this;
    };

    /* defaults */
    $.fn.UGallerySlider.defaults = {
        galleryContainerSel :	'.js-gallery-cont',
        bigImageContainerSel :	'.js-gallery-big-cont',
        bigImageAreaSel :       '.js-gallery-big',
        galerySliderSel : 		'.js-gallery-slider',
        galeryListSel :		    '.overview',
        galeryLinksSel : 		'.js-gallery-item',
        galeryTitleSel : 		'.js-gallery-title',
        galeryCloseSel : 		'.js-gallery-close',
        galeryCounterSel : 		'.js-gallery-counter',
        galeryCurNumSel : 		'.js-gallery-curnum',
        galeryCountSel : 		'.js-gallery-count',
        galeryPrevSel :			'.js-gallery-prev',
        galeryNextSel : 		'.js-gallery-next',
        galeryListContainerSel :'.viewport',
        galeryDescriptionSel :  '.js-gallery-dialogs',
        showOnOver:             false
    };

})($, this);

// **********************
/** Isert Revive Banner */
// **********************
(function ($, window, undefined) {

    $.fn.UReviveBanner = function (options) {

        function UReviveBanner($el, s){

            var settings, self = this, intervalId;

            function init(s) {
                settings = $.extend({}, $el.data('params') || {}, s);
                settings.zone = settings.zone || $el.data('zone');
                settings.interval = settings.interval || $el.data('refresh');
                settings.url = settings.url || getUrl(settings.zone);
                if(settings.interval){
                    intervalId = setInterval(autorefresh, settings.interval);
                }else {
                    //insertHtml(settings.zone);
                }
                load(settings.url);
                $el.trigger('inited');
            }

            function insertHtml(zone){
                var m3_r = Math.floor(Math.random()*99999999999);
                $el.html(
                    "<a href='//rotary.blamper.ru/www/delivery/ck.php?n=af8ab732&amp;cb="+m3_r+"' target='_blank'>"
                    + "<img src='//rotary.blamper.ru/www/delivery/avw.php?zoneid="+zone+"&amp;cb="+m3_r+"&amp;n=af8ab732' border='0' alt='' />"
                    + "</a>"
                );
            }

            function getUrl(zone){

                zone = zone || 1;

                var m3_u = (location.protocol=='https:'?'https://rotary.blamper.ru/www/delivery/html.php':'http://rotary.blamper.ru/www/delivery/html.php');
                var m3_r = Math.floor(Math.random()*99999999999);
                if (!document.MAX_used) document.MAX_used = ',';
                var url = m3_u+"?zoneid="+zone+'&cb=' + m3_r+'&debug=1';
                if (document.MAX_used != ',') url += "&exclude=" + document.MAX_used;
                url += document.charset ? '&charset='+document.charset : (document.characterSet ? '&charset='+document.characterSet : '');
                url += "&loc=" + escape(window.location);
                if (document.referrer) url += "&referer=" + escape(document.referrer);
                if (document.context) url += "&context=" + escape(document.context);
                if (document.mmm_fo) url += "&mmm_fo=1";
                return url;
            }

            function load(url){
                $.ajax( {
                    dataType: "html",
                    cache: false,
                    url: url,
                    crossDomain: true
                })
                .done(onLoad)
                .fail(onFail);
            }

            function autorefresh(){
                load(settings.url);
                //insertHtml(settings.zone);
            }

            function destroy() {

            }

            function onLoad(html, textStatus){
                //debugger;
                //html = $(html);
                if(!html){
                    var $block = $el.parents('.js-banner-block');
                    if($block.length){
                        $block.remove();
                    }else {
                        $el.remove();
                    }
                    return;
                }
                $el.append(html);
            }

            function onFail(jqxhr, options, exception){
                console.log("!!!!!!!! FAIL Banner insert error");
                insertHtml(settings.zone);
            }

            // Public API
            $.extend(
                self,
                {
                    // Public API Methods
                    reinit: function (s) {
                        s = $.extend({}, settings, s);
                        init(s);
                    },
                    destroy: function () {
                        destroy();
                    }
                }
            );
            init(s);
        }

        options = $.extend({}, $.fn.UReviveBanner.defaults, options);

        return this.each(
            function () {
                var $el = $(this), binded = $el.data("UReviveBanner");
                if (binded) {
                    binded.reinit(options);
                } else {
                    // remove inner scripts
                    //$("script",elem).filter('[type="text/javascript"],:not([type])').remove();
                    binded = new UReviveBanner($el, options);
                    $el.data("UReviveBanner", binded);
                }
            }
        );
    };

    $.fn.UReviveBanner.defaults = {
        key: 'defaultValue'
    };

})(jQuery, this);


// ==== FOR SCROLL FIXED BANNERS ====
(function ($, window, undefined) {

    $.fn.UStayOnTop = function(settings){

        var $el = this,
            opts = $.extend({}, $.fn.UStayOnTop.defaults, settings),
            opened = null,
            contTop = $(opts.containerSelector).offset().top,
            contHeight = $(opts.containerSelector).height(),
            contBottom = contTop + contHeight,
            $parent = $el.parent(),
            parentPadding = parseInt( $parent.css("paddingBottom") ),
            height = $el.height(),
            $w = $(window),
            initTop // = $el.offset().top
            ;

        var setInitTop = _.once(function(){
            var top;
            var isFixed = $el.css('position') == 'fixed';
            if(isFixed){
                var t = $el.css('top');
                $el
                    .removeClass(opts.selectorFixedClass)
                    .addClass(opts.selectorRelativeClass)
                    .css({'top': 0});
                top = $el.offset().top;
                console.log("FIXED initTop:", top);
                initTop = top;
                $el
                    .removeClass(opts.selectorRelativeClass)
                    .addClass(opts.selectorFixedClass)
                    .css({'top': t});
            }else {
                top = $el.offset().top;
                initTop = initTop || top;
                console.log("NONFIXED initTop:", initTop);
            }
        });

        function scrollMonitor(e){
            var isFixed = $el.css('position') == 'fixed';
            setInitTop();
            var scroll = $w.scrollTop(),
                windowHeight = $w.height(),
                dataTop = contBottom - initTop - height - parentPadding,
                offsetTop = opts.offsetTop ? opts.offsetTop : 0,
                marginTop = parseInt($el.css("margin-top"));

            //console.log("dataTop = contBottom - top - height - parentPadding: "+contBottom+" - "+top+" - "+height+" - "+parentPadding);
            //console.log("scroll > top + dataTop ["+(scroll > top + dataTop)+"]: "+scroll+" > "+top+" + "+dataTop);
            //console.log("scroll < initTop - offsetTop - marginTop ["+(scroll < initTop - offsetTop - marginTop)+"]: " +scroll+" < "+initTop+" - "+ offsetTop+" - "+marginTop);

            if(scroll > opts.showOffset){
                $el.removeClass('hide');
            }
            if(scroll > top + dataTop) {
                $el
                    .removeClass(opts.selectorFixedClass)
                    .addClass(opts.selectorRelativeClass)
                    .css({'top': dataTop});
            }else if(scroll <= initTop - offsetTop - marginTop) {
                $el
                    .removeClass(opts.selectorFixedClass)
                    .addClass(opts.selectorRelativeClass)
                    .css({'top': 0});
            }else{
                $el
                    .removeClass(opts.selectorRelativeClass)
                    .addClass(opts.selectorFixedClass)
                    .css({'top': offsetTop});
            }
            var $fix = $(opts.fixable).not($el).filter(':visible');
            var $over = $el.overlaps($fix);

            if(opts.hideOverlapsed){
                $over.hide();
            }else if(isFixed && $over.length) {
                var overPos = parseInt($over.css('top'));
                offsetTop = overPos + $over.height();
                $el
                    .removeClass(opts.selectorRelativeClass)
                    .addClass(opts.selectorFixedClass)
                    .css({'top': offsetTop});
            }
        }

        (function init(){
            $(window).on('scroll', scrollMonitor);
            scrollMonitor();
        })();

        return this;
    };

    $.fn.UStayOnTop.defaults = {
        selector:				'.blamper-ontop'
        ,selectorFixedClass:	'ar_like_article_fixed'
        ,selectorRelativeClass:	'ar_like_article_relative'
        ,containerSelector: 	'.content-container'
        ,fixable: 	            '.fixable-element'
        ,offsetTop:             20
        ,showOffset:            0
        ,hideOverlapsed:        false
    };

})(jQuery, this);



// ==== tags block ====
(function ($, window, undefined) {

    // plugin
    $.fn.UTagsAdd = function (settings) {

        if (!this.length) {
            return this;
        }

        var opts = $.extend({}, $.fn.UTagsAdd.defaults, settings);
        var $el = this
            , $wrapper = this.find(opts.wrapperSelector)
        ;

        function createTag(data){
            var template = _.template(opts.template);
            return $(template(data));
        }

        function getTags(){
            return $wrapper.find(opts.tagSelector);
        }

        function onKeyDown(e){
            var $th = $(this),
                value = this.value.replace(/(^\s+|\s+$)/g, '');

            if(value.length > opts.maxLength-1) {
                $th.val(value.slice(0, opts.maxLength-1));
            }

            var keycode = e.keyCode ? e.keyCode : e.which;
            if(keycode==8 && !$th.val()) {
                var $tag = getTags().last();
                removeTag($tag);
                e.preventDefault();
                return false;
            }
        }

        function onKeyPressed(e){
            var $th = $(this),
                value = this.value.replace(/(^\s+|\s+$)/g, '');

            if(value.length > opts.maxLength-1) {
                $th.val(value.slice(0, opts.maxLength-1));
            }

            var keycode = e.keyCode ? e.keyCode : e.which;
            if(keycode==13 || keycode==44) {
                addTagFromInput(value, $th);
                e.preventDefault();
                return false;
            }
        }

        function addTagFromInput(data, $th){
            if ( data ) {
                if($wrapper.length){
                    if(getTags().length) {
                        createTag(data).insertAfter(getTags().last());
                    }else{
                        $wrapper.prepend(createTag(data));
                    }
                }else {
                    if($th) {
                        createTag(data).insertBefore($th);
                    }
                }
                if($th) {
                    $th.val('');
                }
            } else {
                if($th) {
                    $th.val(data);
                }
            }
            if($th) {
                $th.focus();
            }
        }

        function sort(field){
            field = field || "sort";
            getTags().sort(function (a, b) {
                return +a.getAttribute('data-'+field) - +b.getAttribute('data-'+field);
            }).appendTo( $wrapper );
            $wrapper.append($wrapper.find(opts.lastFixed));
        }

        function getTagsWithType(type){
            return getTags().filter(function(){
                return $(this).data('type') == type || type == "*";
            });
        }

        function removeTagWithType(type){
            getTags().filter(function(){
                return $(this).data('type') == type;
            }).remove();
        }

        function getTagsWithText(text){
            return getTags().filter(function(){
                return $.trim($(this).find('.js-tag-text').text()) == $.trim(text);
            });
        }

        function removeTagWithText(text){
            getTags().filter(function(){
                return $.trim($(this).find('.js-tag-text').text()) == $.trim(text);
            }).remove();
        }

        function removeTag($tag){
            $wrapper.trigger("TagRemoved", $tag.data());
            $tag.remove();
        }

        function onRemoveTag(e){
            e.preventDefault();
            var $tag = $(e.currentTarget).parents(opts.tagSelector);
            removeTag($tag);
        }

        function destroy(){
            $el.off('.tags', '**');
        }

        $.extend(this,{
            addTag: addTagFromInput
            ,removeTagWithText: removeTagWithText
            ,removeTagWithType: removeTagWithType
            ,getTagsWithText: getTagsWithText
            ,getTagsWithType: getTagsWithType
            ,sortByData: sort
            ,destroy: destroy
        });

        var $tagInput = $el.find(opts.inputSelector);

        $el.on('click.tags', opts.removeSelector, onRemoveTag);
        $el.on('click.tags', function(){
            $tagInput.focus();
        });
        $el.on('keydown.tags', opts.inputSelector, onKeyDown);
        $el.on('keypress.tags', opts.inputSelector, onKeyPressed);

    };

    $.fn.UGetTags = function () {
        var tags = [];
        var t;
        this.find(opts.tagSelector).each(function(){
            t = $('input', this).val();
            tags.push(t.trim());
        });
        return tags;
    }

    $.fn.UTagsAdd.defaults = {
        inputSelector : ".js-input-tags"
        ,wrapperSelector : ".js-tag-list"
        ,tagSelector : ".js-tag-item"
        ,lastFixed : ".js-last-fixed"
        ,removeSelector : ".js-remove-tag"
        ,maxLength : 40
        ,template: '<span class="js-tag-item ar_tag"><%=text%>'
				    + '<span class="ar_tag_remove">'
                    + '<i class="ico ico_close_small"></i></span>'
                    + '<input type="hidden" name="article_tags" value="<%=text%>" />'
                    + '</span>'
    };

})(jQuery, this);


// ==== COMMON UTILS ====
(function ($, window, undefined) {

    $.fn.UTriggerChildModules = function(event, data){
        this.find('[data-module]').each(function(){
            var instance = $(this).data('moduleInstance');
            if(!instance || !_.isFunction(instance.triggerModule)){
                return;
            }
            instance.triggerModule(event, data);
        });
    };

    $.fn.UAppendToWithIndex = function(to, index){
        if(! to instanceof jQuery){
            to = $(to);
        }
        if(index === 0){
            $(this).prependTo(to)
        }else{
            $(this).insertAfter(to.children().eq(index-1));
        }
    };

    $.fn.UMoveToIndex = function (i) {
        // The element we want to swap with
        var $target = this.parent().children().eq(i);
        // Determine the direction of the appended index so we know what side to place it on
        if (this.index() > i) {
            $target.before(this);
        } else {
            $target.after(this);
        }
        return this;
    };

})(jQuery, this);

