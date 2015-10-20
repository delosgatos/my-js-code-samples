/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 31.05.13 20:47
 */

define([
    'abstract/view/popup/CommonPopupView'
    ,'jquery'
    ,'underscore'
], function (
    CommonPopupView
    ,$
    ,_
) {
    "use strict";

    var PopupManager = function(){};
    PopupManager.prototype = {
        collection: {},
        initialize: function () {
            console.log("$ PopupManager execute");
            _.bindAll(this
                ,'createAndShowPopup'
            );
        },
        showById: function(id, params){
            if(!this.has(id)){
                return null;
            }
            var popup = this.get(id);
            popup.show(params);
            return popup;
        },
        createAndShowPopup: function(params){
            var id = 'CommonPopupView';
            var popup = this.get(id);
            if(popup === null){
                var popup = new CommonPopupView(params);
                this.add(popup, id);
            }
            popup.show();
        },
        add: function(popup, id){
            if(this.collection.hasOwnProperty(id)){
                this.destroyItem(id);
                this.collection[id] = null;
            }
            this.collection[id] = popup;
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

    return PopupManager;
});