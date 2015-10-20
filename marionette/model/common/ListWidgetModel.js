/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 18.05.2015 14:31
 */

define([
    'model/article/ArticleWidgetModel'
    ,'controller/filter/ListSyncCommand'
    ,'helper/AppConsts'
], function (
    ArticleWidgetModel
    ,ListSyncCommand
    ,AppConsts
) {
    "use strict";

    var ListWidgetModel = ArticleWidgetModel.extend({


        responseParams:{
            totalCount: undefined,
            remain: undefined
        },

        nextMode: false,

        initOffset: 0,
        initElementsCount: 0,

        limit: 10,

        packetUrl: '/auto/all/',

        suspended: false,

        setUrls: function(urls){
            this.urls = urls;
        },
        getUrls: function(){
            return this.urls;
        },
        setLimit: function(limit){
            this.limit = limit;
        },
        setInitOffset: function(offset){
            this.initOffset = offset;
        },
        setInitElementsCount: function(offset){
            this.initElementsCount = offset;
        },
        setSuspendedMode: function(){
            this.suspended = true;
        },

        getNext:function(){
            if(this.responseParams.remain === 0 && (this.responseParams.totalCount || this.responseParams.totalCount === 0) ){
                return;
            }
            this.nextMode = true;
            this.fetch({noFilter:true});
            //var options = this.getFetchOptions();
            //this.pub(AppConsts.EVENT.LIST.GET, this.url , options);
        },

        getFetchOptions: function(options){
            options = options || {};
            options = _.extend(options, {
                data: {}
            });

            if(!options.noFilter && !_.isEmpty(this.similarFilter)){
                options.data = _.extend({}, this.similarFilter, options.data);
            }
            var list = this.get('list');
            if(this.suspended){
                options.data.offset = 0;
            }else {
                options.data.offset = this.initOffset + this.initElementsCount + (list && list.length ? list.length : 0);
            }
            options.data.limit = this.limit;
            return options;
        },

        updateFilter: function(filter){
            ArticleWidgetModel.prototype.updateFilter.apply(this, arguments);
            this.pub(AppConsts.EVENT.LIST.FILTER, filter);
        },

        getUpdate:function(){
            console.log('|||||||| GET UPDATE LIST ');
            this.nextMode = false;
            var options = this.getFetchOptions();
            this.pub(AppConsts.EVENT.LIST.GET, this.packetUrl , options);
        },

        getByFilter:function(filter){
            this.updateFilter(filter);
            this.getUpdate();
        },

        setUrl: function(url){
            this.packetUrl = url;
            this.pub(AppConsts.EVENT.LIST.SET_URL, this.packetUrl);
        },

        initialize: function(){
            var packetApi = new ListSyncCommand();
            this.setUrl(this.packetUrl);
            ArticleWidgetModel.prototype.initialize.apply(this, arguments);
        },

        parse: function(data){
            data = ArticleWidgetModel.prototype.parse.apply(this, arguments);
            if(!data){
                return data;
            }
            //data = data.response.widgets.BaseList.content;
            if(data.list){
                data.list = _.values(data.list);
            }
            if(this.nextMode) {
                if (data.list && data.list.length) {
                    var list = this.get('list') || [];
                    this.set('list', data.list.concat(list));
                }
                delete data.list;
            }else{
                this.clear();
            }
            return data;
        },

        onDirectUpdate: function(model, data){
            //this.nextMode = false;
        }

    });

    return ListWidgetModel;
});
