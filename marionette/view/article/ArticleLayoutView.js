/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 02.03.2015 18:21
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    //,'controller/article/InitArticleSyncCommand'
    ,'marionette'
    ,'service/WidgetCacheService'
    ,'helper/Analytics'
    ,'utils'
    ,'../../../vendor/jquery.smooth-scroll'
], function (
    AbstractItemView
    ,AppConsts
    //,InitArticleSyncCommand
    ,Marionette
    ,WidgetCacheService
    ,Analytics
) {

    "use strict";

    var PRERENDER_NAMESPACE = 'prerender';

    var IDLE_MODE = 'idle',
        SLIDING_MODE = 'sliding',
        WAITING_MODE = 'waiting'
    ;

    var ArticleLayoutView = AbstractItemView.extend({

        events: {
            'click .js-prev-article':                        'onPrevClick'
           //,'click .js-next-article':                        'onNextClick'
           ,'click .js-close':                               'onCloseClick'
        },

        ui: {
            prev:                         '.js-prev-article'
            ,next:                        '.js-next-article'
            ,container:                   '.js-article-container'
            ,slide:                       '.js-article-unit'
            ,area:                        '.js-article-area'
            ,close:                       '.js-close'
            ,staticClose:                 '.js-title .js-close'
        },

        //$emptyLayout: null,
        prerenderLayout: null,

        $nextArticleSlide: null,

        prerenderingComplete: false,
        slidingMode: IDLE_MODE,

        //bindModel: 'ArticleModel',

        contentType: 'article',

        init: function () {

            this.contentType = require('App').params.contentType;

            this.addVentEvent(AppConsts.EVENT.SYSTEM.HISTORY_CHANGE, this.onHistoryChange);
            //this.addVentEvent(AppConsts.EVENT.ARTICLE.NEXT_URL, this.onNextUrl, PRERENDER_NAMESPACE);
            //this.addVentEvent(AppConsts.EVENT.ARTICLE.NEED_NEXT, this.onNextClick, PRERENDER_NAMESPACE);

            //this.addVentEvent(AppConsts.EVENT.SYSTEM.MODULES_LOADED, this.onPrerenderedModulesLoaded, PRERENDER_NAMESPACE);
            //this.addVentEvent(AppConsts.EVENT.ARTICLE.CONTENT_RENDERED, this.onPrerenderComplete, PRERENDER_NAMESPACE);

            //this.addVentEvent(AppConsts.EVENT.SYSTEM.EXPORT_VIEW, this.onPrerenderExportView, PRERENDER_NAMESPACE);

            //this.addVentEvent(AppConsts.EVENT.ARTICLE.PACKET_DATA, this.onPrerenderPacketData, PRERENDER_NAMESPACE);
            this.addVentEvent(AppConsts.EVENT.COMMON.TOP_MENU_SCROLLABILITY, this.onTopMenuScrollability);

            WidgetCacheService.subscribeExport();

            //var articlePacketApi = new InitArticleSyncCommand();

            require('App').sendAnalytics(
                this.contentType == 'article'
                    ? Analytics.V2.ARTICLE.SHOW_ARTICLE
                    : Analytics.V2.QUESTION.SHOW
            );

        },

        onInitModulesLoaded: function () {
            var that = this;
            //var prerenderPacketApi = new InitArticleSyncCommand({eventNamespace: PRERENDER_NAMESPACE});
            //this.storeEmptyLayout();
            //this.pub(AppConsts.EVENT.SYSTEM.NEED_EXPORT_VIEWS);
            //this.prepearNewLayout();
            _.delay(function() {
                $.force_appear();
                //that.preloadNextPage.call(that);
            }, 100);
        },

        storeEmptyLayout: function(){
            var $layout = $(this.ui.container.html());
            $layout.find('.js-revive').html("");
            var $modules = $layout.find('[data-module]');
            require('App').parser.destroy($modules.children());
            $modules.attr("data-namespace",PRERENDER_NAMESPACE).html("");
            //this.$emptyLayout = $layout;
            this.prerenderLayout = $layout.get(0).outerHTML;
        },

        prepearNewLayout: function(){
            this.$nextArticleSlide = $(this.prerenderLayout);
            this.$nextArticleSlide.addClass('b-content-slide');
            var $modules = this.$nextArticleSlide;
            _.delay(function() {
                require('App').parser.parse($modules, {}, PRERENDER_NAMESPACE);
            }, 50);
        },

        setPrerenderedCloseUrl: function(url){
            if(!this.$nextArticleSlide.length){
                console.log('!!!! NO PRERENDERED LAYOUT FOR SET CLOSE URL !!!!!');
                return false;
            }
            this.$nextArticleSlide.find('.js-close').attr('href', url);
        },

        getNextUrl: function () {
            var url = this.ui.next.data('href') || this.ui.next.attr('href');
            return url;
        },

        getNextTitle: function () {
            var title = this.ui.next.attr('data-title');
            return title;
        },

        preloadNextPage: function(){
            this.prerenderingComplete = false;
            var url = this.getNextUrl();
console.log('=== WidgetCacheService PRELOAD NEXT PAGE:', url);
console.log("--NEXT URL--: ----------- preload next page: ", url);
            this.pubNS(PRERENDER_NAMESPACE, AppConsts.EVENT.ARTICLE.GET, url);
        },

        restoreFromCache: function(){
            var widgets = WidgetCacheService.getCurrent();

console.log("--SLIDE BACK--: ============ restoreFromCache ======");

            for(var i in widgets){
                this.pubNS(PRERENDER_NAMESPACE, "IMPORT_VIEW:" + i, widgets[i].html, widgets[i].data);
            }
        },

        slidePrevArticle: function(){
console.log("--SLIDE BACK--: ============ slidePrevArticle ======");
            this.restoreFromCache();

            this.pubNS(PRERENDER_NAMESPACE, AppConsts.EVENT.ARTICLE.BLOCK_NEW_DATA);

            if(WidgetCacheService.getCurrentIndex() < 1) {
                //this.ui.prev.hide(1000);
                this.ui.prev.toggle();
            }

            this.slidingMode = SLIDING_MODE;
            var wS = this.ui.slide.width();
            var w = App.vars.windowSize.width;
            var xoff = (w - wS)/2;
            this.ui.slide
                .addClass('b-content-slide')
                .css({
                    'margin-left': xoff,
                    'margin-right': xoff
                })
            ;
            this.$nextArticleSlide.UShowPreloader({ topCentered: true });

            this.ui.container
                .addClass('b-content-slider')
                .width(w + wS)
                .prepend(this.$nextArticleSlide)
                .css({'margin-left': -wS})
                .animate({
                    'margin-left': xoff
                },{
                    complete: this.onSlideBackComplete.bind(this)
                })
            ;
        },

        slideNextArticle: function(){
            this.slidingMode = SLIDING_MODE;
            var wS = this.ui.slide.width();
            var w = App.vars.windowSize.width;
            var xoff = (w - wS)/2;
            this.ui.slide
                .addClass('b-content-slide')
                .css({
                    'margin-left': xoff,
                    'margin-right': xoff
                })
            ;
            this.$nextArticleSlide.UShowPreloader({ topCentered: true });
            this.ui.container
                .addClass('b-content-slider')
                .width(w + wS)
                .append(this.$nextArticleSlide)
                .animate({
                'margin-left': -w + xoff
                },{
                    complete: this.onSlideComplete.bind(this)
                })
            ;
        },

        returnMainSlide: function(){
console.log("--SLIDE BACK--: ============ returnMainSlide ======");
            this.ui.slide.css({
                'margin-left': "",
                'margin-right': ""
            }).removeClass('b-content-slide');
            this.ui.container
                .removeClass('b-content-slider')
                .width('auto')
                .css({
                    'margin': ""
                })
            ;

            this.$nextArticleSlide.UHidePreloader();

            //this.pubNS(PRERENDER_NAMESPACE, AppConsts.EVENT.SYSTEM.NEED_EXPORT_VIEWS);
            var href = this.$nextArticleSlide.find('.js-close').attr('href');
            this.ui.close.attr('href', href);

            var $modules = this.$nextArticleSlide.remove().find('[data-module]');
            require('App').parser.destroy($modules.children());
            $modules.html("");

            this.$el.find('.js-scrollable').each(function(){
                var instance = $(this).data('instance');
                if(instance) {
                    instance.update();
                }
            });

            this.slidingMode = IDLE_MODE;

            $.force_appear();

            require('App').sendAnalytics(
                this.contentType == 'article'
                    ? Analytics.V2.ARTICLE.SHOW_ARTICLE
                    : Analytics.V2.QUESTION.SHOW
            );
        },

        slideBack: function(){
console.log("--SLIDE BACK--: ============ slideBack ======");
            var that = this;
            require('App').moveScrollToTop();
            that.slidePrevArticle.call(that);
        },

        slideNext: function(){
            var that = this;
            /*setTimeout(function(){
             $.smoothScroll(0);
             }, 300);*/
            require('App').moveScrollToTop();
            that.slideNextArticle.call(that);
            /*setTimeout(function(){
            }, 400);*/
        },

        checkSlideNextComplete: function(){
console.log('============= CHECK NEXT SLIDE COMPLETE', this.slidingMode, this.prerenderingComplete);

            if(this.slidingMode != WAITING_MODE || !this.prerenderingComplete){
                return false;
            }
            this.pubNS(PRERENDER_NAMESPACE, AppConsts.EVENT.SYSTEM.NEED_EXPORT_VIEWS);
            this.processSlideComplete();
            this.pub(AppConsts.EVENT.SYSTEM.NEED_EXPORT_VIEWS);
            return true;
        },

        checkSlideBackComplete: function(){
console.log("--SLIDE BACK--: ============ checkSlideBackComplete ======: ", this.slidingMode, this.prerenderingComplete);
            if(this.slidingMode != WAITING_MODE || !this.prerenderingComplete){
                return false;
            }
            this.pubNS(PRERENDER_NAMESPACE, AppConsts.EVENT.SYSTEM.NEED_EXPORT_VIEWS);
            this.processSlideComplete();
            this.pubNS(PRERENDER_NAMESPACE, AppConsts.EVENT.ARTICLE.UNBLOCK_NEW_DATA);
            return true;
        },

        processSlideComplete: function(){
console.log('============= SLIDING COMPLETE !!!')
            this.updateNextUrl();
            this.returnMainSlide();
            this.preloadNextPage();
            this.slidingMode = IDLE_MODE;
        },

        updateNextUrl: function(){
            console.log("--NEXT URL--: update BUTTON url: ", this.nextUrl);
            this.ui.next.attr({
                'href': this.nextUrl
                , 'data-title': this.nextTitle
            });
        },

        storeNextUrl: function(url, title){
            console.log("--NEXT URL--: store url var: ", url, " MODE: ", this.slidingMode);
            this.nextUrl = url;
            this.nextTitle = title;
            /*if(this.slidingMode == IDLE_MODE){
                this.updateNextUrl();
            }*/
        },

        onTopMenuScrollability: function(on){
            on ? this.ui.staticClose.hide() : this.ui.staticClose.show();
        },

        onPrerenderPacketData: function(data){
console.log("--NEXT URL--: ============ onPrerenderPacketData ======: ", data);
            this.$nextArticleSlide.UHidePreloader();
            this.setPrerenderedCloseUrl(data.crossUrl);
        },

        onSlideBackComplete: function(){

console.log("--SLIDE BACK--: ============ onSlideBackComplete ======: ");

            this.slidingMode = WAITING_MODE;
            this.onPrerenderComplete();
            this.$nextArticleSlide.UHidePreloader();
            this.checkSlideBackComplete();
        },

        onSlideComplete: function(){
            this.slidingMode = WAITING_MODE;
            if(!this.ui.prev.is(':visible')) {
                //this.ui.prev.removeClass('hidden').hide().show(1000);
                this.ui.prev.toggle();
            }
            this.checkSlideNextComplete();
        },

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO: EVENT ON COMPLETE ALL APIS NOT JUST MODULES
        onPrerenderedModulesLoaded: function(){
        },

        onPrerenderComplete: function(){
            this.prerenderingComplete = true;
            var that = this;

// TODO: GET RENDER EVENT FROM ABSTRACT ITEM VIEW,
// TODO: PROCESS LIST OF MODULES AND GATHER EACH EVENT
            _.delay(function() {
                that.checkSlideNextComplete.call(that);
            }, 1000);
        },

        onPrerenderExportView: function(name, html, data){
            //debugger;
            this.pub("IMPORT_VIEW:" + name, html, data);
        },

        onNextUrl: function(data){
            this.storeNextUrl(data.url, data.meta_title || data.title);
        },

        onHistoryChange: function(url){
            url = url.replace(/^(?:\/\/|[^\/]+)*\//, "/");
            //this.pub(AppConsts.EVENT.ARTICLE.GET, url);
        },

        onPrevClick: function (e) {

console.log("--SLIDE BACK--: ============ onPrevClick ======: ");

            e.preventDefault();
            var $el = $(e.currentTarget);
            //var url = $el.attr('href');
            require('App').sendAnalytics(
                this.contentType == 'article'
                    ? Analytics.V2.ARTICLE.CLICK_PREV
                    : Analytics.V2.QUESTION.CLICK_PREV
            );
            var App = require('App');
            //var url = App.navigateBack();
            App.redirect(-1);
            var that = this;
            _.delay(function(){

console.log("--SLIDE BACK--: ============ onPrevClick defer ======: ");

                that.slideBack.call(that);
            }, 100);


        },

        onNextClick: function () {
            if(this.slidingMode != IDLE_MODE){
                return;
            }
            var url = this.getNextUrl();
            var title = this.getNextTitle();

console.log('--NEXT URL--: ---------------------------- click redirect to: ', url);

            require('App').sendAnalytics(
                this.contentType == 'article'
                    ? Analytics.V2.ARTICLE.CLICK_NEXT
                    : Analytics.V2.QUESTION.CLICK_NEXT
            );

            App.redirect(url, '', true, title);
            this.slideNext();
        },

        onCloseClick: function (e) {
            e.preventDefault();
            var $el = $(e.currentTarget);
            var href = $el.attr('href') || $el.data('href');
            $el.UShowPreloader();

            require('App').sendAnalyticsWithRedirect(
                this.contentType == 'article'
                    ? Analytics.V2.ARTICLE.CLICK_CLOSE
                    : Analytics.V2.QUESTION.CLICK_CLOSE
                , href
            );

        }

    });

    return ArticleLayoutView;


});