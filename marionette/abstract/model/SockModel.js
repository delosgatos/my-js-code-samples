/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 17.03.14 18:21
 */

define([
    'marionette'
    ,'service/SocketProxy'
], function (
    Marionette
    ,SocketProxy
) {

    "use strict";

    var SockModel = Backbone.Model.extend({
        initialize: function(){
            var _this = this;
            /*SocketConnector.initialize(Settings.api.blamper.socket.url, function(){
                _this.onSocketStart();
            });*/
            Backbone.Model.prototype.initialize.apply(this, arguments);
        },
        sendCommand: function(command, data, options){
            //SocketConnector.sendCommand(command, data, options);
        },
        onSocketResponse: function(resp){
            var options = {reset:false};
            var method = options.reset ? 'reset' : 'set';
            var collection = this;
            collection[method](resp, options);
            //if (success) success(collection, resp, options);
            collection.trigger('sync', collection, resp, options);
        },
        onSocketStart: function(){
            var name = this.model.prototype.name;
            //name = "*";
            var packet = [
                'user.' + require('App').params.user.id,
                name,
                name
            ];
            //SocketConnector.socket.subscribe(packet, this.onSocketResponse);
        },
        /*sync: function(method, model, options){
            return SocketConnector.sync.apply(this, arguments);
        }*/
    });

    return SockModel;
});