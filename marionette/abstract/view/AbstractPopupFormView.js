/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'abstract/model/AbstractValidationModel'
    ,'./popup/StandardTemplatePopupView'
    ,'abstract/view/AbstractFormView'
    ,'underscore'
    ,'settings'
    ,'utils'
    ,'../vendor/jquery.form'
], function (
    AbstractValidationModel
    ,StandardTemplatePopupView
    ,AbstractFormView
    ,_
    ,Settings
) {

    "use strict";
    var AbstractPopupFormView;
    AbstractPopupFormView = AbstractFormView.extend(StandardTemplatePopupView.prototype);
    AbstractPopupFormView = AbstractPopupFormView.extend({
        content: {},
        // TODO: parse template like selector and add data from asset
        templateUIAssetId:                  'basic-mini',
        templateDataAssetId:                '',

        model: new AbstractValidationModel({},{
            url: ''
            ,validation: {
            }
            ,functions:{
            }
        }),

        events:{
            'click .submit-button':         'onSubmit'
        },

        ui: {
        },

        fields:{
        },

        constructor: function(){
            AbstractFormView.prototype.constructor.apply(this, arguments);
        },

        initialize: function (params) {
            StandardTemplatePopupView.prototype.initialize.apply(this, arguments);
            // TODO: move to AbstractFormClass
            this.initValidation();
        },

        init: function () {
            StandardTemplatePopupView.prototype.init.apply(this, arguments);
        },

        start: function () {
            StandardTemplatePopupView.prototype.start.apply(this, arguments);
        },

        show: function(params){
            StandardTemplatePopupView.prototype.show.apply(this, arguments);
        },

        bindUIElements: function(){
            AbstractFormView.prototype.bindUIElements.apply(this, arguments);
        },


        onSubmit: function(e){
            var isValid = this.model.isValid(true);
            if(!isValid){
                e.preventDefault();
                return;
            }
            this.submit();
        },

        showLoading: function(){
            StandardTemplatePopupView.prototype.showLoading.apply(this, arguments);
        },

        hideLoading: function(){
            StandardTemplatePopupView.prototype.hideLoading.apply(this, arguments);
        },

        onSaveSuccess: function(data){
            AbstractFormView.prototype.onSaveSuccess.apply(this, arguments);
            if(!_.isNumber(data.code)){
                this.onSaveFailed(data);
                return;
            }else if(data.code != 0){
                this.handleError(parseInt(data.code), data.data);
                return;
            }
            this.handleSuccess(data.data);
        },
        onSaveFailed: function(data){
            AbstractFormView.prototype.onSaveFailed.apply(this, arguments);
            this.handleFail(data);
        },
        // TODO: check what kind errors here and choose right handler
        onSaveError: function(data){
            AbstractFormView.prototype.onSaveError.apply(this, arguments);
            console.log("-V- AbstractPopupFormView Save Error: "+JSON.stringify(data));
            this.handleFail(data);
        },
        /** FOR OVERRIDE */
        handleFail: function(data){
            console.log("-V- AbstractPopupFormView Save Failed: "+JSON.stringify(data));
        },
        /** FOR OVERRIDE */
        handleError: function(code, data){
            console.log("-V- AbstractPopupFormView Save Error ["+code+"]: "+JSON.stringify(data));
        },
        /** FOR OVERRIDE */
        handleSuccess: function(data){
            console.log("-V- AbstractPopupFormView Save Success: "+JSON.stringify(data));
            this.close();
        }


    });

    return AbstractPopupFormView;
});