/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 14.05.13 16:44
 */

define([
    'abstract/model/AbstractModel'
    ,'underscore'
], function (
    AbstractModel
    ,_
) {
    "use strict";
    var STATE_IDLE = 0, // no action if no autoRefreshMode
        STATE_WAIT = 1, // in autoRefreshMode waits for next fetch
        STATE_SYNC = 2; // in syncing process

    var AbstractBlamperApiModel = AbstractModel.extend({

        state: STATE_IDLE,
        delay: 1000,
        autoRefreshMode: false,
        fetchOptions: {},
        directUpdate: false,

        extraData: {},

        constructor : function(params){
            _.bindAll(this
                ,'onResponseFail'
                ,'onSaveSuccess'
                ,'onSaveFail'
                ,'onSaveError'
            );
            return AbstractModel.prototype.constructor.apply(this, arguments);
        },

        initialize: function () {
            //console.log("=M= AbstractBlamperApiModel init");
        },

        resetToDefaults: function(){
            this.clear().set(this.defaults);
        },

        setExtraData: function(data){
            this.extraData = data || {};
        },

        addExtraData: function(data){
            this.extraData = _.extend(this.extraData, data);
        },

        fetch: function(options){
            var that = this;
            console.log("=M= AbstractBlamperApiModel fetch");

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

            options.data = options.data || {};
            options.data = _.extend({}, this.extraData, options.data);

            if(!options["error"]){
                options["error"] = function(data){ that.onResponseFail.apply(that, arguments) };
            }

            this.trigger('fetch', options);

            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                }
            });

            this.lastXHR =  AbstractModel.prototype.fetch.call(this, options);

            return this.lastXHR;
        },

        save: function(attr, options){
            this.state = STATE_SYNC;
            console.log("=M= AbstractBlamperApiModel save");
            /*if(!attr){
                attr = {};
            }*/
            if(!options){
                options = {};
            }
            options["success"] = this.onSaveSuccess;
            options["error"] = this.onSaveFail;

            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                }
            });
            var xhr = AbstractModel.prototype.save.call(this, attr, options);
            /*xhr.always(function(e){
             console.log("LOADING COLLECTION");
             }).fail(function(e){
             console.log("FAILED LOADING COLLECTION");
             });*/
        },

        parse: function(data, options) {
            data = AbstractModel.prototype.parse.apply(this, arguments);
            this.trigger("Response", data);

            if(options && options.pureData){
                this.directUpdate = true;
                this.trigger('DirectUpdate', this, data, options);
                this.onResponseSuccess(data);
                return _.isEmpty(data) ? null : data;
            }

            this.directUpdate = false;

            if(!data || !_.isNumber(data.status) || !data.hasOwnProperty('response')){
                this.onResponseFail(data);
                return;
            }
            if($.inArray(parseInt(data.status), [404, 500, 501, 502, 503, 504, 505, 506, 507, 509, 510, 511]) != -1){
                this.onResponseError(data.response, data.status);
                return;
            }
            if(data.response.errors){
                this.onResponseDataError(data.response.errors);
                return;
            }
            //console.log("=M= AbstractBlamperApiModel parse Success: "+JSON.stringify(data.response));
            this.onResponseSuccess(data.response);
            return _.isEmpty(data.response) ? null : data.response;
        },

        setAutoRefreshMode: function(delay){
            if(delay){
                this.delay = delay;
            }
            this.autoRefreshMode = true;
        },

        setManualRefreshMode: function(){
            this.autoRefreshMode = false;
        },

        checkForAutoRefresh: function(){
            if(this.autoRefreshMode){
                this.state = STATE_WAIT;
                _.debounce(this.fetch, this.delay);
            }else{
                this.state = STATE_IDLE;
            }
        },
        onSaveSuccess: function(model, data, options){
            if(!data || !_.isNumber(data.status) || !data.response){
                model.onSaveFail(model, data, options);
                return;
            }
            if(parseInt(data.status)<0){
                model.onSaveError(model, data.response, options);
                return;
            }
            console.log("=M= AbstractBlamperApiModel save success: "+JSON.stringify(data));
            model.trigger("SaveSuccess", data.response, data.code);
        },

        onSaveFail: function(model, xhr, options){
            console.log("=M= AbstractBlamperApiModel save fail: "+JSON.stringify(xhr));
            model.trigger("SaveFailed", xhr);
        },

        onSaveError: function(model, data, options){
            console.log("=M= AbstractBlamperApiModel save error: "+JSON.stringify(data));
            model.trigger("SaveError", data);
        },

        onResponseSuccess: function(data){
            //console.log("=M= AbstractBlamperApiModel parse success: "+JSON.stringify(data));
            this.trigger("FetchSuccess", data);
            this.handleFetchSuccess(data);
            this.checkForAutoRefresh();
        },

        onResponseFail: function(data){
            console.log("=M= AbstractBlamperApiModel fetch fail: "+JSON.stringify(data));
            this.trigger("FetchFailed", data);
            this.handleFetchFail(data);
            this.checkForAutoRefresh();
        },

        onResponseError: function(status, data){
            console.log("=M= AbstractBlamperApiModel parse error ["+status+"]: "+JSON.stringify(data));
            this.trigger("FetchError", status, data);
            this.handleFetchError(status, data);
        },

        onResponseDataError: function(errors){
            console.log("=M= AbstractBlamperApiModel parse data error: "+JSON.stringify(errors));
            this.trigger("FetchDataError", errors);
            this.handleFetchDataError(errors);
            this.checkForAutoRefresh();
        },

        handleFetchSuccess: function(data){

        },

        handleFetchFail: function(data){

        },

        handleFetchError: function(errors){

        },

        handleFetchDataError: function(code, data){

        }

    });

    return AbstractBlamperApiModel;

});