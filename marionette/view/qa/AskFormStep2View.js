/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 13.06.13 18:51
 */

define([
    'underscore'
    ,'abstract/model/AbstractValidationModel'
    ,'abstract/view/AbstractItemView'
    ,'settings'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'jquery.autocomplete'
    ,'utils'
    ,'data.utils'
], function (
    _
    ,AbstractValidationModel
    ,AbstractItemView
    ,Settings
    ,AppConsts
    ,Analytics
) {

    "use strict";

    var AskFormStep2View = AbstractItemView.extend({

        events: {
            'click .js-tags-container':                   'onContainerClick'
            ,'click .js-qa-form-hint-close':               'onFormHintCloseClick'
        },
        ui: {
            submit:                                     '.js-submit-button'
        },

        lastParsedLinks: [],


        init: function () {

            var that = this;

            //this.addVentEvent(AppConsts.EVENT.CAR.SELECTED, this.onCarSelected);

        },


    });

    return AskFormStep2View;
});