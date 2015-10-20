/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'abstract/view/popup/TemplatePopupView'
    ,'view/article/ArticleWidgetView'
    ,'abstract/model/AbstractValidationModel'
    ,'view/common/UploadMediaView'
    ,'view/common/MultipleMediaView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'settings'
], function (
    TemplatePopupView
    ,ArticleWidgetView
    ,AbstractValidationModel
    ,UploadMediaView
    ,MultipleMediaView
    ,AppConsts
    ,Analytics
    ,Settings
) {

    "use strict";


    var AnswerModel = AbstractValidationModel.extend({
        url:  Settings.API.QA.SAVE_ANSWER
    });

    var EditAnswerPopupView = TemplatePopupView.extend({

        answerModel: null,

        content: {},
        templateDataAssetId:                    'editAnswer',

        events:{
            'click .js-submit-button':          'onSubmitClick'
           ,'keyup textarea':                   'onKeyUp'
           ,'click .js-extra-remove':           'onExtraRemoveCLick'
        },

        triggers: {
        },

        ui: {
            submit:                             '.js-submit-button'
            ,mediaList:                         '.js-media-viewer'
            ,uploader:                          '.js-uploader'
            ,text:                              'textarea'
            ,extraContainer:            '.js-extra-container'
            ,extraImage:                '.js-extra-image'
            ,extraTitle:                '.js-extra-title'
            ,extraContent:              '.js-extra-description'
        },

        init: function () {

            _.bindAll(this
                ,'onSaveSuccess'
            );

            this.views = {
                addMedia:      new UploadMediaView({
                    el: this.ui.uploader
                    , extra:this.extra
                })
                ,mediaView:     new MultipleMediaView({
                    el: this.ui.mediaList
                    , showImages:true
                })
            };

            this.answerModel = new AnswerModel(this.extra);
            this.answerModel.on('SaveSuccess', this.onSaveSuccess, this);

            if(this.views.addMedia) {
                this.views.addMedia
                    .on("Uploaded", this.onImageUploaded, this)
                ;
            }
            if(this.views.mediaView){
                this.views.mediaView.initImageListsFromArrays({albumFiles:this.albumFiles});
            }

            this.addVentEvent(AppConsts.EVENT.QA.EDIT_ANSWER, this.onEditAnswerData);
        },

        actualizeModel: function(){
            var send = _.clone(this.extra);
            send[this.ui.text.attr('name')] = this.ui.text.val();
            if(this.views.mediaView) {
                send['files'] = this.views.mediaView.getImagesHashes();
            };
            this.answerModel.set(send);
        },

        show: function(data){
            TemplatePopupView.prototype.show.apply(this, arguments);
            this.views.mediaView.imageTemplate = this.dataForAsset.image_template;
            this.clear();
            this.answerModel.set('answer_id', data.id);
            this.answerModel.set('question_id', data.question_id);
            this.ui.text.val(data.text);
            if(data.files && data.files.length){
                this.processParsedMedia(data.files);
            }
        },

        parseText: function(){
            var text = this.ui.text.val();
            var links = $.normalizeLinks(text.match($.linkRegex));
            this.onLinkDetected(links, this.lastParsedLinks);
            this.lastParsedLinks = links;
        },

        showExtraContent: function(data){
            this.clearExtraContent();
            if(!data){
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
            this.ui.extraContainer.addClass("hidden");
            this.ui.extraImage.addClass("hidden");
            //this.ui.extraLogo.attr("src", data.data.icon);
            //this.ui.extraLogo.attr("src", data.data.images[0]);
            this.ui.extraTitle.html("");
            this.ui.extraContent.html("");
            this.views.mediaView.clearExtra();
        },

        onLinkDetected: function(allLinks, lastLinks){
            var newLinks = _.difference(allLinks, lastLinks);
            if(!newLinks || !newLinks.length){
                var unused = _.difference(lastLinks, allLinks);
                if(unused.length){
                    //this.views.mediaView.removeUsingUrlList(unused);
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
            var parsed = this.views.mediaView.getParsedMedia();
            for(var i in data){
                if(parsed[data[i].hash]){
                    delete parsed[data[i].hash];
                }
                data[i].type = data[i].type || AppConsts.TYPE.MEDIA.IMAGE_UPLOADED;
                this.addParsedMedia(data[i]);
            }
            for(i in parsed){
                // TODO: remove unused images
                //this.views.mediaView.removeImageFromStageByHash(parsed[i]);
            }
        },

        addParsedMedia: function(data){
            var inserted = false;
            if(data.type == AppConsts.TYPE.MEDIA.VIDEO){
                inserted = this.views.mediaView.addVideo(data, true);
            }else if(data.type == AppConsts.TYPE.MEDIA.IMAGE_UPLOADED){
                inserted = this.views.mediaView.addImage(data, AppConsts.TYPE.MEDIA.IMAGE_UPLOADED, true);
            }else if(data.type == AppConsts.TYPE.MEDIA.IMAGE_LINK){
                inserted = this.views.mediaView.addImageFromLink(data, true);
            }else{
                this.views.mediaView.addExtra(data);
            }
            this.checkValid();
            return inserted;
        },

        checkValid: function () {
            if(!this.ui.text.val() && !this.views.mediaView.getCount()) {
                this.ui.text.UShowInvalidField();
                this.ui.submit.UDisableButton();
                return false;
            }
            this.ui.submit.UEnableButton();
            this.ui.text.UHideInvalidField();
            return true;
        },

        onPaste: function (e) {
            var that = this;
            setTimeout(function () {
                that.parseText().bind(that);
            }, 10);
        },

        onKeyUp: function(e){
            var keycode = e.keyCode ? e.keyCode : e.which;
            if (keycode == 13 || keycode == 32 || keycode == 188 || keycode == 190 || e.shiftKey && (keycode == 57 || keycode == 48) || e.ctrlKey && (keycode == 86 || keycode==118 || keycode==88 || keycode==120 || keycode==89 || keycode==121) ) {
                this.parseText();
            }
            this.checkValid();
        },

        onExtraRemoveCLick: function(e){
            this.clearExtraContent();
            this.checkValid();
        },

        clear: function(){
            this.ui.text.val("");
            this.views.mediaView.clear();
            this.answerModel.clear();
        },

        onTypeText: function(text){

        },

        onSubmitClick: function(e){
            e.preventDefault();
            if(!this.checkValid()){
                return;
            }
            this.actualizeModel();
            this.answerModel.save();
        },

        onImageUploaded: function(data){
            //this.dynamicForm.addImage(data);
            this.views.mediaView.addImage(data);
            this.checkValid();
        },

        onSaveSuccess: function(data){
            //this.views.askForm.hideLoading();
            this.clear();
            this.pub(AppConsts.EVENT.QA.EDIT_ANSWER_SUCCESS, data);
            this.destroy();
        },

        onSaveError: function(data){
        },

        onSaveFailed: function(data){
        },


    });

    return EditAnswerPopupView;
});