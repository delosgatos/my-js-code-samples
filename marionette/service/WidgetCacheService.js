/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 30.03.2015 18:29
 */

define([
    'helper/AppConsts'
    , 'underscore'
    , 'jquery'
    , 'helper/window'
], function (
    AppConsts
    , _
    , $
    , window
) {

    "use strict";


    var WidgetCacheService = {

        itterationIndex: [],
        cache: {},

        subscribeExport: function(namespace){
            require('App').onNSEvent(namespace, AppConsts.EVENT.SYSTEM.EXPORT_VIEW, this.onExportView, this);
        },

        onExportView: function(name, html, data){

            var itteration = window.location.pathname + window.location.search;

            if(name == 'widgets/article/content/WidgetModel') {
                console.log('WidgetCacheService EXPORT:', itteration, data && data.article ? data.article.title : "");
            }

            var index = _.indexOf(this.itterationIndex, itteration);
            if( index == -1 ) {
                this.itterationIndex.push( itteration );
            }
            this.cache[itteration] = this.cache[itteration] || {};
            var nd = {};
            nd[name] = {
                html: html
                , data: data
            };
            this.cache[itteration] = _.extend(this.cache[itteration], nd);


        },

        getByUrl: function(url){
console.log('WidgetCacheService GET ARTICLE BY URL:', url, 'CACHE: ', this.cache[url]);
            if(!this.hasUrl(url)) {
                return null;
            }
            return this.cache[url];
        },

        getCurrentIndex: function(){
            return _.indexOf(this.itterationIndex, window.location.pathname + window.location.search);
        },

        getCurrent: function(){
console.log('WidgetCacheService GET CURRENT URL CACHE:', window.location.pathname + window.location.search);
            return this.getByUrl(window.location.pathname + window.location.search);
        },

        hasUrl: function(url){
            return !!this.cache[url];
        }


    };

    return WidgetCacheService;
});