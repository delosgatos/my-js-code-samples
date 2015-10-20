/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.04.2015 16:02
 */

define([
    'abstract/view/AbstractItemView'
    ,'service/UploadImageService'
    ,'helper/AppConsts'
    ,'settings'
    ,'underscore'
    ,'cropper'
], function (
    AbstractItemView
    ,UploadImageService
    ,AppConsts
    ,Settings
    ,_
) {

    "use strict";

    var CropImageView = AbstractItemView.extend({

        uploadUrl: /*Settings.API.ADMIN_HOST +*/ Settings.API.COMMON.UPLOAD_IMAGE,
        saveUrl: /*Settings.API.ADMIN_HOST +*/ Settings.API.ADMIN.ARTICLE.SAVE_COVER,
        removeUrl: /*Settings.API.ADMIN_HOST +*/ Settings.API.ADMIN.ARTICLE.REMOVE_COVER,

        events: {
            'Uploaded .js-file-field':      'onUploadSuccess'
           ,'Error .js-file-field':         'onUploadError'
            ,'click .js-submit-button':     'onSubmit'
            ,'click .js-remove-button':     'onRemove'
        },

        sendParams:{

        },

        triggers: {},

        ui: {
            fileField:      '.js-file-field'
            ,big:           '.js-big-image'
            ,mid:           '.js-mid-image'
            ,min:           '.js-min-image'
            ,x:             '[data-field=cropX]'
            ,y:             '[data-field=cropY]'
            ,width:         '[data-field=cropW]'
            ,height:        '[data-field=cropH]'
            ,hash:          '[data-field=coverHash]'
            ,form:          'form'
            ,fields:        '[data-field]'
            ,submit:        '.js-submit-button'
        },

        categoryTemplate: "",

        minSize: [50,50],
        aspectRatio: 1,
        noCrop: false,

        init: function () {
            _.bindAll(this
                , 'onUploadSuccess'
                , 'onUploadError'
                , 'onSaveSuccess'
                , 'onSaveError'
            );

            if(!this.noCrop) {
                if (!this.ui.x.length) {
                    this.$el.append('<input type="hidden" name="crop[x]" value="" data-field="cropX" />');
                }
                if (!this.ui.y.length) {
                    this.$el.append('<input type="hidden" name="crop[y]" value="" data-field="cropY" />');
                }
                if (!this.ui.x.length) {
                    this.$el.append('<input type="hidden" name="crop[width]" value="" data-field="cropW" />');
                }
                if (!this.ui.y.length) {
                    this.$el.append('<input type="hidden" name="crop[height]" value="" data-field="cropH" />');
                }
            }

            if(!this.ui.y.length){
                this.$el.append('<input type="hidden" name="cover" value="" data-field="coverHash" />');
            }
            this.unbindUIElements();
            this.bindUIElements();

            var that = this;
            this.file = new UploadImageService( {
                form:       	this.ui.form
                ,fileField:  	this.ui.fileField
                ,extra:      	this.sendParams
                ,uploadUrl:		this.uploadUrl
            } );
            if(this.noCrop){
                return;
            }
            this.ui.big.cropper({
                aspectRatio: this.aspectRatio,
                preview: ".js-img-preview",
                checkImageOrigin: false,
                autoCrop: false,
                crop: function(data) {
                    that.ui.x.val(data.x);
                    that.ui.y.val(data.y);
                    that.ui.width.val(data.width);
                    that.ui.height.val(data.height);
                }
            });

            this.cropApi = this.ui.big.data('cropper');
        },

        destroy: function(){
            if(!this.noCrop) {
                this.cropApi.destroy();
            }
            this.file.destroy();
            AbstractItemView.prototype.destroy.call(this);
        },

        updateAfterLoad: function(){

        },

        onUploadSuccess: function (e, data) {
            this.ui.hash.val(data.hash);
            if(this.noCrop) {
                return;
            }
            var App = require('App');
            var l = App.getLocation();
            var debug = App.isDebug;
            this.cropApi.enable();
            this.cropApi.clear();
            this.cropApi.replace(data.url);
        },

        onUploadError: function (data) {

        },

        onSubmit: function(e){
            e.preventDefault();
            this.ui.submit.UShowPreloader();
            var data = {};
            this.ui.fields.each(function(){
                var $el = $(this);
                data[$el.attr('name')] = $el.val();
            });
            require('App').callServerApi(this.saveUrl, data, {
                success: this.onSaveSuccess
                ,error: this.onSaveError
            });
        },

        onSaveSuccess: function(data){
            this.ui.submit.UHidePreloader();
            this.trigger(CropImageView.SAVE_SUCCESS, data);
        },

        onSaveError: function(data){
            this.ui.submit.UHidePreloader();
            this.trigger(CropImageView.SAVE_ERROR, data);
        },

        onRemove: function(e){
            e.preventDefault();

            var data = {};
            var $hash = this.ui.fields.filter('[data-field=coverHash]');
            data[$hash.attr('name')] = $hash.val()
            require('App').callServerApi(this.removeUrl, data);
            if(this.noCrop) {
                return;
            }

            this.cropApi.enable();
            this.cropApi.replace("http://fakeimg.pl/568x390/?text=Blamper&font=lobster");
            this.cropApi.disable();
        }

    });
    CropImageView.SAVE_SUCCESS = "SaveSuccess";
    CropImageView.SAVE_ERROR = "SaveError";

    return CropImageView;


});