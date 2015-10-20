/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 21.04.2014 12:10
 */

define([

], function (

) {

    "use strict";

    var ActionPublisher = {
        trigger: function(action, value){
            require('App').vent.trigger("Event:Action:"+action, value);
        },
        on: function(action, callback, context){
            require('App').vent.on("Event:Action:"+action, callback, context);
        }
    };

    return ActionPublisher;
});