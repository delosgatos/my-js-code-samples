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

    var PacketApiService = AbstractBlamperApiModel.extend({

        name: "PacketApiService",
        host: Settings.API.HOST,
        baseUrl: '',

        showedIds: [],
        showedQuestionIds: [],

        url: function(){
            return this.host + this.baseUrl;
        },

        addShowedId: function(id){
            if(_.indexOf(this.showedIds, id) == -1) {
                this.showedIds.push(id);
            }
        },

        addShowedIds: function(list){
            this.showedIds = _.union(this.showedIds, list);
        },

        addShowedQuestionIds: function(list){
            this.showedQuestionIds = _.union(this.showedQuestionIds, list);
        },

        setUrl:function(url){
            this.baseUrl = url;
        },

        getByUrl:function(url, options){
console.log('???? PacketApiService GET ARTICLE BY URL:', url);
            this.baseUrl = url;
            options = _.extend({
                data: {
                    filter: this.similarFilter
                }
            }, options);
            this.fetch(options);
        },

        processWidgets: function(data){
            for(var i in data){
                this.processWidgetData(i, data[i]);
            }
        },

        processWidgetData: function(name, data){
console.log('???? PacketApiService WIDGET_DATA:', name, data, this.eventNamespace);
            this.trigger(PacketApiService.WIDGET_DATA, name, data);
        },

        fetch: function(options){
            options = AbstractBlamperApiModel.prototype.fetch.apply(this, arguments);
            return options;
        },

        setFilter:function(filter){
            this.similarFilter = filter;
        },

        parse: function(data){
console.log('???? PacketApiService PARSE DATA:', data);
            data = AbstractBlamperApiModel.prototype.parse.apply(this, arguments);
console.log('???? PacketApiService PARSED DATA:', data);
            // TODO: check if filter is not the same
            //this.addShowedId(data.article.id);
            //this.updateSimilarFilter(data.similarFilter);
            this.trigger(PacketApiService.DATA, data);
            if(data.widgets) {
                this.processWidgets(data.widgets);
            }
            return data;
        }

    });

    PacketApiService.WIDGET_DATA = 'WIDGET_DATA';
    PacketApiService.DATA = 'DATA';

    return PacketApiService;
});