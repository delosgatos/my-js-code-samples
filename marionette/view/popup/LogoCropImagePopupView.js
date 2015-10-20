/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'backbone'
    ,'./CropImagePopupView'
    ,'abstract/view/popup/StandardTemplatePopupView'
    ,'service/UploadImageService'
    ,'./SelectPhotoFromAlbumPopupView'
    ,'underscore'
	,'helper/AppConsts'
    ,'data.utils'
], function (
    Backbone
    ,CropImagePopupView
	,StandardTemplatePopupView
    ,UploadImageService
    ,SelectPhotoFromAlbumPopupView
    ,_
    ,AppConsts
) {

    "use strict";


    var LogoCropImagePopupView = CropImagePopupView.extend({

        templateDataAssetId:                    'logoCropImage',

        events:{
            'click .choose-from-album':      	'onChooseFromAlbumClicked'
            ,'click .js-submit-button':      	    'onSubmitClicked'
		    ,'click .remove-button': 	 		'onImageRemove'
            ,'Uploaded .upload-file-form':  	'onImageUploaded'
            ,'Uploading .upload-file-form':	 	'onImageUploading'
            ,'Error .upload-file-form':  		'onImageUploadedError'
        },

        ui: {
            form:                               'form'
			,imageBlock:                        '.image_l'
            ,mainPreview:                       'img.main-preview'
            ,previewContainer:                  '.preview-container'
            ,previewArea:                       '.preview-area'
            ,thumbImages:                       '.preview-area img'
            ,images:                            'img'
            ,removeButton:                      '.remove-button'
            ,fileFrom:                          '.upload-file-form'
            ,fileField:                         '.f_file'
            ,errorBlock:                        '.error-block'
        },

		file: {},
		hash: {},
		url: {},
		canSend: {},

		minSize: [242,242],
		aspectRatio: null,
		containerSize: {},
		place: "CLUB",
		whatChanged: "LOGO_CHANGED",
		needWidth: 242,
		needHeight: "auto",
		removeMode: false,
        noRemove: false,

        initialize: function (params) {
            //console.log("-V- LogoCropImagePopupView init");

            if (_.has(params, 'minSize') && _.isArray(params.minSize)){
                this.minSize = params.minSize;
            }
            if (_.has(params, 'aspectRatio')){
                this.aspectRatio = params.aspectRatio;
            }
            if (_.has(params, 'needWidth')){
                this.needWidth = params.needWidth;
            }
            if (_.has(params, 'needHeight')){
                this.needHeight = params.needHeight;
            }
            if (_.has(params, 'uploadUrl')){
                this.uploadUrl = params.uploadUrl;
            }

			_.bindAll(this, "onRemoveImageSuccess", "onRemoveImageFail");
			this.templateDataAssetId = params.template || this.templateDataAssetId;
			this.noRemove = params.noRemove;
			CropImagePopupView.prototype.initialize.apply(this, arguments);



            require('App').initPopup('view/popup/SelectPhotoFromAlbumPopupView'
                ,{}
                ,'popup--select-from-album'
            );
        },

		init: function (){
			CropImagePopupView.prototype.init.apply(this, arguments);
			this.file = new UploadImageService( {
                form:       	this.ui.fileFrom
               	,fileField:  	this.ui.fileField
               	,extra:      	this.sendParams
				,uploadUrl:		this.uploadUrl
            } );
		},

 		hide: function (){
            this.storeInstanceOnHide(false);
            CropImagePopupView.prototype.hide.call(this);
		},

		show: function (data) {
            console.log(arguments);
            StandardTemplatePopupView.prototype.show.apply(this, arguments);
			this.sendParams = _.extend(this.sendParams, data.extra);

            if(data.noRemove){
                this.ui.removeButton.hide();
            }

			if ( typeof data.extra.url != 'undefined' && data.extra.url != '') {
				this.showLoadedImage(data.extra);
				//this.onSelfImageLoadingProcess(data.extra.image);
			}
		},

		destroy: function (){
            CropImagePopupView.prototype.destroy.call(this);
		},

		onClose: function (){
            CropImagePopupView.prototype.onClose.apply(this);
		},
		onImageRemove: function(e){
			e.preventDefault();

			//this.canSend = false;
			this.removeMode = true;
			/*this.ui.imageBlock
				.removeClass( "image_l_loaded" )
				.removeClass( "image_l_error" )
				.removeClass( "image_l_loading" );*/

			this.ui.removeButton.hide();
			this.ui.mainPreview.attr('src', "");
			if(this.sendParams.type){
				this.sendParams.type = this.sendParams.type.replace('recrop', '').uncapitalize();
			}
			//console.log(this.sendParams);
			require('App').execute(AppConsts.COMMAND.MEDIA.REMOVE
				,this.sendParams
				,this.onRemoveImageSuccess
				,this.onRemoveImageFail
			);

			$.fancybox.update();
		},

        showLoadedImage: function(data){
            this.hash = data.hash;
            this.url = data.url;
            this.canSend = true;

            this.sendParams = $.extend({}, this.sendParams, {
                hash: data.hash
                ,url: $.extractImagePathFromHash(data.hash)
            });
            this.ui.imageBlock
				.removeClass( "image_l_loading" )
            	.removeClass( "image_l_error" )
            	.addClass('image_l_loaded');
            if(this.noRemove){
                this.ui.removeButton.hide();
            }else {
                this.ui.removeButton.show();
            }
            this.onSelfImageLoadingProcess( data.url );
        },

		onImageUploaded: function(e, data){
            delete this.sendParams.files;
			this.showLoadedImage(data);
		},

		onImageUploading: function(e, data){
			delete this.sendParams.hash;
			delete this.sendParams.url;
            if(this.sendParams.type){
                this.sendParams.type = this.sendParams.type.replace('recrop', '').uncapitalize();
            }
			this.ui.imageBlock
				.removeClass( "image_l_loaded" )
				.removeClass( "image_l_error" )
				.addClass( "image_l_loading" );
		},

		onImageUploadedError: function(message){
			this.ui.imageBlock
				.removeClass( "image_l_loaded" )
				.removeClass( "image_l_loading" )
				.addClass( "image_l_error" );
			if ( message ) {
				this.ui.errorBlock.html( message );
			}
		},

        onChooseFromAlbumClicked: function(e){
            e.preventDefault();

            this.storeInstanceOnHide();

            this.albumPopup = require('App').showPopup(
                'popup--select-from-album'
                ,{
                    preventAutoHide:true
                }
            );
            this.albumPopup
                .on('Selected', this.onFromAlbumSelected, this)
                .on('Close', this.onFromAlbumClosed, this);
        },

        onFromAlbumSelected: function(id, hash){
            this.albumPopup
                .off('Selected', this.onFromAlbumSelected)
                .off('Close', this.onFromAlbumClosed);
            this.trigger('SelectedFromAlbum', id, hash);
            this.showAgain();
            this.sendParams.files = hash;
            this.file.initFromHash(hash);
            this.sendParams.files = hash;
            this.sendParams.type = this.sendParams.type.replace('recrop', '').uncapitalize();
            delete this.sendParams.url;
        },

        onFromAlbumClosed: function(){
            this.albumPopup
                .off('Selected', this.onFromAlbumSelected)
                .off('Close', this.onFromAlbumClosed);
            this.showAgain();
        },

		onSelfImageLoadingProcess: function(url){
			var _this = this
				,container = _this.ui.previewContainer
				,image = _this.ui.mainPreview;

			this.imageUrl = url;

			_this.destroyCrop();
			//this.ui.previewContainer.css({width:"", height:""});

			if(!this.originalImage){
				this.originalImage = $( new Image() );
				$(this.originalImage).load(function(){
					_this.onImageLoaded.apply(_this, arguments);
				});
			}
			this.originalImage.attr('src', url);
		},

		onImageLoaded: function(e){
			this.ui.previewContainer.show().css({width:"", height:""});
			this.imageSize = {
				width:  e.currentTarget.width,
				height: e.currentTarget.height
			};
			this.widthToHeight = this.imageSize.width / this.imageSize.height;
			this.containerSize = {
				width: this.ui.previewContainer.width(),
				height: this.ui.previewContainer.width() / this.widthToHeight
			};
			if ( this.imageSize.width < this.containerSize.width ) {
				this.containerSize = this.imageSize;
			}
			this.containerSizePx = {
				width: parseInt(this.containerSize.width) + "px",
				height: parseInt(this.containerSize.height) + "px"
			};
			this.originalImage = null;
			this.setCropAction();
			this.removeMode = false;
		},

		setCropAction: function(){
			var _this = this
				,container = _this.ui.previewContainer
				,image = _this.ui.mainPreview;

			image.css( _this.imageSize );
			container.css( _this.containerSizePx );
			//console.log(_this.containerSizePx, _this.containerSize);
			_this.destroyCrop();

			if(!_this.cropApi) {
				image.attr('src', _this.imageUrl);
				image.Jcrop({
					minSize:        this.minSize,
					aspectRatio:    this.aspectRatio,
					allowSelect: false,
					borderOpacity: 0,
					handleOpacity: 1,
					keySupport: !1,
					createHandles: ["nw", "ne", "se", "sw"],
					drawBorders: !1,
					onChange: this.onUpdateCrop,
					onSelect: this.onUpdateCrop,
					boxWidth: _this.containerSize.width,
					boxHeight: _this.containerSize.height
				},function(){
					_this.cropApi = this;
					_this.updateAfterLoad();
				});
			}else{
				// TODO: make setImage work and clear destroy
				_this.cropApi.setImage(_this.imageUrl, function(){
					_this.cropApi = this;
					_this.updateAfterLoad();
				});
			}
			this.originalImage = null;
		},

		updateAfterLoad: function(){
			var _this = this
				,container = _this.ui.previewContainer;

			//{'width': _this.ui.mainPreview.width(), 'height': _this.ui.mainPreview.height()}
			container
				.animate({'width': _this.containerSize.width, 'height': _this.containerSize.height}, 300, function(){
					$.fancybox.update();
					_this.cropApi.setSelect( _this.setCropSizes() );
				});
		},

		onUpdateCrop: function(coords) {
			var needWidthToHeight = coords.w / coords.h;
			this.needSize = {
				needSize : {
					width: this.needWidth,
					height: this.needHeight === "auto" ? parseInt( 242 / needWidthToHeight ) : this.needHeight
				}
			};
			this.sendParams = $.extend(this.sendParams, this.needSize);
			this.setCropBox(
				(coords.x * this.imageSize.width / this.previewSize.width).toFixed(0),
				(coords.y * this.imageSize.height / this.previewSize.height).toFixed(0),
				(coords.w * this.imageSize.width / this.previewSize.width).toFixed(0),
				(coords.h * this.imageSize.height / this.previewSize.height).toFixed(0)
			);
		},

		onSubmitClicked: function(e){
			e.preventDefault();

			//this.ui.previewContainer.css({width:"", height:""});
			if (!this.canSend || this.removeMode) {
                this.destroyCrop();
				this.hide();
				return;
			}

			var send = this.sendParams;
			send['crop'] = this.cropBox;

			require('App').execute(AppConsts.COMMAND.MEDIA.STEADY
				,send
				,this.onSaveCropImageSuccess
				,this.onSaveCropImageFail
			);
		},

		onImageCropComplete: function(data) {
			require("App").vent.trigger(AppConsts.EVENT[this.place][this.whatChanged], data);
		},

		onSaveCropImageSuccess: function(data){
			if ( !CropImagePopupView.prototype.onSaveCropImageSuccess.apply(this, arguments) ) {
				return;
			}
			if(this.sendParams.type) {
				this.sendParams.type = this.sendParams.type.indexOf('recrop') >= 0 ?
					this.sendParams.type :
				'recrop' + this.sendParams.type.capitalize();
			}
			this.sendParams.hash = $.extractImageHashFromPath( data.data.url );
			this.sendParams.url = $.extractImagePathFromHash( data.data.hash );
			this.extendCallersParams({extra:this.sendParams});

			if(this.place === "USER"){

				var stat = {
						provider:   AppConsts.TYPE.STATISTIC.GOOGLE.PROVIDER
						,type:      'event'
						,group:     'Wallpaper'
						,event: 	'AddWallpaper'
					},
					ya_stat = {
						provider:   AppConsts.TYPE.STATISTIC.YANDEX.PROVIDER
					};

				if(this.sendParams.place == 'settings'){
					stat.extra = 'AddFromAuto';
					ya_stat.event = 'AddWallpaper';
				}else if(this.sendParams.place == 'profile'){
					stat.event = 'Add';
					ya_stat.event = 'AddWallpaperFromAuto';
				}

				require('App').vent
					.trigger(AppConsts.EVENT.STATISTIC.TRACK, stat)
					.trigger(AppConsts.EVENT.STATISTIC.TRACK, ya_stat);
			}

			this.onImageCropComplete(data.data);
		},

		onSaveCropImageError: function(code, data){
			CropImagePopupView.prototype.onSaveCropImageError.apply(this, arguments);
			this.onImageUploadedError( "" );
		},

		onSaveCropImageFail: function(data){
			CropImagePopupView.prototype.onSaveCropImageFail.apply(this, arguments);
			this.onImageUploadedError( "" );
		},

		destroyCrop: function(){
			if(this.cropApi) {
				this.cropApi.destroy();
				this.cropApi = null;
			}
		},

		onRemoveImageSuccess: function(data){
			require("App").vent.trigger(AppConsts.EVENT[this.place][this.whatChanged], data);
		},

		onRemoveImageFail: function(){
			this.ui.imageBlock
				.removeClass( "image_l_loaded" )
				.removeClass( "image_l_loading" )
				.addClass( "image_l_error" );
			/*
			 *	TODO: коды ошибок загрузки
			 */
		}


    });

    return LogoCropImagePopupView;
});