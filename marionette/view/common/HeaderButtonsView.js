/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 27.10.2014 13:35
 */

define([
    'abstract/view/AbstractItemView'
    ,'view/popup/SignupPopupView'
    ,'view/popup/SigninPopupView'
    ,'view/popup/PasswordRecoveryPopupView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'settings'
    ,'easing'
    //,'utils'
    ,'data.utils'
], function (
    AbstractItemView
   ,SignupPopupView
   ,SigninPopupView
   ,PasswordRecoveryPopupView
   ,AppConsts
   ,Analytics
   ,Settings
) {

    "use strict";

    var HeaderButtonsView = AbstractItemView.extend({

        events: {
           'click .js-signup-button':         'onSignupButton'
           ,'click .js-signin-button':        'onSigninClick'
        },

        triggers: {},

        ui: {
            signupButton:                         '.js-signup-button'
            ,signinButton:                        '.js-signin-button'
        },

        signupPopup: null,
        signinPopup: null,
        recoveryPopup: null,

        init: function () {
            this.addVentEvent(AppConsts.EVENT.POPUP.SHOW_SIGNIN, this.showSigninPopup);
            this.addVentEvent(AppConsts.EVENT.POPUP.SHOW_SIGNUP, this.showSignupPopup);
            this.addVentEvent(AppConsts.EVENT.POPUP.SHOW_PASSWORD_RECOVERY, this.showRecoveryPopup);
        },


        // UNAUTHORIZED
        showSignupPopup: function(){
            if(!this.signupPopup){
                this.signupPopup = new SignupPopupView();
            }
            this.signupPopup.show();
        },

        showSigninPopup: function(){
            if(!this.signinPopup){
                this.signinPopup = new SigninPopupView();
            }
            this.signinPopup.show();
        },

        showRecoveryPopup: function(){
            if(!this.recoveryPopup){
                this.recoveryPopup = new PasswordRecoveryPopupView();
            }
            this.recoveryPopup.show();
        },

        onSignupButton: function (e) {
            e.preventDefault();
            this.showSignupPopup();
        },

        onSigninClick: function (e) {
            e.preventDefault();
            this.showSigninPopup();
        }

    });

    return HeaderButtonsView;


});