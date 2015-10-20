/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 27.05.2015 12:17
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'settings'
], function (
    AbstractItemView
    ,AppConsts
    ,Analytics
    ,Settings
) {

    "use strict";

    var QuestionListHeadView = AbstractItemView.extend({

        events: {
        },

        triggers: {},

        ui: {
            title: 'h1'
            ,count: '.js-question-count'
        },

        views:{

        },
        init: function () {
            this.addVentEvent(AppConsts.EVENT.ARTICLE.LIST_DATA, this.onListData);
        },
        onListData: function (data) {
            if(!data){
                return;
            }
            var title = "";
            if(data.title == 'Форум о '){
                title = 'Вопросы и ответы автовладельцев';
            }else if(data.title == 'Статьи о '){
                title = 'Статьи по ремонту и обслуживанию автомобилей';
            }else {
                title = data.title ? data.title.replace('Форум ', 'Вопросы ') : "";
            }
            if(title) {
                this.ui.title.html(title);
            }
        }

    });

    return QuestionListHeadView;


});