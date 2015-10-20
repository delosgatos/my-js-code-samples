/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 24.05.13 16:13
 */

define([
    './AbstractItemView'
    ,'underscore'
    ,'utils'
    ,'jquery.form'
], function (
    AbstractItemView
    ,_
) {

    "use strict";

    var AbstractFormView = AbstractItemView.extend({

        submitting: false,
        hasInitValidation: true,

        modelEvents:{
            'validated:valid':              "onValidated"
            ,'validated:invalid':           "onValidateError"
            ,'change:invalid':              "onExternalCheck"
        },

        constructor : function(){
            if(!this.fields){
                this.fields = {};
            }
            _.bindAll(this
                ,'onElementChanged'
                ,'onSubmit'
            );
            AbstractItemView.prototype.constructor.apply(this, arguments);


            //Allow Passing In Fields by extending with a fields hash
            if (!this.fields) throw new Error("Fields Must Be Provided");
            if (!this.model) this.model = new Backbone.Model();
            //this.listenTo(this.model, 'change', this.changeFieldVal,this);
            //this.model.on('change', this.changeFieldVal, this);

            if (this.data){
                this.model.set(this.data);
            }

            if(this.model.validation){
                this.validation = this.model.validation;
            }

            if(this.fillFromHtml){
                this.fillModelFromForm(false, true);
            }

            //Attach Events to preexisting elements if we don't have a template
            if (!this.template){
                if(arguments[0] && arguments[0].fillModel){
                    this.fillModelFromForm(false, !this.hasInitValidation);
                }
                //this.runInitializers();
            }
            //this.on('item:rendered',this.runInitializers, this);
            this.model.on('SaveSuccess', this.onSaveSuccess, this);
            this.model.on('SaveError', this.onSaveError, this);
            this.model.on('SaveFailed', this.onSaveFailed, this);
            this.model.on('FetchSuccess', this.onResponseSuccess, this);
            this.model.on('FetchFail', this.onResponseFailed, this);
            this.model.on('FetchError', this.onResponseError, this);
            this.model.on('FetchDataError', this.onResponseDataError, this);
            if(this.ui && this.ui.form) {
                this.ui.form.on('submit', this.onSubmit);
            }else if(this.el.tagName.toLowerCase() == "form"){
                this.$el.on('submit', this.onSubmit);
            }else{
                this.$el.find('form').on('submit', this.onSubmit);
            }
        },

        initValidation: function () {
            Backbone.Validation.bind(this, {
                valid: this.onChangedWithoutError,
                invalid: this.onChangedWithError
            });
        },

        removeFieldsFromValidation: function(fields){
            if(!this.validation){
                return;
            }
            this.model.validation = _.omit(this.model.validation, fields);
        },
        addFieldsToValidation: function(fields){
            if(!this.validation){
                return;
            }
            _.extend(this.model.validation, _.pick(this.validation, fields));
        },

        setValidateOnlyVisibleFields: function(){
            if(!this.fields){
                return false;
            }
            var $fields = $(_.pluck(_.values(this.fields), 'el'));
            var fieldNames = $.makeArray($fields.filter(':visible').map(function(){
                return $(this).data('field');
            }));
            this.model.validation = _.pick(this.validation, fieldNames);
        },

        blockSubmit: function(){
            this.$el.find('.js-submit-button').attr('disabled', 'disabled').addClass('b-btn__disabled');
        },

        unblockSubmit: function(){
            this.$el.find('.js-submit-button').removeAttr('disabled').removeClass('b-btn__disabled');
        },

        submit: function(){
            this.submitting = true;
            this.model.save();
        },

        validateAndSubmit: function(){
            var errors = this.validateFields();
            if(errors.length){
                return errors;
            }
            this.submit();
            return true;
        },

        onSubmit: function(e){
            e.preventDefault();
            //var isValid = this.model.isValid(true);
            var valid = this.validateAndSubmit();

            if(valid === true) {
                this.showLoading();
                return;
            }
        },

        /*
        changeFieldVal : function(model, fields) {
            if(!_.isEmpty(fields)) {
                var modelProperty = Object.keys(fields.changes);
                this.inputVal(modelProperty, this.model.get(modelProperty));
            }
        },

        initFieldsFromModel : function () {
            _(this.fields).each(function(options, field) {
                var value = this.model.get(field),
                    elem = this.$('[data-field="'+field+'"]');
                elem.on("change", )
                var val = this.inputVal(elem, value);
                *//*if(!value && val){
                 this.model.set(field, val);
                 }*//*
                if (options.autoFocus) elem.focus();
            },this);
        },*/


        checkFieldError: function(val, errors){
            var rule;
            for(var i in errors){
                rule = i;
                var not = false;
                if (rule.indexOf("!") == 0) {
                    not = true;
                    rule = rule.substr(1);
                }
                if (rule == "email") {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var test = re.test(val);
                    if ((!test && not) || (!test && not)) {
                        return i;
                    }
                } else if (rule.indexOf('length') > -1) {
                    var exp = rule.replace('length', val.length);
                    var check = eval(exp);
                    if ( (!check && not) || (check && !not) ){
                        return i;
                    }
                    /*if(rule.indexOf('>=')>-1){
                     parts = rule.split(">=");
                     val = parseInt(parts[2]);
                     if(val>=)
                     }*/
                } else if (rule.indexOf('value') > -1) {
                    var exp = rule.replace('value', val);
                    var check = eval(exp);
                    if ( (!check && not) || (check && !not) ){
                        return i;
                    }
                }
            }
            return false;
        },

        validateField: function(el, noShowError){
            var i, errors, $el = $(el);
            var val = $el.val();
            var $labels = $( '[data-rule]', $el.parent() );
            if(!$labels.length){
                errors = $el.data('errors')
            }else {
                var errors = [];
                $labels.each(function(){
                    errors.push($(this).data('rule'));
                });
            }
            i = this.checkFieldError(val, errors);
            if(i !== false && !noShowError){
                this.showErrorLabel($el, errors[i]);
            }else{
                this.showOkLabel($el);
            }
            return i === false ? true :errors[i];
        },

        validateFields: function(noShowError){
            var errors = [];
            _.each(this.fields, function(field, i){
                var z = this.validateField(field.el, noShowError);
                z === true ? null : errors.push({el:field.el, error: z, name:i});
            }, this);
            return errors;
        },

        showErrorLabel: function (field, text){
            if(!field){
                return;
            }
            text = _.isArray(text) ? text[0] : text;
            var $parent = $(field).parents('.e-input-wrapper');
            $parent.removeClass("e-input-wrapper__valid").addClass("e-input-wrapper__invalid");
            var $labels = $parent.find('.js-field-error');
            if($labels.length) {
                var $error = $labels.filter(function (item) {
                    return $(item).data("rule") == "error";
                });
                $error = $error.length ? $error : $labels.first();
                $error.each(function (index, item) {
                    var $er = $(this);
                    $er.removeClass("hide").removeClass("hidden");
                    $er.find('.fico-checked').removeClass('fico-checked').addClass('fico-exclamation');
                    var $message = $er.find(".js-field-error-message");
                    if($message.length) {
                        $message.html(text);
                    }else{
                        $er.html(text);
                    }
                });
                $labels.not($error).each(function(){
                    var $er = $(this);
                    $er.find('.fico-exclamation').removeClass('fico-exclamation').addClass('fico-checked');
                });
            }else{
                var $parent = $(field).parents('[data-error]');
                $parent
                    .removeClass("e-input-wrapper__valid")
                    .addClass('e-input-wrapper__invalid')
                    .data('error', text)
                ;
            }
        },

        showOkLabel: function (field){
            if(!field){
                return;
            }
            var $parent = $(field).parents('.e-input-wrapper');
            $parent.removeClass("e-input-wrapper__invalid").addClass("e-input-wrapper__valid");
            var $labels = $parent.find('.js-field-error');
            $labels.removeClass("hide").removeClass("hidden");
            $labels.find('.fico-exclamation').removeClass('fico-exclamation').addClass('fico-checked');
            var $message = $labels.find(".js-field-error-message");
            if($message.length) {
                $message.html("");
            }else{
                $labels.html("");
            }
        },

        hideErrorLabel: function (field){
            if(!field){
                return;
            }
            var $parent = $(field).parents('.e-input-wrapper');
            $parent.removeClass("e-input-wrapper__invalid");
        },

        bindUIElements: function(){
            AbstractItemView.prototype.bindUIElements.call(this);
            this.initFields();
        },

        initFields : function () {
            var _this = this;
            _(this.fields).each(function(options, field) {
                // TODO: check it, was: this.$ ??
                var $el = this.$('[data-field="'+field+'"]');
                _this.activateElement($el);
            },this);
            //this.$el.find('select').USelectorActivate();
            //this.$el.UActivateBacklightElements();
        },

        initFieldsFromUIOnce: _.once(function(){
           this.initFieldsFromUI();
        }),

        initFieldsFromUI : function () {
            var _this = this;
            this.$el.find('[data-field]').each(function(options, field) {
                var $el = $(this)
                var field = $el.data("field");
                _this.fields[field] = {el: $el.get(0)};
                _this.activateElement($el);
            },this);
            //this.$el.find('select').USelectorActivate();
            //this.$el.UActivateBacklightElements();
        },

        activateElement: function($el){
            var that = this;
            /*if($el.is('select')){
             $el.USelectorActivate();
             }*/
            //this.checkAutoFocus($el);
            if($.inArray(["input", "number"], $el.attr("type"))){
                $el.on("keydown", function(e){
                    that.onElementKeyDown(e);
                });
            }
            $el.on("change", function(e){
                that.storeElementChange(e.currentTarget);
            }).on("keyup", function(e){
                that.storeElementChange(e.currentTarget);
            }).on("focus", function(e){
                $(e.currentTarget).UFormFieldErrorHide();
            });
        },

        checkAutoFocus: function($el){
            if($el.attr('autofocus')){
                $el.focus();
                return true;
            }
            return false;
        },

        storeElementChange: function(el, options){
            var $el = $(el);
            var val = this.inputVal($el);
            var def = {validate:false, forceUpdate: true};

            //var name = $el.data('field');
            var name = $el.attr('name');

            var d = {};
            d[name] = val;
            if(name.indexOf('[') > -1){
                var field = name.substr(0,name.indexOf('['));
                var oldVal = this.model.get(field);
                var old = {};
                old[field] = oldVal;
                d = $.objectToUrlParams(d);
                d = $.getUrlParamsAsObject(d);
                if(oldVal && _.isObject(d)){
                    d = $.extend(true, old, d);
                }
            }
            this.model.set(d, _.extend(def, options));
        },

        fillModelFromForm : function (fireEvent, noValidate) {
            this.model.set(
                this.serializeFormData()
                ,{
                    validate: noValidate ? false : true
                    ,forceUpdate: true
                    ,silent: fireEvent ? false : true
                }
                ,{
                    startup: true
                }
            );
        },

        serializeFormData : function () {
            var data = {}, self = this;

            _(this.fields).each(function (object, field) {
                data[object.el.name || field] = self.inputVal(field);
            });

            data = $.objectToUrlParams(data);
            data = $.getUrlParamsAsObject(data);

            return data;
        },

        inputVal : function(input, val) {
            //takes field name or jQuery object
            var el = input.jquery ? input : (this.$el ? this.$el.find('[data-field="'+input+'"]') : this.$('[data-field="'+input+'"]'));
            var self = this, mode = typeof val === 'undefined' ? 'get' : 'set';

            if (el.data('fieldtype') === 'object'){
                if (mode === 'get') val = {};
                el.find('[data-property]').each(function(){
                    var elem = $(this);
                    var prop = elem.attr('data-property');
                    if (mode === 'get'){
                        val[prop] = self.inputVal(elem);
                    } else if (val){
                        self.inputVal(elem, val[prop]);
                    }
                });
            } else if (el.data('fieldtype') === 'array'){
                if (mode === 'get') val = [];
                el.find('[data-index]').each(function(){
                    var elem = $(this);
                    var index = elem.data('index');
                    if (mode === 'get'){
                        val[index] = self.inputVal(elem);
                    } else if (val){
                        self.inputVal(elem, val[index]);
                    }
                });
            } else if (el.is('input')) {
                var type = el.attr('type') || "text";
                var inputType = type.toLowerCase();
                switch (inputType) {
                    case "radio":
                        if (mode === 'get'){
                            val = el.val();
                        } else {
                            el.prop('checked', !!val);
                        }
                        break;
                    case "checkbox":
                        if (mode === 'get'){
                            val = el.is(':checked') ? 1 : 0;
                        } else {
                            el.prop('checked', !!val);
                        }
                        break;
                    default :
                        if (mode === 'get'){
                            val = $.trim(el.val());
                        } else {
                            el.val(val);
                        }
                        break;
                }
            } else {
                if (el.is('textarea')){
                    if (mode === 'get'){
                        val = el.val();
                    } else {
                        el.text(val);
                    }
                }
                if (el.is('select')) {
                    if (mode === 'get'){
                        val = $.trim(el.val());
                    } else {
                        el.val(val);
                    }
                }
                //Handle Select / MultiSelect Etc
                //@todo
            }

            return val;
        },

        showLoading: function(){
            $.U.ShowGlobalPreloader();
        },

        hideLoading: function(){
            $.U.HideGlobalPreloader();
        },

        showErrorsFromData: function(fields){
            var f, $el;
            for(var i in fields){
                f = fields[i];
                $el = this.$el.find('[data-field]').filter('[name='+i+']');
                if($el.length){
                    this.showErrorLabel($el, f[0]);
                }
            }
        },

        /**
         * Model field change event validated with no errors handler
         * @param view
         * @param attr
         */
        onChangedWithoutError: function(view, attr) {
            //var $el = _this.ui[attr];
            //$el.BUIFormFieldErrorHide();
        },

        /**
         * Model field change event validated with errors handler
         * @param view
         * @param attr
         */
        onChangedWithError: function(view, attr){
            //var $el = _this.ui[attr];
            //$el.UFormFieldErrorShow(error);
        },

        onElementKeyDown: function(e){
            var $el = $(e.currentTarget);
            var charCode = e.charCode || e.keyCode,
                character = String.fromCharCode(charCode);
            var type = $el.data("type");
            if(type == "number"){
                if(charCode == 27){
                    $el.val("").trigger("change");
                }
                if((charCode < 48 && charCode != 8 && charCode != 13) || (charCode > 57 && charCode < 96) || charCode > 105){
                    e.preventDefault();
                }
            }
        },

        onElementChanged: function(e){
            this.storeElementChange(e.currentTarget);
        },

        onSaveSuccess: function(data){
            this.submitting = false;
            this.hideLoading();
            if(data && data.errors){
                this.onSaveDataError(data.errors);
                return false;
            }
            return true;
        },
        onSaveDataError: function(errors){
            this.submitting = false;
            this.hideLoading();
        },
        onSaveFailed: function(data){
            this.submitting = false;
            this.hideLoading();
        },
        onSaveError: function(data){
            this.submitting = false;
            this.hideLoading();
        },
        onResponseSuccess: function(data){
            this.submitting = false;
            this.hideLoading();
        },
        onResponseFailed: function(status,data){
            this.submitting = false;
            this.hideLoading();
        },
        onResponseError: function( data){
            this.submitting = false;
            this.hideLoading();
        },
        onResponseDataError: function(errors){
            this.submitting = false;
            this.hideLoading();
        },

        onExternalCheck: function(model, fields){
            this.showErrorsFromData(fields);
        },

        onValidated: function(model){
            console.log("!VALID!");
        },

        onValidateError: function(model, fields){
            if(!fields){
                return;
            }
            var f;
            for(var i in fields){
                f = fields[i];
                if(this.ui.hasOwnProperty(i)){
                    var $el = this.ui[i];
                    this.showErrorLabel(f[0]);
                }
            }
        },

        onShow: function () {
            //console.log("-V- AbstractFormView show");
            this.start();
        },

        onRender: function () {
            //console.log("-V- AbstractFormView render");
            this.init();
        }

        /*
        beforeFormSubmit : function (e) {
            var success = _.isEmpty(errors);
            if (success) {
                if (_.isFunction(this.onSubmit)) return this.onSubmit.apply(this, [e]);
            } else {
                if (_.isFunction(this.onSubmitFail)) this.onSubmitFail.apply(this, [errors]);
                e.stopImmediatePropagation();
                return false;
            }
        },

        onFieldEvent : function(evt) {
            this.handleFieldEvent(evt, evt.type);
        },

        handleFieldEvent : function(evt, eventName) {
            var el = evt.target || evt.srcElement,
                field = $(el).attr('data-field'),
                fieldOptions = this.fields[field];

            if (fieldOptions && fieldOptions.validateOn === eventName) {
                var errors = this.validateField(field);
                if (!_.isEmpty(errors) && _.isFunction(this.onValidationFail)) this.onValidationFail(errors);
            }
        },



        submit : function () {
            this.form.submit();
        },

        bindFormEvents : function() {
            var form = (this.$el.is('form')) ? this.$el : this.$('form').first();
            this.form = form;

            this.$('input')
                .blur(_(this.onFieldEvent).bind(this))
                .keyup(_(this.onFieldEvent).bind(this))
                .keydown(_(this.onFieldEvent).bind(this))
                .change(_(this.onFieldEvent).bind(this));

            form.submit(_(this.beforeFormSubmit).bind(this));
        },

        runInitializers : function() {
            this.populateFields();
            this.bindFormEvents();
            if (_.isFunction(this.onReady)) this.onReady();
        },
        */

    });

    return AbstractFormView;
});