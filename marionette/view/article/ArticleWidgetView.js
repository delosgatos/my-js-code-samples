/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.03.2015 14:59
 */

define([
    'abstract/view/AbstractWidgetView'
    ,'helper/AppConsts'
    , 'underscore'
], function (
    AbstractWidgetView
    ,AppConsts
    ,_
) {

    "use strict";

    var ArticleWidgetView = AbstractWidgetView.extend({

        noRenderOnStart:                    true,
        modelEvents: {
            'sync':                         'onSync'
        },
        events: {
            'click a':                      'onLinkClick'
            ,'BlockClicked a':              'onBlockClick'
        },

        request_data: null,

        gallery: null,

        initialize: function (params) {
            _.bindAll(this
                ,'onImageClick'
                ,'onGalleryClick'
            );
            var result = AbstractWidgetView.prototype.initialize.apply(this, arguments);
            if(!_.isEmpty(this.request_data)) {
                this.model.setExtraData(this.request_data);
            }
            this.addVentEvent(AppConsts.EVENT.ARTICLE.SIMILAR_FILTER, this.onFilterChanged);
            if(this.onlyDecorator) {
                if(this.request_data && this.request_data.filter){
                    this.getByFilter(this.request_data.filter);
                }else {
                    this.addVentEvent(AppConsts.EVENT.ARTICLE.SIMILAR_FILTER_ON_START, this.onFilterInited);
                }
            }
            return result;
        },

        getByFilter: function (filter) {
            this.firstRender = true;
            this.model.getByFilter(filter);
        },

        onFilterChanged: function (filter, updateOnly) {
            if(updateOnly){
                if(!this.model){
                    return;
                }
                this.model.updateFilter(filter);
                return;
            }
            this.getByFilter(filter);
        },

        onFilterInited: function (filter) {
            this.getByFilter(filter);
        },

        onBlockClick: function ($el, href) {
        },

        onLinkClick: function (e) {
            /*var $el = $(e.currentTarget);
            var href = $el.attr('href');

            // TODO: remove detect article link

            if(href.indexOf('/wiki/') == -1){
                return true;
            }
            e.preventDefault();
            var url = $el.data('href');
            url = url || $el.attr('href');
            App.redirect(url, '', true);*/
        },

        onSync: function(model, response){
            this.render();
        },

        getImageData: function(currentOriginalLink){
            var v = {
                photos: [],
                index: 0
            };
            var i = 0;
            this.ui.links.each(function(){
                var $this = $(this);
                var $img = $this.find('img');
                var href = $this.attr('href');
                v.photos.push({
                    original: href,
                    preview: $this.data('preview'),
                    thumb: $this.data('preview'),
                    title: $img.attr('alt')
                });
                if(href == currentOriginalLink){
                    v.index = i;
                }
                i++;
            });
            return v;
        },

        onShowGallery: function(data){
            this.gallery.show(data)
        },

        mapFileData: function(data){
            var d;
            var hash = data.hash;
            var type = data.type;
            if(type == 'video'){
                d = {
                    original: data.original,
                    preview: data.preview,
                    thumb: data.preview,
                    title: data.desc,
                    type: type
                };
            }else{
                var img = $.extractImagePathFromHash(hash);
                console.log(data);
                d = {
                    original: _.has(data, 'original') ? data.original : img,
                    preview: _.has(data, 'preview') ? data.preview : img,
                    thumb: _.has(data, 'preview') ? data.preview : img,
                    title: data.desc,
                    type: type
                };
            }
            return d;
        },

        onImageClick: function(e){
            e.preventDefault();
            if(!this.gallery){
                return;
            }
            var $el = $(e.currentTarget);
            var data = $el.data();
                //data.original = $el.attr('href');
            var v = {
                photos: [this.mapFileData(data)],
                index: 0
            };
            this.gallery.show(v);

        },

        onGalleryClick: function(e, data){
            if(!this.gallery){
                return;
            }
            var d, type, img, hash, v = {
                photos: [],
                index: data.index
            };

            for(var i in data.files){
                d = this.mapFileData(data.files[i]);
                v.photos.push(d);
            }

            this.gallery.show(v);
        }
    });

    return ArticleWidgetView;


});