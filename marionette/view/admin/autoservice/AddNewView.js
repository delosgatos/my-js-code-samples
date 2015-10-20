/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.04.2015 16:02
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'underscore'
    ,'jquery.autocomplete'
], function (
    AbstractItemView
    ,AppConsts
    ,_
) {

    "use strict";

    var AutoserviceAddNewView = AbstractItemView.extend({


        apiUrl: "/api/autoservice/list/geocode/",

        events: {
            'click .js-dropdown-list li a': 'onClick'
        },

        triggers: {},

        ui: {
            address:                        '.js-field-address'
            ,list:                              '.js-dropdown-list'
            ,content:                           '.js-dropdown-content'
            ,search:                            '.js-search-field'
            ,all:                               '.js-search-link-all'
            ,close:                             '.js-dropdown-close'
            ,dropdownWrapper:                   '.js-dropdown-wrapper'
            ,resultTemplate:                    '#template--search-dropdown-unit'
            ,linkTemplate:                      '#template--search-dropdown-link'

        },

        categoryTemplate: "",


        initialize: function(params) {
            AbstractItemView.prototype.initialize.apply(this, arguments);
        },

        init: function () {
            this.initAutocomplete();
        },

        initAutocomplete: function(){

            var that = this;

            this.ui.address.autocomplete({
                zIndex: 9999,
                width: "100%",
                minChars: 3,
                dataType: "json",
                deferRequestBy: 100,
                triggerSelectOnValidInput: false,
                preventBadQueries: false,
                serviceUrl: this.apiUrl,
                resultTemplate: this.ui.resultTemplate.html(),
                containerClass: 'js-dropdown-list',
                containerBlock: this.ui.content,
                //containerTemplate: this.ui.containerTemplate.html(),
                paramName: "address",

                formatResult: function (suggestion, currentValue) {
                    var data = {
                        title: suggestion.name
                        ,body: suggestion.description
                        ,point: suggestion.point
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
                    that.ui.content.removeClass('hide');
                    var item, list = response.response.data.value;
                    for(var i in list){
                        item = list[i];
                        if(!item.value) {
                            list[i].value = item.name
                        }
                    }
                    return {
                        query: response.response.data.query.address
                        ,suggestions: list
                    };
                },
                onSelect: function(suggestion){
                    //debugger;
                    $(this).val(suggestion.title);
                }
            });

        },

        onClick: function(e){
            e.preventDefault();
            var $el = $(e.currentTarget);
            var title = $el.find('.js-field-title').text();
            var desc = $el.find('.js-field-text').text();
            var point = $el.data('point');
            this.$el.find('[data-field=point0]').val(point[0]);
            this.$el.find('[data-field=point1]').val(point[1]);
            this.ui.address.val(desc +', '+title);
        }

    });

    return AutoserviceAddNewView;


});