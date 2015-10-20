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

    var ArticleModel = AbstractBlamperApiModel.extend({

        name: "ArticleModel",
        host: Settings.API.HOST,
        baseUrl: '/auto/a/b/s/wiki/asd-7858#',

        similarFilter: {},

        showedIds: [],
        showedQuestionIds: [],

        url: function(){
            return this.host + this.articleUrl;
        },
        initialize: function () {
            console.log("=M= ArticleModel init");
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

        getByUrl:function(url, data){
            data = data || {};
            this.articleUrl = url;
            var options = {
                data: _.extend({
                    filter: this.similarFilter
                }, data)
            };
            this.fetch(options);
        },

        setSimilarFilter: function(filter){
            this.similarFilter = filter;

            if(_.isArray(this.similarFilter.exclude_article_id)) {
                this.addShowedIds(this.similarFilter.exclude_article_id);
            }
            if(this.showedIds) {
                this.similarFilter.exclude_article_id = this.showedIds;
            }

            if(_.isArray(this.similarFilter.exclude_question_id)) {
                this.addShowedQuestionIds(this.similarFilter.exclude_question_id);
            }
            if(this.showedQuestionIds) {
                this.similarFilter.exclude_question_id = this.showedQuestionIds;
            }
            this.pub(AppConsts.EVENT.ARTICLE.SIMILAR_FILTER_ON_START, filter);
        },

        updateSimilarFilter: function(filter){

            this.similarFilter = filter;

            if(_.isArray(this.similarFilter.exclude_article_id)) {
                this.addShowedIds(this.similarFilter.exclude_article_id);
            }
            if(this.showedIds) {
                this.similarFilter.exclude_article_id = this.showedIds;
            }

            if(_.isArray(this.similarFilter.exclude_question_id)) {
                this.addShowedQuestionIds(this.similarFilter.exclude_question_id);
            }
            if(this.showedQuestionIds) {
                this.similarFilter.exclude_question_id = this.showedQuestionIds;
            }

            this.pub(AppConsts.EVENT.ARTICLE.SIMILAR_FILTER, filter);
        },

        fetch: function(options){
            options = AbstractBlamperApiModel.prototype.fetch.apply(this, arguments);
            return options;
        },
        parse: function(data){
            data = AbstractBlamperApiModel.prototype.parse.apply(this, arguments);
            // TODO: check if filter is not the same
            this.addShowedId(data.article.id);
            this.updateSimilarFilter(data.similarFilter);
            return data.article;
        }
    });

    return ArticleModel;
});