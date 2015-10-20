/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'backbone'
    ,'abstract/model/AbstractBlamperApiCollection'
    ,'view/form/BasicSelectorView'
    ,'abstract/view/AbstractItemView'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
], function (
    Backbone
    ,AbstractBlamperApiCollection
    ,BasicSelectorView
    ,AbstractItemView
    ,_
    ,Settings
    ,AppConsts
) {

    "use strict";

    var DiscussionCategoryCollection = AbstractBlamperApiCollection.extend({
        baseUrl: Settings.API.ADMIN.ARTICLE.CATEGORIES,
        url: function(){
            var url = this.baseUrl + this.categoryId;
            return url;
        },
        categoryId: 0,
        initialize: function(data, params){
            if(!params){
                return;
            }
            if(params.id){
                this.categoryId = params.id;
            }
        },
        fetchById: function(id){
            this.categoryId = id;
            this.fetch({reset:true});
        },
        parse: function(data){
            var data = AbstractBlamperApiCollection.prototype.parse.apply(this, arguments);
            return data;
        }
    });

    var DiscussionCategoryPopupView = AbstractItemView.extend({

        content: {},

        events:{
            'submit form':                  'onSubmit'
            ,'click .js-submit-button':        'onSubmitClick'
            //,'change select':               'onSelectorChange'
        },

        ui: {
            form:                           'form'
            ,submit:                        '.js-submit-button'
            ,container:                     '.category-list'
            ,template:                      '#template--category'
        },

        selectorTemplate:                   "",
        categoryViews:                      [],

        initialize: function (params) {
            _.bindAll(this
                ,'onSelectorChange'
            );
            AbstractItemView.prototype.initialize.apply(this, arguments);
        },

        init: function () {
            AbstractItemView.prototype.init.apply(this, arguments);
            this.selectorTemplate = this.ui.template.html();
            this.categoryViews = [];
            this.addCategory(0);
        },

        addCategory: function(id){
            var view, $el, $select;
            // TODO: use selector view from cache
            /*if(this.categoryViews.hasOwnProperty(id)){
                view = this.categoryViews[id];
                $el = view.$el.closest('.select-block').appendTo(this.ui.container);
                $select = $el.find("select");
                view.selectElementByIndex(0);
            }else{*/
                $el = $(this.selectorTemplate);
                this.ui.container.append($el);
                //$el.css({visibility:'hidden'});
                $el.addClass("select-block");
                $select = $el.find("select");
                $select.attr("data-id", id);
                view = new BasicSelectorView({
                    collection: new DiscussionCategoryCollection()
                    ,el: $select
                    ,templateId: 'categorySelector'
                });
                view.collection.fetchById(id);
                view.on("updated", this.onSelectorUpdated, this);
                this.categoryViews[id] = view;
            //}
            $select.on("changed", this.onSelectorChange);
        },

        onSelectorUpdated: function(objects){
            //objects.view.$el.closest('.select-block').css({visibility:'visible'});
            if(!objects.collection.length){
                objects.view.$el.closest('.select-block').remove();
            }
        },

        onSelectorChange: function(e){
            var $el = $(e.currentTarget);
            var id = parseInt($el.val());

            var nested = $el.find(':selected').data("nested");

            // TODO: move to blamper.ui

            this.ui.container.children().find('.f_text').css({background:'#fff'});

            $el = $el.closest('.select-block');
            var $select;
            var $next;
            while($el.next().length){
                $next = $el.next();
                $select = $next.find("select");
                $select.off("change", this.onSelectorChange);
                $next.remove();
            }

            //this.$el.find([data-id=id])

            if(/*!nested || */!id || id<0){
                return;
            }
            this.addCategory(id);
        },

        onSubmit: function(e){
            e.preventDefault();

            var $last = this.ui.container.children().last(),
				$cat = $last.find("select"),
				id = parseInt( $cat.val() ),
				notInList = false;

            if(!id){
                var $prev = $last.prev();
                if(!$prev.length){
					$last.find('.f_text').css({background:'#fdc'});
					return;
                } else {
					$cat = $last.prev().find("select");
					id = parseInt( $cat.val() );
				}
            }
            this.pub(AppConsts.EVENT.POPUP.CATEGORY_SELECTED
                , id
                , $cat.find("option:selected").text()
                , notInList
            );

        },

        onSubmitClick: function(e){
            e.preventDefault();
            this.ui.form.submit();
        },

        onGetSuccess: function(data){
            if(!_.isNumber(data.code) || !data.data){
                this.onGetFailed(data);
                return;
            }else if(data.code != 0){
                this.handleError(data.code, data.data);
                return;
            }
            //console.log("-V- DiscussionCategoryPopupView Get Success: "+JSON.stringify(data));
            this.handleSuccess(data.data);
        },
        onGetFailed: function(data){
            //console.log("-V- DiscussionCategoryPopupView Get Failed: "+JSON.stringify(data));
        },
        handleError: function(code, data){
            //console.log("-V- DiscussionCategoryPopupView Get Error ["+code+"]: "+JSON.stringify(data));
            var status = parseInt(data.code);
            if(code == 1){

            }
        },
        handleSuccess: function(data){
            this.hide();
            if(data.url){
                require('App').redirect(data.url);
            }
        }
    });

    return DiscussionCategoryPopupView;
});