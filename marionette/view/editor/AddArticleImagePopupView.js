/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'abstract/view/popup/StandardTemplatePopupView'
    ,'service/UploadImageService'
	,'helper/AppConsts'
    ,'settings'
], function (
    StandardTemplatePopupView
    ,UploadImageService
    ,AppConsts
    ,Settings
) {

    "use strict";


    var AddArticleImagePopupView = StandardTemplatePopupView.extend({

        uploadUrl: Settings.API.COMMON.UPLOAD_IMAGE,

        templateDataAssetId:                    'addArticlePhoto',
        templateUIAssetId:                      'basic-mini-with-center-button',

        events:{
            'Uploaded .js-file-field':          'onUploadSuccess'
            ,'Error .js-file-field':            'onUploadError'
            ,'click .js-submit-button':      	'onSubmitClicked'
			,'click .js-remove-button': 	 	'onImageRemove'
        },

        ui: {
            form:                               'form'
            ,images:                            'img'
            ,imageBlock:                        '.js-image-block'
            ,mainPreview:                       '.js-main-preview'
            ,previewContainer:                  '.js-preview-container'
            ,removeButton:                      '.js-remove-button'
            ,fileFrom:                          '.js-upload-file-form'
            ,fileField:                         '.js-file-field'
            ,errorBlock:                        '.js-error-block'
            ,description:                       '.js-image-description'
            ,descriptionBlock:                  '.js-description-block'
            ,shortDescriptionBlock:             '.js-short-description-block'
            ,shortDescription:                  '.js-short-description'
        },

        imageData: {},

        sendParams:{type:"article"},


        initialize: function(){
            _.bindAll(this
                , 'onUploadSuccess'
                , 'onUploadError'
            );
            StandardTemplatePopupView.prototype.initialize.apply(this, arguments);
        },

        show: function(params){

            StandardTemplatePopupView.prototype.show.apply(this, arguments);
            this.ui.mainPreview.css({width:'', height: ''});
            this.sendParams = _.extend(this.sendParams, params.extra);
            if ( typeof params.extra.image != 'undefined' && params.extra.image != '') {
                this.ui.removeButton.show();
            }

            this.file = new UploadImageService( {
                form:       	this.ui.form
                ,fileField:  	this.ui.fileField
                ,extra:      	this.sendParams
                ,uploadUrl:		this.uploadUrl
            } );

            this.ui.descriptionBlock.removeClass('hide');
            if(params){
                if(params.showShortDescription){
                    this.ui.shortDescriptionBlock.removeClass('hide');
                }
            }
        },

        destroy: function () {
            //this.ui.previewContainer.css({width:"", height:""});
            this.file.destroy();
            StandardTemplatePopupView.prototype.destroy.call(this);
        },

        getDescription: function(){
            return this.ui.description.val();
        },

        getShortDescription: function(){
            return this.ui.shortDescription.val();
        },

        onSubmitClicked: function(e){
            this.trigger('Complete', this.imageData);
            this.destroy();
        },

        onImageRemove: function(){

        },

        onUploadSuccess: function (e, data) {
            var App = require('App');
            var debug = App.isDebug;
            if(debug) {
                var l = App.getLocation();
                data.url = data.url;
            }
            this.imageData = data;
            this.ui.images.attr('src', data.url);
        },

        onUploadError: function (data) {

        }

    });

    return AddArticleImagePopupView;
});