/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.01.2015 19:02
 */


define([

], function (

) {
    "use strict";
    var PubSub = function(){
        this.init();
    }
    PubSub.prototype = {
        constructor: PubSub,
        init: function(){
            this.cache = {};
        },
        trigger: function(/* String */topic, /* Array? */args){
            //debugger;
            if(this.cache[topic] === undefined) return;
            try{
                $.each(this.cache[topic], function(){
                    this.apply($, args || []);
                });
            } catch (err) {
                // handle this error
                console.log(err);
            }
        },
        on: function(/* String */topic, /* Function */callback){
            if(!this.cache[topic]){
                this.cache[topic] = [];
            }
            this.cache[topic].push(callback);
            return [topic, callback]; // Array
        },
        off: function(/* Array */handle){
            var t = handle[0], cache = this.cache;
            cache[t] && $.each(cache[t], function(idx){
                if(this == handle[1]){
                    cache[t].splice(idx, 1);
                }
            });
        }
    };

    return PubSub;
});