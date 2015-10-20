/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 02.03.2015 18:21
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'utils'
], function (
    AbstractItemView
    ,AppConsts
    ,Analytics
) {

    "use strict";

    var ProfileLayoutView = AbstractItemView.extend({

        events: {
           'click .js-close':                               'onCloseClick'
        },

        ui: {
            close:                       '.js-close'
            ,staticClose:                 '.js-title .js-close'
        },


        init: function () {
            this.contentType = require('App').params.contentType;
            this.addVentEvent(AppConsts.EVENT.COMMON.TOP_MENU_SCROLLABILITY, this.onTopMenuScrollability);
        },
        onTopMenuScrollability: function(on){
            on ? this.ui.staticClose.hide() : this.ui.staticClose.show();
        },

        onCloseClick: function (e) {
            e.preventDefault();
            var $el = $(e.currentTarget);
            var href = $el.attr('href') || $el.data('href');
            $el.UShowPreloader();

            require('App').sendAnalyticsWithRedirect(Analytics.V2.PROFILE.CLICK_CLOSE, href);

        }

    });

    return ProfileLayoutView;


});