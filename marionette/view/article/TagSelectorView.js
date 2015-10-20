/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.04.2015 17:24
 */

define([
    'abstract/view/AbstractItemView'
    ,'underscore'
    ,'helper/AppConsts'
    ,'settings'
    ,'../../../vendor/jquery.autocomplete'
    ,'../../../vendor/jquery.autosize.input.min'
    ,'utils'
], function (
    AbstractItemView
    ,_
    ,AppConsts
    ,Settings
) {

    "use strict";

    var TagSelectorView = AbstractItemView.extend({

        events: {
            'click':                           'onClick'
        },

        moduleEvents:{
            "NewTagSelected": "onNewTagSelected"
        },

        triggers: {

        },
        ui: {
           input:                               'input[type=text]'
           ,template:                           '.js-template--article-tag'
            /*,resultTemplate:                    '.js-template--tags-dropdown-unit'
            ,linkTemplate:                      '.js-template--tags-dropdown-link'
            ,containerTemplate:                 '.js-template--tags-dropdown-container'*/
        },

        sortingScheme: [
            "mark"
            ,"model"
            ,"generation"
            ,"category"
        ],

        width: 'auto',

        init: function () {

            var that = this;

            this.$el.UTagsAdd(_.extend({ template: this.ui.template.html() }, this.options || {}));

            this.ui.input.autocomplete({

                zIndex: 10,
                minChars: 3,
                dataType: "json",
                deferRequestBy: 100,
                triggerSelectOnValidInput: false,
                preventBadQueries: false,

                appendTo: this.appendToSelector
                            ? (this.appendToSelector == "this"
                                ? this.$el
                                : $(this.appendToSelector, this))
                            : this.ui.input.parent(),
                selectFromListOnly: true,

                serviceUrl: Settings.API.ARTICLE.TAGS,

                resultTemplate: '<div class="b-dropdown-item"><a href="#" class="<%=className%>" data-index="<%=index%>" data-id="<%=result.id%>"><span class="b-dropdown-item-title"><%=result.value%></span></a></div>',

                containerTemplate: '<div class="b-dropdown-wrapper"><div class="<%=containerClass%>"></div></div>',
                containerClass: 'b-dropdown',

                width: this.width,

                /*resultTemplate: this.ui.resultTemplate.html(),
                containerBlock: this.ui.content,
                containerTemplate: this.ui.containerTemplate.html(),*/

                formatResult: function (suggestion, currentValue) {
                    return suggestion;
                },

                transformResult: function(response) {

                    if(response.status > 400
                        || !response.response
                        || !response.response.data
                    ) {
                        // TODO: show error
                        return {
                            query: ""
                            , suggestions: []
                        };
                    }
                    var item, values = [];
                    for(var i in response.response.data.value){
                        item = response.response.data.value[i];
                        values.push({
                            id: item['id']
                            , value: item['name']
                        });
                    }
                    return {
                        query: response.response.data.query
                        ,suggestions: values
                    };
                },

                onSelect: function(suggestion){
                    var $el = $(this);
                    $el.val(suggestion.value);
                    that.$el.addTag({
                        id: suggestion.id
                        ,text: suggestion.value
                    }, $el);
                }

            });
        },

        addTag: function(data){
            if(!data.id || data.id == "0") {
                this.$el.removeTagWithText(data.text);
                this.$el.removeTagWithType(data.type);
                return;
            }
            if(this.$el.getTagsWithText(data.text).length){
                return;
            }
            this.$el.addTag(data);
        },

        sort: function(){
            /*var $tags, type;
            for(var i in this.sortingScheme){
                type = this.sortingScheme[i];
                $tags = this.$el.getTagsWithType(type);
                $tags.UMoveToIndex(i);
            }*/
            this.$el.sortByData();
        },

        onClick: function(e){
            e.preventDefault();
            this.ui.input.focus();
        },

        onNewTagSelected: function(pack){

            var data = pack.data;

            if(pack.removeWithType){
                var $typeTags = this.$el.getTagsWithType(pack.removeWithType);
                if($typeTags.length){
                    $typeTags.remove();
                }
            }

            if(_.isArray(data)){
                for(var i in data){
                    this.addTag(data[i]);
                }
                this.sort();
                return;
            }
            this.addTag(data);
            this.sort();
        }

    });

    return TagSelectorView;
});