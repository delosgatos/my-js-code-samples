/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 03.03.2015 19:34
 */


define([
    'view/article/ArticleWidgetView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'view/common/FullscreenGalleryView'
    ,'settings'
], function (
    ArticleWidgetView
    ,AppConsts
    ,Analytics
    ,FullscreenGalleryView
    ,Settings
) {

    "use strict";

    var GalleryView = ArticleWidgetView.extend({

        gallery: null,

        init: function(data, options){
            if(!require('App').params.isMobile) {
                this.gallery = new FullscreenGalleryView({
                    eventNamespace: this.eventNamespace
                });
            }
        },

        bindUIElements: function(){
            ArticleWidgetView.prototype.bindUIElements.apply(this, arguments);
            this.$el.UGallerySlider();
            if(!require('App').params.isMobile) {
                this.$el.on('TheBigClick', this.onGalleryClick);
            }
        }


    });
    return GalleryView;
});