/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 03.03.2015 19:34
 */


define([
    'abstract/view/AbstractWidgetView'
    //,'./WidgetModel'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'settings'
    //,'./TwigPack'
], function (
    AbstractWidgetView
   // ,WidgetModel
    ,AppConsts
    ,Analytics
    ,Settings
    //,Template
) {
    "use strict";

    var AdvWidgetView = AbstractWidgetView.extend({

        noRenderOnStart:                    true,
        //modelClass:                         WidgetModel,
        //template:                           Template,
        type: "",
        subtype: "",
        place: "",
        ui: {},

        analytics: null,

        maxWaitTimes: 10,

        contentContainerSelector: false,


        init: function () {

            if(this.contentContainerSelector) {
                this.$container = this.$el.parents(this.contentContainerSelector);
                this.$el.hide();
                this.initContainerHeight = this.$container.height();
                this.$el.show();
            }
            this.checkResizeContainer();

            var that = this;
            this.maxWaitTimes = 20;
            var interval = setInterval(function(){
                if(that.maxWaitTimes > 0 || that.$el.find('yatag a').length || that.$el.find('iframe').length || that.$el.find('embed').length || that.$el.find('[src^="https://rotary.blamper.ru/www/images/"]').length){
                    clearInterval(interval);
                    that.initDirect.call(that);
                }
                that.maxWaitTimes--;
            }, 500);
        },

        initDirect: function(){
            var App = require('App');
            var that = this;
            var $direct = this.$el.find('yatag a');

            this.checkResizeContainer();

            $direct.click(function(e){
console.log("~~~~ yandex banner click");
                that.callServer(Settings.api.blamper.common.trackBannerUrl,
                     {
                        domain: that.$el.find('.yap-domain-text').text(),
                        contacts: that.$el.find('.yap-contacts__item-link').attr('href'),
                        text: $(this).text(),
                        place: that.place,
                        type: that.type,
                        subtype: that.subtype,
                        url: window.location.href
                    }
                );
                App.sendAnalytics(that.analytics);
            });

            var $iframe = this.$el.find('iframe');
console.log("~~~~~~ iframe count in banner: "+$iframe.length);
            if($iframe.length) {
                $iframe.load(function () {
console.log("~~~~~~ iframe loaded");
                    try {
                        var iframe = $iframe.contents();
                        iframe.find("body").mousedown(function () {
                            console.log("~~~~~~ banner iframe click");
                            App.sendAnalytics(that.analytics);
                        });
                    }catch(e){
                        console.log('!!! NO ACCESS TO BANNER IFRAME CONTENT', e);
                    }
                });
            }

            if($direct.length || $iframe.length){
                return;
            }

            var $direct = this.$el.find('a');
            $direct.click(function(e){
console.log("~~~~ just banner link click");
                var $el = $(e.currentTarget);
                that.callServer(Settings.api.blamper.common.trackBannerUrl,
                    {
                        text: $el.text(),
                        place: that.place,
                        type: that.type,
                        subtype: that.subtype,
                        url: window.location.href
                    }
                );
                App.sendAnalytics(that.analytics);
            });

        },

        checkNullHeight: function(){
            if(!this.$el.height()){
                this.$el.parents('.js-banner-block').css({'padding':'0px','margin':'0px'});
            }
        },

        checkResizeContainer: function(){
            this.checkNullHeight();
            if(this.contentContainerSelector) {
                if(this.initContainerHeight + 50 < this.$container.height()){
                    this.$el.hide();
                }
            }
        },

        render: function(){

        }

    });
    return AdvWidgetView;
});