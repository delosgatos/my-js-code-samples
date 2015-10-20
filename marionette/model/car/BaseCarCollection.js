/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 18:46
 */

define([
    'backbone'
    ,'abstract/model/AbstractBlamperApiCollection'
    ,'underscore'
    ,'data.utils'
], function (
    Backbone
    ,AbstractBlamperApiCollection
    ,_
) {
    "use strict";


    var BaseCarCollection = AbstractBlamperApiCollection.extend({
        baseUrlTemplate: "",
        baseUrlData: {},
        filter: {},
        model: Backbone.Model,
        url: function() {
            return this.getBaseUrl() + this.getUrlParams();
        },
        getBaseUrl: function(){
            return this.baseUrlTemplate(this.getBaseUrlData());
        },
        getUrlParams: function(){
            var filter = $.objectToUrlParams(this.filter);
            return (filter ? "&" + filter : "");
        },
        setBaseUrl: function(url){
            this.baseUrl = url;
            if(this.baseUrl) {
                this.baseUrlTemplate = _.template(this.baseUrl);
            }
        },

        initialize: function () {
            this.setBaseUrl(this.baseUrl);
        },
        setBaseUrlData: function(data){
            this.baseUrlData = data;
        },
        getBaseUrlData: function(){
            return this.baseUrlData;
        },
        mapServerData: function(data){
            return data;
        },
        parse: function(data) {
            data = AbstractBlamperApiCollection.prototype.parse.apply(this, arguments);
            data = _.values(data.items);
            return this.mapServerData(data);
        }
    });

    return BaseCarCollection;
});