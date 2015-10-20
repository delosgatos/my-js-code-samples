/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 03.03.2015 19:40
 */

define([
    'abstract/model/AbstractBlamperApiModel'
    ,'settings'
    ,'helper/AppConsts'
    ,'underscore'
], function (
    AbstractBlamperApiModel
    ,Settings
    ,AppConsts
    ,_
) {
    "use strict";

    var UnderArticleWidgetModel = AbstractBlamperApiModel.extend({

        name: "ArticleModel",
        host: Settings.API.HOST,
        widgetUrl: 'widget/widgets/...',

        url: function(){
            return this.host + this.widgetUrl;
        },
        initialize: function () {
            console.log("=M= ArticleModel init");
        },

        toJSON: function(){
            return _.extend( _.clone(this.attributes), this.extraData);
        },

        getByFilter:function(data){
            var options = {
                data: data
            };
            this.fetch(options);
        },

        fetch: function(options){
            options = AbstractBlamperApiModel.prototype.fetch.apply(this, arguments);
            return options;
        },
        parse: function(data){
            data = AbstractBlamperApiModel.prototype.parse.apply(this, arguments);
            return data.content;
        }
    });

    return UnderArticleWidgetModel;
});