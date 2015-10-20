/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 19.03.2015 17:31
 */

define([
    './AbstractBlamperApiModel'
    ,'underscore'
], function (
    AbstractBlamperApiModel
    ,_
) {
    "use strict";

    var AbstractWidgetModel = AbstractBlamperApiModel.extend({

        name: "AbstractWidgetModel",
        widgetName: "AbstractWidget",

        responseParams: {},

        suspended: false,

        cacheResponse: {},
        cacheOptions: {},

        toJSON: function(){
            return _.extend({item: _.clone(this.attributes)}, this.extraData);
        },

        setResponseParams: function(data){
            if(data.extra){
                this.extraData = _.extend(this.extraData, data.extra);
            }
            this.responseParams = data;
        },

        constructor: function () {
            this.widgetName = this.name.replace(/\/[^\/]+?$/,'');
            AbstractBlamperApiModel.prototype.constructor.apply(this, arguments);
console.log('=== ADD WIDGET_DATA EVENT: ', this.widgetName, this.eventNamespace);
            this.addVentEvent('WIDGET_DATA:'+this.widgetName, this.onWidgetData);
            this.addVentEvent('PROCESS_CACHED_DATA', this.onProcessCacheData);
        },
        processCacheData: function(){
            this.onWidgetData(this.cacheResponse, this.cacheOptions, true);
        },
        onProcessCacheData: function(){
            this.processCacheData();
        },
        onWidgetData: function(resp, options, noSuspense){
            if(this.suspended && !noSuspense){
                this.cacheResponse = resp;
                this.cacheOptions = options;
                this.trigger('CACHED_DATA', resp.content, options);
                return;
            }
            var model = this;
            options = _.extend({ pureData:true }, options);
console.log('===== ON WIDGET DATA: ', this.widgetName, this.eventNamespace, options, resp);
            if (!model.set(model.parse(resp, options), options)) return false;
            model.trigger('sync', model, resp, options);
        },

        parse: function(data, options){
            data = AbstractBlamperApiModel.prototype.parse.apply(this, arguments);
            if(!data){
                return null;
            }
            if(data.params) {
                if(data.params.hasOwnProperty('request_data')) {
                    this.setExtraData(data.params.request_data);
                }
                this.setResponseParams(data.params);
            }
            return data.content;
        }
    });

    return AbstractWidgetModel;
});