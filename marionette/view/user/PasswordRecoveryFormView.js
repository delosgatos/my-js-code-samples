/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    './EntranceFormView'
    ,'jquery'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
], function (
    EntranceFormView
    ,$
    ,_
    ,Settings
    ,AppConsts
) {

    "use strict";



    var PasswordRecoveryFormView = EntranceFormView.extend({


        url: '/api/password/recovery/email',

        events:{
            'click .js-signin-button':        'onSigninClick'
            ,'click .js-signup-button':        'onSignupClick'
        },

        ui: {
            form:                               'form'
            ,submit:                            '.js-submit-button'
            ,success:                           '.js-success-message'
            ,email:                             '.js-email-label'
        },

        onSubmit: function(){
            var valid = EntranceFormView.prototype.onSubmit.apply(this, arguments);
            if(valid === true) {
                this.showLoading();
                return;
            }
        },

        handleSuccess: function(data){
            this.hideLoading();
            console.log("-V- FormPopupView Save Success: "+JSON.stringify(data));
            var that = this;
            this.ui.form.addClass('hide');
            this.ui.success.removeClass('hide');
            var email = this.model.get('email');
            this.ui.email.html(email);
            /*setTimeout(function(){
                if(data && data.redirect){
                    that.redirect(data.redirect);
                    that.destroy();
                }
            }, 5000);*/

        }


    });

    return PasswordRecoveryFormView;
});