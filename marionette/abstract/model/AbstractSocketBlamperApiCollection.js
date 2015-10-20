/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 14.05.13 16:44
 */

define([
    'backbone'
    ,'abstract/model/AbstractBlamperApiCollection'
    ,'underscore'
], function (
    Backbone
    ,AbstractBlamperApiCollection
    ,_
) {
    "use strict";

    // TODO: make it work
    var AbstractSocketBlamperApiCollection = AbstractBlamperApiCollection.extend(Backbone.SockCollection.prototype);
    AbstractSocketBlamperApiCollection = AbstractSocketBlamperApiCollection.extend({

        initialize: function () {
            console.log("=M= ConversationsCollection init");
            Backbone.SockCollection.prototype.initialize.apply(this, arguments);
        },

        onSocketStart: function(){
            return Backbone.SockCollection.prototype.onSocketStart.apply(this, arguments);
            //this.fetchSock({reset:false, remove:false});
        },

        fetchSock: function(options) {
            options = options ? _.clone(options) : {};
            if (options.parse === void 0) options.parse = true;
            var success = options.success;
            var collection = this;
            options.success = function(resp) {
                var method = options.reset ? 'reset' : 'set';
                collection[method](resp, options);
                if (success) success(collection, resp, options);
                collection.trigger('sync', collection, resp, options);
            };
            var error = options.error;
            options.error = function(resp) {
                if (error) error(this, resp, options);
                this.trigger('error', this, resp, options);
            };
            return Backbone.SockCollection.prototype.sync.call(this, 'read', this, options);
        },

        sync: function(method, model, options){
            var data = AbstractBlamperApiCollection.prototype.sync.apply(this, arguments);
            return data;
        }

    });

    return AbstractSocketBlamperApiCollection;

});