/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 12:38
 */

define([
    'settings'
    ,'underscore'
    ,'../../vendor/jquery.iframe-transport'
    ,'../../vendor/jquery.fileupload'
    ,'jquery.form'
], function (
    Settings
    ,_
) {
    "use strict";
    var MultipleUploadImageService = function(params){
        if(this.initialize){
            this.initialize(params);
        }
    };
    MultipleUploadImageService.prototype = {

        dispatcher:             null,
        loader:                 null,

        extra:                  {type: "image"},
        uploading:              false,
        fileField:              null,

        initialize: function (params) {
            this.dispatcher = $(this);
            console.log("-S- MultipleUploadImageService initialize");
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
                    this.extra = params.extra;
                }
                if(params.dropZone){
                    this.dropZone = params.dropZone;
                }
                if(params.dispatcher){
                    this.dispatcher = params.dispatcher;
                }
            }
            this.init();
        },

        init: function() {
            console.log("-S- MultipleUploadImageService init");
            var _this = this;
            var $this = this.dispatcher;
            this.fileField.attr("name", "Upload[image][]");
            var options = {
                url: Settings.API.COMMON.UPLOAD_IMAGE, //Settings.api.blamper.media.uploadUrl,
                //sequentialUploads: true,
                formData: this.extra,
                done: function (e, data) {
                    console.log("Upload finished");
                    //data.context.text('Upload finished.');
                    var result;
                    if(data.result && data.result[0] && data.result[0].firstChild && data.result[0].firstChild.innerText){
                        result = $.parseJSON(data.result[0].firstChild.innerText);
                    }else{
                        result = data.result;
                    }
                    _this.onUploadSuccess(result, result.status, data.originalFiles);
                },
                drop: function (e, data) {
                    $this.trigger("Dropped");
                },
                change: function (e, data) {
                    $this.trigger("Selected");
                },
                send: function(e, data){
                    $this.trigger('Sending', data.files.length);
                },
                start: function(e, data){
                    $this.trigger('Started');
                },
                stop: function(e, data){
                    $this.trigger('Stopped');
                }
            };
            if(this.dropZone){
                options.dropZone = this.dropZone;
            }
            if(this.pasteZone){
                options.pasteZone = this.dropZone;
            }
            this.loader = this.fileField.fileupload(options);
        },

        disable: function(){
            var _this = this;
            setTimeout(function(){
                _this.loader.fileupload('disable');
            },0);
        },

        enable: function(){
            var _this = this;
            setTimeout(function(){
                _this.loader.fileupload('enable');
            },0);
        },

        refreshFileField: function(){
            this.fileField.val("");
        },

        onFileSelected: function(e){
            e.preventDefault();
            this.uploading = true;
            //this.fileField.trigger('submit');
        },

        onUploadSuccess: function (data, status, originalFiles) {
            var $this = this.dispatcher;
            this.uploading = false;
            console.log("-S- MultipleUploadImageService file uploaded: "+JSON.stringify(data));
            if(!data || !_.isNumber(data.status)){
                this.onUploadError("No response data");
                return;
            }
            if($.inArray(parseInt(data.status), [500, 501, 502, 503, 504, 505, 506, 507, 509, 510, 511]) != -1){
                this.onUploadError(data.response);
                return;
            }
            if(!data.response || !data.response.length){
                this.onUploadError("No response data");
                return;
            }
            this.refreshFileField();
            $this.trigger("Uploaded", data.response[0], originalFiles);
        },

        onUploadError: function (message) {
            var $this = this.dispatcher;
            this.refreshFileField();
            this.uploading = false;
            console.log("-S- MultipleUploadImageService file upload ERROR");
            $this.trigger("Error", message);
        },

        onUploadProgress: function(event, position, total, percentComplete){
            var $this = this.dispatcher;
            console.log("-S- MultipleUploadImageService FILE UPLOADING: "+percentComplete+"% ");
            $this.trigger("Uploading", percentComplete);
        }

    };

    return MultipleUploadImageService;
});