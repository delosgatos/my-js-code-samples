/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 17.06.13 13:11
 */

define([
    'backbone'
    ,'abstract/view/popup/StandardTemplatePopupView'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
], function (
    Backbone
    ,StandardTemplatePopupView
    ,_
    ,Settings
    ,AppConsts
) {

    "use strict";

    var LENGTH_LIMIT = 200;

    var AddThesisPopupView = StandardTemplatePopupView.extend({

        templateUIAssetId:                  'basic-mini-with-button-and-cancel',
        templateDataAssetId:                'addThesis',

        modelEvents:{
            'change:text':                  'onTextUpdated'
        },
        events:{
            'submit form':                  'onSubmit'
            ,'click .js-submit-button':        'onOkClicked'
            ,'keyup .text-message':         'onTextChanged'
            ,'keydown .text-message':       'onTextKeyDown'
        },

        triggers: {
        },

        ui: {
            form:                               'form'
            ,text:                              '.text-message'
            ,counter:                           '.length-count'
            ,counterWord:                       '.length-count-word'
            ,okButton:                          '.okButton'
        },

        views: {},

        initialize: function (params) {
            if(!params.model){
                this.model = new Backbone.Model();
            }
            StandardTemplatePopupView.prototype.initialize.apply(this, arguments);
            this.render();
            this.updateCounter();
        },

        parseInputParams: function(params){
            if(params.text){
                if(params.text.length > LENGTH_LIMIT){
                    params.text = params.text.substr(0,LENGTH_LIMIT);
                }
                this.model.set("text", params.text);
            }
        },

        serializeData: function(arg){
            var data = StandardTemplatePopupView.prototype.serializeData.apply(this, arguments);
            data.asset = _.extend(data.asset, this.model.toJSON());
            if(this.model.get("text")){
                data.asset.title = data.asset.edit_title;
                data.asset.button.title = data.asset.button.edit_title;
            }
            return data;
        },
        
        init: function () {
            StandardTemplatePopupView.prototype.init.apply(this, arguments);
        },

        start: function () {
            StandardTemplatePopupView.prototype.start.apply(this, arguments);
        },

        show: function (params) {
            StandardTemplatePopupView.prototype.show.apply(this, arguments);
            this.updateCounter();
        },

        destroy: function () {
            this.model.clear();
            this.ui.text.val("");
            StandardTemplatePopupView.prototype.destroy.apply(this, arguments);
        },

        updateCounter: function(){
            var text = this.model.get("text");
            var len = text ? text.length : 0;
            if(this.ui.counterWord.length) {
                this.ui.counterWord.html($.wordByNumber(len, this.ui.counterWord.data("wordforms")));
            }
            this.ui.counter.html(len);
        },

        getText: function(){
            return this.model.get("text");
        },

        onTextKeyDown: function(e){
            var keycode = e.keyCode ? e.keyCode : e.which;
            var text = this.ui.text.val();
            if(text.length >= LENGTH_LIMIT && keycode != 8 && keycode != 46){
                e.preventDefault();
                return;
            }
        },

        onTextChanged: function(e){
            this.model.set("text", this.ui.text.val());
        },

        onTextUpdated: function(model, text){
            this.updateCounter();
        },

        onSubmit: function(e){
            e.preventDefault();
            this.trigger("Complete", this.getText());
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

    return AddThesisPopupView;
});