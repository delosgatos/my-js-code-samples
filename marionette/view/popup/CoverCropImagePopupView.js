/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'backbone'
    ,'./LogoCropImagePopupView'
	,'helper/AppConsts'
], function (
    Backbone
    ,LogoCropImagePopupView
    ,AppConsts
) {

    "use strict";


    var CoverCropImagePopupView = LogoCropImagePopupView.extend({

        templateDataAssetId:                'logoCropImage',

        events:{
            'click .choose-from-album':      	'onChooseFromAlbumClicked'
            ,'click .js-submit-button':      	    'onSubmitClicked'
			,'click .remove-button': 	 		'onImageRemove'
            ,'Uploaded .upload-file-form':  	'onImageUploaded'
            ,'Uploading .upload-file-form':	 	'onImageUploading'
            ,'Error .upload-file-form':  		'onImageUploadedError'
        },

        ui: {
            form:                           'form'
			,imageBlock:                    '.image_l'
            ,mainPreview:                   'img.main-preview'
            ,previewContainer:              '.preview-container'
            ,previewArea:                   '.preview-area'
            ,thumbImages:                   '.preview-area img'
            ,images:                        'img'
            ,removeButton:                  '.remove-button'
            ,fileFrom:                      '.upload-file-form'
            ,fileField:                     '.f_file'
            ,errorBlock:                    '.error-block'
        },

		file: {},
		hash: {},

		minSize: [400, 181],
		aspectRatio: 2.2,
		containerSize: {},
		place: "USER",
		whatChanged: "COVER_CHANGED",
		needWidth: 854,
		needHeight: 410,

        onSubmitClicked: function(e){
            if(!this.uploadUrl){
                LogoCropImagePopupView.prototype.onSubmitClicked.apply(this, arguments);
                return;
            }
            e.preventDefault();
            var send = this.sendParams;
            send['crop'] = this.cropBox;
            require('App').execute(AppConsts.COMMAND.API.CALL
                ,this.uploadUrl
                ,send
                ,this.onSaveCropImageSuccess
                ,this.onSaveCropImageFail
            );
        }
    });

    return CoverCropImagePopupView;
});