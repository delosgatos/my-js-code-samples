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



    var SignupFormView = EntranceFormView.extend({

        url: '/api/user/signup/index/',

        events:{
            'click .js-network-buttons a':    'onNetworkClick'
            ,'click .js-signin-button':        'onSigninClick'
            ,'change .js-agree-checkbox':      'onAgreeChange'
        },

        ui: {
            form:                               'form'
            ,signin:                            '.js-signin-button'
            ,submit:                            '.js-submit-button'
            ,agree:                             '.js-agree-checkbox'
            ,networks:                          '.js-network-buttons a'
        },

        onNetworkClick: function (e) {
            e.preventDefault();
            var network = $(e.currentTarget).data("network");
            this.pub(AppConsts.EVENT.AUTH.SOCIAL_AUTH, network);
        },

        onSubmit: function(){
            var valid = EntranceFormView.prototype.onSubmit.apply(this, arguments);
            if(valid === true) {
                this.showLoading();
                return;
            }
        },

        onAgreeChange: function (e) {
            var $el = $(e.currentTarget);
            var check = $el.is(':checked');
            if(!check){
                this.blockSubmit();
                return;
            }
            this.unblockSubmit();
        }


    });

    return SignupFormView;
});