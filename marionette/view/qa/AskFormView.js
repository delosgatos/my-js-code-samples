/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 13.06.13 18:51
 */

define([
    'underscore'
    ,'abstract/model/AbstractValidationModel'
    ,'abstract/view/AbstractFormView'
    ,'settings'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'jquery.autocomplete'
    ,'utils'
    ,'data.utils'
], function (
    _
    ,AbstractValidationModel
    ,AbstractFormView
    ,Settings
    ,AppConsts
    ,Analytics
) {

    "use strict";

    var AskFormModel = AbstractValidationModel.extend({

        url: Settings.API.QA.SAVE_QUESTION,

        parse: function(data){
            data = AbstractValidationModel.prototype.parse.apply(this, arguments);
            this.responseFromDraft = _.isEmpty(data);
            return {};
        },

        saveDicussion: function(options){

            //this.set('car', _.extend({}, this.get('car') || {}, this.pick(['mark','model','generation','body','modification'])));
            this.save(options);
        }

    });

    var AskFormView = AbstractFormView.extend({

        modelClass: AskFormModel,

        events: {
            'keydown [data-field=body]':                    'onTextKeyDown'
            ,'keyup [data-field=body]':                     'onTextKeyUp'
            ,'paste [data-field=body]':                     'onTextPaste'
            //,'keypress [data-field=body]':                  'onTextKeyPress'
            ,'focus [data-field=body]':                     'onTextFocus'
            ,'click .js-tags-container':                   'onContainerClick'
            ,'click .js-qa-form-hint-close':               'onFormHintCloseClick'
            ,'click .js-qa-hint-close':                    'onHintCloseClick'
            ,'focusin [data-field]':                       'onFieldFocus'
            ,'focusout [data-field]':                      'onFieldBlur'
        },
        ui: {
            submit:                                     '.js-submit-button'
            ,formHint:                                  '.js-qa-form-hint'
            ,form:                                      'form'
            ,hintArrow:                                 '.js-hint-arrow'
            ,qaHint:                                    '.js-qa-hint'
            ,qaHintContainer:                           '.js-qa-hint-content-container'
            ,title:                                     '[data-field=title]'
            ,text:                                      '[data-field=body]'
            ,tagInput:                                  '.js-tags-text'
            ,tags:                                      '.js-tags-container'

        },

        lastParsedLinks: [],


        init: function () {

            var that = this;

            this.initFieldsFromUI();
            this.addVentEvent(AppConsts.EVENT.CAR.SELECTED, this.onCarSelected);
            /*setTimeout(function(){
                that.initValidation.call(that);
            }, 500);*/

            /*this.ui.tags.UTagsAdd();

            this.ui.tagInput.autocomplete({
                zIndex: 9999,
                minChars: 3,
                dataType: "json",
                deferRequestBy: 100,
                triggerSelectOnValidInput: false,
                preventBadQueries: false,
                //serviceUrl: Settings.API.COMMON.SEARCH,
                serviceUrl: Settings.api.blamper.article.getTagsUrl,
                //resultTemplate: this.ui.resultTemplate.html(),
                //containerClass: 'js-dropdown-list',
                //containerBlock: this.ui.content,
                //containerTemplate: this.ui.containerTemplate.html(),
                formatResult: function (suggestion, currentValue) {
                    return suggestion.name[0].replace(/\[highlight\](.*?)\[\/highlight\]/gi, '<strong>$1<\/strong>');
                },
                transformResult: function(response) {

                    if(response.status > 400
                        || !response.response
                    ) {
                        // TODO: show error
                        return {
                            query: ""
                            , suggestions: []
                        };
                    }
                    /!*var item;
                    for(var i in response.response.list){
                        item = response.response.list[i];
                        if(!item.value) {
                            response.response.list[i].value = item.title && item.title.length ? item.title[0].replace(/\[highlight\](.*?)\[\/highlight\]/gi, '$1') : item.title
                        }
                    }*!/
                    return {
                        query: response.response.query
                        ,suggestions: response.response.value
                    };
                },
                onSelect: function(suggestion){
                    var $el = $(this);
                    $el.val(suggestion.name);
                    that.ui.tags.addTag($el.val(), $el);
                }
            });*/

        },

        getTags: function(){
            var tags = [];
            this.$el.find(".js-tag-item").each(function(){
                tags.push($(this).data('tag'));
            })
            return tags;
        },

        getText: function(){
            return this.ui.text.val();
        },
        getTitle: function() {
            return this.ui.title.val();
        },

        onCarSelected: function(data){
            this.model.set('car', data);
        },

        setTitle: function(val) {
            this.ui.title.val(val);
        },
        showLoading: function(){
            this.$el.UShowPreloader();
        },
        hideLoading: function(){
            this.$el.UHidePreloader();
        },

        parseText: function(){
            var text = this.ui.text.val();
            var links = $.normalizeLinks(text.match($.linkRegex));
            this.trigger('LinkDetected', links, this.lastParsedLinks);
            this.lastParsedLinks = links;
        },

        validateAndSubmit: function() {
            var validate = AbstractFormView.prototype.validateAndSubmit.apply(this, arguments);
            if (validate !== true) {
                require('App').vent.trigger(AppConsts.EVENT.STATISTIC.TRACK, Analytics.QA.CLICK_QUESTION_BUTTON_WITH_ERRORS);
                return;
            }
            this.showLoading();
            if (this.fields["seotags"]){
                this.model.set(this.fields["seotags"].el.name, this.getTags());
            }
            require('App').vent.trigger(AppConsts.EVENT.STATISTIC.TRACK, Analytics.QA.CLICK_QUESTION_BUTTON);
            this.trigger("Publish");
        },

        submit: function(){
            this.submitting = true;
        },

        showExtraContent: function(data){

            /*this.clearExtraContent();
            if(!data || !data.data){
                return;
            }
            if(data.data.icon){
                this.ui.extraLogo.attr("src", data.data.icon);
                this.ui.extraLogo.removeClass("hide");
            }else{
                this.ui.extraLogo.addClass("hide");
            }
            if(data.data.images && data.data.images.length){
                this.ui.extraImageContainer.removeClass("hide");
                this.ui.extraImage.attr("src", data.data.images[0].img);
            }else{
                this.ui.extraImageContainer.addClass("hide");
            }
            if(data.data.title){
                this.ui.extraTitle.html(data.data.title);
            }
            if(data.data.description){
                this.ui.extraContent.html(data.data.description);
            }
            this.ui.extraContainer.removeClass("hide");*/
        },

        clearExtraContent: function(){
            /*this.ui.extraContainer.addClass("hide");
            this.ui.extraImageContainer.addClass("hide");
            //this.ui.extraLogo.attr("src", data.data.icon);
            //this.ui.extraLogo.attr("src", data.data.images[0]);
            this.ui.extraTitle.html("");
            this.ui.extraContent.html("");*/
        },

        onTextFocus: function (e) {
            //this.ui.text.css({background:'#fff'});
        },

        onTextPaste: function (e) {
            var that = this;
            setTimeout(function () {
                that.parseText().bind(that);
            }, 10);
        },

        onTextKeyUp: function (e) {
            var keycode = e.keyCode ? e.keyCode : e.which;
            if (keycode == 13 || keycode == 32 || keycode == 188 || keycode == 190 || e.shiftKey && (keycode == 57 || keycode == 48) || e.ctrlKey && (keycode == 86 || keycode==118 || keycode==88 || keycode==120 || keycode==89 || keycode==121) ) {
                this.parseText();
            }

            this.ui.text.height("auto");
            var area = this.ui.text[0];
            if(area.rows < 20) {
                while (
                area.rows > 1 &&
                area.scrollHeight < area.offsetHeight
                    ) {
                    area.rows--;
                }
                var h = 0;
                while (area.scrollHeight > area.offsetHeight && h !== area.offsetHeight) {
                    h = area.offsetHeight;
                    area.rows++;
                }
                area.rows++;
            }

            this.trigger('Type', e);
        },

        onTextKeyDown: function (e) {
            var keycode = e.keyCode ? e.keyCode : e.which;
            if (e.ctrlKey && keycode == 13) {
                // Ctrl-Enter pressed
                this.ui.form.submit();
            }
        },
        /*onTextKeyPress: function (e) {
            var keycode = e.keyCode ? e.keyCode : e.which;
            if(keycode == 32 || keycode == 13 || keycode == 44 || keycode == 8 || keycode == 46){
                this.parseText();
            }
        },*/

        onResponseSuccess: function(data){
            this.submitting = false;
        },
        onResponseFailed: function(status,data){
            this.submitting = false;
        },
        onResponseError: function( data){
            this.submitting = false;
        },
        onResponseDataError: function(errors){
            this.submitting = false;
        },

        onContainerClick: function(e) {
            this.ui.tagInput.focus();
        },

        onFieldFocus: function(e) {
            var $el = $(e.currentTarget);
            var field = $el.data('field');
            var $hint = this.ui.qaHintContainer.addClass('hide').filter('[data-type='+field+']');
            if($hint.length) {
                this.ui.hintArrow.addClass('b-qa-form-hint-arrow__'+field);
                $hint.removeClass('hide');
            }else{
                this.ui.hintArrow.removeClass(function(index, css){
                    return (css.match (/(^|\s)b-qa-form-hint-arrow__\S+/g) || []).join(' ');
                });
                this.ui.qaHintContainer.filter('[data-type=default]').removeClass('hide');
            }
        },

        onFieldBlur: function(e) {
            var $el = $(e.currentTarget);
            var field = $el.data('field');
            this.ui.hintArrow.removeClass(function(index, css){
                return (css.match (/(^|\s)b-qa-form-hint-arrow__\S+/g) || []).join(' ');
            });
            this.ui.qaHintContainer.addClass('hide').filter('[data-type=default]').removeClass('hide');
        },

        onFormHintCloseClick: function(e) {
            e.preventDefault();
            var $el = $(e.currentTarget);
            var $hint = $el.parents('.js-qa-hint');
            if($hint.data('type') != 'default'){
                $hint.addClass('hide');
                return;
            }
            var $c = $hint.find('.js-qa-hint-content');
            var $cur = $c.filter(':not(.hide)');
            var $next = $cur.next();
            $cur.addClass('hide');
            if(!$next.length){
                $next = $c.first();
            }
            $next.removeClass('hide');
            this.trigger('CloseFormHint');
        },

        onHintCloseClick: function(e) {
            e.preventDefault();
            this.ui.formHint.hide();
            this.trigger('CloseHint');
        },

        onSubmit: function (e) {
            e.preventDefault();
            this.validateAndSubmit();
        },

        onSaveDataError: function(errors){
            this.showErrorsFromData(errors);
        }

    });

    return AskFormView;
});