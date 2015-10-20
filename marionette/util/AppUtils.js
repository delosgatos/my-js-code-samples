/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 21.01.2015 18:30
 */


define([
    'jquery'
    ,'underscore'
    ,'helper/AppConsts'
    ,'helper/window'
    ,'helper/TwigHelper'
    ,'service/ApiService'
    ,'service/SocketProxy'
    ,'service/StatisticsProxy'
    ,'service/SocialShareService'
    ,'service/SocialAuthService'
    ,"controller/api/BlamperJSAPIController"
    ,'../../vendor/notify'
    ,'utils'
], function (
    $
    ,_
    ,AppConsts
    ,window
    ,TwigHelper
    ,ApiService
    ,SocketProxy
    ,StatisticsProxy
    , SocialShareService
    , SocialAuthService
    , BlamperJSAPIController
    , Notify
) {

    "use strict";

    var AppUtils = function(App, window){

        var lastRedirect = {};

        App.events = {};
        //App.vent = new Backbone.Wreqr.EventAggregator();
        App.systemEvents = new Backbone.Wreqr.EventAggregator();

        App.desktopNotify = function(title, options){
            var notify = new Notify(title, options);
            if (Notify.needsPermission) {
                Notify.requestPermission(function () {
                    console.log('Permission has been granted by the user');
                    notify.show();
                }, function () {
                    console.warn('Permission has been denied by the user');
                });
            } else {
                notify.show();
            }
            return notify;
        };

        App.callServerApi = function(url, data, options){
            $.ajax(url, _.extend(options || {}, {
                data:data
            }));
        };

        App.systemEvents.on(AppConsts.EVENT.API.CALL, App.callServerApi, this);


        App.vent.on(AppConsts.EVENT.SYSTEM.AFTER_DOM_READY, function(){
            try {
                SocketProxy.init(App);
            }catch(e){
                console && console.error ? console.error(e) : console.log(e);
            }
        });

        App.vent.on(AppConsts.EVENT.SYSTEM.INIT_MODULES_LOADED, function(){
            _.defer(function(){
                StatisticsProxy.init(App.systemEvents);
            });
            _.delay(function(){
                SocialShareService.init();
            }, 1000);
        }, this);

        App.addEventNameSpace = function(namespace){
            App.events[namespace] = new Backbone.Wreqr.EventAggregator();
        };

        App.sendNSEvent = function(namespace, event, param1, param2, param3){
            var vent;
            if(!namespace){
                vent = App.vent;
            }else {
                if (!App.events[namespace]) {
                    console.log('!!!! ERROR: THERE IS NO EVENTSPACE ' + namespace + " to send the event");
                    return null;
                }
                vent = App.events[namespace];
            }
            vent.trigger.apply(vent, [].slice.call(arguments, 1));
        };

        App.onNSEvent = function(namespace, event, callback, context){
            var vent;
            if(!namespace){
                vent = App.vent;
            }else {
                if (!App.events[namespace]) {
                    console.log('!!!! ERROR: THERE IS NO EVENTSPACE ' + namespace + " to subscribe the event");
                    return null;
                }
                vent = App.events[namespace];
            }
            vent.on.apply(vent, [].slice.call(arguments, 1));
        };

        App.offNSEvent = function(namespace, event, callback, context){
            var vent;
            if(!namespace){
                vent = App.vent;
            }else {
                if (!App.events[namespace]) {
                    console.log('!!!! ERROR: THERE IS NO EVENTSPACE ' + namespace + " to unsubscribe the event");
                    return null;
                }
                vent = App.events[namespace];
            }
            vent.off.apply(vent, [].slice.call(arguments, 1));
        };

        App.getEventSpace = function(namespace){
            if(!App.events[namespace]){
                console.log('!!!! ERROR: THERE IS NO EVENTSPACE '+namespace+" to get the space");
                return null;
            }
            return App.events[namespace];
        };

        App.addEventNameSpace("common");
        App.addEventNameSpace("prerender");

        TwigHelper.init();

        App.callApi = ApiService.api;

        App.isMobileDevice = navigator.userAgent.match(/Android|iPhone|iPad|iPod|Windows Phone OS|IEMobile|BlackBerry|SymbianOS|SymbOS|Opera Mini|Opera Mobi|GoBrowser/i);

        App.playSound = function(url){
            var audio = new Audio(url);
            audio.play();
        };

        App.sendAnalytics = function(event){
            if(!event) {
                return false;
            }
            console.log('-=-=-=-=-= analitycs', event);
            StatisticsProxy.sendEvent(event);
            return true;
        };

        App.sendAnalyticsWithRedirect = function(event, url, newWindow){
            this.sendAnalytics(event);
            if(url) {
                if(newWindow){
                    window.open(url, '_blank');
                    return;
                }
                App.redirect(url, null, null, null, 600, true);
            }
        };


        window.Blamper = window.Blamper || {};
        window.Blamper.API = window.Blamper.API || {};
        App.commands.setHandler("App:RegisterExternalAPI:Method", function(methodName, method, context, data){
            console.log("### Register API Method: "+methodName);
            // TODO: rewrite to use different extra data for the same commands
            window.Blamper.API[methodName] = function(a,b){
                return method.apply(context, arguments);
            };
            while(waitingAPICallbacks.hasOwnProperty(methodName) && waitingAPICallbacks[methodName].length){
                App.API[methodName].apply(this, waitingAPICallbacks[methodName][waitingAPICallbacks[methodName].length-1].args);
                delete waitingAPICallbacks[methodName][waitingAPICallbacks[methodName].length-1];
                waitingAPICallbacks[methodName].length--;
            }
        });

        App.API = window.Blamper.API;
        App.APIController = BlamperJSAPIController;

        App.APIController.initialize();

        var waitingAPICallbacks = {};
        App.callAPI = function(methodName, a, b, c, d){
            if(App.API.hasOwnProperty(methodName)){
                return App.API[methodName].call(this, a, b, c, d);
            }else{
                if(!waitingAPICallbacks[methodName]){
                    waitingAPICallbacks[methodName] = [];
                }
                waitingAPICallbacks[methodName].push({args:[a,b,c,d]});
            }
        };

        App.initPopup = function(module, params, id){
            var popup = App.callAPI('getPopup', id);
            if(popup){
                return popup;
            }
            require([module], function(Module){
                var popup = new Module(params, id);
                App.callAPI('addPopup',
                    popup,
                    id
                );
            });
            return null;
        };
        App.showPopup = function(id, params){
            //console.log(App);
            return App.callAPI('showPopup', id, params);
        };

        App.getLocation = function(){
            return window.location;
        };

        var historyTitles = {};

        var _addHistoryTitle = function(url, title){
            if(!historyTitles.hasOwnProperty(url)) {
                historyTitles[url] = title;
            }
        };
        var _addCurrentHistoryTitle = function(){
            _addHistoryTitle(window.location.pathname + window.location.search, window.document.title);
        };
        var _getHistoryTitle = function(url){
            if(!historyTitles.hasOwnProperty(url)) {
                return null;
            }
            return historyTitles[url];
        };
        var _getCurrentHistoryTitle = function(){
            return _getHistoryTitle(window.location.pathname + window.location.search);
        };
        _addCurrentHistoryTitle();

        App.navigateBack = function(){
            window.history.go(-1);
            var url = window.location.href;
            App.vent.trigger(AppConsts.EVENT.SYSTEM.HISTORY_CHANGE, url);
            return url;
        };
        App.newWindow = function(url){
            $("<a>").attr("href", url).attr("target", "_blank")[0].click();
        };
        App.redirect = function(url, hash, noRefresh, title, timeout, showPreloader){

            if(showPreloader){
                setTimeout(function() {
                        $.U.ShowGlobalPreloader();
                    },
                    100
                );
            }
            if(timeout){
                setTimeout(function() {
                        App.redirect(url, hash, noRefresh, title);
                    },
                    timeout
                );
                return;
            }

            lastRedirect = {
                url: window.location.pathname + window.location.search
                ,hash: window.location.hash
                ,noRefresh: noRefresh
                ,title: window.document.title
            };

            if(url === -1){
                window.history.go(-1);
                /*url = lastRedirect.url || window.location.pathname + window.location.search;
                hash = hash || lastRedirect.hash;
                noRefresh = noRefresh || lastRedirect.noRefresh;
                title = title || lastRedirect.title;*/
                return;
            }

            if(!hash && !url && noRefresh) {
                window.location.hash = "empty";
                window.history.pushState("", window.document.title, window.location.pathname
                + window.location.search);
                return;
            }
            if(hash){
                window.location.hash = hash;
            }
            if(!url && !noRefresh){
                window.location.reload();
                return;
            }
            if(noRefresh === "noPush"){
                return;
            }
            if(noRefresh) {
                App.vent.trigger(AppConsts.EVENT.SYSTEM.MANUAL_HISTORY_CHANGE, url);
                if(url) {
                    var params = $.getUrlParamsAsObject(url.replace(/^.*?\?/, ''));
                    window.history.pushState(params, title ? title : window.document.title, url);
                }else{
                    window.history.pushState("", title ? title : window.document.title);
                }
                _.defer(function(){
                    _addCurrentHistoryTitle();
                });
                if(title) {
                    window.document.title = title;
                }
                return;
            }
            /*if(url.indexOf("#") > -1) {
             hash = url.replace(/^.*?\#/,'#');
             window.location.hash = hash;
             }*/
            window.location.assign(url);
        };
        App.setTitle = function(title){
            window.document.title = title;
        };
        App.getUrlParams = function(){
            return {
                url: window.location.href
                ,hash: window.location.hash

            }
        };
        App.encodeQueryString = function(query){
            return encodeURIComponent(query);
        };

        App.storage = {
            set: function(key, val){
                if(_.isString(val) || _.isNumber(val)){
                    localStorage.setItem(key, val);
                    return;
                }
                localStorage.setItem(key, JSON.stringify(val));
            },
            get: function(key, useAsObject){
                var res = localStorage.getItem(key);
                if(!useAsObject){
                    return res;
                }
                return JSON.parse(res);
            }

        };

        App.getModelData = function(modelName, field, callback, context, namespace) {
            if(namespace){
                App.sendNSEvent(namespace, "System:Model:GetDataFrom:" + modelName, field, callback, context);
            }else {
                App.sendNSEvent(null, "System:Model:GetDataFrom:" + modelName, field, callback, context);
            }
        };

        var onFocus = function(){
            App.vars.focused = true;
            App.vent.trigger(AppConsts.EVENT.SYSTEM.WINDOW_FOCUS);
        };
        var onBlur = function(){
            App.vars.focused = false;
            App.vent.trigger(AppConsts.EVENT.SYSTEM.WINDOW_BLUR);
        };
        App.vars.scroll = { y: $(document).scrollTop(), x: $(document).scrollLeft()};
        var onScroll = function(e){
            App.vars.scroll = { y: $(this).scrollTop(), x: $(this).scrollLeft() };
            App.vent.trigger(AppConsts.EVENT.SYSTEM.SCROLL, App.vars.scroll);
        };
        var onClick = function(e){
            var data = {target: e.target, x: e.clientX, y: e.clientY, pageX: e.pageX, pageY: e.pageY };
            App.vent.trigger(AppConsts.EVENT.SYSTEM.CLICK, data);
        };
        var onMouseMove = function(e){
            App.vars.mouse = {x: e.clientX, y: e.clientY, pageX: e.pageX, pageY: e.pageY };
            App.vent.trigger(AppConsts.EVENT.SYSTEM.MOUSE_MOVE, App.vars.mouse);
        };
        var onMouseLeave = function(e){
            App.vent.trigger(AppConsts.EVENT.SYSTEM.MOUSE_LEAVE, e);
        };
        var onMouseEnter = function(e){
            App.vent.trigger(AppConsts.EVENT.SYSTEM.MOUSE_ENTER, e);
        };

        var onNeedRefresh = function(){
            App.redirect();
        };
        App.vent.on(AppConsts.EVENT.SYSTEM.NEED_PAGE_REFRESH, onNeedRefresh);

        App.vent.on(AppConsts.EVENT.AUTH.SOCIAL_AUTH, SocialAuthService.auth);

        App.prefetch = function(url){
            if(_.isArray(url)){
                url.forEach(function(val){
                    App.prefetch(val);
                });
                return;
            }
            var o = document.createElement('object');
            if (navigator.appName.indexOf('Microsoft') === 0) {
                new Image().src = url;
            } else {
                o.data = url;
                o.width  = 0;
                o.height = 0;
                document.body.appendChild(o);
            }
        };

        var prevFocusType = null;
        var $window = $(window);
        $window
            .scroll(onScroll)
            .on("blur focus", function(e) {
                if (prevFocusType != e.type) {   //  reduce double fire issues
                    switch (e.type) {
                        case "blur":
                            onBlur();
                            break;
                        case "focus":
                            onFocus();
                            break;
                    }
                }
                prevFocusType = e.type;
            })
            .on('resize', function(){
                var w = $window.width();
                var h = $window.height();
                App.vars.windowSize = {width: w, height: h};
                App.vent.trigger(AppConsts.EVENT.SYSTEM.RESIZE, w, h);
            })
        ;
        window.addEventListener('popstate', function(e){
            _.defer(function(){
                window.document.title = _getCurrentHistoryTitle();
            });
            App.vent.trigger(AppConsts.EVENT.SYSTEM.HISTORY_CHANGE, window.location.href);
        }, false);

        App.moveScrollToTop = function(){
            $(window.document).scrollTop(0);
        };

/*
        window.addEventListener("popstate", function(){
            debugger;
        }, false);
*/

        $('body')
            .mousemove(onMouseMove)
            .mouseleave(onMouseLeave)
            .mouseenter(onMouseEnter)
            .click(onClick)
        ;

    };

    return AppUtils;
});