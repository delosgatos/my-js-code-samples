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



    var SigninFormView = EntranceFormView.extend({

        url: '/api/user/signup/login/',

        events:{
            'click .js-network-buttons a':    'onNetworkClick'
            ,'click .js-password-remind':      'onPasswordRemindClick'
            ,'click .js-signup-button':        'onSignupClick'
        },

        ui: {
            form:                               'form'
            ,submit:                            '.js-submit-button'
            ,networks:                          '.js-network-buttons a'
        },

        onNetworkClick: function (e) {
            e.preventDefault();
            var network = $(e.currentTarget).data("network");
            this.pub(AppConsts.EVENT.AUTH.SOCIAL_AUTH, network, true);
        }


    });

    return SigninFormView;
});