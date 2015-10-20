/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.07.13 11:20
 */
define([
    'plugin/SocketConnector'
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

    var SESSION_KEY                     = 'pirojok',
        SOCKET_AUTH_FAIL_KEY            = "socket_auth_fail"
    ;

    var SocketProxyError = function(message, type){
        this.name = "SocketProxyError";
        this.message = message || "Socket Proxy Error";
        this.type = type || 0;
    };
    SocketProxyError.prototype = new Error();
    SocketProxyError.prototype.constructor = SocketProxyError;

    var SocketProxy = {

        ERROR_DEFAULT:              0,
        ERROR_AUTH_FAIL:            1,
        ERROR_AUTH_FATAL_FAIL:      2,

        SUBSCRIBE_ENTITY_WALL:      'wall',
        SUBSCRIBE_ENTITY_USER:      'user',
        SUBSCRIBE_ENTITY_CLUB:      'club',
        SUBSCRIBE_ENTITY_THEME:     'theme',
        SUBSCRIBE_ENTITY_QUESTION:  'qa',
        SUBSCRIBE_ENTITY_POST:      'post',
        SUBSCRIBE_ENTITY_ANSWER:    'answer',
        SUBSCRIBE_ENTITY_FEED:      'feed',
        SUBSCRIBE_ENTITY_STREAM:    'stream',

        TYPE_POST_CREATED:          'PSTCRTD',
        TYPE_POST_UPDATED:          'PSTUPD',
        TYPE_POST_REMOVED:          'PSTRMVD',
        TYPE_COMMENT_CREATED:       'CMMNTCRTD',
        TYPE_COMMENT_REMOVED:       'CMMNTRMVD',

        TYPE_THEME_CREATED:         'THMCRTD',
        TYPE_THEME_UPDATED:         'THMUPD',
        TYPE_ANSWER_CREATED:        'ANSWCRTD',

        TYPE_MESSAGE:               'MSG',
        /** LEGACY */
        TYPE_FRIENDSHIP_REQUEST:    'FRNDOFFRD',
        TYPE_FRIENDSHIP_APPROVED:   'FRNAPRD',

        TYPE_WHOISFASTER_INVITED:   'WHFSTINV',
        TYPE_WHOISFASTER_CONFIRMED: 'WHFSTCFD',
        TYPE_CLUB_INVITED:          'CLBINV',

        TYPE_BEST_ANSWER:           'BSTANSW',

        CHANNEL_MESSAGE:            'msg',
        CHANNEL_FRIEND:             'fr',
        CHANNEL_BASE:               '',

        subscribeStack: [],

        authorized: false,
        firstConnect: true,

        authCallbacks: [],

        getSubscribeFromStack: function(entity, entityId, type, callback){
            var u;
            for(var i in this.subscribeStack){
                u = this.subscribeStack[i];
                if(u.entity == entity
                    && (!entityId || u.entityId == entityId)
                    && u.type == type
                    && u.callback == callback
                    /*&& u.callback.toString() == callback.toString()*/
                ){
                    return u;
                }
            }
            return null;
        },

        getSubscribesFromStack: function(type, entity, entityId){
            var u, result = [];
            // TODO: add logic with * wildcard
            for(var i in this.subscribeStack){
                u = this.subscribeStack[i];
                if(u.entity == entity
                    && (!entityId || u.entityId == entityId)
                    && u.type == type
                ){
                    result.push(u);
                }
            }
            return result;
        },

        addToSubscribeStack: function(entity, entityId, types, callback){
            var u;
            if(_.isString(types)){

                u = {
                    entity:     entity,
                    entityId:   entityId,
                    callback:   callback,
                    type:       types,
                    subscribed: false
                };
                if(this.isSubscribeExist(u)){
                    return;
                }
                this.subscribeStack.push(u);
                return [u];
            }
            var us = [];
            for(var i in types){
                u = {
                    entity:     entity,
                    entityId:   entityId,
                    callback:   callback,
                    type:       types[i],
                    subscribed: false
                };
                if(this.isSubscribeExist(u)){
                    return;
                }
                this.subscribeStack.push(u);
                us.push(u);
            }
            return us;
        },

        start: function(){
            _.bindAll(this
                ,'onReady'
                ,'onAuth'
                ,'onResponse'
            );
            SocketConnector.initialize(Settings.api.blamper.socket.url, this.onReady);
            require('App').vent
                .on(AppConsts.COMMAND.SOCKET.CALL, this.onSocketCall, this)
                .on(AppConsts.COMMAND.SOCKET.SUBSCRIBE, this.onSocketSubscribe, this)
            ;
        },

        removeSession: function(){
            $.setCookie(SESSION_KEY, null, {path: "/"});
        },

        auth: function(){
            var session = $.getCookie(SESSION_KEY);
            SocketConnector.socket.authenticate(session, this.onAuth);
        },

        callSocket: function(functionName, arg1, arg2, arg3, arg4, arg5, arg6){
            var args = Array.prototype.slice.call(arguments, 0);
            var self = this;
            if(this.authorized){
                SocketConnector.callSocket.apply(SocketConnector, args);
            }else{
                this.addAuthCallback(function(arg0, arg1, arg2, arg3){
                    SocketConnector.callSocket.apply(self, args);
                });
            }
        },
        addAuthCallback: function(cb){
            if(this.authCallbacks.length && _.indexOf(this.authCallbacks, cb) > -1){
                return false;
            }
            this.authCallbacks.push(cb);
            return true;
        },
        callAuthCallbacks: function () {
            var f;
            for(var iAC in this.authCallbacks){
                f = this.authCallbacks[iAC];
                if(!f || !_.isFunction(f)) {
                    continue;
                }
                f.call(this);
            };
        },
        onSocketCall: function(command, arg1, arg2, arg3, arg4, arg5, arg6){
            this.callSocket.apply(this, arguments);
        },
        onSocketSubscribe: function(entity, entityId, types, callback, channel){
            this.subscribe.apply(this, arguments);
        },
        onReady: function(remote, firstConnect){
            this.firstConnect = firstConnect;
            var u;
            for(var iSS in this.subscribeStack) {
                u = this.subscribeStack[iSS];
                u.subscribed = false;
            }
            this.auth();
        },

        onAuth: function(err, data){
            if(err === false){

                this.removeSession();

                var tries = $.getCookie(SOCKET_AUTH_FAIL_KEY) || 0;
                if(!tries) {
                    $.setCookie(SOCKET_AUTH_FAIL_KEY, ++tries);
                    throw new SocketProxyError(
                        "!!! WEBSOCKET AUTHORIZATION ERROR: "+JSON.stringify(data)
                        ,this.ERROR_AUTH_FAIL
                    );
                }else{
                    $.setCookie(SOCKET_AUTH_FAIL_KEY, ++tries);
                    throw new SocketProxyError(
                        "!!! WEBSOCKET AUTHORIZATION FATAL ERROR: "+JSON.stringify(data)
                        ,this.ERROR_AUTH_FATAL_FAIL
                    );
                    return;
                }
                require('App').vent.trigger(AppConsts.EVENT.SYSTEM.NEED_PAGE_REFRESH);
                return;
            }
            console.log("*** WEBSOCKET PROXY AUTHORIZED! ***");
            this.authorized = true;
            this.callAuthCallbacks();
            this.subscribeFromStack();
        },

        subscribeFromStack: function(){
            var self = this, u;
            for(var i in this.subscribeStack){
                u = this.subscribeStack[i];
                if(u.subscribed || this.isEntitySubscribed(u.entity, u.entityId)){
                    continue;
                }
                this.socketSubscribe(u.entity, u.entityId, this.onResponse);
                u.subscribed = true;
            }
        },

        isSubscribeExist: function(subscribeObject){
            var u;
            for(var iSS in this.subscribeStack){
                u = this.subscribeStack[iSS];
                if(u.entity == subscribeObject.entity
                   && u.entityId == subscribeObject.entityId
                   && u.type == subscribeObject.type
                   && u.callback == subscribeObject.callback
                ){
                    return true;
                }
            }
            return false;
        },

        isEntitySubscribed: function(entity, entityId){
            var u;
            //console.log("check subscribe stack length: "+this.subscribeStack.length);
            for(var iSS in this.subscribeStack){
                u = this.subscribeStack[iSS];
                //console.log("check subscribe: "+ u.entity+"."+ u.entityId+ " == "+entity+"."+ entityId);
                if(u.entity == entity
                   && u.entityId == entityId
                   && u.subscribed
                ){
                    return true;
                }
            }
            return false;
        },

        subscribe: function(entity, entityId, types, callback, channel){
            var self = this;
            if(entityId !== null) {
                entityId = (channel ? (channel + ".") : "") + entityId;
            }
            var subs = this.addToSubscribeStack(entity, entityId, types, callback);

            console.log("@@@SOCKET@@@ try subscribe: "+SocketConnector.socket+" | "+this.authorized+" | "+this.isEntitySubscribed(entity, entityId)+" | ["+entity+"."+ entityId+"] ");

            if(!SocketConnector.socket || !this.authorized){
                return;
            }
            if(this.isEntitySubscribed(entity, entityId)){
                return;
            }
            for(var iS in subs){
                subs[iS].subscribed = true;
            }
            this.socketSubscribe(entity, entityId, this.onResponse);
        },

        socketSubscribe: function(entity, entityId, onResponse){
            console.log("@@@SOCKET@@@ PROXY SUBSCRIBE: "+entity+"."+ entityId);
            var channel = entityId !== null ? entity + "." + entityId : entity;
            SocketConnector.socket.subscribe(channel, onResponse);
        },

        onResponse: function(msg){
            var key = String(msg.routing_key);
            //var entity = key.split('.');
            var dot = key.indexOf('.');
            if(dot > -1) {
                var entity = key.substring(0, dot);
                var entityId = key.substring(dot + 1);
            }else{
                var entity = key;
                var entityId = null;
            }

            console.log("@@@SOCKET@@@ RESPONSE ["+entity+"."+entityId+"]: "+JSON.stringify(msg));

            var subs = this.getSubscribesFromStack(msg.type, entity, entityId);
            if(!subs || !subs.length){
                return;
            }
            for(var iS in subs){
                subs[iS].callback(msg);
            }
        }

    };


    return SocketProxy;
});