/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 03.03.2015 19:34
 */


define([
    'view/article/ArticleWidgetView'
    ,'model/common/ListWidgetModel'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'underscore'
], function (
    ArticleWidgetView
    ,WidgetModel
    ,AppConsts
    ,Analytics
    ,_
) {

    "use strict";

    var ListWidgetView = ArticleWidgetView.extend({

        modelClass:                         WidgetModel,
        noRenderOnStart:                    true,

        modelEvents: {
            'sync':                         'onSync'
            ,'change:list':                 'onListChanged'
            ,'DirectUpdate':                'onDirectUpdate'
        },

        events: {
            'click a':                      'onLinkClick'
            ,'BlockClicked a':              'onBlockClick'
            ,'click .js-preloader':         'onNextClick'
            ,'click .js-main-link':         'onMainLinkClick'
        },

        ui: {
            preloader:                      '.js-preloader'
            ,list:                          '.js-list'
        },

        template:                           null,
        listTemplate:                       null,

        request_data:                       {},

        addListeners:                       null,

        extra: {
            offset: 0
        },

        limit: 5,

        empty: false,

        useScroll: true,

        initElementsCount: 0,

        suspended: false,

        init: function () {
            var that = this;

            this.initElementsCount = this.ui.list.find('.js-item').length;
            if(this.url) {
                this.model.setUrl(this.url);
            }
            this.model.setExtraData(this.extra);
            this.model.setInitOffset(this.extra.offset);
            this.model.setLimit(this.limit);
            this.model.setInitElementsCount(this.initElementsCount);
            if(this.suspended) {
                this.model.setSuspendedMode();
            }

            //this.addListeners = _.once(function(){
            //that.addVentEvent.call(that, AppConsts.EVENT.ARTICLE.CATEGORY_INIT_FILTER, that.onChangeInitFilter);
            this.addVentEvent(AppConsts.EVENT.LIST.PACKET_DATA, this.onPacketData);

            this.addVentEvent(AppConsts.EVENT.ARTICLE.CATEGORY_FILTER, this.onApplyFilter);
            this.addVentEvent(AppConsts.EVENT.COMMON.SEARCH_STRING_UPDATED, this.onSearchFilterChanged);
            this.addVentEvent(AppConsts.EVENT.COMMON.DO_FILTER_SEARCH, this.onDoFilterSearch);
            this.pub(AppConsts.EVENT.LIST.NEED_FILTER);

            if(this.useScroll) {
                that.addVentEvent.call(that, AppConsts.EVENT.SYSTEM.SCROLL, that.onScroll);
                // TODO: check if viewport bigger then list height
                //this.getNext();
            }
            //    require('App').parser.parse(this.$el.find('.js-item'));
            //});
            $.force_appear();
        },

        render: function () {
            ArticleWidgetView.prototype.render.apply(this, arguments);
            this.addListeners();
        },

        getNext: function(){
            this.model.getNext();
        },

        getLastPostYPos: function(){
            if(!this.$el || !(this.$el instanceof $) || !this.$el.length){
                return;
            }
            var off = this.$el.offset();
            return  off.top + this.$el.height() - this.$el.find('.js-item').last().height()*2;
        },

        setPageUrl: function(url){
            //Backbone.history.navigate(url, true);
            require('App').redirect(url, null, true);
            url = "/"+url.replace(/^.+?\..+?\//,'')
            url = url.replace(/\?page=(\d+)/, function(s, num){
                return '?page='+(parseInt(num)+1);
            });
            return url;
        },

        getCurrentUnitIndex: function(){
            var App = require('App');
            var yScroll = App.vars && App.vars.scroll ? App.vars.scroll.y : 0;
            var hWindow = App.vars.windowSize.height;
//console.log("###-PAGE TRY");
            var $elems = this.ui.list.children();
            var bOff = this.ui.list.offset();
            for(var i = 0; i < $elems.length; i++){
                var $el = $($elems[i]);
                var off = $el.offset();
//console.log("###-PAGE "+ bOff.top + " + " +off.top+" + "+$el.height()+" >= "+yScroll+" + "+hWindow);
                if(off.top >= yScroll){
//console.log("###-ELEMENT MATCH: " + $el.index());
                    return $el.index();
                }
            }
            return 0;
        },

        getCurrentPageNumber: function(){
            var index = this.getCurrentUnitIndex() + this.model.initOffset;
//console.log("###-PAGE INDEXES: ", this.getCurrentUnitIndex(), this.model.initOffset);
            var page = Math.floor(index / this.limit) + 1;
//console.log("###-PAGE NO: " + page);
            return page;
        },

        onScroll: function(scroll){
            this.checkScroll(scroll);
        },

        checkScroll: function(scroll){
            if(!this.$el || !(this.$el instanceof $) || !this.$el.length){
                return;
            }
            var App = require('App');
            scroll = scroll || App.vars.scroll;
            var hWindow = App.vars.windowSize.height;
            var yScroll = scroll.y;
            var lastPostY = this.getLastPostYPos();
            var pos = this.$el.offset();
            if(yScroll > lastPostY - hWindow) {
                this.onScrollTouchBottom();
            }else if(yScroll <= pos.top){
                this.onScrollTouchTop();
            }
            this.checkPageNumber();
        },

        checkPageNumber: function(){
            var pageNumber = this.getCurrentPageNumber();
            if(this.pageNumber != pageNumber) {
                var url = Backbone.history.location.pathname + Backbone.history.location.search;
                if(url.indexOf('page=')>-1){
                    if(pageNumber < 2){
                        url = url.replace(/[\?\&]page\=\d+/, '');
                    }else {
                        url = url.replace(/page\=\d+/, 'page=' + pageNumber);
                    }
                }else {
                    url += (pageNumber > 1 ? (url.indexOf('?') > -1 ? "&" : "?") + "page=" + (pageNumber) : "");
                }
                this.setPageUrl(url);
            }
            this.pageNumber = pageNumber;
        },

        getNew: function(){
            this.empty = true;
            this.model.setInitOffset(0);
            this.model.setInitElementsCount(0);
            this.model.getUpdate();
        },

        getByFilter: function (filter) {
            this.getNew();
        },

        onScrollTouchTop: function(){

        },

        onScrollTouchBottom: function(){
            this.getNext();
        },

        onApplyFilter: function(filter){
            this.pub(AppConsts.EVENT.FILTER.GET_FILTER_DATA, (function(data){
                this.model.updateFilter(data);
                this.getNew();
            }).bind(this));
        },

        onDoFilterSearch: function(data){
            this.model.updateFilter(data);
            this.getNew();
        },

        onSearchFilterChanged: function(string){
            var params = string.substring(string.indexOf('?')+1);
            var data = $.getUrlParamsAsObject(params);
            this.model.updateFilter(data);
        },

        onDirectUpdate: function (data) {
        },

        blockClickHandler: function(e, $block, url){

        },

        mainLinkClickHandler: function(e, $block, $target){

        },

        onBlockClick: function (e, $el, url) {
            e.preventDefault();
            this.blockClickHandler(e, $el, url);
        },

        onMainLinkClick: function (e) {
            var $el = $(e.currentTarget);
            if( $el.parents('.js-clickable-block').length ){
                e.preventDefault();
                return;
            }
            this.mainLinkClickHandler(e, $el, $(e.target));
        },

        onNextClick: function(e){
            this.getNext();
        },

        onListChanged: function(model, list){
            if(!list || !list.length){
               this.ui.preloader.hide();
               return false;
            }
            var showed = this.$el.find('.js-item').not('.js-banner-item').length - this.initElementsCount;
            list = list.slice(0, list.length-showed);
            var data = _.extend(
                {
                    list:list
                    ,global: require('App').params
                }
                ,this.model.extraData
            );
            var listHtml = this.listTemplate.render(data);
            var $new = $(listHtml);
            this.ui.list.append($new);
            require('App').parser.parse($new);
            $.force_appear();
            this.checkPageNumber();
            return true;
        },

        onPacketData: function(data){
            if(data.url){
                require('App').redirect(data.url,null,true);
            }
            this.model.setUrls(data.urls);
        },

        onSync: function(model, response){
            if(!this.model.get("remain")){
                this.ui.preloader.hide();
            }
            if(!this.model.nextMode) {
                var url = this.model.get("url");
                require('App').redirect(url, null, true);
            }
            var title = this.model.get("title");
            if(title) {
                require('App').setTitle(title);
            }

            this.pub(AppConsts.EVENT.ARTICLE.LIST_DATA, this.model.toJSON());

            /*if(this.empty){
                this.checkScroll();
            }*/
            this.empty = false;

            /*
            this.render();
            */
        }

    });
    return ListWidgetView;
});