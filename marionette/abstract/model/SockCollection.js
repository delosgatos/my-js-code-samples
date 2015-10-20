/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 17.03.14 18:21
 */

define([
    'backbone'
    ,'service/SocketProxy'
], function (
    Backbone
    ,SocketProxy
) {

    "use strict";


    var SockCollection = Backbone.Collection.extend({

        sockMessageTypes: null,
        socketConnection: null,

        initialize: function(){
            _.bindAll(this
                ,'onSocketResponse'
            );
            //var _this = this;
            /*SocketConnector.initialize(Settings.api.blamper.socket.url, function(){
                _this.onSocketStart();
            });*/
            this.socketConnection = require('App').Socket;
            Backbone.Collection.prototype.initialize.apply(this, arguments);

        },
        setSockMessageTypes: function(value){
            this.sockMessageTypes = value;
        },
        sendCommand: function(command, data, options){
            //SocketProxy.sendCommand(command, data, options);
        },
        socketFilter: function(resp){
            return resp;
        },
        parse: function(data) {
            this.trigger("Response", data);
            data = Backbone.Collection.prototype.parse.apply(this, arguments);
            return data;
        },
        onSocketResponse: function(resp){
            this.trigger("Response", resp);
            resp = this.socketFilter(resp);

            console.log("@@@SOCKET@@@ Collection RESPONSE: "+JSON.stringify(resp));

            if(resp === false){
                return;
            }
            var options = { reset:false, parse:true, remove:false };
            var method = options.reset ? 'reset' : 'set';
            var collection = this;
            collection[method](resp, options);
            //if (success) success(collection, resp, options);
            collection.trigger('sync', collection, resp, options);
        },
        subscribe: function(entity, entityId, channel){
            console.log("@@@SOCKET@@@ Collection "+entity +"."+(channel?channel+".":"")+ entityId +", "+ JSON.stringify(this.sockMessageTypes));
            SocketProxy.subscribe(entity, entityId, this.sockMessageTypes, this.onSocketResponse, channel);
        },
        callSocket: function(functionName, arg1, arg2, arg3, arg4, arg5, arg6){
            SocketProxy.callSocket.apply(SocketProxy, arguments);
            //this.socketConnection.callSocket.apply(this.socketConnection, arguments);
        }

        /*sync: function(method, model, options){
            return SocketProxy.sync.apply(this, arguments);
        }*/
    });

    return SockCollection;
});