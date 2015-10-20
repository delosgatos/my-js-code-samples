/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.07.13 11:20
 */
define([
    './SocketIOService'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
    ,'data.utils'
], function (
    SocketConnector
    ,_
    ,Settings
    ,AppConsts
) {

    "use strict";

    var SocketProxyError = function(message, type){
        this.name = "SocketProxyError";
        this.message = message || "Socket Proxy Error";
        this.type = type || 0;
    };
    SocketProxyError.prototype = new Error();
    SocketProxyError.prototype.constructor = SocketProxyError;

    var SocketProxy = {


        App: null,

        subscribeStack: [],

        authorized: false,
        firstConnect: true,

        authCallbacks: [],


        subscribeCallbacks: {},


        init: function(App){
            _.bindAll(this
                ,"onConnect"
                ,"onDisconnect"
            );
            this.App = App;
            SocketConnector.initialize(App.params.currentHost, this.onConnect, this.onDisconnect);

            App.vent
                .on(AppConsts.EVENT.SOCKET.CALL, this.onSocketCall.bind(this), this)
                .on(AppConsts.EVENT.SOCKET.SUBSCRIBE, this.onSocketSubscribe.bind(this), this)
            ;
        },

        callSocket: function(functionName, arg1, arg2, arg3, arg4, arg5, arg6){
            debugger;
            /*var args = Array.prototype.slice.call(arguments, 0);
            var self = this;
            if(this.authorized){
                SocketConnector.callSocket.apply(SocketConnector, args);
            }else{
                this.addAuthCallback(function(arg0, arg1, arg2, arg3){
                    SocketConnector.callSocket.apply(self, args);
                });
            }*/
        },

        subscribe: function(entityId, callback, context){
            if(!SocketConnector.socket){
                return false;
            }

            if(this.subscribeCallbacks[entityId] && _.indexOf(this.subscribeCallbacks[entityId], callback) > -1){
                return true;
            }

            if(!this.subscribeCallbacks[entityId]){
                this.subscribeCallbacks[entityId] = [];
            }
            this.subscribeCallbacks[entityId].push(callback);

            var that = this;
            SocketConnector.subscribe(entityId, function(data){
                for(var i in that.subscribeCallbacks[entityId]) {
                    console.log("@@@SOCKET@@@ SUBSCRIBE RESPONSE [no:"+i+"]: ", data);
                    that.subscribeCallbacks[entityId][i].apply(context, arguments);
                }
            });

            return true;
        },

        onSocketCall: function(command, arg1, arg2, arg3, arg4, arg5, arg6){
            this.callSocket.apply(this, arguments);
        },

        onSocketSubscribe: function(entity, callback, context){
            this.subscribe.apply(this, arguments);
        },

        onUserNotification: function(data){
            this.App.vent.trigger(AppConsts.EVENT.SOCKET.USER_NOTIFICATION, data);
        },

        onConnect: function(){
            console.log("@@@SOCKET@@@ PROXY CONNECTED");
            if(!this.App.params || !this.App.params.user || !this.App.params.user.id){
                return;
            }
            this.subscribe(this.App.params.user.id, this.onUserNotification, this);
        },

        onDisconnect: function(){
            console.log("@@@SOCKET@@@ PROXY DISCONNECTED");
        }

    };


    return SocketProxy;
});