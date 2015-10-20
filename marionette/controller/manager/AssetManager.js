/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 31.05.13 20:47
 */

define([
    'underscore'
], function (
    _
) {
    "use strict";

    var AssetManager = function(){
        if(this.initialize){
            this.initialize();
        }
    };
    AssetManager.prototype = {
        collection: {},
        initialize: function () {
            console.log("$ AssetManager initialize");
        },
        add: function(asset, id){
            if(this.collection.hasOwnProperty(id)){
                this.remove(id);
            }
            this.collection[id] = asset;
        },
        get: function(id){
            if(this.collection.hasOwnProperty(id)){
                return this.collection[id];
            }
            return null;
        },
        has: function(id){
            if(this.collection.hasOwnProperty(id) && this.collection[id]){
                return true;
            }
            return null;
        },
        remove: function(id){
            if(this.collection.hasOwnProperty(id)){
                this.destroyItem(id);
                this.collection[id] = null;
            }
        },
        destroyItem: function(id){
            // TODO: destroy popup
            //this.collection[id].destroy();
        }
    };

    return AssetManager;
});