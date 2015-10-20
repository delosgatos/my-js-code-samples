/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 27.10.2014 13:35
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'settings'
    ,'easing'
    //,'utils'
    ,'data.utils'
], function (
    AbstractItemView
   ,AppConsts
   ,Analytics
   ,Settings
) {

    "use strict";

    var SHOW_CHAT_TIMEOUT = 9400;
    var SHOW_MESSAGE_DELAY = 600;

    var HelpButtonView = AbstractItemView.extend({

        events: {
           'click .js-help-button':         'onHelpButton'
           ,'click .js-chat-button':        'onChatClick'
           ,'click .js-close-button':       'onCloseClick'
        },

        triggers: {},

        ui: {
            button:                         '.js-help-button'
            ,chat:                          '.js-help-chat'
            ,time:                          'time'
            ,message:                       '.js-support-message'
            ,typein:                        '.js-typein-animation'
        },

        filterCar :                         [],
        experts:                            [],

        parseInputParams: function (params) {
            if (params.hasOwnProperty('car')) {
                this.filterCar = params.car;
            }
            if (params.hasOwnProperty('experts')) {
                this.experts = params.experts;
            }
            return true;
        },

        init: function () {
            var that = this;
            if(require('App').isMobileDevice || $.getCookie(AppConsts.COOKIE.FAKE_CHAT.DONT_WORRY)){
                return;
            }
            setTimeout(function(){
                that.showChat();
            }, SHOW_CHAT_TIMEOUT);
        },

        showChat: function(){
            var that = this;
            this.$el.addClass("b-chat__opened");
            this.pub(AppConsts.EVENT.COMMON.FAKE_CHAT_OPEN);
            setTimeout(function(){
                that.showMessage();
            }, SHOW_MESSAGE_DELAY);
        },

        showMessage: function(){
            if(this.ui.message.hasClass("hide")) {
                var that = this;
                var date = new Date();
                this.ui.time.html(date.getHours() + ":" + date.getMinutes());
                setTimeout(function(){
                    that.ui.message.removeClass("hide").css({opacity:0}).animate({opacity:1}, 200, "easeInOutCirc");
                    that.ui.typein.addClass("hide");
                    require('App').playSound(Settings.APP.SOUND.CHAT_MESSAGE);
                }, 3000);
            }
        },

        dontWorryAgain: function(){
            $.setCookie(AppConsts.COOKIE.FAKE_CHAT.DONT_WORRY, true, {path : '/'});
        },

        hideChat: function(){
            this.$el.removeClass("b-chat__opened");
        },

        onHelpButton: function (e) {
            //require('App').vent.trigger(AppConsts.EVENT.STATISTIC.TRACK, Analytics.COMMON.HELP_BUTTON_CLICK);
            this.showChat();
        },

        onCloseClick: function (e) {
            //require('App').vent.trigger(AppConsts.EVENT.STATISTIC.TRACK, Analytics.QA.CLOSE_CHAT);
            this.hideChat();
            this.dontWorryAgain();
        },

        onChatClick: function (e) {
            var filter = [];
            for (var i in this.filterCar) {
                filter.push('car[' + i + ']=' + this.filterCar[i]);
            }
            filter = filter.join('&');
            if (filter) {
                filter = '?' + filter;
            }
            //require('App').vent.trigger(AppConsts.EVENT.STATISTIC.TRACK, Analytics.QA.ASK_BUTTON_FROM_HELP_CHAT);
            this.ui.chat.UShowPreloader();
            this.dontWorryAgain();
            //require('App').redirect(require('App').params.currentHost + "/qa/new" + filter, null, null, null, 600);
        }

    });

    return HelpButtonView;


});