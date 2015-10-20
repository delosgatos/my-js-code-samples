/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'backbone'
    ,'abstract/view/popup/FormPopupView'
    ,'jquery'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
    ,'utils'
], function (
    Backbone
    ,FormPopupView
    ,$
    ,_
    ,Settings
    ,AppConsts
) {

    "use strict";


    var GetAdvicePopupView = FormPopupView.extend({

        url: '/api/auto/qa/phone',

        templateDataAssetId:                   'getAdvice',

        events:{
            'submit form':                     'onSubmit'
        },

        triggers: {
        },

        ui: {
            form:                               'form'
            ,submit:                            '.js-submit-button'
            ,phone:                             '[data-field=phone]'
        },

        initialize: function (params) {
            this.model.url = this.url;
            FormPopupView.prototype.initialize.apply(this, arguments);
        },

        show: function(){
            FormPopupView.prototype.show.apply(this, arguments);
            var mask = this.ui.phone.data('mask');
            if(_.isString(mask)){
                this.ui.phone.mask(mask);
            }
        },

        onSubmit: function(e){
            var valid = FormPopupView.prototype.onSubmit.apply(this, arguments);
            /*if(valid === true) {
                this.showLoading();
                return;
            }*/
            this.destroy();
        },


    });

    return GetAdvicePopupView;
});