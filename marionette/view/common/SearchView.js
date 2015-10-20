/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 27.10.2014 13:35
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'settings'
    ,'asset/template/twig/SearchDropdown.twig'
    ,'jquery.autocomplete'
    ,'jquery.form'
    ,'data.utils'
], function (
    AbstractItemView
   ,AppConsts
   ,Analytics
   ,Settings
    ,SearchDropdownTemplate
) {

    "use strict";


    var SearchView = AbstractItemView.extend({

        limit: 5,

        searchPageUrl: '/auto/all/',

        events: {
            'click .js-submit-button':              'onSubmitClick'
            ,'click .js-dropdown-close':            'onCloseClick'
            ,'click .js-dropdown-list a':           'onResultClick'
            ,'click .js-search-link-all':           'onAllResultsClick'
            //'click focus .js-search-input':       'onFocus'
           ,'keyup .js-search-field':               'onSearchStringChanged'
           ,'keydown .js-search-field':             'onSearchKeyDown'
        },

        triggers: {},

        ui: {
            button:                             '.js-submit-button'
            ,list:                              '.js-dropdown-list'
            ,content:                           '.js-dropdown-content'
            ,search:                            '.js-search-field'
            ,all:                               '.js-search-link-all'
            ,close:                             '.js-dropdown-close'
            ,dropdownWrapper:                   '.js-dropdown-wrapper'
            ,resultTemplate:                    '#template--search-dropdown-unit'
            ,linkTemplate:                      '#template--search-dropdown-link'
            //,containerTemplate:                 '#template--search-dropdown-container'
        },


        redirectMode: true,


        setUrl: function(url){
            this.searchPageUrl = url;
        },

        getApiUrl: function(){
            return Settings.API.HOST + Settings.API.COMMON.SEARCH;
        },

        getCurrentSearchPageLink: function(){
            var search = this.ui.search.val();
            return this.url + '?query='+search;
        },

        initialize: function(params) {
            var dropdown = SearchDropdownTemplate.render(params);
            this.ui.dropdownWrapper = this.$el.find('.js-dropdown-wrapper');
            if (this.ui.dropdownWrapper.length){
                this.ui.dropdownWrapper.append(dropdown);
            }else{
                this.$el.append(dropdown);
            }
            AbstractItemView.prototype.initialize.apply(this, arguments);
        },

        init: function () {
            this.initAutocomplete();
        },

        initAutocomplete: function(){

            this.ui.search.autocomplete({
                zIndex: 9999,
                width: "100%",
                minChars: 3,
                dataType: "json",
                deferRequestBy: 100,
                triggerSelectOnValidInput: false,
                preventBadQueries: false,
                serviceUrl: this.getApiUrl,
                resultTemplate: this.ui.resultTemplate.html(),
                containerClass: 'js-dropdown-list',
                containerBlock: this.ui.content,
                //containerTemplate: this.ui.containerTemplate.html(),

                formatResult: function (suggestion, currentValue) {
                    var data = {
                        title: suggestion.title && suggestion.title.length ? suggestion.title[0].replace(/\[highlight\](.*?)\[\/highlight\]/gi, '<strong>$1<\/strong>') : suggestion.title
                        ,body: suggestion.body && suggestion.body.length ? suggestion.body[0].replace(/\[highlight\](.*?)\[\/highlight\]/gi, '<strong>$1<\/strong>') : suggestion.body
                        ,url: suggestion._url
                    };
                    return data;
                },
                transformResult: function(response) {

                    if(response.status > 400
                        || !response.response
                    ) {
                        // TODO: show error
                        return {
                            query: ""
                            , suggestions: []
                        };
                    }
                    var item;
                    for(var i in response.response.list){
                        item = response.response.list[i];
                        if(!item.value) {
                            response.response.list[i].value = item.title && item.title.length ? item.title[0].replace(/\[highlight\](.*?)\[\/highlight\]/gi, '$1') : item.title
                        }
                    }

                    return {
                        query: response.response.query
                        ,suggestions: response.response.list
                    };
                },
                onSelect: function(suggestion){
                    $(this).val(suggestion.title);
                }
            });

        },

        updateSearchString: function(){
            var url = this.getCurrentSearchPageLink();
            if(url == this.ui.button.attr('href')){
                return;
            }
            this.ui.all.find('a').attr('href', url);
            this.ui.button.attr('href', url);
            this.pub(AppConsts.EVENT.COMMON.SEARCH_STRING_UPDATED, url);
        },

        onResultClick: function (e) {
            e.preventDefault();
            var $el = $(e.currentTarget);
            var url = $el.attr('href') || $el.data('href');
            require('App').sendAnalyticsWithRedirect(Analytics.V2.SEARCH.PREVIEW_RESULT_CLICK , url);
        },

        onCloseClick: function (e) {
            e.preventDefault();
            this.ui.content.hide();
        },

        onSearchStringChanged: function (e) {
            this.updateSearchString();
        },

        onSearchKeyDown: function (e) {
            var keycode = e.keyCode ? e.keyCode : e.which;
            console.log("searchview keydown: ", keycode);
            if (keycode == 13){
                this.submit();
                return;
            }
        },

        onSubmitClick: function (e) {
            e.preventDefault();
            this.submit();
        },

        onAllResultsClick: function (e) {
            e.preventDefault();
            this.submit();
        },

        submit: function(){
            var $form = this.ui.search.parents('form');
            if($form.length) {
                require('App').sendAnalytics(Analytics.V2.SEARCH.ALL_RESULTS);
                setTimeout(function(){
                    $form.trigger('submit');
                }, 300);
                return;
            }
            //var url = 'https://blamper.ru/search/base?query='+search;
            var url = this.getCurrentSearchPageLink();
            // TODO: pub with callback set variable, on timeout check some flag and do redirect if no flag
            //this.pub();
            if(this.redirectMode){
                require('App').sendAnalyticsWithRedirect(Analytics.V2.SEARCH.ALL_RESULTS, url);
                return;
            }
            require('App').sendAnalytics(Analytics.V2.SEARCH.ALL_RESULTS);
        }

    });

    return SearchView;


});