/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 14.05.13 16:44
 */

define([
    'abstract/model/AbstractCollection'
    ,'underscore'
    ,'asset/text/system'
    ,'module'
    ,'plugin/Backbone.safesync'
    ,'data.utils'
], function (
    AbstractCollection
    ,_
    ,SystemTexts
    ,module
) {
    "use strict";

    var STATE_IDLE = 0, // no action if no autoRefreshMode
        STATE_WAIT = 1, // in autoRefreshMode waits for next fetch
        STATE_SYNC = 2; // in syncing process

    var AbstractBlamperApiCollection = AbstractCollection.extend({

        state: STATE_IDLE,
        delay: 500,
        autoRefreshMode: false,
        timeout: 0,
        fetchOptions: {},
        lastXHR: null,
        extra: {},

        updatesBlocked: false,
        filter: null,

        getField: function(data, fieldName, type){
            var res;
            if(!data || !fieldName){
                res = null;
            }else if(data.get && typeof data.get == 'function'){
                res = data.get(fieldName);
            }else {
                res = data[fieldName];
            }
            switch(type){
                case 'int':
                    return parseInt(res);
                case 'bool':
                    return res ? true : false;
                case 'float':
                    return parseFloat(res);
                default:
                    return res;
            }
        },

        initialize: function () {
            //console.log("=M= AbstractBlamperApiCollection init");
        },

        setExtra: function(extra){
            this.extra = extra;
        },

        addFilter: function(params){
            if($.hasObject(this.filter, params)){
                return false;
            }
            this.filter = _.extend(this.filter?this.filter:{}, params);
            return true;
        },

        setFilter: function(params){
            if(params == this.filter){
                return false;
            }
            this.filter = params ? params : {};
            return true;
        },

        getExtraParams: function(){
            if(_.isEmpty(this.extra)){
                return "";
            }
            return $.objectToUrlParams(this.extra);
        },

        blockUpdates: function(){
            this.updatesBlocked = true;
        },

        unblockUpdates: function(){
            this.updatesBlocked = false;
        },

        fetch: function(options){
            if(this.state == STATE_SYNC){
                if(options && options.immediate == true && this.lastXHR){
                    this.lastXHR.state();
                }else{
                    return;
                }
            }
            this.state = STATE_SYNC;
            if(!options){
                options = this.fetchOptions;
            }else{
                // TODO: merge to this.fetchOptions
                options = _.extend({}, this.fetchOptions, options);
            }
            //console.log("=M= AbstractBlamperApiCollection fetch: "+JSON.stringify(options));
			this.trigger('fetch');
            this.lastXHR = AbstractCollection.prototype.fetch.call(this, options);
            return this.lastXHR;
        },

        parse: function(data) {
            this.trigger("Response", data);
            //data = AbstractCollection.prototype.parse.apply(this, arguments);
            if(this.updatesBlocked){
                return [];
            }
            if(!data || !_.isNumber(data.status) || !data.hasOwnProperty('response')){
                this.onResponseFail(data);
                return;
            }
            if($.inArray(parseInt(data.status), [404, 500, 501, 502, 503, 504, 505, 506, 507, 509, 510, 511]) != -1){
                this.onResponseError(data.response, data.status);
                return;
            }
            /*if(data.response.code != 0){
                this.onResponseDataError(data.response.code, data.response.data);
                return;
            }*/
            //console.log("=M= AbstractBlamperApiCollection parse: "+JSON.stringify(data.response));
            this.onResponseSuccess(data.response);
            return data.response;
        },

        removeById: function(id){
            var model = this.get(id);
            if(!model){
                return false;
            }
            this.remove(model);
            return true;
        },

        setAutoRefreshMode: function(delay){
            if(delay){
                this.delay = delay;
            }
            this.autoRefreshMode = true;
        },

        setManualRefreshMode: function(){
            this.autoRefreshMode = false;
            if(this.timeout){
                clearTimeout(this.timeout);
                this.timeout = 0;
            }
        },

        checkForAutoRefresh: function(){
            if(this.autoRefreshMode){
                this.state = STATE_WAIT;
                var _this = this;
                this.timeout = setTimeout(function(){
                    _this.timeout = 0;
                    _this.fetch.call(_this);
                } , this.delay);
            }else{
                this.state = STATE_IDLE;
            }
        },
        getChangedModels: function(){
            var changedModels = _.filter(this.models, function(model){
                return model.changedAttributes() !== false;
            });
            return changedModels;
        },
        onResponseSuccess: function(data){
            //console.log("=M= AbstractBlamperApiCollection sync success: "+JSON.stringify(data));
            this.trigger("FetchSuccess", data);
            this.handleFetchSuccess(data);
            this.checkForAutoRefresh();
        },

        onResponseFail: function(data){
            //console.log("=M= AbstractBlamperApiCollection sync fail: "+JSON.stringify(data));

            require('App').logError(SystemTexts.ru.SIGNUP.ERRROR_SERVER_CONNECTION + ': ' + JSON.stringify(data), module.id, new Error());

            this.trigger("FetchFailed", data);
            this.handleFetchFail(data);
            this.checkForAutoRefresh();
        },

        onResponseError: function(status, data){
            console.log("=M= AbstractBlamperApiCollection sync error ["+status+"]: "+JSON.stringify(data));
            this.trigger("FetchError", status, data);
            this.handleFetchError(status, data);
            this.checkForAutoRefresh();
        },

        onResponseDataError: function(code, data){
            //console.log("=M= AbstractBlamperApiCollection response data error ["+code+"]: "+JSON.stringify(data));

            require('App').logError(SystemTexts.ru.SERVER.DATA_ERROR + ' ['+code+']: ' + JSON.stringify(data), module.id, new Error());

            this.trigger("FetchDataError", code, data);
            this.handleFetchDataError(code, data);
            this.checkForAutoRefresh();
        },

        handleFetchSuccess: function(data){

        },

        handleFetchFail: function(data){

        },

        handleFetchError: function(status, data){

        },

        handleFetchDataError: function(code, data){

        }

    });

    return AbstractBlamperApiCollection;

});