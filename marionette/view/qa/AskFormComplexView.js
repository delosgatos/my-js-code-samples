/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 27.05.2015 12:17
 */

define([
    'abstract/view/AbstractItemView'
    ,'view/common/UploadMediaView'
    ,'view/common/MultipleMediaView'
    ,'./AskFormView'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'settings'
], function (
    AbstractItemView
    ,UploadMediaView
    ,MultipleMediaView
    ,AskFormView
    ,AppConsts
    ,Analytics
    ,Settings
) {

    "use strict";

    var AskFormComplexView = AbstractItemView.extend({

        events: {
        },

        triggers: {},

        ui: {
            mediaList:                  '.js-media-viewer'
            ,uploader:                  '.js-uploader'
        },

        views:{

        },
        init: function () {

            var hide = $.getCookie('hide-qa-hint');
            if(!hide){
                // TODO: uncomment when expert block will be ready
                //this.$el.find('.qa-form-hint').removeClass('hide');
            }
            this.views = {
                askForm:      new AskFormView({
                                    el: this.$el
                                  , extra:this.extra
                                  , fillFromHtml: this.fillFromHtml
                               })
               ,addMedia:      new UploadMediaView({
                                    el: this.ui.uploader
                                  , extra:this.extra
                               })
               ,mediaView:     new MultipleMediaView({
                                    el: this.ui.mediaList
                                  , showImages:true
                                  , extra:this.extra
                               })
            };
            var initModel = { };
            if(this.question_id){
                initModel["question_id"] = this.question_id;
            }
            if(this.views.askForm) {
                this.views.askForm.model.set(initModel);
                this.views.askForm.model
                    .on('SaveSuccess', this.onSaveSuccess, this)
                    .on('SaveError', this.onSaveError, this)
                    .on('SaveFailed', this.onSaveFailed, this)
                ;
                this.views.askForm
                    .on("Type", this.onTypeText, this)
                    .on("Publish", this.onPublish, this)
                    .on("LinkDetected", this.onLinkDetected, this)
                    .on("CloseHint", this.onCloseHint, this)
                ;
            }
            if(this.views.addMedia) {
                this.views.addMedia
                    .on("Uploaded", this.onImageUploaded, this)
                ;
            }
        },

        actualizeModel: function(){
            if(!this.views.askForm) {
                return;
            }
            var text = this.views.askForm.model.get("text");
            var send = {};
            if(this.views.mediaView) {
                send['files'] = this.views.mediaView.getImagesHashes();
            };
            this.views.askForm.model.set(send);
        },

        clear: function(){
            this.views.mediaView.clear();
        },

        onCloseHint: function(e){
            $.setCookie('hide-qa-hint', true);
        },
        onTypeText: function(text){

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
                    ,error: this.onParseLinksError.bind(this)
                }
            );
        },

        onParseLinksSuccess: function(data){
            if(!data || !data.response || !data.response.length){
                return;
            }
            data = data.response;
            for(var i in data){
                if(data[i].type == "url"){
                    this.views.askForm.showExtraContent(data[i]);
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
            }else if(data.type == AppConsts.TYPE.MEDIA.IMAGE_LINK){
                inserted = this.views.mediaView.addImageFromLink(data, true);
            }else{
                this.views.mediaView.addExtra(data);
            }
        },

        onPublish: function(e){
            this.actualizeModel();
            if(this.views.askForm) {
                this.views.askForm.model.saveDicussion();
            }
        },

        onImageUploaded: function(data){
            //this.dynamicForm.addImage(data);
            this.views.mediaView.addImage(data);
        },

        onSaveSuccess: function(data){
            if(this.views.askForm && data.errors){
                if(data.errors.email && data.errors.email[0] == "Пользователь с таким E-mail уже зарегистрирован."){
                    require('App').sendAnalytics(Analytics.QA.SHOW_LOGIN_BEFORE_ASK);
                    this.pub(AppConsts.EVENT.POPUP.SHOW_SIGNIN, {email:data.errors.email[0], noRedirectOnSuccess:true} );
                }
                return;
            }
            this.views.askForm.showLoading();
            //this.views.askForm.hideLoading();
            var d = data;
            if (!this.question_id) {
                var event = require('App').params.user ? Analytics.QA.ASK_QUESTION : Analytics.QA.ASK_QUESTION_UNREGISTERED;
                require('App').sendAnalytics(event);
                if(!require('App').params.user) {
                    require('App').sendAnalytics(Analytics.REGISTRATION.STEP2);
                }
                require('App').redirect(d.redirect, null, null, null, 500);
            }else{
                require('App').redirect(d.redirect);
            }
        },

        onSaveError: function(data){
        },

        onSaveFailed: function(data){
        },

        onSigninSuccess: function(){
            this.actualizeModel();
            if(this.views.askForm) {
                this.views.askForm.showLoading();


                require('App').sendAnalytics(Analytics.QA.AUTH_COMPLETE_BEFORE_ASK);

                this.views.askForm.model.unset('email');
                this.views.askForm.model.saveDicussion();
            }
        }

    });

    return AskFormComplexView;


});