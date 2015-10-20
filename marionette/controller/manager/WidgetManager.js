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

    var WidgetManager = function(){};
    WidgetManager.prototype = {
        collection: {},
        initialize: function () {
        },
        createView: function(viewPath, el){
            require([viewPath], function(View){
                var view = new View({el:el});
                return view;
            });
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

    return WidgetManager;
});