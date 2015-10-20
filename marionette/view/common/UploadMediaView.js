/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 13.06.13 19:51
 */

define([
    'abstract/view/AbstractItemView'
    ,'service/MultipleUploadImageService'
    ,'underscore'
], function (
    AbstractItemView
    ,MultipleUploadImageService
    ,_
) {

    "use strict";

    var UploadMediaView = AbstractItemView.extend({

        events: {
        },
        ui: {
            fileField:                         'input[type=file]'
        },
        uploader: null,

        init: function () {
            _.bindAll(this
                ,"onBeforeFileSubmited"
                ,"onFileSending"
                ,"onFilesUploaded"
                ,"onUploadSuccess"
                ,"onUploadError"
            );
            this.uploader = new MultipleUploadImageService({
                fileField: this.ui.fileField
				,extra: this.extra
                ,dispatcher: this.$el
            });

            this.uploader.dispatcher
                .on('Started', this.onBeforeFileSubmited)
                .on('Sending', this.onFileSending)
                .on('Stopped', this.onFilesUploaded)
                .on('Uploaded',this.onUploadSuccess)
                .on('Error',   this.onUploadError)
            ;

            /*this.ui.form.find('input')
                .mouseenter(function(e){ $(this).siblings('.bl_bt_info').addClass('bl_bt_info__active'); })
                .mouseleave(function(e){ $(this).siblings('.bl_bt_info').removeClass('bl_bt_info__active'); })
            ;*/
        },

        onBeforeFileSubmited: function(e){
            console.log("file uploading Started");
			//this.ui.uploaderBtn.BUIShowPreloader();
        },


        onFileSending: function(e){
            console.log("file is sending");
            this.trigger("StartUploading");
        },

        onFilesUploaded: function(e){
            console.log("all file uploaded");
			//this.ui.uploaderBtn.BUIHidePreloader();
        },

        onUploadSuccess: function(e, data){
            console.log("file uploaded");
            this.trigger('Uploaded', data);
        },

        onUploadError: function(e, data){
            console.log("file upload error");
        }

    });

    return UploadMediaView;
});