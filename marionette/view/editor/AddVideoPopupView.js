/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 17.06.13 13:11
 */

define([
    'backbone'
    ,'underscore'
    ,'abstract/view/popup/TemplatePopupView'
    ,'view/common/MultipleMediaView'
    ,'settings'
    ,'helper/AppConsts'
    ,'data.utils'
], function (
    Backbone
    ,_
    ,TemplatePopupView
    ,MultipleMediaView
    ,Settings
    ,AppConsts
) {

    "use strict";


    var AddVideoPopupView = TemplatePopupView.extend({

        templateUIAssetId:                  'basic-buttons',
        templateDataAssetId:                'addVideo',

        modelEvents:{
            'change:url':                   'onUrlUpdated'
           //,'change:text':                  'onTextUpdated'
        },
        events:{
            'submit form':                  'onSubmit'
            ,'click .js-submit-button':     'onOkClicked'
            ,'keyup .text-message':         'onTextChanged'
            ,'blur .text-message':          'onTextChanged'
            ,'keydown .text-message':       'onTextKeyDown'
            ,'paste .video-link':           'onLinkPaste'
            ,'keyup .video-link':           'onLinkChanged'
            ,'blur .video-link':            'onLinkChanged'
        },

        triggers: {
        },

        ui: {
            form:                          'form'
            ,url:                          '.video-link'
            ,text:                         '.text-message'
            ,counter:                      '.length-count'
            ,counterWord:                  '.length-count-word'
            ,okButton:                     '.okButton'

            ,mediaView:                    '.js-media-viewer'
        },

        views: {},


        parseInputParams: function(params){
            if(params.url){
                this.model.set("url", params.url);
            }
            if(params.text){
                this.model.set("text", params.text);
            }
        },

        serializeData: function(arg){
            var data = TemplatePopupView.prototype.serializeData.apply(this, arguments);
            data.asset = _.extend(data.asset, this.model.toJSON());
            if(this.model.get("url")){
                data.asset.title = data.asset.edit_title;
                data.asset.button.title = data.asset.button.edit_title;
            }
            return data;
        },
        
        initProcess: function () {
            if(!this.model){
                this.model = new Backbone.Model();
            }
            var url = this.getUrl();
            var text = this.getText();
            if(url){
                this.ui.url.val(url);
            }
            if(text){
                this.ui.text.val(text);
            }
            this.render();
        },

        start: function () {
            TemplatePopupView.prototype.start.apply(this, arguments);
        },

        show: function (params) {
            TemplatePopupView.prototype.show.apply(this, arguments);
            this.views.mediaView = new MultipleMediaView({
                el: this.ui.mediaView
                , showImages: true
                , extra: this.extra
                , imageTemplate: this.dataForAsset.image
                , videoTemplate: this.dataForAsset.video
            });
        },

        destroy: function () {
            this.views.mediaView.clear();
            this.model.clear();
            this.ui.url.val("");
            this.ui.text.val("");
            TemplatePopupView.prototype.destroy.apply(this, arguments);
        },

        getEmbedVideo: function(){
            var url = this.getUrl();
            return $.generateEmbedVideo(url);
        },

        getData: function(){
            return this.ui.mediaView.find('img').data('params');
        },

        getUrl: function(){
            return this.model.get("url");
        },

        getText: function(){
            return this.model.get("text");
        },

        parseLink: function(){
            this.model.set("url", this.ui.url.val());
            this.views.mediaView.parseText(this.getUrl());
        },

        onTextKeyDown: function(e){
            //var keycode = e.keyCode ? e.keyCode : e.which;
            //var text = this.ui.text.val();
            /*if(text.length >= LENGTH_LIMIT && keycode != 8 && keycode != 46){
                e.preventDefault();
                return;
            }*/
        },

        onLinkChanged: function(e){
            var keycode = e.keyCode ? e.keyCode : e.which;
            if (keycode == 13 || keycode == 32 || keycode == 188 || keycode == 190 || e.shiftKey && (keycode == 57 || keycode == 48) || e.ctrlKey && (keycode == 86 || keycode==118 || keycode==88 || keycode==120 || keycode==89 || keycode==121) ) {
                this.parseLink();
            }
        },

        onTextChanged: function(e){
            this.model.set("text", this.ui.text.val());
        },

        onUrlUpdated: function(model, url){
            //this.ui.url.val(url);

        },

        onLinkPaste: function (e) {
            var that = this;
            setTimeout(function () {
                that.parseLink.call(that);
            }, 10);
        },

        /*onTextUpdated: function(model, text){
            this.ui.text.val(text);
        },*/

        onSubmit: function(e){
            e.preventDefault();
            this.trigger("Complete", this.getUrl(), this.getText());
            this.hide();
        },

        onOkClicked: function(e){
            e.preventDefault();
            this.ui.form.submit();
        },

        onCancelClicked: function(e){
            e.preventDefault();
            this.hide();
        }


    });

    return AddVideoPopupView;
});