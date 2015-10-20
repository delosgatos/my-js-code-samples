/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 03.03.2015 19:34
 */


define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'abstract/model/AbstractWidgetModel'
    ,'asset/template/twig/FullscreenGallery.twig'
    ,'../../../vendor/slider/anothergallery'
], function (
    AbstractItemView
    ,AppConsts
    ,AbstractWidgetModel
    ,Template
) {
    "use strict";
    var FullscreenGalleryView = AbstractItemView.extend({

        modelClass:                         AbstractWidgetModel.extend({
            toJSON: function(){
                return _.clone(this.attributes);
            }
        }),
        template:                           Template,

        events:{
            'click .js-close':    'onClose'
        },
        ui:{
            close: '.js-close'
        },

        gallery: null,

        init: function(){
            this.addVentEvent(AppConsts.EVENT.SYSTEM.RESIZE, this.onResize);
        },
        updateGallerySize: function(){
            var $gallery = this.$el.find('.js-gallery');
            var $banner = this.$el.find('.js-bottom-banner');
            var off = $gallery.position();
            var w = require('App').vars.windowSize;

            console.log("FullscreenGalleryView", w.height+" - "+off.top+" - "+$banner.outerHeight(true));

            $gallery.css('height', w.height - off.top - $banner.outerHeight(true));
            return $gallery;
        },
        show: function(data){

            this.model.set( data );

            this.render();
            $('body').append(this.$el);

            var that = this, $gallery = this.updateGallerySize();
            $gallery.attr('data-show', data.index);
            if(!this.gallery) {
                $gallery.anothergallery({
                    startIndex: data.index
                });
                this.gallery = $gallery.data('plugin');
            }else{
                this.gallery.build();
                _.defer(function(){
                    that.gallery.moveTo.call(that.gallery, data.index);
                });
            }
        },
        render: function(){
            AbstractItemView.prototype.render.apply(this, arguments);
            var $el = this.$el.children();
            this.$el.replaceWith($el);
            this.setElement($el);
        },
        onClose: function(e){
            e.preventDefault();
            this.$el.remove();
        },
        onResize: function(){
            var $gallery = this.updateGallerySize();
        }

    });
    return FullscreenGalleryView;
});