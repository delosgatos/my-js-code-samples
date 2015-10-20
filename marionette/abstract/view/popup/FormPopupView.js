/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'abstract/model/AbstractValidationModel'
    ,'./TemplatePopupView'
    ,'../AbstractFormView'
    ,'underscore'
    ,'settings'
], function (
    AbstractValidationModel
    ,TemplatePopupView
    ,AbstractFormView
    ,_
    ,Settings
) {

    "use strict";
    var FormPopupView;
    FormPopupView = AbstractFormView.extend(TemplatePopupView.prototype);
    FormPopupView = FormPopupView.extend({
        content: {},
        // TODO: parse template like selector and add data from asset
        templateUIAssetId:                  'basic',
        templateDataAssetId:                '',


        constructor: function(){
            this.model = new AbstractValidationModel({},{
                url: ''
                ,validation: {
                }
                ,functions:{
                }
            });
            AbstractFormView.prototype.constructor.apply(this, arguments);
        },

        initialize: function (params) {
            TemplatePopupView.prototype.initialize.apply(this, arguments);
            // TODO: move to AbstractFormClass
            this.initValidation();
        },

        init: function () {
            TemplatePopupView.prototype.init.apply(this, arguments);
        },

        start: function () {
            TemplatePopupView.prototype.start.apply(this, arguments);
        },

        show: function(params){
            TemplatePopupView.prototype.show.call(this, params, this.used);
            if(_.isEmpty(this.fields)) {
                this.initFieldsFromUI();
            }
        },

        bindUIElements: function(){
            AbstractFormView.prototype.bindUIElements.apply(this, arguments);
        },

        showLoading: function(){
            if(this.ui.submit){
                this.ui.submit.UShowPreloader();
                return;
            }
            TemplatePopupView.prototype.showLoading.apply(this, arguments);
        },

        hideLoading: function(){
            if(this.ui.submit){
                this.ui.submit.UHidePreloader();
                return;
            }
            TemplatePopupView.prototype.hideLoading.apply(this, arguments);
        },

        onSaveSuccess: function(data){
            AbstractFormView.prototype.onSaveSuccess.apply(this, arguments);
            if(data && data.errors){
                this.handleError(data.errors);
                return;
            }
            this.handleSuccess(data);
        },
        onSaveFailed: function(data){
            AbstractFormView.prototype.onSaveFailed.apply(this, arguments);
            this.handleFail(data);
        },
        // TODO: check what kind errors here and choose right handler
        onSaveError: function(data){
            AbstractFormView.prototype.onSaveError.apply(this, arguments);
            console.log("-V- FormPopupView Save Error: "+JSON.stringify(data));
            this.handleFail(data);
        },
        /** FOR OVERRIDE */
        handleFail: function(data){
            console.log("-V- FormPopupView Save Failed: "+JSON.stringify(data));
        },
        /** FOR OVERRIDE */
        handleError: function(errors){
            console.log("-V- FormPopupView Save Error: "+JSON.stringify(errors));
            this.showErrorsFromData(errors);
        },
        /** FOR OVERRIDE */
        handleSuccess: function(data){
            console.log("-V- FormPopupView Save Success: "+JSON.stringify(data));
            if(data && data.redirect){
                this.redirect(data.redirect);
            }
            this.destroy();
        },

        destroy: function(){
            TemplatePopupView.prototype.destroy.apply(this, arguments);
        }



    });

    return FormPopupView;
});