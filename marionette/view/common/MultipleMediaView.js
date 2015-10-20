/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 13.06.13 19:51
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'underscore'
    ,'jquery'
    ,'settings'
    ,'data.utils'
], function (
    AbstractItemView
    ,AppConsts
    ,_
    ,$
    ,Settings
) {

    "use strict";



    var MultipleMediaView = AbstractItemView.extend({

        showImages: false,

        units: null,

        imageTemplate:                      '.js-template--image-unit',
        videoTemplate:                      '.js-template--video-unit',
        //loaderTemplate:                   '.js-template--image-loader',

        events: {
            'RemoveImage':                  'onRemoved'
            ,'click .js-remove-unit':       'onRemoveClick'
        },
        ui: {
            loadedImageBlock:               '.loaded-image'
            ,list:                          '.js-media-list'
            ,loadedImage:                   '.loaded-image img'
            ,removeImage:                   '.remove-image'
        },
        extraMedia:                         [],

        extraContainer:                     null,

        init: function () {
            this.units = new Object();
            if(!this.inputParams || !this.inputParams.imageTemplate) {
                this.imageTemplate = $(this.imageTemplate).text();
            }
            if(!this.inputParams || !this.inputParams.videoTemplate) {
                this.videoTemplate = $(this.videoTemplate).text();
            }
            //this.loaderTemplate = $(this.loaderTemplate).text();
            if(this.extra && this.extra.files){
                this.initImageListsFromArrays(this.extra);
            }


            if(this.extraContainer instanceof $ && this.extraContainer.length) {
                this.ui.extraContainer = this.extraContainer;
                this.ui.extraImage = this.extraContainer.find('.js-extra-image');
                this.ui.extraTitle = this.extraContainer.find('.js-extra-title');
                this.ui.extraContent = this.extraContainer.find('.js-extra-description');
            }

        },
        getCount: function(){
            return _.size(this.units);
        },
        getUnitFromStageByHash: function(hash){
            return this.ui.list.find('[data-hash='+hash+']');
        },
        removeImageFromStageByHash: function(hash){
            var $unit = this.getUnitFromStageByHash(hash);
            if($unit.length){
                $unit.remove();
                return true;
            }
            return false;
        },
        addImageToStage: function(data){
            this.ui.list.css({'display':'block'});
            var $unit = this.getUnitFromStageByHash(data.hash);
            if($unit.length){
                return false;
            }
            var template = this.imageTemplate;
            if (data.type ===  AppConsts.TYPE.MEDIA.VIDEO) {
                template = this.videoTemplate;
            }
            var img = _.template(template)({item:data});
            this.ui.list.append(img);
            // TODO: check if image container not opened and open it
            this.trigger("MediaInserted", data);
            return true;
        },

        addVideoToStage: function(data){
            this.ui.list.css({'display':'block'});
            var $unit = this.getUnitFromStageByHash(data.hash);
            if($unit.length){
                return false;
            }
            var img = _.template(this.videoTemplate)({item:data});
            this.ui.list.append(img);
            // TODO: check if image container not opened and open it
            this.trigger("MediaInserted", data);
            return true;
        },

        initImageListsFromArrays: function(list){
            if(!list || _.isEmpty(list)){
                return;
            }
            var _this = this;
            if(_.isArray(list)){
                _.each(list.files, function(hash){
                    _this.addImage({hash:hash}, AppConsts.TYPE.MEDIA.IMAGE_UPLOADED, true);
                });
                return;
            }
            if(list.files){
                _.each(list.files, function(data){
                    _this.addImage(data, AppConsts.TYPE.MEDIA.IMAGE_UPLOADED, true);
                });
            }
            if(list.albumFiles){
                _.each(list.albumFiles, function(data){
                    _this.addImage(data, AppConsts.TYPE.MEDIA.IMAGE_FROM_ALBUM, true);
                });
            }
            if(list.libraryFiles){
                _.each(list.libraryFiles, function(data){
                    _this.addImage(data, AppConsts.TYPE.MEDIA.IMAGE_FROM_LIBRARY, true);
                });
            }
        },

        addImage: function(data, type, showAnyway){
            if (!data.hasOwnProperty('hash') && !data.hasOwnProperty('type')) {
                data = {
                    hash     : data,
                    type     : 'image',
                    src      : $.extractImagePathFromHash(data, 465, 316),
                    src2     : $.extractImagePathFromHash(data, 117, 79),
                    original : $.extractImagePathFromHash(data)
                };
            }
            this.units[data.hash] = _.extend({type:type?type:AppConsts.TYPE.MEDIA.IMAGE_UPLOADED},data);
            this.trigger(MultipleMediaView.IMAGE_ADDED, data.hash);
            if(this.showImages || showAnyway){
                return this.addImageToStage(data);
            }
            return false;
        },
        addImageFromAlbum: function(data, showAnyway){
            return this.addImage(data, AppConsts.TYPE.MEDIA.IMAGE_FROM_ALBUM, showAnyway);
        },
        addImageFromLibrary: function(data, showAnyway){
            return this.addImage(data, AppConsts.TYPE.MEDIA.IMAGE_FROM_LIBRARY, showAnyway);
        },
        addImageFromLink: function(data, showAnyway){
            return this.addImage(data, AppConsts.TYPE.MEDIA.IMAGE_LINK, showAnyway);
        },
        addVideo: function(data, showAnyway){
            this.units[data.hash] = data;
            if(this.showImages || showAnyway){
                return this.addVideoToStage(data);
            }
            return false;
        },
        addExtra: function(data){
            this.extraMedia.push(data.hash);
            this.units[data.hash] = data;
        },

        getParsedMedia: function(){
            var parsed = {};
            for(var i in this.units){
                if(this.units[i].type != AppConsts.TYPE.MEDIA.IMAGE_UPLOADED
                    && this.units[i].type != AppConsts.TYPE.MEDIA.IMAGE_FROM_ALBUM
                    && this.units[i].type != AppConsts.TYPE.MEDIA.IMAGE_FROM_LIBRARY
                ){
                    parsed[i] = true;
                }
            }
            return parsed;
        },

        removeImage: function(id){
            if(this.units.hasOwnProperty(id)){
                this.removeImageFromStageByHash(id);
                delete this.units[id];
            }
            this.trigger(MultipleMediaView.IMAGE_REMOVED, id);
        },

        removeUsingUrlList: function(urlList){
            var _this = this;
            _.each(this.units, function(unit){
                if(unit.url && urlList.indexOf(unit.url)>-1){
                    _this.removeImage(unit.hash);
                }
            });
        },

        clearExtra: function(){
            for(var i in this.extraMedia){
                delete this.units[this.extraMedia[i]];
            }
            this.extraMedia = [];
        },

        clear: function(){
            this.lastParsedLinks = [];
            this.units = {};
            this.extraMedia = [];
            this.ui.list.html("");
        },

        getImagesHashes: function(){
            var images = [];
            _.each(this.units, function(image){
                images.push(image);
            });
            return images;
        },

        onRemoved: function (e, id) {
            console.log("-V- Removed");
            this.removeImage(id);
        },

        onRemoveClick: function(e){
            e.preventDefault();
            if(this.showImages){
                var $el = $(e.currentTarget).parents('.js-image-attachment');
                $el = $el.length ? $el : $(e.currentTarget.parentNode);
                var id = $el.data("hash");
                this.removeImage(id);
                $el.remove();
            }
        },

        parseText: function(text){
            var links = $.normalizeLinks(text.match($.linkRegex));
            this.onLinkDetected(links, this.lastParsedLinks);
            this.lastParsedLinks = links;
        },

        showExtraContent: function(data){
            this.clearExtraContent();


            if(!data || !this.ui.extraContainer){
                return;
            }
            /*if(data.icon){
             this.ui.extraLogo.attr("src", data.icon);
             this.ui.extraLogo.removeClass("hide");
             }else{
             this.ui.extraLogo.addClass("hide");
             }*/
            if(data.images && data.images.length){
                this.ui.extraImage.removeClass("hidden");
                this.ui.extraImage.attr("src", data.images[0].img);
            }else{
                this.ui.extraImage.addClass("hidden");
            }
            if(data.title){
                this.ui.extraTitle.html(data.title);
            }
            if(data.description){
                this.ui.extraContent.html(data.description);
            }
            this.ui.extraContainer.removeClass("hidden");


        },
        clearExtraContent: function(){
            this.clearExtra();
            if(!this.ui.extraContainer){
                return;
            }
            this.ui.extraContainer.addClass("hidden");
            this.ui.extraImage.addClass("hidden");
            //this.ui.extraLogo.attr("src", data.data.icon);
            //this.ui.extraLogo.attr("src", data.data.images[0]);
            this.ui.extraTitle.html("");
            this.ui.extraContent.html("");
        },

        onLinkDetected: function(allLinks, lastLinks){
            var newLinks = _.difference(allLinks, lastLinks);
            if(!newLinks || !newLinks.length){
                var unused = _.difference(lastLinks, allLinks);
                if(unused.length){
                    //this.removeUsingUrlList(unused);
                }
                return;
            }
            var url = Settings.API.HOST + Settings.API.COMMON.PARSE_LINK;
            this.callServer(url
                ,{
                    url:allLinks
                }
                , {
                    success: this.onParseLinksSuccess.bind(this)
                    , error: this.onParseLinksError.bind(this)
                }
            );
        },

        onParseLinksSuccess: function(data){
            if(!data || !data.response || !data.response.length){
                return;
            }
            //data = _.pluck(data.response, 'data');
            data = data.response;
            for(var i in data){
                if(data[i].type == "url"){
                    this.showExtraContent(data[i]);
                }
            }

            this.processParsedMedia(data);
        },

        onParseLinksError: function(data){

        },

        processParsedMedia: function(data){
            var parsed = this.getParsedMedia();
            for(var i in data){
                if(parsed[data[i].hash]){
                    delete parsed[data[i].hash];
                }
                this.addParsedMedia(data[i]);
            }
            for(i in parsed){
                // TODO: remove unused images
                //this.removeImageFromStageByHash(parsed[i]);
            }
        },

        addParsedMedia: function(data){
            var inserted = false;
            if(data.type == AppConsts.TYPE.MEDIA.VIDEO){
                inserted = this.addVideo(data, true);
            }else if(data.type == AppConsts.TYPE.MEDIA.IMAGE_LINK){
                inserted = this.addImageFromLink(data, true);
            }else{
                this.addExtra(data);
            }
            return inserted;
        },

    });

    MultipleMediaView.IMAGE_ADDED = 'ImageAdded';
    MultipleMediaView.IMAGE_REMOVED = 'ImageRemoved';

    return MultipleMediaView;
});