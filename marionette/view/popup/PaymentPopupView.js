/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */


/*define('widgets/payments/invoice/TwigPack', [
    'common_templates/twig/PayPopup.twig'
], function (
    Template
) {
debugger;
    return Template;
});

define('widgets/payments/invoice/WidgetModel', [
    'model/article/ArticleWidgetModel'
    ,'helper/AppConsts'
], function (
    ArticleWidgetModel
    ,AppConsts
) {
    "use strict";
    var PaymentsInvoiceWidgetModel = ArticleWidgetModel.extend({
        name: "widgets/payments/invoice/WidgetModel",
        widgetUrl: '/widget/widgets/payments/invoice',
    });
    return PaymentsInvoiceWidgetModel;
});



define('widgets/payments/invoice/WidgetView', [
    'view/article/ArticleWidgetView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'widgets/payments/invoice/WidgetModel'
    ,'widgets/payments/invoice/TwigPack'
], function (
    ArticleWidgetView
    ,AppConsts
    ,Analytics
    ,WidgetModel
    ,Template
) {

    "use strict";

    var PaymentsInvoiceWidgetView = ArticleWidgetView.extend({

        modelClass:                         WidgetModel,
        template:                           Template,

        events: {
            'click .js-categories-title a': 'onTiltleLinkClick',
        },

        onTiltleLinkClick: function(e){
            e.preventDefault();
            var $el = $(e.currentTarget);
            var event = this.place == 'auto/qa/single'
                    ? Analytics.V2.QUESTION.CATEGORY_TITLE_CLICK
                    : Analytics.V2.ARTICLE.CATEGORY_TITLE_CLICK
                ;
            require('App').sendAnalyticsWithRedirect(event, $el.attr('href') || $el.data('href'));
        },


    });
    return PaymentsInvoiceWidgetView;
});*/



define([
    'backbone'
    ,'abstract/view/popup/TemplatePopupView'
    //,'widgets/payments/invoice/WidgetView'
    ,'jquery'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'utils'
], function (
    Backbone
    ,TemplatePopupView
    //,PaymentsInvoiceWidgetView
    ,$
    ,_
    ,Settings
    ,AppConsts
    ,Analytics
) {

    "use strict";


    var PaymentPopupView = TemplatePopupView.extend({

        templateUIAssetId:                  'wide',

        url:                    '/api/payment/invoice/',

        events: {
            'click .js-categories-title a': 'onTiltleLinkClick',
        },
        triggers: {

        },
        ui: {
        },

        invoiceId: 0,
        data:{

        },

        initialize: function (params) {
            //this.model.url = this.url;
            TemplatePopupView.prototype.initialize.apply(this, arguments);
            /*
            this.widget = new PaymentsInvoiceWidgetView(params && params.popup ? params.popup : {});
            */
            var that = this;
            $.ajax(this.url,{
                data: {
                    invoiceId: this.invoiceId
                }
                ,success:function(response){
                    that.data.content = response;
                }
                ,error:function(response){

                }
            });
        },

        serializeData: function(){
            var data = {};
            _.extend(data, this.data);
            this.dataForAsset = data;
            return {asset: data};
        },

        show: function(params, noRender){
            TemplatePopupView.prototype.show.apply(this, arguments);
            //debugger;

        },

        hide: function () {
            this.closeProcess();
            this.$el.find('.js-popup-block').removeClass('b-popup__anim-in').addClass('b-popup__anim-out');
            this.$el.html("");
        },


        onTiltleLinkClick: function(e){
            e.preventDefault();
            var $el = $(e.currentTarget);
            var event = this.place == 'auto/qa/single'
                    ? Analytics.V2.QUESTION.CATEGORY_TITLE_CLICK
                    : Analytics.V2.ARTICLE.CATEGORY_TITLE_CLICK
                ;
            require('App').sendAnalyticsWithRedirect(event, $el.attr('href') || $el.data('href'));
        },

    });

    return PaymentPopupView;
});