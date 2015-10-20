/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 10.07.13 18:53
 */

define([
    'backbone'
   ,'service/ActionPublisher'
   ,'underscore'
], function (
    Backbone
   ,ActionPublisher
   ,_
) {
    "use strict";

    var AbstractViewMediator = function (params) {
        if (this.initialize) {
            this.initialize(params);
        }
    };
    AbstractViewMediator.extend = Backbone.History.extend;
    AbstractViewMediator.prototype = {

        $el: null,

        inputParams: {},

        ventHandlers:{

        },
        commandHandlers:{

        },
        // TODO: events
        viewsEvents:{
            //'Type form':        'onFormViewType'
        },
        views:{

        },
        eventNamespace:                     '',

        // event handlers for url action events
        actions:{

        },

        region: null,

        moduleEvents: {

        },
        ventEvents: {

        },

        initialize: function (params) {

            this.parseParams(params);

            this.initViews();

            if(this.$el) {
                this.region = new Marionette.Region({
                    el: this.$el
                });
                this.bindViews();
            }
            var eventNamespace = this.$el.data('namespace');
            if(eventNamespace){
                this.eventNamespace = eventNamespace;
            }

            this.bindActionsHandlers();
            this.bindVentHandlers();
            this.bindCommandHandlers();
        },

        parseParams: function(params){
            if(_.isEmpty(params)){
                return false;
            }
            this.inputParams = params;
            _.each(params, function(value, key){
                this[key] = value;
            }, this);
            if(params.el){
                this.$el = $(params.el);
            }
            return true;
        },

        initViews: function(){

        },

        bindViews: function(){
            if(_.isEmpty(this.views)){
                return;
            }
            var i = 0;
            for(i in this.views){
                this.region.attachView(this.views[i]);
            }
            var param;
            for(i in this.viewsEvents){
                param = i.split(' ');
                if(this.views[param[1]]){
                    this.views[param[1]].on(param[0], this[this.viewsEvents[i]], this);
                }
            }
        },

        bindActionsHandlers: function(){
            if(_.isEmpty(this.actions)){
                return;
            }
            _.each(this.actions, function (functionName, action) {
                if (this[functionName]) {
                    ActionPublisher.on(action, this[functionName], this);
                }
            }, this);
        },

        bindVentHandlers: function(){
            if(_.isEmpty(this.ventHandlers)){
                return;
            }
            var vent = require('App').vent;
            _.each(this.ventHandlers, function (functionName, action) {
                if (this[functionName]) {
                    vent.on(action, this[functionName], this);
                }
            }, this);
        },

        // TODO: handlers
        bindCommandHandlers: function(){
            if(_.isEmpty(this.commandHandlers)){
                return;
            }
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

        callServer: function(url, data){
            require('App').callServerApi(url, data);
        },

        addVentEvent: function(event, callback, namespace){
            var vent = this.getPubSub(namespace);
            if(!vent){
                throw new Error('No event space for subscribing event: '+event);
                return;
            }
            this.ventEvents[event] = callback;
            vent.on(event, callback, this);
        }


    };

    return AbstractViewMediator;
});