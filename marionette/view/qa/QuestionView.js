/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 13.06.13 18:51
 */

define([
    'underscore'
    ,'abstract/view/AbstractItemView'
    ,'view/popup/GetAdvicePopupView'
    ,'settings'
    ,'helper/AppConsts'
    ,'helper/Analytics'
], function (
    _
    ,AbstractItemView
    ,GetAdvicePopupView
    ,Settings
    ,AppConsts
    ,Analytics
) {

    "use strict";

    var QuestionView = AbstractItemView.extend({

        events: {
            'click .js-tags-container':                 'onContainerClick'
            ,'click .js-qa-form-hint-close':            'onFormHintCloseClick'
        },
        ui: {
            submit:                                     '.js-submit-button'
        },

        showPhonePopup: false,

        phonePopup: null,

        init: function () {

            var that = this;

            //this.addVentEvent(AppConsts.EVENT.CAR.SELECTED, this.onCarSelected);

            if(this.showPhonePopup){
                this.phonePopup = new GetAdvicePopupView();
                this.phonePopup.show();
            }


        },


    });

    return QuestionView;
});