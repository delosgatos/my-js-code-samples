/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 01.08.13 0:08
 */
define([
    'marionette'
    ,'jquery'
    ,'../../../vendor/typofilter'
    ,'./AddVideoPopupView'
    ,'./AddThesisPopupView'
    ,'./AddArticleImagePopupView'
    ,'helper/window'
    ,'../../../vendor/editor/tinymce/tinymce.jquery'
    ,'data.utils'
    ,'utils'
    ,'mustache'
], function (
    Marionette
    ,$
    ,Typofilter
    ,AddVideoPopupView
    ,AddThesisPopupView
    ,AddArticleImagePopupView
    ,window
) {

    "use strict";

    var BlamperTextEditorView = Marionette.ItemView.extend({

        events: {
            'blur .js-main-text':                        'onHtmlBlur'
        },
        triggers: {

        },
        ui: {
            //button:                        '.button'
            textArea:                       '.js-main-text'
            ,snapEditor:                    '.snapeditor_form'
        },

        extra: {},
        editor: null,

        cropPopup: null,
        thesisPopup: null,
        videoPopup: null,

        imagePopupOptions: {},
        ctrlDown: false,

        baseHeight: 400,


        initialize: function (params) {
            _.bindAll(this
                ,"onCropImagePopupClose"
            );
            console.log("-V- BlamperTextEditorView init");
            if(params.extra){
                this.extra = params.extra;
            }
            if(params.imagePopupOptions){
                this.imagePopupOptions = params.imagePopupOptions;
            }
            if (!this.template) {
                this.bindUIElements();
                this.init();
            } else {
                this.render();
            }
        },

        init: function () {

            tinymce.init({
                selector: ".js-main-text"
                ,content_css : "/css/site.css"
                ,body_class: "b-article-text"
                ,language: "ru"
                ,theme: "modern"
                ,plugins: "charmap wordcount visualblocks link videothumb image imagetools fullscreen code table paste hr contextmenu thesis"
                ,toolbar: "undo redo | styleselect | bold italic | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | thesis hr link image videothumb | charmap visualblocks code fullscreen"
                ,image_popup_options: this.imagePopupOptions
                // Spellchecker
                /*spellchecker_languages: "Russian=ru,Ukrainian=uk,English=en",
                spellchecker_rpc_url: "http://speller.yandex.net/services/tinyspell"*/
            });

            //this.initEditor();
        },

        initEditor: function(){
            var _this = this;
            SnapEditor.addStyleButtons({
                "p.cite": { text: "Цитата" }
            });
            SnapEditor.buttons.showHtml = {
                text: "Показать html код",
                html: '<span class="shout">Показать html код</span>',
                action: function (e) {
                    //e.api.activate();
                    _this.showHtml.call(_this, e);
                }
            };
            SnapEditor.buttons.insertCropImage = {
                text: "Вставить изображение",
                html: '<span class="shout">Вставить изображение</span>',
                action: function (e) {
                    if(!e.api.isValid()){
                        // TODO: notification to set cursor into text
                        e.api.activate();
                        //return;
                    }
                    _this.showCropPopup();
                }
            };
            SnapEditor.buttons.insertThesis = {
                text: "Вставить тезис",
                html: '<span class="shout">Вставить тезис</span>',
                action: function (e) {
                    if(!e.api.isValid()){
                        // TODO: notification to set cursor into text
                        e.api.activate();
                        //return;
                    }
                    var options = {};
                    var parent = e.api.getParentElement();
                    if(parent && parent.className == "tezis"){
                        options["text"] = parent.innerText.replace('<br>','\n');
                        parent.setAttribute("data-edit", "true");
                    }else{
                        var text = e.api.getText();
                        if(text){
                            options["text"] = text;
                        }
                    }
                    _this.parent = parent;
                    _this.showThesisPopup(options);
                }
            };
            SnapEditor.buttons.insertVideo = {
                text: "Вставить видео",
                html: '<span class="shout">Вставить видео</span>',
                action: function (e) {
                    if(!e.api.isValid()){
                        e.api.activate();
                    }
                    var options = {};
                    var parent = e.api.getParentElement();
                    if(parent && parent.className == "video"){
                        var $p = $(parent);
                        var $videoFrame = $p.find('iframe')
                        if($videoFrame.length){
                            var video = $videoFrame.attr("src");
                            var url = $.generateVideoUrlFromEmbedLink(video);
                            options["url"] = url;
                        }
                        options["text"] = parent.innerText.replace('<br>','\n');
                        parent.setAttribute("data-edit", "true");
                    }else{
                        var text = e.api.getText();
                        if(text){
                            options["text"] = text.trim();
                        }
                    }
                    _this.parent = parent;
                    _this.showVideoPopup(options);
                }
            };
            SnapEditor.buttons.cleanUp = {
                text: "Очистить форматирование",
                html: '<span class="shout">Очистить форматирование</span>',
                action: function (e) {
                    if(!e.api.isValid()){
                        e.api.activate();
                    }

                    //var select = e.api.select();
                    var select = e.api.selectElementContents(e.api.el);
                    var text = e.api.getText();
                    e.api.delete();
                    text = _this.cleanText(text);
                    if(text) {
                        e.api.insert(text);
                    }
                    e.api.clean();
                    e.api.update();
                }
            };
            var host = "";//(window.jsDebug ? (window.location.protocol + '//' + window.location.hostname + ':90') : "");
            this.editor = new SnapEditor.Form("article-editor", {
				width: "auto",
                path: "/css/snapeditor",
                styles: ["p","p.cite","h2"/*,"p.tezis"*/],
                cleaner: {
                    whitelist: {
                        a: "a[href, title]",
                        BR: "br",
                        embed: "embed",
                        hr: "hr",
                        p: "p[data-blamper, class, data-edit]",
                        h2: "h2",
                        table:"table[data-blamper, data-row, data-table]",
                        btable:"btable[data-blamper, data-row, data-table]",
                        span: "span[data-remove, class]",
                        i: "i[class]",
                        b: "b[class]",
                        insert: "insert",
                        iframe: "iframe[width,height,src,frameborder,allowfullscreen]",
                        Image: "img[title, alt, class, src, width, height, data-html, data-source, data-url, data-type, data-album, data-title, data-hash, data-basename, data-blamper]",
                        "Range Start": "span#RANGE_START",
                        "Range End": "span#RANGE_END",
                        "Image Range": "img#RANGE_IMAGE[src, width, height, data-album, data-title, data-hash, data-blamper]"
                    },
                    ignore: []
                },
                snap: false,
                stylesheets: [
                    host + "/css/snapeditor/css/normalize.css"
                    , host + "/css/snapeditor/css/editor.css"
                ],
                contentClass: "b-article-text",
                toolbar: {
                    items: [
                        "styleBlock", "|",
						"bold", "italic", "strikethrough", "|",
                        "link", "|",
                        "insertThesis", "horizontalRule", "|", //"alignment", "alignLeft", "alignCentre", "alignRight", "alignJustify",
                        "table", "insertCropImage", "insertVideo", "|",
                        "orderedList", "unorderedList", "|",
                        "showHtml", "cleanUp"
                    ]
                }
            });

            setTimeout(function(){
                if(!_this.editor.api){
                    return;
                }
                _this.editor.api.activate();
                _this.editor.api.deactivate();
            },700);

            // EDITOR EVENTS
            this.editor.on("snapeditor.paste", function(e){
                e.originalEvent.preventDefault();
                var doc = _this.$el.find("iframe").get(0).contentWindow.document;
                doc.execCommand('inserttext', false, e.originalEvent.clipboardData.getData('text/plain'));
            });
            this.editor.on("snapeditor.keydown", function(e){
                var vKey = 86, cKey = 67;
                var keycode = e.keyCode ? e.keyCode : e.which;
                if (keycode == 17){
                    _this.ctrlDown = true;
                    return;
                }
                if(!e.api.isValid()){
                    return;
                }

                /*if (_this.ctrlDown && (keycode == vKey)){
                    //e.preventDefault();
console.log("CTRL+V");
                    e.stopImmediatePropagation();
                    var $el = $(e.api.el);
                    var html = $el.html();
                    //var select = e.api.select(null);
                    e.api.delete();
                    if(html == "<p>﻿</p>"){

                        var p = e.api.find("p").pop();
                        e.api.selectEndOfElement(p);

                    }else{
                        var insert = e.api.createElement("insert");
                        insert.innerHTML = "&nbsp;";
                        e.api.insert(insert);
                        e.api.clean();
                    }
                    var doc = _this.$el.find("iframe").get(0).contentWindow.document;
                    var t = doc.getElementById('textBuffer');
                    var $t;
                    //e.api.keepRange(function (startEl, endEl) {
                        //
                        if(!t){
                            t = doc.createElement("div");
                            t.id = "textBuffer";
                            t.setAttribute("contenteditable", 'true');
                            t.style.position = "absolute";
                            t.style.left = "-9999px";
                            doc.body.appendChild(t);
                        }
                        $t = $(t);
                        $t.focus();
                    });

                    setTimeout(function(){
                        e.api.activate();
                        var text = $t.html();
                        $t.html("");
                        if(html == "<p>﻿</p>"){
                            insert = e.api.find("p").pop();
                        }else{
                            insert = e.api.find('insert').pop();
                        }
                        console.log("INSERT: ", insert);
                        debugger;
                        if(!insert){
                            return;
                        }
                        e.api.select(insert);
                        //e.api.delete();
                        insert.parentNode.removeChild(insert);
                        text = _this.cleanText(text);
                        if(text) {
                            e.api.insert(text);
                        }
                        //e.api.insert(text);
                        //var parent = e.api.getParentElement();
                        e.api.clean();
                        e.api.update();
                    },0);

                    return true;
                }*/

                var parent = e.api.getParentElement();
                if(parent && parent.getAttribute("data-blamper")){
                    e.preventDefault();
                    return false;
                }
                if(parent && parent.className == "tezis" && keycode != 8 && keycode != 46){
                    e.preventDefault();
                    return false;
                }
            });
            this.editor.on("snapeditor.mousedown", function(e){
                e = e || window.event;
                _this.mouseButton = e.which;
                switch (e.which) {
                    case 1: //left
                        break;
                    case 2: //middle
                        e.preventDefault();
                        break;
                    case 3: //right
                        e.preventDefault();
                        break;
                }
            });
            this.editor.on("snapeditor.contextmenu", function(e){
                // TODO: detect paste from mouse menu
                //e.preventDefault();
                //return false;
            });
            this.editor.on("snapeditor.keyup", function(e){
                var keycode = e.keyCode ? e.keyCode : e.which;
                if (keycode == 17){
                    _this.ctrlDown = false;
                    return;
                }
            });
            this.editor.on("snapeditor.deactivate", function(e){
                console.log("editor deactivate");
                if(_this.editor.htmlMode){
                    _this.editor.activate();
                }
                e.api.update();
            });
            this.editor.on("snapeditor.activate", function(e){
                console.log("editor activate");
            });
            this.editor.on("snapeditor.update", function(e){
                _this.ui.textArea.trigger("change");
            });
            this.editor.on("snapeditor.focus", function(e){

                //return e.api.activate();
            });

            this.editor.updateTextarea = function(e){
                console.log("update textarea");
                if(_this.editor.htmlMode){
                    return false;
                }
                var content = e.target.innerHTML;
                _this.ui.textArea.val(content).trigger("change");
            }

            this.$el.css({position:"relative"});
            this.baseHeight = parseInt(this.ui.textArea.height());
            //this.setupTextarea();
        },

        cleanText: function(text){
            text = $.clearHtmlText(text);
            text = Typofilter.process(text);
            return text;
        },

        setupTextarea: function(){
            this.ui.textArea.css({
                outline: 'none'
                ,position: 'absolute'
                ,top: '40px'
                ,'z-index': '20'
                ,left: '-99999px'
                ,'overflow-y': 'scroll'
                ,'background': '#eee'
                ,'font-family': '"Lucida Console", Monaco, monospace'
                ,'font-size': "10.5pt"
            });
            console.log(this.baseHeight-40);
            this.ui.textArea.height(this.baseHeight-40);
        },

        showHtml: function(e){
            var left = parseInt(this.ui.textArea.css("left"));
            console.log("LEFT: ", left);
            if(left){
                this.activateTextArea(e);
            }else{
                this.activateEditor(e);
            }
        },

        onHtmlBlur: function(e){
            console.log('textarea blur');
            this.editor.activate();
        },

        activateTextArea: function(e){
            console.log("show html");


            this.editor.htmlMode = true;
            this.setupTextarea();
            this.ui.textArea.focus();
            this.ui.textArea.css({
                top: "100px",
                left: "0px"
            });
        },

        activateEditor: function(e){
            console.log("show visual");
            this.editor.htmlMode = false;

            this.editor.activate();

            var text = this.ui.textArea.val();
            //var e = this.editor;

            var select = e.api.selectElementContents(e.api.el);

            e.api.delete();
            setTimeout(function(){
                e.api.insert(text);
            }, 0);

            //select = e.api.select("all");
            //e.api.clean();
            //e.api.update();
            this.ui.textArea.css({
                left: "-99999px"
            });
        },

        showCropPopup: function () {
            var data = _.extend ( {
                type: 'article'
            }, this.extra );
            data = _.extend({extra: data},this.imagePopupOptions);
            if(!this.cropPopup || !this.cropPopup.show){
                this.cropPopup = new AddArticleImagePopupView(data);
                this.cropPopup.on("Complete", this.onCropSaveComplete, this);
                this.cropPopup.on("Close", this.onCropImagePopupClose, this);
                this.cropPopup.on("ErrorSaveCropImage", this.onErrorSaveCropImage, this);
            }
            this.cropPopup.show(data);
        },

        onCropSaveComplete: function(data){
            console.log('onCropSaveComplete',data);

            var shortDesc = this.cropPopup.getShortDescription();
            var desc = this.cropPopup.getDescription();
            var size = this.cropPopup.cropBox || {width:0, height:0};
            shortDesc = $.translitAndClear(shortDesc);
            var url = data.url;//$.extractImagePathFromHash(data.hash, size.width, size.height);
            var App = require('App');
            /*var debug = App.isDebug;
            if(debug) {
                var l = App.getLocation();
                url = l.protocol + "//" + l.hostname/!* + (debug ? ":90" : "")*!/ + url;
            }*/
            this.editor.api.insert('<p data-blamper="1"><img data-type="image" data-basename="'+shortDesc+'" data-title="'+desc+'" data-album="'+data.hash+'" data-blamper="1" src="'+url+'" /></p>');
            //$(this.photoView.el).BUIHidePreloader();
            //this.photoView.model.set(data);
            //this.photoView.showPreviewImage();
            var _this = this;
            setTimeout(function(){
                _this.editor.api.clean();
                _this.editor.api.update();
                _this.editor.api.activate();
            }, 0);
        },

        onCropImagePopupClose: function(){
            this.trigger("PhotoSelectClosed");
        },

        onErrorSaveCropImage: function(){
            //$(this.photoView.el).BUIHidePreloader();
            $.U.Tooltip('Ошибка обрезки изображения');
        },

        onImageRemoved: function(){
            //this.removeImageFromMediaStore(this.photoView.extraData);
        },

        showVideoPopup: function (options) {
            options = options || {};
            options.extra = $.extend ( {
            }, this.extra );
            if(!this.videoPopup || !this.videoPopup.show){
                this.videoPopup = new AddVideoPopupView(options);
                this.videoPopup.on("Complete", this.onVideoPopupComplete, this);
                this.videoPopup.on("Close", this.onVideoPopupClose, this);
            }
            this.videoPopup.show(options);
        },

        onVideoPopupComplete: function(url, text){
            var text = text ? text.replace(/\n/g,'<br>') : "";
            //var video = $.generateEmbedVideo(url);

            /*if(video == url){
                $.U.Tooltip("Неверная ссылка");
                return;
            }*/
            var el = this.editor.find("[data-edit]");
            var data = this.videoPopup.getData();
            var image = '<img ' +
                'data-type="'+data.type+'" ' +
                'data-album="'+data.hash+'" ' +
                'data-url="'+data.url+'" ' +
                'data-source="'+data.data.source+'" ' +
                'data-title="'+data.data.title.replace(/"/g, '&quot;')+'" ' +
                'data-html="'+data.data.html.replace(/"/g, '&quot;')+'" ' +
                'data-blamper="1" ' +
                'title="'+data.data.title.replace(/"/g, '&quot;')+'" ' +
                'alt="'+text.replace(/"/g, '&quot;')+'" ' +
                'src="'+data.data.thumbnail+'" ' +
                '/>' + (text ? ("<br/>"+ text) : "");
            if(el[0]){
                el[0].innerHTML = image; //$.generateEmbedVideo(url) +"<br>"+ text;
                return;
            }else{
                var v = this.editor.api.createElement("p");
                v.className = "video";
                v.setAttribute("data-blamper", "1");
                v.innerHTML = image; //$.generateEmbedVideo(url) +"<br>"+ text;
                this.editor.api.delete();
                this.editor.api.insert(v);
            }
            var _this = this;
            setTimeout(function(){
                _this.editor.api.clean();
                _this.editor.api.update();
                _this.editor.api.activate();
            }, 0);
        },

        onVideoPopupClose: function(){
            var el = this.editor.api.find("[data-edit]");
            if(el[0]){
                el[0].setAttribute("data-edit", "");
                el[0].removeAttribute("data-edit");
                var _this = this;
                setTimeout(function(){
                    _this.editor.api.clean();
                    _this.editor.api.update();
                    _this.editor.api.activate();
                }, 0);
            }
        },

        showThesisPopup: function (options) {
            options = options || {};
            options.extra = $.extend ( {
            }, this.extra );
            if(!this.thesisPopup || !this.thesisPopup.show){
                this.thesisPopup = new AddThesisPopupView(options);
                this.thesisPopup.on("Complete", this.onThesisPopupComplete, this);
                this.thesisPopup.on("Close", this.onThesisPopupClose, this);
            }
            this.thesisPopup.show(options);
        },

        onThesisPopupComplete: function(text){
            var text = text ? text.replace(/\n/g,'<br>') : "";
            var el = this.editor.find("[data-edit]");
            if(el[0]){
                el[0].innerHTML = text;
                return;
            }else{
                var thesis = this.editor.api.createElement("p");
                thesis.className = "tezis";
                thesis.innerHTML = text;
                    /*'<dl class="remove-button ps_image_del">' +
                    '   <i class="ico ico_reset_small">&nbsp;</i>' +
                    '</dl>' +
                    '<span class="thesis-text">'+text+'</span>';*/
                //var thesis = '<p class="tezis">'+text+'</p>'
                this.editor.api.delete();
                this.editor.api.insert(thesis);
            }
            var _this = this;
            setTimeout(function(){
                _this.editor.api.clean();
                _this.editor.api.update();
                _this.editor.api.activate();
            }, 0);
        },

        onThesisPopupClose: function(){
            var el = this.editor.api.find("[data-edit]");
            if(el[0]){
                el[0].setAttribute("data-edit", "");
                el[0].removeAttribute("data-edit");
                var _this = this;
                setTimeout(function(){
                    _this.editor.api.clean();
                    _this.editor.api.update();
                    _this.editor.api.activate();
                }, 0);
            }
        },

        removeImageFromMediaStore: function(data){
            require('App').execute('Blamper:Media:Delete'
                ,data
                ,this.onRemovePhotoSuccess
                ,this.onRemovePhotoFail
            );
        },

        onImageUploaded: function(data){
            //console.log("Upload image success: "+ JSON.stringify(data));
            this.showCropPopup();
        },

        onRemovePhotoSuccess: function(data){
            //console.log("Blamper remove photo success: "+ JSON.stringify(data));
            //this.photoView.checkImageLoaded();
        },

        onRemovePhotoFail: function(data){
            //console.log("Blamper remove photo failed: "+ JSON.stringify(data));
        },
        onRender: function () {
            this.init();
        }

    });

    return BlamperTextEditorView;
});