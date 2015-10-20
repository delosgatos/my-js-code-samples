/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 03.06.13 13:56
 */

define([
    'backbone'
    ,'underscore'
], function(
    Backbone
    ,_
){
    "use strict";

    var AbstractModel = Backbone.Model.extend({

        // TODO: set model name in ancestors
        name: "AbstractModel",

        backup: {},
        ventEvents: {},

        eventNamespace: '',

        constructor : function(data, options){
            if(options && options.hasOwnProperty('eventNamespace')){
                this.eventNamespace = options.eventNamespace
            }
            Backbone.Model.prototype.constructor.apply(this, arguments);
            console.log("@@@CONSTRUCT MODEL: ", this.name, this.cid, this.eventNamespace);
            var that = this;
            require(['App'], function(App){
                that.addVentEvent("System:Model:GetDataFrom:"+that.name, that.onGetData);
            });
            this.on('sync', this.onSync, this);
        },

        backupData: function(){
            this.backup = _.clone(this.attributes);
        },

        restoreBackup: function(){
            this.set(this.backup);
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

        pubNS: function(namespace, event, data){
            var vent = this.getPubSub(namespace);
            if(!vent){
                throw new Error('No event space for publishing event: '+event);
                return;
            }
            vent.trigger.apply(vent, [].slice.call(arguments,1));
        },

        pub: function(event, data){
            var vent = this.getPubSub();
            if(!vent){
                throw new Error('No event space for publishing event: '+event);
                return;
            }
            vent.trigger.apply(vent, arguments);
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

        toJSON: function(){
            return {item: _.clone(this.attributes)};
        },

        onSync: function(model, response){
            this.pub('System:Model:SyncModel:'+this.name, this.changed);
            this.backupData();
        },

        onGetData: function(field, callback){
            var result;
            if(field){
                result = this.get(field);
            }else{
                result = this.toJSON();
            }
            if(callback){
                callback(result);
            }
        },

        parse: function(data){
            return data;
        }

    });

    return AbstractModel;

});