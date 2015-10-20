/**
 * @project Blamper
 * @user front-end / manfredi(a)bk.com
 */
define([
    'underscore'
    ,'abstract/model/AbstractValidationModel'
    ,'abstract/view/AbstractItemView'
    ,'settings'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'jquery.autocomplete'
    ,'utils'
    ,'data.utils'
], function(
    _
    ,AbstractValidationModel
    ,AbstractItemView
    ,Settings
    ,AppConsts
    ,Analytics
){
    var AskFormStep21View = AbstractItemView.extend({
        events: {
            'click .js-tab-variant':                   'onTabClick'
            ,'click .js-submit-button':                'onSubmitClick'
        },

        ui: {
            tab: '.js-tab-variant'
        },

        /**
         * Смена табов
         * @param e
         */
        onTabClick: function(e){
            var cls = 'b-payment-tab__current';
            var el  =  $(e.currentTarget);
            var App = require('App');
            switch(el.data('type')){
                case 'mobile':
                    App.sendAnalytics(Analytics.V2.QUESTION.PAYMENT.TYPE_MOBILE_CLICK);
                    break;
                case 'card':
                    App.sendAnalytics(Analytics.V2.QUESTION.PAYMENT.TYPE_CARDS_CLICK);
                    break;
                case 'yad':
                    App.sendAnalytics(Analytics.V2.QUESTION.PAYMENT.TYPE_YANDEX_CLICK);
                    break;
                case 'other':
                    App.sendAnalytics(Analytics.V2.QUESTION.PAYMENT.TYPE_OTHER_CLICK);
                    break;
            }
            if (!el.hasClass(cls)) {
                this.ui.tab.removeClass(cls).data('type');
                this.$el.find('div.b-payment-type').addClass('hide');
                this.$el.find('div.b-payment-type[data-type='+el.addClass(cls).data('type')+']').removeClass('hide');
            }
        },
        onSubmitClick: function(e){
            var type = this.$el.find('b-payment-tab__current').data('type');

            var App = require('App');
            switch(el.data('type')){
                case 'mobile':
                    App.sendAnalytics(Analytics.V2.QUESTION.PAYMENT.TYPE_MOBILE_PAY_CLICK);
                    break;
                case 'card':
                    App.sendAnalytics(Analytics.V2.QUESTION.PAYMENT.TYPE_CARDS_PAY_CLICK);
                    break;
                case 'yad':
                    App.sendAnalytics(Analytics.V2.QUESTION.PAYMENT.TYPE_YANDEX_PAY_CLICK);
                    break;
                case 'other':
                    App.sendAnalytics(Analytics.V2.QUESTION.PAYMENT.TYPE_OTHER_PAY_CLICK);
                    break;
            }

        }
        //,
        /*onSubmitMobile: function (e) {
            e.preventDefault();
            this.validateAndSubmit();
        }*/



    });


    return AskFormStep21View;
});