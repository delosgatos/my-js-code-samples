/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.08.13 12:15
 */

define([
    'marionette'
    ,'jquery'
    ,'underscore'
    ,'helper/AppConsts'
], function (
    Marionette
    ,$
    ,_
    ,AppConsts
) {

    "use strict";

    var AbstractItemView = Marionette.ItemView.extend({

        autoParsingParams:                  true,
        firstRender:                        true,
        inited:                             false,
        useNativeRender:                    true,
        noRenderOnStart:                    false,
        onlyDecorator:                      false,

        bindUI:                             {},

        ventEvents:                         {},

        backupHtml:                         null,

        inputParams:                        {},


        eventNamespace:                     '',

        twigRenderer:                       true,        
        rendered:                           false,


        moduleEvents: {

        },

        constructor: function(params){
            this.inputParams = params;
            if(this.autoParsingParams) {
                this.parseParamsToVars(params);
            }

            if(this.modelClass){
                var mo = {
                    eventNamespace: this.eventNamespace
                };
                this.model = new this.modelClass(null, mo);
            }

            this.parseParams(params);

            Marionette.ItemView.prototype.constructor.apply(this, arguments);

            console.log("@@@CONSTRUCT VIEW: ", this.cid, this.eventNamespace);

            _.bindAll( this
                , 'onNeedDestroy'
            );
            this.$el.on('DestroyModule', this.onNeedDestroy);
            this.$el.on('DomUpdated', this.onDomUpdated);
            var that = this;
            if($.isReady) {
                this.onReady();
            }else{
                $(function(){
                    that.onReady.call(that);
                });
            }
            if(this.bindModel){
                this.bindUI = this.$el.find('[data-bind]').each(function(){
                    var $el = $(this);
                    that.bindUI[$el.data('bind')] = $el;
                });
                require('App').vent.on('System:Model:SyncModel:'+this.bindModel, this.onSyncBindModel, this);
            }

            this.subscribeExportImport();
            console.log("INIT_MODULES_LOADED: ", this.cid);
            this.addVentEvent(AppConsts.EVENT.SYSTEM.MODULES_LOADED, this.onInitModulesLoaded, this.eventNamespace);
        },

        bindUIElements: function() {
            var eventNamespace = this.$el.data('namespace');
            console.log("bind ui elements: ", this.cid, eventNamespace);
            if(eventNamespace){
                this.eventNamespace = eventNamespace;
                /*if(this.model){
                    console.log("view ["+this.cid+"] init namespaced model: ", this.model.cid, eventNamespace);
                    this.model.changeEventNamespace(eventNamespace);
                }*/
            }

            Marionette.ItemView.prototype.bindUIElements.apply(this, arguments);
        },

        triggerModule: function(event, data){
            if(!this.moduleEvents){
                return;
            }
            if(!this.moduleEvents[event] || !this[this.moduleEvents[event]] || !_.isFunction(this[this.moduleEvents[event]])){
                return;
            }
            this[this.moduleEvents[event]](data);
        },

        getPubSub: function(namespace){
            var vent;
            if(namespace || namespace !== "" && this.eventNamespace){
                console.log("--EVENT SPACE: ", namespace, this.eventNamespace);
                vent = require('App').getEventSpace(namespace || this.eventNamespace);
            }else {
                console.log("--EVENT SPACE just vent");
                vent = require('App').vent;
            }
            return vent;
        },

        changeEventNamespace: function(namespace){
            this.eventNamespace = namespace;
        },

        triggerDomNestedModules: function(event, data){
            return this.$el.UTriggerChildModules(event, data);
        },

        pubNS: function(namespace, event, data){
            console.log("--PUBLISH NS EVENT: "+event);
            var vent = this.getPubSub(namespace);
            if(!vent){
                throw new Error('No event space for publishing event: '+event);
                return;
            }
            vent.trigger.apply(vent, [].slice.call(arguments,1));
        },

        pub: function(event, data){
            console.log("--PUBLISH EVENT: "+event);
            var vent = this.getPubSub();
            if(!vent){
                throw new Error('No event space for publishing event: '+event);
                return;
            }
            vent.trigger.apply(vent, arguments);
        },

        redirect: function(url, hash, noRefresh, title, timeout, showPreloader){
            var App = require('App');
            require('App').redirect.apply(App, arguments);
        },

        callServer: function(url, data, options){
            require('App').callServerApi(url, data, options);
        },

        addVentEvent: function(event, callback, namespace){
            var vent = this.getPubSub(namespace);
            if(!vent){
                throw new Error('No event space for subscribing event: '+event);
                return;
            }
            this.ventEvents[event] = callback;
            vent.on(event, callback, this);
        },

        initialize: function (params) {
            this.bindVentEvents();
            if (!this.template || this.noRenderOnStart) {
                this.bindUIElements();
                this.init();
            } else {
                this.render();
            }
            this.inited = true;
        },

        bindVentEvents: function(){
            if(this.ventEvents){
                var f;
                for(var i in this.ventEvents){
                    f = this[this.ventEvents[i]];
                    if(!f || !_.isFunction(f)){
                        continue;
                    }
                    this.addVentEvent(i, this[this.ventEvents[i]]);
                }
            }
        },

        parseParamsToVars: function(params){
            for(var i in params){
                this[i] = params[i];
            }
        },

        parseParams: function(params){
            if(!params){
                return false;
            }
            var res = this.parseInputParams(params);
            return res !== false ? true : false;
        },

        parseInputParams: function (params) {
            return true;
        },

        init: function () {

        },

        onNeedExportView: function(html, data){
            this.exportHtmlAndData();
        },

        getName: function(){
            return this.name || (this.model ? this.model.name : "");
        },

        subscribeExportImport: function(){
            var name = this.getName();
            if(name) {
                console.log("==IMPORT_VIEW== SUBSCRIBE IMPORT: ", name, this.eventNamespace);
                this.addVentEvent("IMPORT_VIEW:" + name, this.onImportView);
                this.addVentEvent(AppConsts.EVENT.SYSTEM.NEED_EXPORT_VIEWS, this.onNeedExportView);
            }
        },

        exportHtmlAndData: function(){
            this.pubNS(this.eventNamespace, AppConsts.EVENT.SYSTEM.EXPORT_VIEW, this.getName(), this.$el.html(), _.clone(this.model.attributes));
        },

        importView: function(html, data){
            console.log('==IMPORT_VIEW== (WidgetCacheService) importView ['+this.getName()+']: ', this.eventNamespace);
            this.model.set(data);
            this.$el.html(html);
            this.bindUIElements();
            require('App').parser.parse(this.$el.children());
        },

        onImportView: function(html, data){
            this.importView(html, data);
        },

        doRender: function(){

            if(this.twigRenderer){

            }

            var render = Marionette.ItemView.prototype.render.apply(this, arguments);
            this.backupView();
            this.rendered = true;
            return render;


        },

        render: function(){
            if(this.useNativeRender){
                return this.doRender();
            }
            var render = this.customRender();
            this.backupView();
            return render;
        },

        reRender: function(){
            if(this.useNativeRender){
                return this.doRender();
            }
            this.customRender({
                processHtmlCallback :this.processHtmlForRerender
            });
            this.backupView();
        },

        backupView: function(){
            this.backupHtml = this.$el.html();
        },

        customRender: function(options){

            this.isClosed = false;

            this.triggerMethod("before:render", this);
            this.triggerMethod("item:before:render", this);

            var data = this.serializeData();
            data = this.mixinTemplateHelpers(data);

            var template = this.getTemplate();
            var html = Marionette.Renderer.render(template, data);

            if(options && options.processHtmlCallback && _.isFunction(options.processHtmlCallback)){
                options.processHtmlCallback(html);
            }else{
                this.processHtml(html);
            }
            this.bindUIElements();

            this.triggerMethod("render", this);
            this.triggerMethod("item:rendered", this);

            return this;

        },

        processHtml: function(html){
            this.setElement($(html));
        },

        processHtmlForRerender: function(html){
            html = $(html).children();
            this.$el.html(html);
        },

        onRender: function () {
            if(!this.inited) {
                this.init();
            }
            this.firstRender = false;
        },

        onDomUpdated: function($el){
            this.unbindUIElements();
            this.bindUIElements();
        },

        onNeedDestroy: function(el){
            if(this.el != el){
                return false;
            }
            this.close();
            return true;
        },

        /**
         * Fires when dom is ready
         * or if it's happened already
         * before initialize
         */
        onReady: function () {

        },

        onInitModulesLoaded: function () {

        },

        onSyncBindModel: function(changed){
            if(!this.bindUI){
                return;
            }
            for(var i in changed){
                if(this.bindUI[i]){
                    this.bindUI[i].html(changed[i]);
                }
            }
        }

    });

    return AbstractItemView;
});