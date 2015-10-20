/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 26.03.2015 14:05
 */

define([
    'abstract/controller/AbstractCommand'
    ,'service/PacketApiService'
    ,'helper/AppConsts'
], function (
    AbstractCommand
    ,PacketApiService
    ,AppConsts
) {

    "use strict";

    var InitArticleSyncCommand = AbstractCommand.extend({

        apiService: null,
        blockNewData: false,

        initialize: function (params) {
            this.apiService = new PacketApiService();
console.log('=== WidgetCacheService SUBSCRIBE PacketApiService.WIDGET_DATA', this.eventNamespace);
            this.apiService.on(PacketApiService.WIDGET_DATA, this.onWidgetData, this);
            this.apiService.on(PacketApiService.DATA, this.onApiData, this);
            if(this.eventNamespace) {
                this.initNamespacedListeners();
            }else{
                this.initListeners();
            }
        },

        initListeners: function () {
console.log('WidgetCacheService INIT VENT Listeners:', this.eventNamespace);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.SET_URL, this.onSetUrl);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.GET, this.onNeedPacket);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.SIMILAR_FILTER, this.onFilterChanged);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.SIMILAR_FILTER_ON_START, this.onFilterInited);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.BLOCK_NEW_DATA, this.onBlockNewData);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.UNBLOCK_NEW_DATA, this.onUnBlockNewData);
        },

        initNamespacedListeners: function () {
console.log('WidgetCacheService INIT NS Listeners:', this.eventNamespace);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.GET, this.onNeedPacket);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.SIMILAR_FILTER, this.onFilterChanged);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.SIMILAR_FILTER, this.onFilterChanged, "");
            this.addVentEvent(AppConsts.EVENT.ARTICLE.SIMILAR_FILTER_ON_START, this.onFilterInited, "");
            this.addVentEvent(AppConsts.EVENT.ARTICLE.BLOCK_NEW_DATA, this.onBlockNewData);
            this.addVentEvent(AppConsts.EVENT.ARTICLE.UNBLOCK_NEW_DATA, this.onUnBlockNewData);
        },

        onApiData: function (data) {
            this.pub(AppConsts.EVENT.ARTICLE.PACKET_DATA, data);
        },

        onWidgetData: function (name, data) {
console.log('=== WidgetCacheService onWidgetData', name, this.blockNewData, this.eventNamespace);
            if(this.blockNewData){
                return;
            }
            this.pub('WIDGET_DATA:'+name, data);
        },

        onSetUrl: function (url) {
            if(!this.apiService){
                throw new Error("NO SYNC SERVICE TO GET ARTICLE");
                return;
            }
            this.apiService.setUrl(url);
        },

        onNeedPacket: function (url) {
console.log('WidgetCacheService GET ARTICLE:', url, this.apiService);
            if(!this.apiService){
                throw new Error("NO SYNC SERVICE TO GET ARTICLE");
                return;
            }
console.log('WidgetCacheService GET ARTICLE URL:', url);
            this.apiService.getByUrl(url);
        },

        onFilterChanged: function (filter) {
            if(!this.apiService){
                throw new Error("NO SYNC SERVICE TO SET FILTER");
                return;
            }
            this.apiService.setFilter(filter);
        },

        onFilterInited: function (filter) {
            if(!this.apiService){
                throw new Error("NO SYNC SERVICE TO SET INIT FILTER");
                return;
            }
            this.apiService.setFilter(filter);
        },

        onBlockNewData: function () {
console.log('=== WidgetCacheService SET BLOCK');
            this.blockNewData = true;
        },

        onUnBlockNewData: function () {
console.log('=== WidgetCacheService UNBLOCK');
            this.blockNewData = false;
        }



    });

    return InitArticleSyncCommand;


});