/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 03.03.2015 19:34
 */


define([
    './SearchView'
    ,'abstract/view/AbstractFormView'
    ,'abstract/model/AbstractModel'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'underscore'
], function (
    SearchView
    ,AbstractFormView
    ,AbstractModel
    ,AppConsts
    ,Analytics
    ,_
) {

    "use strict";

    var SearchFilterView = SearchView.extend({

        events: _.extend({
            'changed' : 'onCarChange',
            'change select[data-field="category"]' : 'changeCategoryInMobileList'
        }, SearchView.prototype.events),

        ui: _.extend({
            carSelectors : 'select[data-field]',
            mobileFilterToggle: '#global-filter-toggle'
        }, SearchView.prototype.ui),

        changeCategoryInMobileList: function(e){
            var $el = $(e.currentTarget).find(':selected');
            this.onCategoryFilterData([
                {
                    'field': "filter[subjects][]",
                    'id': parseInt($el.attr('value')),
                    'sort': 100,
                    'type': "category",
                    'text': $el.text()
                }
            ]);
        },

        init: function(){
            _.bindAll(this
                ,'getApiUrl'
            );
            var that = this;
            $('.js-tag-list', this.$el).on('DOMNodeRemoved', function(){
                setTimeout(function(){
                    that.updateSearchString.call(that);
                }, 300);
            }).on('TagRemoved', this.onTagRemoved.bind(this));
            SearchView.prototype.init.apply(this, arguments);

            this.addVentEvent(AppConsts.EVENT.ARTICLE.CHECK_CATEGORY_FILTER, this.onCategoryFilterData);
            this.addVentEvent(AppConsts.EVENT.FILTER.GET_FILTER_DATA, this.onNeedFilterData);
            this.addVentEvent(AppConsts.EVENT.LIST.NEED_FILTER, this.onListPage);
            this.addVentEvent(AppConsts.EVENT.LIST.SET_TAB_URL, this.onNeedSetUrl);
        },

        getApiUrl: function(){
            var url = SearchView.prototype.getApiUrl.apply(this, arguments);
            var search = this.getTagsDataUrlParams();
            search += (search ? '&' : '') + 'limit=' + this.limit;
            return url + (search ? '?' : '&') + search;
        },

        getTagsDataUrlParams: function(){
            var search = "";
            $('.js-tag-item>input', this.$el).each(function(){
                var $el = $(this);
                var val = $el.val();
                var name = $el.attr('name');
                if(!!~name.indexOf('mark') || !!~name.indexOf('model') || !!~name.indexOf('generation')){
                    name = name.replace('[]','');
                }
                search += "&" + name + "=" + val;
            });
            return search.substring(1);
        },

        getCurrentSearchPageLink: function(){
            var search = this.getTagsDataUrlParams();
            var query = this.ui.search.val();
            if(query){
                search += (search ? '&' : '') + 'query=' + query;
            }
            return this.searchPageUrl + (search ? '?' : '') + search;
        },

        submit: function(){
            SearchView.prototype.submit.apply(this, arguments);

            var params = this.getCurrentSearchPageLink();

            params = params.substring(params.indexOf('?')+1);
            params = $.getUrlParamsAsObject(params);

            this.ui.mobileFilterToggle.removeAttr('checked');


            this.pub(AppConsts.EVENT.COMMON.DO_FILTER_SEARCH, params);
        },

        onNeedSetUrl: function(url){
            this.setUrl(url);
            this.updateSearchString();
        },

        onListPage: function(){
            this.redirectMode = false;
        },

        onTagRemoved: function(e, data){
            var type = data.type;
            if(type != 'category'){
                this.pub(AppConsts.EVENT.CAR.GLOBAL_MMM_UPDATE, {
                    command: 'clear',
                    data: {
                        entity: type
                    }
                });
                /*this.triggerDomNestedModules("UpdateMMM", {
                    command: 'clear',
                    data: {
                        entity: type
                    }
                });*/
                return;
            }
            this.pub(AppConsts.EVENT.COMMON.FILTER_CATEGORY_TAG_REMOVED, data.tag.id);
        },

        onCarChange: function(e, selectEvent){
            var $el = $(selectEvent.currentTarget);
            var i = $el.attr('name');
            var val = $el.val();
            var sort = $el.data('sort');
            var text = $el.find("option:selected").html();
            if(parseInt(val) < 0){
                val = 0;
            }
            this.updateSearchString();
            this.triggerDomNestedModules("NewTagSelected", {
                removeWithType:i
                , data:{
                    type: i
                    , id:   val
                    , text: text
                    , sort: sort
                    , field:"filter[car]["+i+"]"
                }
            });
        },

        onCategoryFilterData: function(data){
            console.log(data);
            var type = "category";
            for(var i in data){
                data[i].type  = type;
                data[i].field = "filter[subjects][]";
            }
            this.triggerDomNestedModules("NewTagSelected", {removeWithType:type, data:data});
        },

        onNeedFilterData: function(callback){
            if(!callback && !_.isFunction(callback)){
                return;
            }
            var params = this.getCurrentSearchPageLink();
            params = params.substring(params.indexOf('?')+1);
            params = $.getUrlParamsAsObject(params);
            callback(params);
        }

    });
    return SearchFilterView;
});