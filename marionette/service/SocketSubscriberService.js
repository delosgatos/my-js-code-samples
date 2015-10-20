/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 23.04.13 13:01
 */

define([
    'service/SocketProxy'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
], function(
    SocketProxy
   ,_
   ,Settings
   ,AppConsts
) {
    "use strict";


    var SocketSubscriberService = {

        SUBSCRIBE_UPDATES_TYPE_WALL:    "wall",
        SUBSCRIBE_UPDATES_TYPE_FEED:    "feed",
        SUBSCRIBE_UPDATES_TYPE_CLUB:    "clubfeed",
        SUBSCRIBE_UPDATES_TYPE_ARTICLE: "article",
        SUBSCRIBE_UPDATES_TYPE_THEME:   "theme",
        SUBSCRIBE_UPDATES_TYPE_ANSWERS: "themefeed",


        subscribeUpdates: function( postIds, callbacks ){
            this.callbacks = callbacks;
            for(var i in postIds){
                SocketProxy.subscribe(SocketProxy.SUBSCRIBE_ENTITY_POST, postIds[i], [SocketProxy.TYPE_COMMENT_CREATED,SocketProxy.TYPE_COMMENT_REMOVED,SocketProxy.TYPE_POST_CREATED,SocketProxy.TYPE_POST_UPDATED,SocketProxy.TYPE_POST_REMOVED],this.onUpdateMessage);
            }
        },
        onUpdateMessage: function(data){
            console.log("SOCKET SUBSCRIBE UPDATES SUCCEED: "+JSON.stringify(data));
            if(!data || !data.command || !data.object){
                require('App').vent.trigger(AppConsts.EVENT.SOCKET.COMMAND.ERROR, data);
                return;
            }
            require('App').vent.trigger(AppConsts.EVENT.SOCKET.COMMAND.FEED, data.command, data.object, data.data);
        }

    };

    return SocketSubscriberService;
});