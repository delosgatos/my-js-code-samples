/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 25.02.2015 14:57
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'underscore'
], function (
    AbstractItemView
    ,AppConsts
    ,Analytics
    ,_
) {

    "use strict";

    var ArticleBreadcrumbsView = AbstractItemView.extend({

        fixedClass: "",
        initOffset: {
            top: 0,
            left: 0
        },
        events: {
            'click a':                        'onClick'
        },

        triggers: {},

        ui: {
            //button:                        '.button'
        },

        init: function () {
            _.bindAll(this
                ,'onScroll'
            );
            this.addVentEvent(AppConsts.EVENT.SYSTEM.SCROLL, this.onScroll);
            this.initOffset = this.$el.offset();
        },

        onScroll: function (scroll) {
            if(scroll.y > this.initOffset.top){
                this.$el.addClass(this.fixedClass);
            }else{
                this.$el.removeClass(this.fixedClass);
            }
        },

        onClick: function(e){
            e.preventDefault();
            var $el = $(e.currentTarget);
            var href = $el.attr('href');
            require('App').sendAnalyticsWithRedirect(Analytics.V2.ARTICLE.CLICK_BREADCRUMBS, href);
        }

    });

    return ArticleBreadcrumbsView;


});