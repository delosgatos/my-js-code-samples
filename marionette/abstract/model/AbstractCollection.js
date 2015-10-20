/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 03.06.13 13:56
 */

define([
    'backbone'
], function(
    Backbone
){
    "use strict";

    var AbstractCollection = Backbone.Collection.extend({

        // TODO: set model name in ancestors
        name: "AbstractCollection",

        constructor : function(){
            Backbone.Collection.prototype.constructor.apply(this, arguments);
            require('App').systemEvents
                .on("System:Model:GetDataFrom:"+this.name, this.onGetData, this)
            ;
        },

        onGetData: function(field, callback, context){
            if(callback){
                if(context){
                    callback.call(context, this.toJSON());
                }else{
                    callback(this.toJSON());
                }
                return true;
            }
            return false;
        }

    });

    return AbstractCollection;

});