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
    ,'jquery.form'
    ,'data.utils'
], function (
    Backbone
    ,FormPopupView
    ,$
    ,_
    ,Settings
    ,AppConsts
) {

    "use strict";


    var SignupPopupView = FormPopupView.extend({

        url: '/api/user/signup/index/',

        content: {},
        templateDataAssetId:                   'signup',

        events:{
            'submit form':                     'onSubmit'
            ,'click .js-network-buttons a':    'onNetworkClick'
            ,'click .js-signin-button':        'onSigninClick'
            ,'change .js-agree-checkbox':      'onAgreeChange'
        },

        triggers: {
        },

        ui: {
            form:                               'form'
            ,signin:                            '.js-signin-button'
            ,submit:                            '.js-submit-button'
            ,agree:                             '.js-agree-checkbox'
            ,networks:                          '.js-network-buttons a'
        },

        initialize: function (params) {
            this.model.url = this.url;
            FormPopupView.prototype.initialize.apply(this, arguments);
        },

        onNetworkClick: function (e) {
            e.preventDefault();
            var network = $(e.currentTarget).data("network");
            this.pub(AppConsts.EVENT.AUTH.SOCIAL_AUTH, network);
        },

        onSubmit: function(){
            var valid = FormPopupView.prototype.onSubmit.apply(this, arguments);
            if(valid === true) {
                this.showLoading();
                return;
            }
        },

        handleFail: function(data){
            this.hideLoading();
            FormPopupView.prototype.handleFail.apply(this, arguments);
        },

        handleError: function(errors){
            this.hideLoading();
            FormPopupView.prototype.handleError.apply(this, arguments);
        },

        handleSuccess: function(data){
            this.hideLoading();
            FormPopupView.prototype.handleSuccess.apply(this, arguments);
        },


        onSigninClick: function (e) {
            e.preventDefault();
            this.destroy();
            var that = this;
            setTimeout(function() {
                that.pub.call(that, AppConsts.EVENT.POPUP.SHOW_SIGNIN, that.serializeFormData());
            }, 400);
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

    return SignupPopupView;
});