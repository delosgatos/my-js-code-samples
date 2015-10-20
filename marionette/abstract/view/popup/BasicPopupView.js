/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 14:24
 */

define([
    'abstract/view/AbstractItemView'
    ,'underscore'
    ,'jquery'
    ,'jquery.fancybox'
], function (
    AbstractItemView
    ,_
    ,$
){

    "use strict";

    var BasicPopupView = AbstractItemView.extend({

        $caller: null,
        $callers: null,

        preventFromAutoDestroy: false,
        useGlobalLoading: false,
        localLoader: null,

        used: false,
        showing: false,

        $title: null,

        /* fancybox custom settings */
        fancySettings: {
            padding: 0,
            margin: 40,
            skin: 3,
            minHeight: 80,
            fitToView: false,
            scrolling: "visible",
            tpl: {
                //wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                closeBtn: '<a href="javascript:;" title="Close" class="popup_closer"><i class="ico ico_popup__close"></i><a>'
            },
            wrapCSS: 'popup',
            fixed : false,
            helpers : {
                fixed:false,
                overlay : {
                    fixed: window.opera ? false : true        // do not remove ! opera BUG
                }
            }
        },

        jscrollSettings: {
            autoReinitialise:true,
            verticalDragMinHeight: 20
        },

        popupOptions:[
            "template"
            ,"$caller"
            ,"$callers"
        ],

        setOnTop: function(){
            this.$el.parents('.fancybox-overlay').css('z-index', 9999);
        },

        constructor: function (params) {
            this.configure(params);
            AbstractItemView.prototype.constructor.apply(this, arguments);
        },

        configure: function(options) {
            if(!options) options = {};
            if (this.options){
                options = _.extend({}, _.result(this, 'options'), options);
            }
            _.extend(this, _.pick(options, this.popupOptions));
            this.options = options;
        },

        initialize: function (params) {
            _.bindAll(this
                ,"onFancyClosed"
                ,"onCloseClick"
                ,"onCloseCheckboxClick"
            );
            this.$title = this.$el.find('.js-popup-title');
            AbstractItemView.prototype.initialize.apply(this, arguments);
            //console.log("-V- BasicPopupView init");
            this.parseParams(params);
            this.initProcess();
        },

        parseParams: function(params){
            if(!params){
                return false;
            }
            if(params.fancybox){
                _.extend(this.fancySettings, params.fancybox);
            }
            return true;
        },

        start: function () {
            this.$el
                .on('click', '.js-close-checkbox', this.onCloseCheckboxClick)
                .on('click', '.js-popup-close', this.onCloseClick)
                .on('click', '.js-cancel-button', this.onCloseClick);
            if(this.used){
                this.isClosed = false;
                this.bindUIElements();
                this.delegateEvents();
            }
        },

        extendCallerParams: function(data){
            if(!this.$caller){
                return false;
            }
            var params = $.extend( this.$caller.attr("data-params"), data);
            this.setCallerParams(params);
        },

        setCallerParams: function(data){
            if(!this.$caller){
                return false;
            }
            this.$caller.data("params", data);
        },

        hide: function () {
            this.closeProcess();
            this.$el.find('.js-popup-block').removeClass('b-popup__anim-in').addClass('b-popup__anim-out');
            var that = this;
            setTimeout(function(){
                that.$el.remove();
            }, 400);
        },

        destroy: function(){
            this.hideLoading();
            this.hideGlobalLoading();
            this.showing = false;
            this.unbindUIElements();
            this.$el.off('click');
            this.hide();
            //AbstractItemView.prototype.destroy.call(this);
        },

        hideDelay: function (delay) {
            var _this = this;
            if(!_.isNumber(delay)) delay = 2000;
            setTimeout(
                function(){
                    _this.hide.call(_this);
                },
                delay
            );
        },

        initProcess: function(){
            /*var _this = this;
            this.fancySettings['afterClose'] = function(){
                _this.onFancyClosed.apply(_this, arguments);
            };*/
        },

        showProcess: function(){
            /*this.fancySettings.afterShow = function() {
                that.onAfterShow();
            };*/
            //$.fancybox(this.$el, this.fancySettings);
            $('body').append(this.$el);
            this.$el.find('.js-popup-block').removeClass('b-popup__anim-out').addClass('b-popup__anim-in');
        },

        closeProcess: function(){
            //$.fancybox.close();
        },

        show: function(params){
            if(!$.isReady){
                var that = this;
                var args = arguments;
                $(function(){
                    that.show.apply(that, args);
                });
                return;
            }
            this.parseParams(params);

            var that = this;


            this.showProcess();


            this.start();
            this.used = true;
            this.showing = true;
            if(params && params.onTop){
                this.setOnTop();
            }
        },

        updateSize: function(){
            $.fancybox.update();
        },

        showAgain: function(){
            $.fancybox(this.$el, this.fancySettings);
            this.used = true;
            this.showing = true;
        },

        showLoading: function(){
            if(this.showing){
                this.$el.UShowPreloader();
            }
        },

        hideLoading: function(){
            this.$el.UHidePreloader();
        },

        showGlobalLoading: function(){
            this.useGlobalLoading = true;
            $.U.ShowGlobalPreloader();
        },

        hideGlobalLoading: function(){
            if(this.useGlobalLoading){
                this.useGlobalLoading = false;
                $.U.HideGlobalPreloader();
            }
        },

        setTitle: function(title){
            this.$title.html(title);
        },

        /**
         * Поднимает попап наверх и делает его активным
         * по нажатию кнопки мыши.
         */
        raise: function (e) {
            if (!$(this.el).hasClass('popup-active')) {
                var max_z = 0;

                $('.popup-active').removeClass('popup-active');

                $('.popup').each(function () {
                    var curr_z = parseInt($(this).css('z-index'));
                    if (curr_z > max_z) {
                        max_z = curr_z;
                    }
                });

                $(this.el).css({ 'z-index': max_z + 10 });
                $(this.el).addClass('popup-active')
            }
        },

        storeInstanceOnHide: function(value){
            if(value){
                this.preventFromAutoDestroy = value;
            }else{
                this.preventFromAutoDestroy = true;
            }
        },

        onCloseCheckboxClick: function(e){
            e.preventDefault();
            this.destroy();
        },

        onCloseClick: function(e){
            e.preventDefault();
            this.destroy();
            //return false;
        },

        onFancyClosed: function(e){
            if(this.preventFromAutoDestroy){
                return;
            }
            this.destroy();
        },

        onShow: function () {
            console.log("-V- BasicPopupView show");
            this.start();
        },

        onAfterShow: function() {
            console.log("-V- BasicPopupView afterShow");
        },

        onRender: function () {
            console.log("-V- BasicPopupView render");
            this.init();
        },

        onClose: function () {
            console.log("-V- BasicPopupView close");
            this.trigger('Close');
            this.destroy();
        }

    });

    return BasicPopupView;
});