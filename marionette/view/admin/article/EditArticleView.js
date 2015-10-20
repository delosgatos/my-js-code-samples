/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.04.2015 16:02
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'underscore'
], function (
    AbstractItemView
    ,AppConsts
    ,_
) {

    "use strict";

    var EditArticleView = AbstractItemView.extend({

        events: {
            //'click':                        'onClick'
        },

        triggers: {},

        ui: {
            categoryList:                        '.js-category-field-list'
            ,categoryTemplate:                    '#template--category-field'
        },

        categoryTemplate: "",

        init: function () {
            this.categoryTemplate = _.template(this.ui.categoryTemplate.html());
            this.addVentEvent(AppConsts.EVENT.POPUP.CATEGORY_SELECTED, this.onCategorySelected);
        },

        onCategorySelected: function (id, text) {
            var html = this.categoryTemplate({id:id, name:text});
            this.ui.categoryList.append(html);
        }

    });

    return EditArticleView;


});