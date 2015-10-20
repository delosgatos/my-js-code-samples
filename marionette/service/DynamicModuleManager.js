/**
 * @project MediaDog
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.01.2015 19:01
 */

define([
    'underscore'
    ,'./PubSub'
], function (
    _
    ,PubSub
) {
    "use strict";


    var DynamicModuleManager = function(){
    };

    DynamicModuleManager.EVENT_LOADED = 'Module:Loaded';
    DynamicModuleManager.EVENT_NOT_LOADED = 'Module:NotLoaded';
    DynamicModuleManager.EVENT_ALL_LOADED = 'Module:AllLoaded';

    DynamicModuleManager.prototype = _.extend(new PubSub(), {

        collection: {},
        toLoad: [],

        initialize: function () {
        },
        addToLoadStack: function(path){
            this.toLoad.push(path);
        },
        markLoaded: function(path){
            if(this.hasLoaded(path)){
                var index = _.indexOf(this.toLoad, path);
                this.toLoad[index] = null;
                this.toLoad.splice(index, 1);
                this.trigger(DynamicModuleManager.EVENT_LOADED, this.toLoad, path);
                if(!this.toLoad.length){
                    this.trigger(DynamicModuleManager.EVENT_ALL_LOADED, this.toLoad, path);
                }
            }
        },
        markNotLoaded: function(path){
            if(this.hasLoaded(path)){
                var index = _.indexOf(this.toLoad, path);
                this.toLoad[index] = null;
                this.toLoad.splice(index, 1);
                this.trigger(DynamicModuleManager.EVENT_NOT_LOADED, this.toLoad,path);
                if(!this.toLoad.length){
                    this.trigger(DynamicModuleManager.EVENT_ALL_LOADED, this.toLoad, path);
                }
            }
        },
        hasLoaded: function(value) {
            var index = -1,
                length = this.toLoad.length;

            while (++index < length) {
                if (this.toLoad[index] === value) {
                    return true;
                }
            }
            return false;
        },
        add: function(module, name){
            if(this.collection.hasOwnProperty(name)){
                this.destroyItem(name);
                this.collection[name] = null;
            }
            this.collection[name] = module;
        },
        get: function(name){
            if(this.collection.hasOwnProperty(name)){
                return this.collection[name];
            }
            return null;
        },
        has: function(name){
            return this.collection.hasOwnProperty(name);
        },
        remove: function(name){
            if(this.collection.hasOwnProperty(name)){
                this.destroyItem(name);
                this.collection[name] = null;
            }
        },
        destroyItem: function(name){
            if( !this.has(name) || !this.collection[name].destroy ){
                return false;
            }
            this.collection[name].destroy();
            return true;
        }
    });

    return DynamicModuleManager;
});