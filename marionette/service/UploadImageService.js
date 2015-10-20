/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 12:38
 */

define([
    'marionette'
    ,'settings'
    ,'underscore'
    ,'jquery.form'
    ,'utils'
    ,'data.utils'
], function (
    Marionette
    ,Settings
    ,_
) {

    "use strict";
    var UploadImageService = function(params){
        if(this.initialize){
            this.initialize(params);
        }
    };
    UploadImageService.prototype = {
        extraData:  {},
        uploading:  false,
        fileField:  'input[type=file]',
        url:        Settings.api.blamper.media.uploadUrl,
        initialize: function (params) {
            console.log("-S- UploadImageService initialize");
            _.bindAll(this
                ,'onFileSelected'
                ,'onUploadSuccess'
                ,'onUploadProgress'
            );
            if(params){
                if(params.fileField){
                    this.fileField = params.fileField
                }
                if(params.extra){
                    this.addExtraData( params.extra );
                }
                if(params.uploadUrl){
                    this.url = params.uploadUrl;
                }
                if(params.form){
                    this.$form = $(params.form);
                }
            }
            this.init();
        },

        addExtraData: function(data){
            _.extend(this.extraData, data);
        },

        init: function() {
            console.log("-S- UploadImageService init");
            var _this = this,
				hash = $.extractImageHashFromPath( _this.extraData.image );
            // TODO: detect possibility of file drop, save to model and update visual state from model

            _this.fileField.attr("name", "Upload[image][]");
            _this.fileField.on('change', this.onFileSelected);

            this.initFromHash(hash);
        },

        initFromHash: function(hash){
            if (hash) {
                var fakeData =  [{
                    url: $.extractImagePathFromHash(hash),
                    hash: hash
                }];
                this.fileField.trigger("Uploaded", fakeData);
            }
        },

        upload: function(){
            var that = this;
            this.uploading = true;
            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                }
            });
            console.log("Upload image: "+this.url);

            this.$form.ajaxSubmit({
                url: this.url
                ,type: 'POST'
                ,data: this.extraData
                ,dataType: 'json'
                ,success: this.onUploadSuccess
                ,uploadProgress: this.onUploadProgress
                ,error: function(xhr, status, err){
                    var mess = JSON.stringify(xhr);
                    var messageText = "Ошибка загрузки. Возможно, файл испорчен.";//xhr.responseText;//JSON.stringify();
                    console.log("!!! FILE UPLOADING ERROR: "+mess);
                    that.onUploadError.call(that, messageText);
                }
            });
        },

        refreshFileField: function(){
            this.fileField.val("");
        },

        onFileSelected: function(e){
            e.preventDefault();
            this.upload();
        },

        onUploadSuccess: function (data, status) {
            this.uploading = false;
            console.log("-V- UploadImageService file uploaded");
            if(!data || !_.isNumber(data.status)){
                this.onUploadError("Ошибка загрузки. Попробуйте снова.");
                return;
            }
            if(parseInt(data.status) < 0){
                this.onUploadError(data.response);
                return;
            }
            if(!data.response){
                this.onUploadError("Ошибка загрузки. Попробуйте снова.");
                return;
            }
            if(data.response.error){
                this.onUploadError(data.response.error);
                return;
            }
            if(!data.response.length){
                this.onUploadError("Ошибка загрузки. Попробуйте снова.");
                return;
            }
            this.refreshFileField();
            this.fileField.trigger("Uploaded", data.response[0]);
        },

        onUploadError: function (message) {
            this.refreshFileField();
            this.uploading = false;
            console.log("-S- UploadImageService file upload ERROR", message);
            this.fileField.trigger("Error", message);
			$.U.Tooltip(message);
        },

        onUploadProgress: function(event, position, total, percentComplete){
            console.log("FILE UPLOADING: "+percentComplete+"% ");
            this.fileField.trigger("Uploading", percentComplete);
        },

        destroy: function(){
            this.fileField.off();
        }

    };

    return UploadImageService;
});