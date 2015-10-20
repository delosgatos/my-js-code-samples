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


    var SigninPopupView = FormPopupView.extend({

        url: '/api/user/signup/login/',

        content: {},
        templateDataAssetId:                   'signin',

        events:{
            'submit form':                     'onSubmit'
            ,'click .js-network-buttons a':    'onNetworkClick'
            ,'click .js-password-remind':      'onPasswordRemindClick'
            ,'click .js-signup-button':        'onSignupClick'
        },

        triggers: {
        },

        ui: {
            form:                               'form'
            ,submit:                            '.js-submit-button'
            ,networks:                          '.js-network-buttons a'
        },

        initialize: function (params) {
            this.model.url = this.url;
            FormPopupView.prototype.initialize.apply(this, arguments);
        },

        onNetworkClick: function (e) {
            e.preventDefault();
            var network = $(e.currentTarget).data("network");
            this.pub(AppConsts.EVENT.AUTH.SOCIAL_AUTH, network, true);
        },

        onPasswordRemindClick: function (e) {
            e.preventDefault();
            this.destroy();
            var that = this;
            setTimeout(function(){
                that.pub.call(that,AppConsts.EVENT.POPUP.SHOW_PASSWORD_RECOVERY, that.serializeFormData());
            }, 400);

        },

        onSignupClick: function (e) {
            e.preventDefault();
            this.destroy();
            var that = this;
            setTimeout(function() {
                that.pub.call(that,AppConsts.EVENT.POPUP.SHOW_SIGNUP, that.serializeFormData());
            }, 400);
        },


    });

    return SigninPopupView;
});