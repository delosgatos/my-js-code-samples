/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 24.09.13 14:42
 */


define([
    'helper/AppConsts'
    ,'helper/window'
    ,'settings'
    //,'metrika'
	//,'plugin/optimizely'
], function (
    AppConsts
    ,window
    ,Settings
	//,Optimizely
){
    "use strict";


    var StatisticsProxy = {

        init: function(vent){
            var that = this;
            require(['metrika'],function(){
                console.log('-=METRIKA LOADED=-');
            });
            vent
                .on(AppConsts.EVENT.STATISTIC.TRACK, StatisticsProxy.onTrackEvent, this);
        },
        sendEvent: function(data){
            if(!data){
                return;
            }
            if(data.hasOwnProperty('GOOGLE') || data.hasOwnProperty('YANDEX') || data.hasOwnProperty('OPTIMIZELY')){
                if(data.hasOwnProperty('YANDEX')){
                    StatisticsProxy.sendYandexMetric(data['YANDEX']);
                }
                if(data.hasOwnProperty('GOOGLE')){
                    StatisticsProxy.sendGoogleAnalytics(data['GOOGLE']);
                }
                /*if(data.hasOwnProperty('OPTIMIZELY')){
                    StatisticsProxy.sendOptimizelyAnalytics(data['OPTIMIZELY']);
                }*/
                return;
            }
            if(!data.provider || data.provider == AppConsts.TYPE.STATISTIC.YANDEX.PROVIDER){
                StatisticsProxy.sendYandexMetric(data);
                if(data.provider){
                    return;
                }
            }
            StatisticsProxy.sendGoogleAnalytics(data);
            //StatisticsProxy.sendOptimizelyAnalytics(data);
        },
        onTrackEvent: function(data){
            this.sendEvent(data);
        },
        //deferredYandexEvents: [],
        sendYandexMetric: function(data){
            var ym = window['yaCounter'+Settings.statistic.yandex.id];
            var that = this;
            if(!ym || !ym.reachGoal){
                console.log("<<<<<<<<< !!!! NO YANDEX METRIKA OBJECT [yaCounter"+Settings.statistic.yandex.id + "], TRYING TO SUBSCRIBE YANDEX CALLBACK FOR EVENT: ", data.event);
                (function (d, w, c) {
                    (w[c] = w[c] || []).push(function() {
                        try {
                            var ym = window['yaCounter'+Settings.statistic.yandex.id];
                            ym.reachGoal(data.event);
                        } catch(e) {
                            //that.deferredYandexEvents.push(data);
                            throw new Error("<<<<<<<<< !!!! *** FATAL NO YANDEX METRIKA OBJECT [yaCounter"+Settings.statistic.yandex.id + "] FOR EVENT: " + data.event);
                        }
                    });
                })(document, window, "yandex_metrika_callbacks");
                (function (d, w, c) {
                    (w[c] = w[c] || []).push(function() {
                        try {
                            var ym = window['yaCounter'+Settings.statistic.yandexPetrika.id];
                            ym.reachGoal(data.event);
                        } catch(e) {
                            throw new Error("<<<<<<<<< !!!! *** FATAL NO YANDEX PETRIKA OBJECT [yaCounter"+Settings.statistic.yandexPetrika.id + "] FOR EVENT: " + data.event);
                        }
                    });
                })(document, window, "yandex_petrika_callbacks");
                return false;
            }
            console.log("<<<<<<<<< YANDEX REACH GOAL: ", data.event);
            ym.reachGoal(data.event);
            return true;
        },
        sendGoogleAnalytics: function(data){
            var ga = window['ga'];
            if(!data || !ga){
                console.log("<<<<<<<<< !!!! GOOGLE NO DATA TO REACH THE GOAL");
                return false;
            }
            var params = {
                hitType: data.type || "event"
            };
            if(data.group){
                params.eventCategory = data.group;
            }
            if(data.event){
                params.eventAction = data.event;
            }
            if(data.extra){
                params.eventLabel = data.extra;
            }
            if(data.value){
                params.eventValue = data.value;
            }
            if(data.callbackTimeout){
                setTimeout(function(){
                        if(!params.hitCallback){
                            return;
                        }
                        if(data.failCallback){
                            data.failCallback();
                        }
                    },
                    data.callbackTimeout
                );
            }
            if(data.callback){
                params.hitCallback = function(params){
                    params.hitCallback = null;
                    data.callback.apply(this, arguments);
                }
            }
            console.log("<<<<<<<<< GOOGLE REACH GOAL: ", data.event);
            ga(
                'send',
                params
            );

            return true;
        },
        sendOptimizelyAnalytics: function(data){

            var op = Optimizely;
            if(!data || !op){
                return false;
            }
            op.push([
				data.type,
				data.event
			]);
            return true;
        }
    };

    return StatisticsProxy;
});