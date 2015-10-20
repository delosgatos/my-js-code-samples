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

    var ListSyncCommand = AbstractCommand.extend({

        apiService: null,
        blockNewData: false,

        initialize: function (params) {
            this.apiService = new PacketApiService();
            this.apiService.on(PacketApiService.WIDGET_DATA, this.onWidgetData, this);
            this.apiService.on(PacketApiService.DATA, this.onApiData, this);
            this.initListeners();
        },

        initListeners: function () {
            this.addVentEvent(AppConsts.EVENT.LIST.SET_URL, this.onSetUrl);
            this.addVentEvent(AppConsts.EVENT.LIST.GET, this.onNeedPacket);
            this.addVentEvent(AppConsts.EVENT.LIST.FILTER, this.onFilterChanged);
            this.addVentEvent(AppConsts.EVENT.LIST.INIT_FILTER, this.onFilterInited);
            this.addVentEvent(AppConsts.EVENT.LIST.BLOCK_NEW_DATA, this.onBlockNewData);
            this.addVentEvent(AppConsts.EVENT.LIST.UNBLOCK_NEW_DATA, this.onUnBlockNewData);
        },

        onApiData: function (data) {
console.log('???? ListSyncCommand onApiData', data);
            this.pub(AppConsts.EVENT.LIST.PACKET_DATA, data);
        },

        onWidgetData: function (name, data) {
console.log('???? ListSyncCommand onWidgetData', name, this.blockNewData);
            if(this.blockNewData){
                return;
            }
            this.pub('WIDGET_DATA:'+data.module, data);
        },

        onSetUrl: function (url) {
            if(!this.apiService){
                throw new Error("NO SYNC SERVICE TO GET LIST PACKET");
                return;
            }
            this.apiService.setUrl(url);
        },

        onNeedPacket: function (url, options) {
console.log('???? ListSyncCommand onNeedPacket:', url, this.apiService);
            if(!this.apiService){
                throw new Error("NO SYNC SERVICE TO GET LIST PACKET");
                return;
            }
            this.apiService.getByUrl(url, options);
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
console.log('???? ListSyncCommand SET BLOCK');
            this.blockNewData = true;
        },

        onUnBlockNewData: function () {
console.log('???? ListSyncCommand UNBLOCK');
            this.blockNewData = false;
        }



    });

    return ListSyncCommand;


});