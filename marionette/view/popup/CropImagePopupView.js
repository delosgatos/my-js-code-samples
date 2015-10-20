/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'backbone'
    ,'abstract/view/popup/StandardTemplatePopupView'
    ,'view/common/CropImageView'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
    ,'jcrop'
], function (
    Backbone
    ,StandardTemplatePopupView
    ,CropImageView
    ,_
    ,Settings
    ,AppConsts
) {

    "use strict";




    var CropImagePopupView = StandardTemplatePopupView.extend({

        // TODO: parse template like selector and add data from asset



        originalImage: null,
        imageSize:{width:300, height:251},
        previewSize:{width:300, height:251},
        cropBox:{x:0, y:0, width:0, height:0},
        sendParams: {},
        imageUrl: "",

        templateUIAssetId:                  'basic-mini',
        templateDataAssetId:                'cropImage',

        sizes: [115, 53, 27],

        events:{
            'click .js-submit-button':         'onSubmitClicked'
        },

        ui: {
            form:                           'form'
            ,mainPreview:                   '.js-main-preview'
            ,previewContainer:              '.js-preview-container'
            ,previewArea:                   '.js-preview-area'
            ,thumbImages:                   '.js-preview-area img'
            ,images:                        'img'
        },

        cropView: null,

        initialize: function (params) {
            /*_.bindAll(this
                ,'onSaveCropImageSuccess'
                ,'onSaveCropImageFail'
            );*/
            if(params && params.extra){
                this.sendParams = params.extra
            }
            StandardTemplatePopupView.prototype.initialize.apply(this, arguments);
        },

        show: function (data) {
			this.ui.mainPreview.css({width:'', height: ''});
            StandardTemplatePopupView.prototype.show.apply(this, arguments);
			this.sendParams = _.extend(this.sendParams, data.extra);
			if ( typeof data.extra.image != 'undefined' && data.extra.image != '') {
                this.ui.removeButton.show();
			}
            /*CropImageView = CropImageView.extend({
                saveUrl: Settings.API.ARTICLE.SAVE_IMAGE
            });*/
            this.cropView = new CropImageView({
                el:this.$el,
                sendParams: this.sendParams,
                saveUrl: Settings.API.ADMIN.ARTICLE.SAVE_IMAGE,
                aspectRatio: 0
            });
            this.cropView
                .on(CropImageView.SAVE_SUCCESS, this.onSaveSuccess, this)
                .on(CropImageView.SAVE_ERROR, this.onSaveError, this)
            ;
        },

        destroy: function () {
            this.ui.previewContainer.css({width:"", height:""});
            this.cropView.destroy();
            StandardTemplatePopupView.prototype.destroy.call(this);
        },

        /*
        onSubmitClicked: function(e){
            e.preventDefault();
            var send = _.extend({
                crop:this.cropBox
                , sucess: this.onSaveCropImageSuccess
                , error: this.onSaveCropImageFail
            },this.sendParams);
            require('App').callServerApi(this.saveUrl ,send);
        },
        */

        onSaveSuccess: function(data){
            if(!data || !data.hasOwnProperty('code') || !_.isNumber(data.code)){
                this.onSaveDataError(-1, data);
                return false;
            }
            if(data.code != 0){
                this.onSaveDataError(data.code, data.data);
                return false;
            }
            //console.log("Save crop success: "+ JSON.stringify(data));
            this.trigger('Complete', data.data);
			this.destroy();

            //require('App').vent.trigger(AppConsts.EVENT.MODEL.COVER_UPDATED, data.data);

			return true;
        },

        onSaveDataError: function(code, data){
            // TODO: show errors when will be implemented in html
            console.log("Save crop error ["+code+"]: "+ JSON.stringify(data));
			this.trigger('ErrorSaveCropImage', {"code": code, "data": data});

            //require('App').vent.trigger(AppConsts.EVENT.MODEL.COVER_UPDATE_ERROR, data);
        },

        onSaveError: function(data){
            console.log("Save crop failed: "+ JSON.stringify(data));
			this.trigger('ErrorSaveCropImage', data && data.data ? data.data : {});
            this.destroy();
            //require('App').vent.trigger(AppConsts.EVENT.MODEL.COVER_UPDATE_ERROR, data);
        }


    });

    return CropImagePopupView;
});