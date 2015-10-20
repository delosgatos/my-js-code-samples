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
], function (
    Backbone
    ,FormPopupView
    ,$
    ,_
    ,Settings
    ,AppConsts
) {

    "use strict";


    var PasswordRecoveryPopupView = FormPopupView.extend({

        url: '/api/password/recovery/email',

        content: {},
        templateDataAssetId:                   'passwordRecovery',

        events:{
            'submit form':                     'onSubmit'
            ,'click .js-signin-button':        'onSigninClick'
            ,'click .js-signup-button':        'onSignupClick'
        },

        triggers: {
        },

        ui: {
            form:                               'form'
            ,submit:                            '.js-submit-button'
            ,success:                           '.js-success-message'
            ,email:                             '.js-email-label'
        },

        initialize: function (params) {
            this.model.url = this.url;
            FormPopupView.prototype.initialize.apply(this, arguments);
        },

        onSigninClick: function (e) {
            e.preventDefault();
            this.destroy();
            var that = this;
            setTimeout(function() {
                that.pub.call(that, AppConsts.EVENT.POPUP.SHOW_SIGNIN, that.serializeFormData());
            }, 400);
        },

        onSignupClick: function (e) {
            e.preventDefault();
            this.destroy();
            var that = this;
            setTimeout(function() {
                that.pub.call(that, AppConsts.EVENT.POPUP.SHOW_SIGNUP, that.serializeFormData());
            }, 400);
        },

        onSubmit: function(){
            var valid = FormPopupView.prototype.onSubmit.apply(this, arguments);
            if(valid === true) {
                this.showLoading();
                return;
            }
        },

        /** FOR OVERRIDE */
        handleFail: function(data){
            this.hideLoading();
            console.log("-V- FormPopupView Save Failed: "+JSON.stringify(data));
        },
        /** FOR OVERRIDE */
        handleError: function(errors){
            this.hideLoading();
            console.log("-V- FormPopupView Save Error: "+JSON.stringify(errors));
            this.showErrorsFromData(errors);
        },
        /** FOR OVERRIDE */
        handleSuccess: function(data){
            this.hideLoading();
            console.log("-V- FormPopupView Save Success: "+JSON.stringify(data));
            var that = this;
            this.ui.form.addClass('hide');
            this.ui.success.removeClass('hide');
            var email = this.model.get('email');
            this.ui.email.html(email);
            setTimeout(function(){
                if(data && data.redirect){
                    that.redirect(data.redirect);
                }
                that.destroy();
            }, 5000);

        }


    });

    return PasswordRecoveryPopupView;
});