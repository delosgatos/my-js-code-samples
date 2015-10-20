/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'abstract/view/AbstractFormView'
    ,'abstract/model/AbstractValidationModel'
    ,'jquery'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
], function (
    AbstractFormView
    ,AbstractValidationModel
    ,$
    ,_
    ,Settings
    ,AppConsts
) {

    "use strict";


    var EntranceFormView = AbstractFormView.extend({

        model: new AbstractValidationModel({},{
            url: ''
            ,validation: {
            }
            ,functions:{
            }
        }),

        events:{
            'submit form':                     'onSubmit'
        },

        ui: {
            form:                               'form'
            ,submit:                            '.js-submit-button'
        },

        url: '',

        constructor: function(){
            this.model = new AbstractValidationModel({},{
                url: this.url
                ,validation: {
                }
                ,functions:{
                }
            });
            AbstractFormView.prototype.constructor.apply(this, arguments);
        },

        initialize: function (params) {
            this.initFieldsFromUI();
            this.fillModelFromForm();
            AbstractFormView.prototype.initialize.apply(this, arguments);
            this.initValidation();
        },

        showLoading: function(){
            if(this.ui.submit){
                this.ui.submit.UShowPreloader();
                return;
            }
            AbstractFormView.prototype.showLoading.apply(this, arguments);
        },

        hideLoading: function(){
            if(this.ui.submit){
                this.ui.submit.UHidePreloader();
                return;
            }
            AbstractFormView.prototype.hideLoading.apply(this, arguments);
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
        }


    });

    return EntranceFormView;
});