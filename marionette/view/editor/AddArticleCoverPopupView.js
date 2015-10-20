/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'view/popup/CoverCropImagePopupView'
	,'helper/AppConsts'
], function (
	CoverCropImagePopupView
    ,AppConsts
) {

    "use strict";


    var AddArticleCoverPopupView = CoverCropImagePopupView.extend({

		templateDataAssetId:                    'addArticlePhoto',
		templateUIAssetId:                      'basic-mini-with-center-button',

		events:{
			'click .choose-from-album':      	'onChooseFromAlbumClicked'
			,'click .js-submit-button':      	    'onSubmitClicked'
			,'click .remove-button': 	 		'onImageRemove'
			,'Uploaded .upload-file-form':  	'onImageUploaded'
			,'Uploading .upload-file-form':	 	'onImageUploading'
			,'Error .upload-file-form':  		'onImageUploadedError'
            ,'keyup':                           'onDescriptionKeyup'
		},

		ui: {
			form:                               'form'
			,imageBlock:                        '.image_l'
			,mainPreview:                       '.js-main-preview'
			,previewContainer:                  '.js-preview-container'
			,previewArea:                       '.js-preview-area'
			,thumbImages:                       '.js-preview-area img'
			,images:                            'img'
			,removeButton:                      '.remove-button'
			,fileFrom:                          '.js-upload-file-form'
			,fileField:                         '.f_file'
			,errorBlock:                        '.js-error-block'
			,description:                       '.js-image-description'
            ,descriptionBlock:                  '.js-description-block'
            ,shortDescriptionBlock:             '.js-short-description-block'
            ,shortDescription:                  '.js-short-description'
		},

		minSize: [173, 173],
		aspectRatio: 1,
		place: "ARTICLE",
		whatChanged: "COVER_CHANGED",
		needWidth: 173,
		needHeight: 173,

		show: function(params){
            CoverCropImagePopupView.prototype.show.apply(this, arguments);
            this.ui.shortDescriptionBlock.removeClass('hide');
            if(params.extra.covername){
			    this.ui.shortDescription.val(params.extra.covername);
            }
		},
        getDescription: function(){
            return this.ui.shortDescription.val();
        },
        onDescriptionKeyup: function(e){
        }

	});

    return AddArticleCoverPopupView;
});



