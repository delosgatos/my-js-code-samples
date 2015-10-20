/**
 * Created by d.maljavkin on 07.08.2015.
 */
define([
    'socketio'
    , 'helper/AppConsts'
    , 'underscore'
], function(
    socket
    , AppConsts
    , _
){

    "use strict";

    var SocketIOService = {

        socket: null,
        channels: [],

        initialize: function(host, onConnect, onDisconnect){
            this.socket = socket.connect(host);
            var self = this;
            this.socket.on("connect",   function(){
                onConnect.apply(self, arguments);
            });
            this.socket.on("disconnect", function(){
                onDisconnect.apply(self, arguments);
            });
        },

        subscribe: function(channel, callback){
            if(_.indexOf(this.channels, channel) == -1 && _.isFunction(callback)){
                console.log('-=-=-=-=-=-=-=-=-', channel);
                this.socket.emit(AppConsts.SOCKET.SUBSCRIBE, channel);
                this.socket.on("Event:Socket:notification:" + channel, callback);
                this.channels.push(channel);
            }
        },

        unSubscribe: function(channel){
            var position = _.indexOf(this.channels, channel);
            if(position >= 0){
                this.socket.emit(AppConsts.SOCKET.UNSUBSCRIBE, channel);
                this.socket.removeAllListeners(channel);
                this.channels.splice(position, 1);
            }
        },

        on: function(event, callback){
            this.socket.on(event, callback);
        },

        emit: function(event, data){
            this.socket.emit(event, data);
        }


    };

    return SocketIOService;
});