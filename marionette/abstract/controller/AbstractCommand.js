/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 26.03.2015 14:07
 */

define([
    'backbone'
], function (
    Backbone
) {

    "use strict";

    var AbstractCommand = function(data){
        if(this.parseParamsToVars){
            this.parseParamsToVars.apply(this, arguments);
        }
        if(this.initialize){
            this.initialize.apply(this, arguments);
        }
    };
    AbstractCommand.prototype = {

        eventNamespace: '',
        ventEvents: [],

        initialize: function(data){

        },

        parseParamsToVars: function(params){
            _.each(params, function(value, key){
                this[key] = value;
            }, this);
        },

        getPubSub: function(namespace){
            var vent;
            if(namespace || namespace !== "" && this.eventNamespace){
                vent = require('App').getEventSpace(namespace || this.eventNamespace);
            }else {
                vent = require('App').vent;
            }
            return vent;
        },

        changeEventNamespace: function(namespace){
            this.eventNamespace = namespace;
        },

        pub: function(event, data){
            var vent = this.getPubSub();
            if(!vent){
                throw new Error('No event space for publishing event: '+event);
                return;
            }
            console.log("->->-> PUBLISHING EVENT: ", event, data);
            vent.trigger.apply(vent, arguments);
        },

        pubNS: function(namespace, event, data){
            var vent = this.getPubSub(namespace);
            if(!vent){
                throw new Error('No event space for publishing event: '+event);
                return;
            }
            console.log("->->-> PUBLISHING NS ["+namespace+"] EVENT: ", event, data);
            vent.trigger.apply(vent, [].slice.call(arguments,1));
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

    AbstractCommand.extend = Backbone.Model.extend;

    return AbstractCommand;


});