/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 03.03.2015 19:40
 */

define([
    'abstract/model/AbstractWidgetModel'
    ,'settings'
    ,'helper/AppConsts'
], function (
    AbstractWidgetModel
    ,Settings
    ,AppConsts
) {
    "use strict";

    var ArticleWidgetModel = AbstractWidgetModel.extend({

        name: "ArticleWidgetModel",

        host: Settings.API.HOST,
        widgetUrl: '/widget/widgets/...',

        similarFilter: {},


        initialize: function(data, options){
            var result = AbstractWidgetModel.prototype.initialize.apply(this, arguments);
            this.on('DirectUpdate', this.onDirectUpdate, this);
            return result;
        },

        url: function(){
            return this.host + this.widgetUrl;
        },

        toJSON: function(){
            return _.extend(
                _.clone(this.attributes),
                this.extraData,
                {global: require('App').params}
            );
        },

        updateFilter: function(filter){
            this.similarFilter = filter;
        },

        getByFilter:function(filter){
            this.updateFilter(filter);
            this.fetch({
                immediate: true
            });
        },

        getFetchOptions: function(options){
            options = options || {};
            options = _.extend(options, {
                data: {}
            });

            if(!options.noFilter && !_.isEmpty(this.similarFilter)){
                options.data.filter = this.similarFilter;
            }
            return options;
        },

        fetch: function(options){
            options = this.getFetchOptions(options);
            var result = AbstractWidgetModel.prototype.fetch.call(this, options);
            return result;
        },

        parse: function(data){
            data = AbstractWidgetModel.prototype.parse.apply(this, arguments);
            return data;
        },

        onDirectUpdate: function(model, data){

        }

    });

    return ArticleWidgetModel;
});