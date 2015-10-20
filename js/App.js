
if(blamperDebugMode) {
    if (!window.console) {
        window.console = window.console || {
            log: function (message) {
            },
            info: function (message) {
            },
            warn: function (message) {
            },
            error: function (message) {
                alert(message);
            },
            group: function (message) {
            },
            groupEnd: function (message) {
            }
        };
    }
}else {
    var jsDebug = localStorage ? localStorage.getItem("debug") : false;
    if (jsDebug != "all") {
        var debug_disabled = true;
        var log = window.console ? window.console.log : function (message) {
        };
        var console = {
            log: function (message) {
            },
            info: function (message) {
            },
            warn: function (message) {
            },
            error: function (message) {
                //alert(message);
                log(message);
            },
            group: function (message) {
            },
            groupEnd: function (message) {
            }
        };
    }
}

/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 23.10.13 14:54
 */

var API_HOST = "//"+window.location.host+"/api";

window['optimizely'] = window['optimizely'] || [];

!function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('domready', function (ready) {

    var fns = [], fn, f = false
        , doc = document
        , testEl = doc.documentElement
        , hack = testEl.doScroll
        , domContentLoaded = 'DOMContentLoaded'
        , addEventListener = 'addEventListener'
        , onreadystatechange = 'onreadystatechange'
        , readyState = 'readyState'
        , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
        , loaded = loadedRgx.test(doc[readyState])
        ;

    function flush(f) {
        loaded = 1;
        while (f = fns.shift()) f();
    }

    doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
        doc.removeEventListener(domContentLoaded, fn, f);
        flush();
    }, f);


    hack && doc.attachEvent(onreadystatechange, fn = function () {
        if (/^c/.test(doc[readyState])) {
            doc.detachEvent(onreadystatechange, fn);
            flush();
        }
    });

    return (ready = hack ?
        function (fn) {
            self != top ?
                loaded ? fn() : fns.push(fn) :
                function () {
                    try {
                        testEl.doScroll('left');
                    } catch (e) {
                        return setTimeout(function() { ready(fn) }, 50);
                    }
                    fn()
                }();
        } :
        function (fn) {
            loaded ? fn() : fns.push(fn);
        })
        ;
});

var StatisticsProxy = {

    EVENT:{
        SYSTEM: {
          SERVER_DATA_ERROR: {
              YANDEX:{
                  event: 'ServerDataError'
              },
              GOOGLE:{
                  group: 'System',
                  event: 'ServerDataError',
                  extra: 'Error'
              }
          },
          SERVER_ERROR: {
              YANDEX:{
                  event: 'ServerError'
              },
              GOOGLE:{
                  group: 'System',
                  event: 'ServerError',
                  extra: 'Error'
              }
          },
          SENT_TO_SERVER: {
              YANDEX:{
                  event: 'FormSentToServer'
              },
              GOOGLE:{
                  group: 'System',
                  event: 'FormSentToServer',
                  extra: 'Form'
              }
          }
        },
        REGISTRATION:{
            FB:{
                YANDEX:{
                    event: 'RegistrationFB'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'RegFB',
                    extra: 'Step1_FB'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegistrationFBLanding'
                }
            },
            VK:{
                YANDEX:{
                    event: 'RegistrationVK'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'RegVK',
                    extra: 'Step1_VK'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegistrationVKLanding'
                }
            },
            OK:{
                YANDEX:{
                    event: 'RegistrationOK'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'RegOK',
                    extra: 'Step1_OK'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegistrationOKLanding'
                }
            },
            GP:{
                YANDEX:{
                    event: 'RegistrationGoogle'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'RegGooglePlus',
                    extra: 'Step1_Google'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegistrationGPLanding'
                }
            },
            TW:{
                YANDEX:{
                    event: 'RegistrationTwitter'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'RegTwitter',
                    extra: 'Step1_Twitter'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegistrationTWLanding'
                }
            },
            MA:{
                YANDEX:{
                    event: 'RegistrationMyWorld'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'RegMyWorld',
                    extra: 'Step1_MyWorld'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegistrationMALanding'
                }
            },
            STEP1:{
                YANDEX:{
                    event: 'RegistrationSite'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'RegSite',
                    extra: 'Step1_fromSite'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegistrationFromLanding'
                }
            },
            STEP2:{
                YANDEX:{
                    event: 'AddCar'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'AddCar',
                    extra: 'RegCar'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'AddCarFromLanding'
                }
            },
            SHOW_STEP2:{
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegisteredStep2'
                }
            },
            KEYBOARD_ACTIVITY:{
                YANDEX:{
                    event: 'LandingInputFromKeyboard'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'LandingInputFromKeyboard'
                }
            },

            /** NEW: 18.11.2014 */
            HEAD_CLICK:{
                YANDEX:{
                    event: 'RegistrationHeadClick'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'RegistrationHeadClick',
                    extra: 'RegistrationClick'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegistrationHeadClick'
                }
            },
            MOBILE_MENU_CLICK:{
                YANDEX:{
                    event: 'RegistrationMobileMenuClick'
                },
                GOOGLE:{
                    group: 'Registration',
                    event: 'RegistrationMobileMenuClick',
                    extra: 'RegistrationClick'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'RegistrationMobileMenuClick'
                }
            }
        },
        AUTH:{
            FB:{
                YANDEX:{
                    event: 'AutorizeFB'
                },
                GOOGLE:{
                    group: 'Autorization',
                    event: 'AutorizeFB',
                    extra: 'AutorizeFromFB'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'AutorizeFBLanding'
                }
            },
            VK:{
                YANDEX:{
                    event: 'AutorizeVK'
                },
                GOOGLE:{
                    group: 'Autorization',
                    event: 'AutorizeVK',
                    extra: 'AutorizeFromVK'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'AutorizeVKLanding'
                }
            },
            OK:{
                YANDEX:{
                    event: 'AutorizeOK'
                },
                GOOGLE:{
                    group: 'Autorization',
                    event: 'AutorizeOK',
                    extra: 'AutorizeFromOK'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'AutorizeOKLanding'
                }
            },
            GP:{
                YANDEX:{
                    event: 'AutorizeGoogle'
                },
                GOOGLE:{
                    group: 'Autorization',
                    event: 'AutorizeGooglePlus',
                    extra: 'AutorizeFromGoogle'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'AutorizeGPLanding'
                }
            },
            TW:{
                YANDEX:{
                    event: 'AutorizeTwitter'
                },
                GOOGLE:{
                    group: 'Autorization',
                    event: 'AutorizeTwitter',
                    extra: 'AutorizeFromTwitter'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'AutorizeTWLanding'
                }
            },
            MA:{
                YANDEX:{
                    event: 'AutorizeMyWorld'
                },
                GOOGLE:{
                    group: 'Autorization',
                    event: 'AutorizeMyWorld',
                    extra: 'AutorizeFromMyWorld'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'AutorizeMALanding'
                }
            },
            SITE:{
                YANDEX:{
                    event: 'AutorizeSite'
                },
                GOOGLE:{
                    group: 'Autorization',
                    event: 'AutorizeSite',
                    extra: 'AutorizeFromSite'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'AutorizeFromLanding'
                }
            }
        },

        /** NEW: 18.11.2014 */
        LANDING: {
            KB_CLICK:{
                YANDEX:{
                    event: 'KBClickFromLanding'
                },
                GOOGLE:{
                    group: 'Landing',
                    event: 'KBClickFromLanding',
                    extra: 'LandingClick'
                },
                OPTIMIZELY:{
                    type: 'trackEvent',
                    event: 'KBClickFromLanding'
                }
            },
            REGISTRATION:{
                HEAD_CLICK:{
                    YANDEX:{
                        event: 'RegistrationHeadClick'
                    },
                    GOOGLE:{
                        group: 'Registration',
                        event: 'RegistrationHeadClick',
                        extra: 'RegistrationClick'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'RegistrationHeadClick'
                    }
                },
                EMAIL_SUBSCRIBE:{
                    YANDEX:{
                        event: 'EmailCollectorRegistrationFromLanding'
                    },
                    GOOGLE:{
                        group: 'Registration',
                        event: 'EmailCollectorRegistrationFromLanding',
                        extra: 'Registration'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'EmailCollectorRegistrationFromLanding'
                    }
                }
            },
            AUTH:{
                SUCCESS:{
                    YANDEX:{
                        event: 'LandingAutorizeEmailSuccess'
                    },
                    GOOGLE:{
                        group: 'Autorization',
                        event: 'LandingAutorizeEmailSuccess',
                        extra: 'AutorizeFromSite'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'LandingAutorizeEmailSuccess'
                    }
                },
                HEAD_CLICK:{
                    YANDEX:{
                        event: 'AutorizeHeadClick'
                    },
                    GOOGLE:{
                        group: 'Autorization',
                        event: 'AutorizeHeadClick',
                        extra: 'AutorizeClick'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'AutorizeHeadClick'
                    }
                }
            },

            QA:{
                AUTH_COMPLETE_BEFORE_ASK: {
                    YANDEX:{
                        event: 'LandingAuthCompleteBeforeAsk'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingAuthCompleteBeforeAsk',
                        extra: 'LandingQA'
                    }
                },
                SHOW_LOGIN_BEFORE_ASK: {
                    YANDEX:{
                        event: 'LandingShowLoginBeforeAsk'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingShowLoginBeforeAsk',
                        extra: 'LandingQA'
                    }
                },
                ASK_QUESTION_UNREGISTERED: {
                    YANDEX:{
                        event: 'addQAQuestionNewUser'
                    },
                    GOOGLE:{
                        group: 'qa',
                        event: 'addQAQuestionNewUser',
                        extra: 'addQuestion'
                    }
                },
                NEXT_CLICK: {
                    YANDEX:{
                        event: 'LandingQANextClick'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingQANextClick',
                        extra: 'LandingQA'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'LandingQANextClick'
                    }
                },
                STEP1_ERROR: {
                    YANDEX:{
                        event: 'LandingQAStep1Error'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingQAStep1Error',
                        extra: 'LandingQA'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'LandingQAStep1Error'
                    }
                },
                STEP1_SUCCESS: {
                    YANDEX:{
                        event: 'LandingQAStep1Success'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingQAStep1Success',
                        extra: 'LandingQA'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'LandingQAStep1Success'
                    }
                },
                STEP2_ERROR: {
                    YANDEX:{
                        event: 'LandingQAStep2Error'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingQAStep2Error',
                        extra: 'LandingQA'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'LandingQAStep2Error'
                    }
                },
                STEP2_SUCCESS: {
                    YANDEX:{
                        event: 'LandingQAStep2Success'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingQAStep2Success',
                        extra: 'LandingQA'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'LandingQAStep2Success'
                    }
                },
                STEP3_SUCCESS: {
                    YANDEX:{
                        event: 'LandingQAStep3Success'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingQAStep3Success',
                        extra: 'LandingQA'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'LandingQAStep3Success'
                    }
                },
                STEP3_ALREADY_REGISTERED: {
                    YANDEX:{
                        event: 'LandingQAStep3ErrorAlreadyRegistered'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingQAStep3ErrorAlreadyRegistered',
                        extra: 'LandingQA'
                    }
                },
                ADD_QUESTION: {
                    YANDEX:{
                        event: 'LandingQAAddQuestion'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'LandingQAAddQuestion',
                        extra: 'LandingQA'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'LandingQAAddQuestion'
                    }
                }
            }
        },

        MOBILE: {
            LANDING:{
                SHOW: {
                    YANDEX:{
                        event: 'MobileLandingShow'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'MobileLandingShow',
                        extra: 'MobileLanding'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'MobileLandingShow'
                    }
                },

                KB_CLICK:{
                    YANDEX:{
                        event: 'MobileKBClickFromLanding'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'MobileKBClickFromLanding',
                        extra: 'MobileLanding'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'MobileKBClickFromLanding'
                    }
                },

                QA_CLICK:{
                    YANDEX:{
                        event: 'MobileQAClickFromLanding'
                    },
                    GOOGLE:{
                        group: 'Landing',
                        event: 'MobileQAClickFromLanding',
                        extra: 'MobileLanding'
                    },
                    OPTIMIZELY:{
                        type: 'trackEvent',
                        event: 'MobileQAClickFromLanding'
                    }
                },

                REGISTRATION:{
                    MENU_CLICK:{
                        YANDEX:{
                            event: 'RegistrationMobileMenuClick'
                        },
                        GOOGLE:{
                            group: 'Registration',
                            event: 'RegistrationMobileMenuClick',
                            extra: 'RegistrationClick'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'RegistrationMobileMenuClick'
                        }
                    },
                    EMAIL_SUBSCRIBE:{
                        YANDEX:{
                            event: 'MobileEmailCollectorRegistrationFromLanding'
                        },
                        GOOGLE:{
                            group: 'Registration',
                            event: 'MobileEmailCollectorRegistrationFromLanding',
                            extra: 'Registration'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'MobileEmailCollectorRegistrationFromLanding'
                        }
                    }
                },

                AUTH:{
                    SUCCESS:{
                        YANDEX:{
                            event: 'MobileLandingAutorizeEmailSuccess'
                        },
                        GOOGLE:{
                            group: 'Autorization',
                            event: 'MobileLandingAutorizeEmailSuccess',
                            extra: 'AutorizeFromSite'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'MobileLandingAutorizeEmailSuccess'
                        }
                    },
                    MENU_CLICK:{
                        YANDEX:{
                            event: 'AutorizeMobileMenuClick'
                        },
                        GOOGLE:{
                            group: 'Autorization',
                            event: 'AutorizeMobileMenuClick',
                            extra: 'AutorizeClick'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'AutorizeMobileMenuClick'
                        }
                    }
                },

                QA:{
                    NEXT_CLICK: {
                        YANDEX:{
                            event: 'MobileLandingQANextClick'
                        },
                        GOOGLE:{
                            group: 'Landing',
                            event: 'MobileLandingQANextClick',
                            extra: 'MobileLandingQA'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'MobileLandingQANextClick'
                        }
                    },
                    STEP1_ERROR: {
                        YANDEX:{
                            event: 'MobileLandingQAStep1Error'
                        },
                        GOOGLE:{
                            group: 'Landing',
                            event: 'MobileLandingQAStep1Error',
                            extra: 'MobileLandingQA'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'MobileLandingQAStep1Error'
                        }
                    },
                    STEP1_SUCCESS: {
                        YANDEX:{
                            event: 'MobileLandingQAStep1Success'
                        },
                        GOOGLE:{
                            group: 'Landing',
                            event: 'MobileLandingQAStep1Success',
                            extra: 'MobileLandingQA'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'MobileLandingQAStep1Success'
                        }
                    },
                    STEP2_ERROR: {
                        YANDEX:{
                            event: 'MobileLandingQAStep2Error'
                        },
                        GOOGLE:{
                            group: 'Landing',
                            event: 'MobileLandingQAStep2Error',
                            extra: 'MobileLandingQA'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'MobileLandingQAStep2Error'
                        }
                    },
                    STEP2_SUCCESS: {
                        YANDEX:{
                            event: 'MobileLandingQAStep2Success'
                        },
                        GOOGLE:{
                            group: 'Landing',
                            event: 'MobileLandingQAStep2Success',
                            extra: 'MobileLandingQA'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'MobileLandingQAStep2Success'
                        }
                    },
                    STEP3_SUCCESS: {
                        YANDEX:{
                            event: 'MobileLandingQAStep3Success'
                        },
                        GOOGLE:{
                            group: 'Landing',
                            event: 'MobileLandingQAStep3Success',
                            extra: 'MobileLandingQA'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'MobileLandingQAStep3Success'
                        }
                    },
                    STEP3_ALREADY_REGISTERED: {
                        YANDEX:{
                            event: 'MobileLandingQAStep3ErrorAlreadyRegistered'
                        },
                        GOOGLE:{
                            group: 'Landing',
                            event: 'MobileLandingQAStep3ErrorAlreadyRegistered',
                            extra: 'LandingQA'
                        }
                    },
                    ADD_QUESTION: {
                        YANDEX:{
                            event: 'MobileLandingQAAddQuestion'
                        },
                        GOOGLE:{
                            group: 'Landing',
                            event: 'MobileLandingQAAddQuestion',
                            extra: 'MobileLandingQA'
                        },
                        OPTIMIZELY:{
                            type: 'trackEvent',
                            event: 'MobileLandingQAAddQuestion'
                        }
                    }
                }
            }
        }
    },

    TYPE:{
        GOOGLE:{
            PROVIDER:               "ga"
        }
        ,YANDEX:{
            PROVIDER:               "ym"
        }
        ,OPTIMIZELY:{
            PROVIDER:               "op"
        }
    },

    SETTINGS:{
        YANDEX:{
            id: 22217446
        }
    },

    trackEvent: function(data){
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
            if(data.hasOwnProperty('OPTIMIZELY')){
                StatisticsProxy.sendOptimizelyAnalytics(data['OPTIMIZELY']);
            }
            return;
        }
        if(!data.provider || data.provider == StatisticsProxy.TYPE.YANDEX.PROVIDER){
            StatisticsProxy.sendYandexMetric(data);
            if(data.provider){
                return;
            }
        }
        StatisticsProxy.sendGoogleAnalytics(data);
    },
    sendYandexMetric: function(data){
        var ym = window['yaCounter'+StatisticsProxy.SETTINGS.YANDEX.id];
        if(!ym || !ym.reachGoal){
            return;
        }
        ym.reachGoal(data.event);
    },
    sendGoogleAnalytics: function(data){
        var ga = window['ga'];
        if(!data || !ga){
            return false;
        }
        var params = {};
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
        ga(
            'send',
            data.type ? data.type : "event",
            params
        );

        return true;
    },
    sendOptimizelyAnalytics: function(data){
        var op = window['optimizely'];
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


/**
 * APP HERE
 */

var
    core_version = "0.1",
    core_trim = core_version.trim,
    // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    global = Function('return this')(),
    min = require('minified'),
    doc = document
;

if (!String.prototype.trim) {
    String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}
if (!String.prototype.ltrim) {
    String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
}
if (!String.prototype.rtrim) {
    String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
}
if (!String.prototype.fulltrim) {
    String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};
}

global.$ = min.$;
global.$$ = min.$$;

global.Utils = {

    activateSelector: function(el){
        console.log("Activate: "+el.className);
        var that = this;
        $(el).each(function(item){
            that.showSelectedText.call(that, item);
        });
        $(el).onDom('change', function(e){
            that.showSelectedText.call(that, e.currentTarget || e.target);
        });
    },

    showSelectedText: function(el){
        var children = $(el).select('option', true);
        //console.log(el);
        //console.log(children.length);
        var selected = children.filter(function(item){ return !!item.selected; })[0];
        selected = selected ? selected : children[0];
        //console.log(selected);
        var th_text = selected.innerHTML;
        var th_class = this.getData(selected, 'class') || "";
        var th_classes = this.getData(el, 'classes') || "";

        //console.log(th_classes, children.length);

        if (!th_classes) {
            var that = this;
            children.each(function(item){
                th_classes += ( that.getData(item, "class") || "" ) + " ";
            });
            this.setData(el, 'classes', th_classes);
        }
        //console.log(th_classes);

        var container = this.getParentByClass(el, 'f_text__container');
        this.removeClass(container, th_classes);
        this.addClass(container, th_class);
        var label = $('.f_text__input', container)[0];
        if(label) {
            label.innerHTML = th_text;
        }
    },

    disableSelector: function(el){
        var that = this;
        $(el).each(function(item){
            var text = $('option:first', item)[0].innerHTML;
            var container = that.getParentByClass(item, 'f_text__container');
            that.addClass(container, 'f_text__container__disabled');
            var input = $('.f_text__input', container);
            if(input.length) {
                input = input[0];
                input.innerHTML = text;
                that.addClass(input, 'f_text__disabled');
            }
            item.setAttribute("disabled", "disabled");
            that.addClass(item, "not_selected");
            $(':selected', item)[0].removeAttribute('selected');
            item.selectedIndex = 0;
            $(item).trigger("change");
        });
    },

    enableSelector: function(el){
        var that = this;
        $(el).each(function(item){
            var container = that.getParentByClass(item, 'f_text__container');
            if(container) {
                var line = that.getParentByClass(container, 'f_line');
                that.removeClass(line, 'hidden');
                that.removeClass(container, 'f_text__container__disabled');
                that.removeClass($('.f_text__input', container)[0], 'f_text__disabled');
            }
            item.removeAttribute("disabled");
            that.removeClass(item, "not_selected");
        });
    },
    /* styled select changer */
    activateInnerSelectors: function(el){
        var that = this;
        $('select', el).each(function(item){
            that.activateSelector(item);
        });
    },

    showedBaloons:[],
    bindCollapsibleBaloon: function(el, containerClass){
        var ACTIVE_CLASS = 'ui_btn__open';
        var that = this;
        var el = el;
        var containerClass = containerClass ? containerClass : 'ui_btn__arr';
        var hideContainer = function(e) {
            for(var i in that.showedBaloons){
                that.removeClass(that.showedBaloons[i], ACTIVE_CLASS);
            }
            that.showedBaloons = [];
            return true;
        };
        var showContainer = function(e) {
            //e.stopPropagation();
            var container = that.getParentByClass(e.target, containerClass) || e.currentTarget;
            if(that.hasClass(container, ACTIVE_CLASS)){
                hideContainer(e);
            }else{
                if(!that.contains(that.showedBaloons, container)){
                    that.showedBaloons.push(container);
                }
                that.addClass(container, ACTIVE_CLASS)
            }
            return false;
        };
        var stopContainerClick = function(e) {
            //e.stopPropagation();
            return false;
        };

        this.unbindCollapsibleBaloon(containerClass, true);

        $('.'+containerClass, el).onDom('click', showContainer);
        $('.'+containerClass + "> .baloon", el).onDom('click', stopContainerClick);
        $(document.body).onDom('click', hideContainer);
    },

    unbindCollapsibleBaloon: function(containerClass, canRemove){
        containerClass = containerClass ? containerClass : 'ui_btn__arr';
        if( !$('.'+containerClass, document.body).length || canRemove ) {
            //$(document.body).off('click');
        }
    },

    /** DOM UTILS */


    posY: function(elm) {
        var test = elm, top = 0;
        while(!!test && test.tagName.toLowerCase() !== "body") {
            top += test.offsetTop;
            test = test.offsetParent;
        }
        return top;
    },

    viewPortHeight: function() {
        var de = document.documentElement;
        if(!!window.innerWidth)
        { return window.innerHeight; }
        else if( de && !isNaN(de.clientHeight) )
        { return de.clientHeight; }
        return 0;
    },

    scrollY: function() {
        if( window.pageYOffset ) { return window.pageYOffset; }
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    },

    checkvisible: function( elm ) {
        var vpH = this.viewPortHeight(), // Viewport Height
            st = this.scrollY(), // Scroll Top
            y = this.posY(elm);
        return (y > (vpH + st));
    },

    getParentByAttr: function(el, attr, value){
        if(!el.parentNode){
            return null;
        }
        var val = this.getAttr(el.parentNode, attr);
        if((!value && val) || (value && val && value === val)){
            return el.parentNode;
        }
        return this.getParentByAttr(el.parentNode, attr, value);
    },
    getParentByClass: function(el, className){
        if(!el || !el.parentNode){
            return null;
        }
        if(this.hasClass(el.parentNode, className)){
            return el.parentNode;
        }
        return this.getParentByClass(el.parentNode, className);
    },
    getParentByTag: function(el, tagName){
        if(!el.parentNode){
            return null;
        }
        if(el.parentNode.tagName == tagName){
            return el.parentNode;
        }
        return this.getParentByTag(el.parentNode, tagName);
    },
    getAllAttrs: function(elem){
        var result = {};
        var attrs = this.copyArray(elem.attributes);
        for(var i in attrs){
            result[attrs[i].name] = attrs[i].value;
        };
        return result;
    },
    getAttr: function(ele, attr) {
        var result = (ele.getAttribute && ele.getAttribute(attr)) || null;
        if( !result ) {
            var attrs = ele.attributes;
            if(!attrs){
                return null;
            }
            var length = attrs.length;
            for(var i = 0; i < length; i++)
                if(attrs[i].nodeName === attr)
                    result = attrs[i].nodeValue;
        }
        return result;
    },
    getData: function(el, key){
        return this.getAttr(el, "data-"+key);
    },
    getDataObject: function(el, key){
        var params = this.getData(el, key);
        if(global.Utils.isString(params)){
            return JSON.parse(params);
        }
        return params;
    },
    setData: function(el, key, value){
        return el.setAttribute("data-"+key, value);
    },
    addClass: function(el, c){
        if(!el){
            return false;
        }
        if(this.isList(el)){
            for(var i in el){
                this.addClass(el[i], c);
            }
            return true;
        }
        if(el.className === undefined){
            return false;
        }
        c = this.trim(c);
        if(this.hasClass(el, c)){
            return false;
        }
        el.className += " " + c;
        return true;
    },
    hasClass: function(el, c){
        if(!el){
            return;
        }
        return (new RegExp('(^| )'+c+'( |$)', "gi")).test(el.className);
    },
    removeClass: function(el, c){
        if(!el){
            return false;
        }
        if(this.isList(el)){
            for(var i in el){
                this.removeClass(el[i], c);
            }
            return true;
        }
        if(el.className === undefined){
            return false;
        }
        el.className = el.className.replace(new RegExp('(^| )'+c+'( |$)', "gi"), " ");
    },
    toggleClass: function(el, c){
        if(this.hasClass(el, c)){
            this.removeClass(el, c);
        }else{
            this.addClass(el, c);
        }
    },

    addElementFromText: function (container, html, id) {
        var div = doc.createElement('div');
        div.innerHTML = html;
        div.id = id;
        if(container) {
            container.appendChild(div);
        }
        return div;
    },

    getFieldValue: function(el){
        var attrs = global.Utils.getAllAttrs(el) || {};
        var type = attrs.type || "text";
        var inputType = type.toLowerCase();
        var val = "";
        switch (inputType) {
            case "radio":
                val = el.checked ? el.value : "";
                break;
            case "checkbox":
                val = el.checked ? 1 : 0;
                break;
            default :
                val = el.value.trim();
                break;
        }
        return val;
    },
    /**
     * OBJECT UTILS
     */

    isArray: Array.isArray || function(value) {
        return toString.call(value) == arrayClass;
    },

    sortedIndex: function(array, value, callback, thisArg) {
        var low = 0,
            high = array ? array.length : low;

        // explicitly reference `identity` for better engine inlining
        callback = callback ? this.createCallback(callback, thisArg) : this.identity;
        value = callback(value);
        while (low < high) {
            var mid = (low + high) >>> 1;
            callback(array[mid]) < value
                ? low = mid + 1
                : high = mid;
        }
        return low;
    },

    indexOf: function(array, value, fromIndex) {
        var index = -1,
            length = array ? array.length : 0;

        if (typeof fromIndex == 'number') {
            index = (fromIndex < 0 ? Math.max(0, length + fromIndex) : fromIndex || 0) - 1;
        } else if (fromIndex) {
            index = this.sortedIndex(array, value);
            return array[index] === value ? index : -1;
        }
        while (++index < length) {
            if (array[index] === value) {
                return index;
            }
        }
        return -1;
    },
    /**
     * Computes the union of the passed-in arrays using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} [array1, array2, ...] Arrays to process.
     * @returns {Array} Returns a new array of unique values, in order, that are
     *  present in one or more of the arrays.
     * @example
     *
     * _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
     * // => [1, 2, 3, 101, 10]
     */
     union: function() {
        return this.uniq(concat.apply(arrayRef, arguments));
     },

     /**
     * Creates a duplicate-value-free version of the `array` using strict equality
     * for comparisons, i.e. `===`. If the `array` is already sorted, passing `true`
     * for `isSorted` will run a faster algorithm. If `callback` is passed, each
     * element of `array` is passed through a callback` before uniqueness is computed.
     * The `callback` is bound to `thisArg` and invoked with three arguments; (value, index, array).
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {Boolean} [isSorted=false] A flag to indicate that the `array` is already sorted.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {Mixed} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a duplicate-value-free array.
     * @example
     *
     * _.uniq([1, 2, 1, 3, 1]);
     * // => [1, 2, 3]
     *
     * _.uniq([1, 1, 2, 2, 3], true);
     * // => [1, 2, 3]
     *
     * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return Math.floor(num); });
     * // => [1, 2, 3]
     *
     * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return this.floor(num); }, Math);
     * // => [1, 2, 3]
     */
     uniq: function(array, isSorted, callback, thisArg) {
        var index = -1,
            length = array ? array.length : 0,
            result = [],
            seen = result;

        // juggle arguments
        if (typeof isSorted == 'function') {
            thisArg = callback;
            callback = isSorted;
            isSorted = false;
        }
        // init value cache for large arrays
        var isLarge = !isSorted && length > 74;
        if (isLarge) {
            var cache = {};
        }
        if (callback) {
            seen = [];
            callback = this.createCallback(callback, thisArg);
        }
        while (++index < length) {
            var value = array[index],
                computed = callback ? callback(value, index, array) : value;

            if (isLarge) {
                // manually coerce `computed` to a string because `hasOwnProperty`, in
                // some older versions of Firefox, coerces objects incorrectly
                seen = hasOwnProperty.call(cache, computed + '') ? cache[computed] : (cache[computed] = []);
            }
            if (isSorted
                ? !index || seen[seen.length - 1] !== computed
                : this.indexOf(seen, computed) < 0
                ) {
                if (callback || isLarge) {
                    seen.push(computed);
                }
                result.push(value);
            }
        }
        return result;
    },

    /**
     * Produces an iteration callback bound to an optional `thisArg`. If `func` is
     * a property name, the callback will return the property value for a given element.
     *
     * @private
     * @param {Function|String} [func=identity|property] The function called per
     * iteration or property name to query.
     * @param {Mixed} [thisArg] The `this` binding of `callback`.
     * @returns {Function} Returns a callback function.
     */
     createCallback: function(func, thisArg) {
        if (!func) {
            return this.identity;
        }
        if (typeof func != 'function') {
            return function(object) {
                return object[func];
            };
        }
        if (thisArg !== undefined) {
            return function(value, index, object) {
                return func.call(thisArg, value, index, object);
            };
        }
        return func;
    },
    identity: function(value) {
        return value;
    },
    copyArray: function(seq) {
        var arr= new Array(seq.length);
        for (var i= seq.length; i-->0;)
            if (i in seq)
                arr[i]= seq[i];
        return arr;
    },
    constructObjectFromSerializedKeys: function(subkeys, value){
        var nextkey = subkeys.replace(/\[([^\]]*)\].*$/, '$1');
        var subkeys = subkeys.replace(/\[([^\]]*)\]/, '');
        var resultObject;
        if(subkeys){
            if(nextkey){
                resultObject = {};
                resultObject[nextkey] = this.constructObjectFromSerializedKeys(subkeys, value);
            }else{
                resultObject = [];
                resultObject.push(this.constructObjectFromSerializedKeys(subkeys, value));
            }
        }else{
            if(nextkey){
                resultObject = {};
                resultObject[nextkey] = value;
            }else{
                resultObject = [];
                resultObject.push(value);
            }
        }
        return resultObject;
    },

    getUrlParamsAsObject: function(){
        var oGetVars = {};
        if (window.location.search.length > 1) {
            for (var aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
                aItKey = aCouples[nKeyId].split("=");
                var rawKey = decodeURIComponent(aItKey[0]);
                var value = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
                if(rawKey.indexOf('[') > -1){
                    var key = rawKey.replace(/\[.+$/gi,'');
                    var subkeys = rawKey.replace(key,'');
                    var arr = this.constructObjectFromSerializedKeys(subkeys, value);
                    if(!oGetVars[key]){
                        oGetVars[key] = arr;
                    }else{
                        if(this.isArray(oGetVars[key])){
                            oGetVars[key] = this.union(oGetVars[key], arr);
                        }else{
                            oGetVars[key] = this.extend(oGetVars[key], arr);
                        }
                    }
                }else{
                    oGetVars[rawKey] = value;
                }
            }
        }
        return oGetVars;
    },
    objectToUrlParams: function(obj, prefix) {
        var str = [];
        for(var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
                this.objectToUrlParams(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    },
    has: function(obj, key) {
        return obj.hasOwnProperty(key);
    },
    // Retrieve the names of an object's properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    keys: Object.keys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj) if (this.has(obj, key)) keys.push(key);
        return keys;
    },
    forEach: function(obj, iterator, context) {
        var breaker = {};
        if (obj == null) return;
        if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            var keys =this.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
            }
        }
    },
    forEachElement: function(selector, callback, context){
        var w = context
                ? Sizzle(selector, context)
                : Sizzle(selector);
        this.forEach(w, callback);
    },
    isType: function(s,o) {
        return typeof s == o;
    },
    /** @param s {?} */
    isString: function (s) {
        return this.isType(s, 'string');
    },
    isObject: function (f) {
        return this.isType(f, 'object');
    },
    isNode: function (n) {
        return n && n['nodeType'];
    },
    isNumber: function (n) {
        return this.isType(n, 'number');
    },
    isList: function (v) {
        return v && v.length != null && !this.isString(v) && !this.isNode(v) && !this.isFunction(v);
    },
    nonOp: function (v) {
        return v;
    },
    contains: function (obj, value) {
        for (var n in obj){
            if(obj[n] === value){
                return true;
            }
        }
        return false;
    },
    eachObj: function (obj, cb) {
        for (var n in obj)
            if (obj.hasOwnProperty(n))
                cb(n, obj[n]);
        return obj;
    },
    each: function(list, cb) {
        for (var i = 0; list && i < list.length; i++)
            cb(list[i], i);
        return list;
    },
    filter: function(list, filterFuncOrObject) {
        var r = [];
        var f = this.isFunction(filterFuncOrObject) ? filterFuncOrObject : function(value) { return filterFuncOrObject != value; };
        this.each(list, function(value, index) {
            if (f(value, index))
                r.push(value);
        });
        return r;
    },
    collect: function(obj, collectFunc) {
        var result = [];
        this.each(obj, function (a, b) {
            if (this.isList(a = collectFunc(a, b))) // caution: extreme variable re-using of 'a'
                this.each(a, function(rr) { result.push(rr); });
            else if (a != null)
                result.push(a);
        });
        return result;
    },
    // note: only the web version has the f.item check
    isFunction: function(f) {
        return this.isType(f, 'function') && !f['item']; // item check as work-around webkit bug 14547
    },
    /** @param s {?} */
    toString: function(s) { // wrapper for Closure optimization
        return s!=null ? ''+s : '';
    },
    trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
        function( text ) {
            return text == null ?
                "" :
                core_trim.call( text );
        } :

        // Otherwise use our own trimming functionality
        function( text ) {
            return text == null ?
                "" :
                ( text + "" ).replace( rtrim, "" );
        },

    template: function(template, data){
        for(var i in data){
            template = template.replace(new RegExp("\{"+i+"\}", "gi"), data[i]);
        }
        return template;
    },
    getListHtml: function(template, listArray, preHtml, postHtml){
        var html = preHtml ? preHtml : "";
        for(var i in listArray){
            html += this.template(template, listArray[i]);
        }
        html += postHtml ? postHtml : ""
        return html;
    },
    addOptionsToSelect: function(select, listArray, mapFunction, preUnit, postUnit){
        var unit;
        global.Utils.clearSelector(select, preUnit);
        for(var i in listArray){
            unit = mapFunction ? mapFunction(listArray[i]) : listArray[i];
            select.options.add(this.getOptionElement(unit.text, unit.value));
        }
        if(postUnit){
            select.options.add(this.getOptionElement(preUnit.text, preUnit.value));
        }
    },
    getOptionElement: function(text, value){
        var opt = document.createElement('OPTION');
        opt.text = text;
        opt.value = value;
        return opt;
    },
    clearSelector: function(el, unit){
        while(el.options.length){
            el.options.remove(0);
        }
        if(unit){
            el.options.add(global.Utils.getOptionElement(unit.text,unit.value));
        }
        $(el).trigger("change");
    },

    showLoader: function(el){
        this.addClass(el, "load");
    },

    hideLoader: function(el){
        this.removeClass(el, "load");
    },

    globalPreloader: null,
    showGlobalPreloader: function(el){
        if(!this.globalPreloader){
            var pre = document.createElement('div');
            pre.className = "gloader fico_loader";
            this.globalPreloader = pre;
        }
        if(!el){
            el = document.body;
        }
        el.appendChild(this.globalPreloader);
    },
    hideGlobalPreloader: function(el){
        if(this.globalPreloader){
            if(this.globalPreloader.parentNode){
                if(!el){
                    el = document.body;
                }
                el.removeChild(this.globalPreloader);
            }
        }
    },
    delayGlobalPreloader: function(callback, delay, el){
        delay = delay || 1000;
        this.showGlobalPreloader(el);
        var that = this;
        setTimeout(function(){
            that.hideGlobalPreloader.call(that, el);
            callback();
        }, delay);
    },

    // Extend a given object with all the properties in passed-in object(s).
    extend: function(obj) {
        var that = this;
        this.each(Array.prototype.slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    if(prop === ""){
                        break;
                    }
                    if(that.isObject(obj[prop]) && that.isObject(source[prop])){
                        obj[prop] = that.extend(obj[prop], source[prop]);
                    }else{
                        obj[prop] = source[prop];
                    }
                }
            }
        });
        return obj;
    },

    redirectWithDelay: function(url, timeout){
        var that = this;
        if(global.Utils.isNumber(timeout)){
            setTimeout(function(){
                that.redirect.call(that, url);
            }, timeout);
            return;
        }
        this.redirect(url);
    },

    redirect: function(url){
        if(url){
            global.location.assign(url);
        }else{
            global.location.reload();
        }
    },

	// Insert script + html
	insertNodes: function(html, el){
		el.innerHTML = html;
		var scripts = el.getElementsByTagName("script"),
			script, i;
		for (i=0; script=scripts[i]; i+=1) eval(script.innerHTML);
	},

	// Decode HTML Entities
	decodeEntities: function(text){
		var entities = [
			['quot', '\"'],
			['apos', '\''],
			['amp', '&'],
			['lt', '<'],
			['gt', '>']
		];

		for (var i = 0, max = entities.length; i < max; ++i)
			text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

		return text;
	}
};

global.Actions = global.Actions || {};
global.Widgets = global.Widgets || {};
global.WidgetInstances = {};
global.WidgetUtils = {
    execute: function(widgetName, eventName, data){
        if(global.WidgetInstances[widgetName] && global.WidgetInstances[widgetName].eventHandler){
            return global.WidgetInstances[widgetName].eventHandler.call(global.WidgetInstances[widgetName], eventName, data);
        }
        return null;
    },
    getInstanses: function(filter){
        if(!filter){
            return global.WidgetInstances;
        }
        var w, match, insts = [];
        for(var i in global.WidgetInstances){
            w = global.WidgetInstances[i];
            match = true;
            for(var key in filter){
                if( w[key] !== filter[key] ){
                    match = false;
                }
            }
            if(match){
                insts.push(w);
            }
        }
        return insts;
    }
};

global.DomParser = {
    _parse: function(selectors, container){
        var handler, el = container || doc;
        for(var i in selectors) {
            handler = selectors[i];
            global.Utils.forEachElement(i, function (item, index) {
                if (global.DomParser[handler]) {
                    global.DomParser[handler].call(global.DomParser, item);
                }
            }, el);
        }
    },
    Widget:function(item){
        var inst;
        var attr = global.Utils.getAllAttrs(item);
        var name = attr['data-name'];
        var widget = attr['data-widget'];
        var params = attr['data-params'] ? JSON.parse(attr['data-params']) : {};
        params.el = item;
        if(global.Widgets[widget]){
            params.name = name;
            inst = new global.Widgets[widget](params);
            global.WidgetInstances[name] = inst;
        }
    },
    Action:function(item){
        var inst;
        var attr = global.Utils.getAllAttrs(item);
        var action = attr['data-action'];
        var params = attr['data-params'] ? JSON.parse(attr['data-params']) : {};
        params.el = item;
        if(global.Actions[action]){
            global.Actions[action].call(global.Actions, params);
        }
    },
    DynamicAsset: function(item){
        var div = doc.createElement('div');
        div.innerHTML = item.innerHTML;
        $(item).replace(div);
    }
};


global.AbstractWidget = function(params){
    if(this.__construct){
        this.__construct(params);
    }
    if(this.init){
        this.init(params);
    }
    if(this.afterInit){
        this.afterInit(params);
    }
};
global.AbstractWidget.extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && global.Utils.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    global.Utils.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) global.Utils.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};
global.AbstractWidget.prototype = {
    el: null,
    __name: "Widget",
    __construct: function(params){
        params = params || {};
        if(params.name){
            this.__name = params.name;
        }
        if(params.el || this.el){
            this.el = this.el || params.el;
            this.parseUI.call(this);
        }
    },
    eventHandler: function(eventName, data){
        if(this[eventName+"Handler"]){
            return this[eventName+"Handler"].call(this, data);
        }
        return null;
    },
    parseParamsHandler: function(params){
        this.parseParams(params);
    },
    executeCommand: function(widgetName, eventName, data){
        return global.WidgetUtils.execute(widgetName, eventName, data);
    },
    show: function(){
        if(!this.el){
            return;
        }
        if(!this.el.parentNode){
            doc.body.appendChild(this.el);
        }
        global.Utils.removeClass(this.el, "hide");
    },
    hide: function(){
        if(!this.el){
            return;
        }
        global.Utils.addClass(this.el, "hide");
    },
    parseParams: function(params){
        if(!params){
            return;
        }
        if(global.Utils.isString(params)){
            params = JSON.parse(params);
        }
        if(params){
            for(var i in params){
                this[i] = params[i];
            }
        }
    },
    parseFields: function(){
        if(!this.fields){
            this.fields = {};
        }
        var fields = Sizzle('[data-field]', this.el);
        var key;
        for(var i in fields){
            key = global.Utils.getData(fields[i], "field");
            this.fields[key] = fields[i];
        }
    },
    parseUI: function(el){
        if(!this.ui) return;
        for(var i in this.ui){
            this.ui[i] = $(this.ui[i], el ? el : this.el);
        }
    }
};

global.Blamper = global.Blamper || {
    API : {}
};

global.Blamper.API.socialAuthCallback = function(url, provider){
    //global.location = url;
    var url = url;
    StatisticsProxy.trackEvent(StatisticsProxy.EVENT.AUTH[provider.toUpperCase()]);
    setTimeout(function(){
        global.location = url;
    }, 300);
};
global.Blamper.API.socialRegistrationCallback = function(url, provider){
    var url = url;
    StatisticsProxy.trackEvent(StatisticsProxy.EVENT.REGISTRATION[provider.toUpperCase()]);
    setTimeout(function(){
        global.location = url;
    }, 300);
};
global.Blamper.API.showSocialExtraLoginPopup = function(data){
    /*data = global.Utils.objectToUrlParams({jsapi:"showSocialExtraLoginPopup", data:data});
     global.location = "//" + global.location.host + "?" + data;*/
    //global.Utils.showPopup
	//global.WidgetUtils.execute("BodyStage", "lock", data);
    global.Widgets.PopupForm.showPopup("SocialExtraAuthForm", "SocialExtraAuth", data);
    //global.WidgetUtils.execute("SocialExtraAuth", "show", data);
};

var urlParams = global.Utils.getUrlParamsAsObject();
var addParams = global.Utils.objectToUrlParams(urlParams);


/**
 *  W I D G E T S
 */
(function (global) {
    global.Widgets.Form = global.AbstractWidget.extend({
        hasErrors: false,
        submittedBlocks: 0,
        submitBlocksCount: 1,
        submitting: false,

        init: function(params){
            //console.log("form init ok");
            this.submittedBlocks = 0;
            if(params){
                for(var i in params){
                    this[i] = params[i];
                }
            }
            var that = this;
            this.parseFields();
            this.$fields = $(Sizzle('[data-field]', this.el));
            this.$submit = $(Sizzle('[data-action=submit]', this.el));
            this.form = this.el.tagName.toLowerCase() == "form" ? this.el : $('form', this.el)[0];
            if(!this.form){
                this.form = global.Utils.getParentByTag(this.el, 'form');
            }
            if(this.form){
                this.form.setAttribute('novalidate','');
                //this.form.setAttribute('action', 'javascript:window.WidgetInstances.'+this.__name+'.onSubmitForm()');
            }
            this.$submit
                .onDom("click", function(e){
                    return that.onSubmitClick.apply(that, arguments);
                })
            ;
            this.$fields
                .onDom("focus", function(e){
                    that.hideErrorLabel.call(that, e.currentTarget);
                    that.showHintLabel.call(that, e.currentTarget);
                })
            ;
            this.$fields
                .onDom("blur", function(e){
                    that.hideHintLabel.call(that, e.currentTarget);
                })
            ;
            this.$fields
                .onDom("paste", function(e){
                    setTimeout(function(){
                        that.onFieldPaste.call(that, e, e.currentTarget);
                        that.onFieldActivity.call(that, e, e.currentTarget);
                    }, 100);
                })
            ;
            this.$fields
                .onDom("change", function(e){
                    that.onFieldChange.call(that, e, e.currentTarget);
                    that.onFieldActivity.call(that, e, e.currentTarget);
                })
            ;
            this.$fields
                .onDom("keyup", function(e){
                    that.onFieldKeyup.call(that, e, e.currentTarget);
                    that.onFieldActivity.call(that, e, e.currentTarget);
                })
            ;
            /*$(this.form)
                .onDom("submit", function(e){
                    return that.onSubmitForm.apply(that, arguments);
                })
            ;
            $(this.form)
                .onDom("onsubmit", function(e){
                    return that.onSubmitForm.apply(that, arguments);
                })
            ;*/
            $('.f_t', this.el)
                .onDom('keydown', function(e){
                    return that.checkPlaceholder.call(that, e);
                })
                .onDom('keyup', function(e){
                    //console.log(e);
                    return that.checkLength.call(that, e);
                })
                .onDom('focus', function(e){
                    //console.log(e);
                    return that.hideErrorLabel.call(that, e);
                })
            ;
            this.submitBlocksCount = 1;
            global.Utils.activateInnerSelectors(this.el);
        },
        validateField: function(el, val, noShowError){
            var rule, valid = true;
            var labels = Sizzle('[data-rule]', el.parentNode);

            if(!labels.length){
                var rule
                    ,errors = global.Utils.getDataObject(el, 'errors')
                ;

                for(var i in errors){
                    rule = i;
                    var not = false;
                    if (rule.indexOf("!") == 0) {
                        not = true;
                        rule = rule.substr(1);
                    }
                    if (rule == "email") {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!re.test(val) && not) {
                            if(!noShowError) {
                                this.showErrorLabel(el, errors[i]);
                            }
                            valid = false;
                        }
                    } else if (rule.indexOf('length') > -1) {
                        var exp = rule.replace('length', val.length);
                        var check = eval(exp);
                        if (check) {
                            if(!noShowError) {
                                this.showErrorLabel(el, errors[i]);
                            }
                            valid = false;
                        }
                        /*if(rule.indexOf('>=')>-1){
                         parts = rule.split(">=");
                         val = parseInt(parts[2]);
                         if(val>=)
                         }*/
                    } else if (rule.indexOf('value') > -1) {
                        var exp = rule.replace('value', val);
                        var check = eval(exp);
                        if (not && !check) {
                            if(!noShowError) {
                                this.showErrorLabel(el, errors[i]);
                            }
                            valid = false;
                        }
                    }
                }
            }else {
                // TODO: remove it when old landing will no longer be used
                for (var i in labels) {
                    rule = global.Utils.getData(labels[i], "rule");
                    console.log("rule " + rule);
                    var not = false;
                    if (rule.indexOf("!") == 0) {
                        not = true;
                        rule = rule.substr(1);
                    }
                    if (rule == "email") {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!re.test(val) && not) {
                            this.showRuleErrorLabel(labels[i]);
                            valid = false;
                        }
                    } else if (rule.indexOf('length') > -1) {
                        var exp = rule.replace('length', val.length);
                        var check = eval(exp);
                        if (check) {
                            this.showRuleErrorLabel(labels[i]);
                            valid = false;
                        }
                        /*if(rule.indexOf('>=')>-1){
                         parts = rule.split(">=");
                         val = parseInt(parts[2]);
                         if(val>=)
                         }*/
                    } else if (rule.indexOf('value') > -1) {
                        var exp = rule.replace('value', val);
                        var check = eval(exp);
                        if (not && !check) {
                            this.showRuleErrorLabel(labels[i]);
                            valid = false;
                        }
                    }
                }
            }
            return valid;
        },
        validate: function(data, noShowError) {
            var that = this;
            var r = data || {};
            var valid = true;
            this.$fields.each(function(el) {
                that.hideAllErrorLabels(el);
                var val = el['value'];
                var n = el['name'], v = global.Utils.toString(val), o=r[n];
                if (/form/i.test(el['tagName'])){
                    // @condblock ie9compatibility
                    $(global.Utils.collect(el['elements'], global.Utils.nonOp))['values'](r); // must be recollected, as IE<=9 has a nodeType prop and isList does not work
                    // @condend
                    // @cond !ie9compatibility $(el['elements'])['values'](r);
                }else if (n && (!/kbox|dio/i.test(el['type']) || el['checked'])) { // short for checkbox, radio
                    if (global.Utils.isList(o)){
                        o.push(v);
                    }else{
                        r[n] = (o == null) ? v : [o, v];
                        if(el.type != "hidden" && !global.Utils.hasClass(el, "noValidate") && !global.Utils.getAttr(el, "disabled") ){
                            valid = that.validateField.call(that, el, r[n], noShowError) && valid;
                        }
                    }
                }
            });
            return valid ? r : false;
        },
        getData: function() {
            var that = this;
            var r = {};
            this.$fields.each(function(el) {
                var val = el['value'];
                var n = el['name'], v = global.Utils.toString(val), o=r[n];
                if (/form/i.test(el['tagName'])){
                    // @condblock ie9compatibility
                    $(global.Utils.collect(el['elements'], global.Utils.nonOp))['values'](r); // must be recollected, as IE<=9 has a nodeType prop and isList does not work
                    // @condend
                    // @cond !ie9compatibility $(el['elements'])['values'](r);
                }else if (n && (!/kbox|dio/i.test(el['type']) || el['checked'])) { // short for checkbox, radio
                    if (global.Utils.isList(o)){
                        o.push(v);
                    }else{
                        r[n] = (o == null) ? v : [o, v];
                    }
                }
            });
            return r;
        },
        submit: function(values){
            this.hasErrors = false;
            this.submitting = true;
            this.responseData = {};
            if(this.$submit.length) {
                global.Utils.showLoader(this.$submit[0]);
            }else{
                global.Utils.showGlobalPreloader();
            }
            ajax({
                type: 'POST'
                , url: this.url
                , data: values
                , success: this.onSubmitSuccess
                , error: this.onSubmitError
                , dataType: 'json'
                , context: this
            });
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.SYSTEM.SENT_TO_SERVER);
            global.logError("EVENT.SYSTEM.SENT_TO_SERVER ["+this.url+"]: "+JSON.stringify(values), "signup/App.js",  new Error());
        },
        onSubmitSuccess: function(data){
            var code = data.response.code,
                data = data.response.data;
            this.responseData = data;
            //hideAllErrors
            //(this.$fields.find('.f_err'));

            this.submittedBlocks++;
            if(data.firstname && data.lastname) {
                delete data.lastname;
            }
            if(code !== 0){
                this.hasErrors = true;
            }
            this.handleDataError(code, data);
            this.handleRedirect(code, data);
        },
        handleDataError: function(code, data){
            if(this["handleErrorCode"+code]){
                this["handleErrorCode"+code](data);
            }
        },
        handleErrorCode101: function(data){
            var item, key;
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.SYSTEM.SERVER_DATA_ERROR);

            global.logError("EVENT.SYSTEM.SERVER_DATA_ERROR: "+JSON.stringify(data), "signup/App.js",  new Error());

            if(!global.Utils.isString(data)){
                for(key in data){
                    item = this.$fields.filter(function(item){
                        return item.name == key;
                    })[0];
                    global.Utils.addClass(item, 'error');
                    this.showErrorLabel(item, data[key][0]);
                }
            }
        },
        handleErrorCode1: function(data){
            var item, key;
            for(key in data){
                item = this.$fields[0];
                global.Utils.addClass(item, 'error');
                this.showErrorLabel(item, "Не зарегистрировано");
            }
        },
        onSubmitError: function(data){

            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.SYSTEM.SERVER_ERROR);

            global.logError("EVENT.SYSTEM.SERVER_ERROR: "+JSON.stringify(data), "signup/App.js",  new Error());

            if(this.$submit.length) {
                global.Utils.hideLoader(this.$submit[0]);
            }else{
                global.Utils.hideGlobalPreloader();
            }
            //alert( "Ошибка отправки данных: " + textStatus );
            this.submittedBlocks++;
            this.hasErrors = true;
            this.handleRedirect();
        },
        handleRedirect: function(code, data) {
            var that = this;
            if(this.submittedBlocks != this.submitBlocksCount){
                return;
            }
            this.submittedBlocks = 0;
            this.submitting = false;
            if(this.hasErrors){
                this.toggleButton(false);
                if(this.$submit.length) {
                    global.Utils.hideLoader(this.$submit[0]);
                }else{
                    global.Utils.hideGlobalPreloader();
                }
            }else{

                if(this.$submit.length) {
                    global.Utils.showLoader(this.$submit[0]);
                }

                var redirect;
                if(data && data.url){
                    redirect = data.url;
                }else {
                    redirect = that.redirect;
                    var mainPage = new RegExp('^http:\/\/' + document.domain + '$');
                    //редирект в профиль пользователя
                    if (data && data.id > 0 && mainPage.test(redirect)) {
                        redirect += '/' + data.id;
                    }
                    // TODO: переместить в реализацию этого абстрактного конструктора
                    if (that.analytics == "STEP1") {
                        StatisticsProxy.trackEvent(StatisticsProxy.EVENT.REGISTRATION.STEP1);
                        if (redirect) {
                            setTimeout(function () {
                                global.location = redirect;
                            }, 300);
                        }else{
                            if(this.$submit.length) {
                                global.Utils.hideLoader(this.$submit[0]);
                            }else{
                                global.Utils.hideGlobalPreloader();
                            }
                        }
                        return;
                    } else if (that.analytics == "STEP2") {
                        StatisticsProxy.trackEvent(StatisticsProxy.EVENT.REGISTRATION.STEP2);
                        if (redirect) {
                            setTimeout(function () {
                                global.location = redirect;
                            }, 300);
                        }else{
                            if(this.$submit.length) {
                                global.Utils.hideLoader(this.$submit[0]);
                            }else{
                                global.Utils.hideGlobalPreloader();
                            }
                        }
                        return;
                    }
                }
                if(redirect){
                    global.location = redirect;
                }else{
                    if(this.$submit.length) {
                        global.Utils.hideLoader(this.$submit[0]);
                    }else{
                        global.Utils.hideGlobalPreloader();
                    }
                }
                return;
            }
        },
        onSubmitClick: function(e){
            return this.onSubmitForm(e);
        },
        onSubmitForm: function(e){
            if(e && e.stopPropagation){
                e.stopPropagation();
            }
            var values = this.validate();
            if(!values || this.submitting){
                return false;
            }
            this.submittedBlocks = 0;
            this.submit(values);
            return false;
        },

        onFieldChange: function(e, el){

        },

        onFieldKeyup: function(e, el){

        },

        onFieldPaste: function(e, el){

        },

        onFieldActivity: function(e, el){

        },

        toggleButton: function(disable){
            if(!disable){
                //this.$submit
                /*btn
                    .prop('disabled', false)
                    .removeAttr('disabled')
                    .removeClass('disabled');*/
            }else{
                /*$btn
                    .prop('disabled', true)
                    .attr('disabled', 'disabled')
                    .addClass('disabled');*/
            }
        },
        // placeholders
        hideHintLabel: function (field){
            if(!field){
                return;
            }
            $('.b_form_hint', field.parentNode).each(function(item, index){
                global.Utils.addClass(item, "hide");
            });
        },
        showHintLabel: function (field, text){
            if(!field){
                return;
            }
            var $labels = $('.b_form_hint', field.parentNode);
            $labels.each(function (item, index) {
                global.Utils.removeClass(item, "hide");
                global.Utils.removeClass(item, "hidden");
                if(text) {
                    item.innerHTML = text;
                }
            });
        },
        hideAllErrorLabels: function (el){
            if(!el){
                return;
            }
            var parent = global.Utils.getParentByAttr(el, 'data-error');
            if(parent) {
                global.Utils.removeClass(parent, 'b_form_input__invalid');
            }

            // TODO: remove when old landing is no longer exist
            $('.f_err', el.parentNode).each(function(item, index){
                global.Utils.addClass(item, "hide");
            });

        },
        hideErrorLabel: function (field){
            if(!field){
                return;
            }
            var parent = global.Utils.getParentByAttr(field, 'data-error');
            if(parent) {
                global.Utils.removeClass(parent, 'b_form_input__invalid');
            }

            // TODO: remove when old landing is no longer exist
            $('.f_err', field.parentNode).each(function(item, index){
                global.Utils.addClass(item, "hide");
            });
        },
        showErrorLabel: function (field, text){
            if(!field){
                return;
            }
            var labels = $('.f_err', field.parentNode);
            if(labels.length) {
                // TODO: remove when old landing is no longer exist
                var error = $(labels).filter(function (item) {
                    return global.Utils.getData(item, "rule") == "error";
                });
                if (error.length) {
                    error = error[0];
                } else {
                    error = labels[0];
                }
                $(error).each(function (item, index) {
                    global.Utils.removeClass(item, "hide");
                    global.Utils.removeClass(item, "hidden");
                    item.innerHTML = text;
                });
            }else{
                var parent = global.Utils.getParentByAttr(field, 'data-error');
                if(parent) {
                    global.Utils.addClass(parent, 'b_form_input__invalid');
                    global.Utils.setData(parent, 'error', text);
                }
            }
        },
        // TODO: remove when old landing is no longer exist
        showRuleErrorLabel: function (field){
            if(!field){
                return;
            }
            global.Utils.removeClass(field, "hide");
            global.Utils.removeClass(field, "hidden");
        },
        checkPlaceholder: function (e){
            var target = $('.f_t__p', e.target.parentNode)[0];
            this.hideErrorLabel(e.target);
            var keycode = e.keyCode ? e.keyCode : e.which;
            if(keycode == 13){
                this.onSubmitForm();
            }
            if(target && global.Utils.hasClass(target.parentNode, "f_t__p_act")){
                return true;
            }
            if ( target
				&& keycode !== 8
                && keycode !== 9
                && keycode !== 16
                && keycode !== 17
                && keycode !== 18
                ){
                global.Utils.addClass(target.parentNode, "f_t__p_act");
            }
            //return true;
        },
        checkLength: function (e){
            var ph = $('.f_t__p', e.target.parentNode)[0];
			if (ph){
				if ( e.target.value.length > 0) {
					global.Utils.addClass(ph.parentNode, 'f_t__p_act');
				} else {
					global.Utils.removeClass(ph.parentNode, 'f_t__p_act');
				}
			}
            return true;
        }
    });

    /**
     * POPUP FORM
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.PopupForm = global.Widgets.Form.extend({
        __popup: true,
        modal: true,
        cover: '#popup-cover',
        init: function( params ){
            var that = this;
            this.parseParams(params);

            if(this.el && this.el.tagName == 'SCRIPT'){
                this.el = global.Utils.addElementFromText(
                    null,
                    this.el.innerHTML,
                    this.name
                );
                params.el = this.el;
            }

            if(this.template){
                var template = $(this.template);
            }
            if(!this.el && this.name && template && template.length){
                var cover = $(this.cover);
                var coverHTML = cover[0] ? cover[0].innerHTML : "";
                this.cover = coverHTML;
                this.content = template[0].innerHTML;
                var tParams = global.Utils.getData(template[0], "params");
                this.parseParams(tParams);
                this.el = global.Utils.addElementFromText(
                    doc.body,
                    this.cover.replace('{content}', this.content),
                    this.name
                );
                global.Utils.addClass(this.el, 'popup_container');
                global.StartApp.bindWidgets(this.el);
                this.parseUI();
            }

            global.Widgets.Form.prototype.init.apply(this, arguments);
            $('.close-button', this.el).onDom("click", function(e){
                e.preventDefault();
                that.onCloseClick.apply(that, arguments);
            });
            $('.popup-close', this.el).onDom("click", function(e){
                e.preventDefault();
                that.onCloseClick.apply(that, arguments);
            });
            $('.back-button', this.el).onDom("click", function(e){
                e.preventDefault();
                that.onBackClick.apply(that, arguments);
            });
            $('.button-back', this.el).onDom("click", function(e){
                e.preventDefault();
                that.onBackClick.apply(that, arguments);
            });
        },
        onCloseClick: function( e ){
            this.hide();
        },
        onBackClick: function( e ){
            this.hide();
        },
        /**
         * Handler for "show" command, that executes in WidgetUtils.execute
         * @param data
         */
        showHandler: function( data ){
            this.parseParams(data);
            this.show(data);
        },
        hide: function(){
            global.WidgetUtils.execute("BodyStage", "unlock");
            global.Widgets.Form.prototype.hide.apply(this, arguments);
        },
        show: function( data ){
            this.data = data;
            global.Widgets.PopupForm.showStack.push(this);
            if(this.modal){
                var popups = global.WidgetUtils.getInstanses({ __popup:true });
                for(var i in popups){
                    popups[i].hide();
                }
            }
            global.WidgetUtils.execute("BodyStage", "lock");
            global.Widgets.Form.prototype.show.apply(this, arguments);
        }
    });
    global.Widgets.PopupForm.showStack = [];
    global.Widgets.PopupForm.showPopup = function(constructorName, instanceName, data){
        if(!global.WidgetInstances[instanceName]){
            var inst = new global.Widgets[constructorName]({name:instanceName});
            global.WidgetInstances[instanceName] = inst;
        }
        global.WidgetUtils.execute(instanceName, "show", data);
    };


    global.Widgets.Step2FormWidget = global.Widgets.Form.extend({
        init: function(params){
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.REGISTRATION.SHOW_STEP2);
            global.Widgets.Form.prototype.init.apply(this, arguments);
        },
        submit: function(values){
            if((!parseInt(values.mark_id) || parseInt(values.mark_id) < 0) && parseInt(values.haveCar)){
                $('.f_text',this.fields.mark.parentNode)[0].style.background = "#fdc";
                return;
            }else{
                $('.f_text',this.fields.mark.parentNode)[0].style.background = "#fff";
            }
            global.Widgets.Form.prototype.submit.apply(this, arguments);
        }
    });

    global.Widgets.CarSelector = global.AbstractWidget.extend({
        hasErrors: false,
        submitting: false,
        model:{

        },
        fields:{
            haveCar: null,
            mark: null,
            model: null,
            year_production: null,
            year_buy: null,
            modification: null
        },
        api:{
            brandListUrl:               API_HOST + "/catalog/auto/mark/"
            ,modelListUrl:              API_HOST + "/catalog/auto/model/"
            ,generationListUrl:         API_HOST + "/catalog/auto/generations/"
            ,yearListUrl:               API_HOST + "/catalog/auto/model/"
            ,modificationListUrl:       API_HOST + "/catalog/auto/modification/"
        },
        date: new Date(),
        init: function(params){
            var i;
            this.submittedBlocks = 0;
            if(params){
                for(i in params){
                    this[i] = params[i];
                }
            }
            var that = this;

            this.parseFields();

            var el;
            for(i in this.fields){
                el = this.fields[i];
                if(el && el.value && el.name){
                    this.model[el.name] = global.Utils.isNumber(el.value) ? parseInt(el.value) : el.value;
                }
                $(el).onDom('change', function(e){
                    var key = global.Utils.getData(e.target, "field");
                    var handler = that[key+"ChangeHandler"];
                    if(handler){
                        handler.call(that, e);
                    }
                });
            }

            this.updateMarkList();
        },

        /**
         * Handlers are bound in init
         * @param e
         */
        haveCarChangeHandler: function(e){
            var el = e.target;
            var haveCar = parseInt(el.value);
            var lastHaveCar = this.model.haveCar;
            this.model.haveCar = haveCar;

            console.log("haveCar changed: "+haveCar);

            if(haveCar == 1){
                global.Utils.enableSelector(this.fields.mark);
                //this.fields.mark.selectedIndex = 0;
                //this.fields.mark.options[0].selected = true;
                //$(this.fields.mark).trigger("change");
                var mark = this.fields.mark.selectedIndex;
                if(mark){
                    global.Utils.enableSelector(this.fields.model);
                }
                //this.markChangeHandler({currentTarget: this.fields.mark});

                var year = this.fields.year_production.selectedIndex;
                if(year){
                    global.Utils.enableSelector(this.fields.year_buy);
                }
            }else if(haveCar == 2){
                global.Utils.enableSelector(this.fields.mark);
                var mark = this.fields.mark.selectedIndex;
                if(mark){
                    global.Utils.enableSelector(this.fields.model);
                }
                //this.fields.mark.selectedIndex = 0;
                //$(this.fields.mark).trigger("change");
                //this.markChangeHandler({currentTarget: this.fields.mark});
                global.Utils.disableSelector(this.fields.year_buy);
            }else{
                this.fields.mark.selectedIndex = 0;
                this.fields.mark.options[0].selected = true;
                $(this.fields.mark).trigger("change");
                this.markChangeHandler({currentTarget: this.fields.mark});
                global.Utils.disableSelector(this.fields.mark);
                global.Utils.disableSelector(this.fields.year_buy);
            }
        },

        markChangeHandler: function(e){
            /*var z = e;
             setTimeout(function(){
             JSON.stringify(z);
             },0);
             return;*/
            var el = e.currentTarget || e.target;
            var id = parseInt(el.value);
            this.clearCarMark();
            if(!id) return;
            this.updateModelList(id);
            this.model.mark_id = id;
            global.Utils.enableSelector(this.fields.model);
        },

        modelChangeHandler: function(e){
            var el = e.currentTarget || e.target;
            var id = parseInt(el.value);
            if(this.fields.generation) {
                this.clearCarGeneration();
                if (!id) return;
                this.updateGenerationList(id);
                this.model.generation_id = id;
                global.Utils.enableSelector(this.fields.generation);
            }else {
                this.clearCarYear();
                if (!id) return;
                this.updateYearsList(id);
                this.model.model_id = id;
                global.Utils.enableSelector(this.fields.year_production);
            }
        },

        year_productionChangeHandler: function(e){
            var el = e.currentTarget || e.target;
            var year = parseInt(el.value);
            this.clearCarYearBuy();
            this.clearCarModification();
            if(!year) return;
            this.updateBuyYearsList(year);
            if(this.model.haveCar == 1){
                global.Utils.enableSelector(this.fields.year_buy);
            }
            this.updateModificationList(this.model.model_id, year);
            this.model.year_production = year;
            global.Utils.enableSelector(this.fields.modification);
        },

        year_buyChangeHandler: function(e){
            var el = e.currentTarget || e.target;
            var year = parseInt(el.value);
            this.model.year_buy = year;
        },

        modificationChangeHandler: function(e){
            var el = e.currentTarget || e.target;
            var id = parseInt(el.value);
            this.model.modification = id;
        },

        clearCarMark: function(){
            delete this.model.mark_id;
            //global.Utils.disableSelector(this.fields.mark);
            this.clearCarModel();
            /*global.Utils.clearSelector(
             this.fields.mark
             ,'<option value="0">Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ð¼Ð°Ñ€ÐºÑƒ</option>'
             );*/
        },

        clearCarModel: function(){
            delete this.model.model_id;
            global.Utils.disableSelector(this.fields.model);
            global.Utils.clearSelector(
                this.fields.model
                , {value:"0", text:"Выберите модель"}
            );
            if(this.fields.generation) {
                this.clearCarGeneration();
                return;
            }
            this.clearCarYear();
        },

        clearCarGeneration: function(){
            delete this.model.generation;
            global.Utils.disableSelector(this.fields.generation);
        },

        clearCarYear: function(){
            delete this.model.year_production;
            global.Utils.disableSelector(this.fields.year_production);
            this.clearCarYearBuy();
            this.clearCarModification();
        },

        clearCarYearBuy: function(){
            delete this.model.year_buy;
            global.Utils.disableSelector(this.fields.year_buy);
        },

        clearCarModification: function(){
            delete this.model.modification;
            global.Utils.disableSelector(this.fields.modification);
        },

        updateMarkList: function(){
            this.updateList(
                this.fields.mark
                , this.api.brandListUrl
                , function(data){ return {value:data.mark_id, text:data.mark_name}; }
                , null
                , {value:0,text:'Выберите марку'}
            );
        },

        updateModelList: function(id){
            this.updateList(
                this.fields.model
                , this.api.modelListUrl+"?mark_id="+id
                , function(data){ return {value:data.model_id, text:data.model_name}; }
                , null
                , {value:0,text:'Выберите модель'}
            );
        },

        updateGenerationList: function(id){
            this.updateList(
                this.fields.generation
                , this.api.generationListUrl+"?model_id="+id
                , function(data){ return {value:data.generation_id, text:data.generation_name}; }
                , function(data){
                    return data;
                }
                , {value:0,text:'Выберите поколение'}
            );
        },

        updateYearsList: function(id){
            this.updateList(
                this.fields.year_production
                , this.api.modelListUrl+"?model_id="+id
                , function(data){ return {value:data.year, text:data.year}; }
                , function(data){
                    return data.production_year;
                }
                , {value:0,text:'Выберите год'}
            );
        },

        updateBuyYearsList: function(year){
            global.Utils.clearSelector(this.fields.year_buy, {text:"Выберите год",value:"0"});
            for(var i = year; i <= this.date.getFullYear(); i++ ){
                //html += global.Utils.template(template, {year:i});
                this.fields.year_buy.options.add(global.Utils.getOptionElement(i,i));
            }
            //this.fields.year_buy.innerHTML = html;
        },

        updateModificationList: function(id, year){
            this.updateList(
                this.fields.modification
                , this.api.modificationListUrl+"?model_id="+id+"&year="+year
                , function(data){ return {value:data.modification_id, text:data.modification_name}; }
                , null
                ,{value:0,text:'Выберите модификацию'}
            );
        },

        updateList: function(selector, url, mapFunction, filter, preUnit, postUnit){
            var that = this;
            this.getApiList(url
                , {}
                , function(data){
                    if(global.Utils.isString(data)){
                        data = JSON.parse(data);
                    }
                    var status = data.status;
                    if(status >= 400){
                        that.onListUpdateError.call(that, data);
                        return;
                    }
                    var code = data.response.code;
                    data = data.response.data;
                    if(filter){
                        data = filter(data);
                    }
                    that.onListUpdated.call(that, selector, data, mapFunction, preUnit, postUnit);
                }
                , this.onListUpdateError
            );
        },

        onListUpdated: function(selector, list, mapFunction, preUnit, postUnit){
            //var html = global.Utils.getListHtml(template, data, preHtml, postHtml);
            //selector.outterHTML = "<select>"+html+"</select>";
            global.Utils.addOptionsToSelect(selector, list, mapFunction, preUnit, postUnit);
        },

        onListUpdateError: function(data){

        },

        getApiList: function(url, data, onSuccess, onError){
            var that = this;
            ajax({
                type: 'POST'
                , url: url
                , data: data
                , success: function(data){ if(onSuccess) onSuccess.apply(that, arguments); }
                , error: function(data){ if(onError) onError.apply(that, arguments); }
                , dataType: 'json'
            });
        }
    });

    global.Widgets.SocialAuth = global.AbstractWidget.extend({
        init: function(params){
            if(params){
                for(var i in params){
                    this[i] = params[i];
                }
            }
            var that = this;

            if(global.isMobile.any){
                global.Utils.addClass(this.el, "hide");
                return;
            }

            this.$buttons = $('a', this.el);
            this.$buttons
                .onDom('click', function(e){
                    return that.auth.call(that, e);
                })
            ;
        },
        auth: function(e){
            e.preventDefault();
            var el = e.target;
            while(el.parentNode && !el.href){
                el = el.parentNode;
            }
            if(!el.href){
                return;
            }
            var href = el.href;
            href +=
                (href.indexOf("?")>-1 ? "&" : "?")
                    + addParams
                    + (addParams?"&":"") + "signin=false&utm_referrer="
                    + document.referrer;
            global.open(href, "socialLoginWindow", "height=400,width=600,left=center,top=middle,menubar=no");
            return false;
        }
    });

    /**
     * SOCIAL EXTRA POPUP
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.SocialExtraAuthForm = global.Widgets.PopupForm.extend({
		template: '#bind-popup-template',
        ui: {
            avatar:         '.user-avatar'
            ,name:           '.user-name'
            ,provider:       '.provider-name'
            ,passwordBlock:  '.password-container'
        },
        name:               'SocialExtraAuth',
        template:           '#social-extra-popup-template',
        init: function( params ){
            var that = this;
            global.Widgets.PopupForm.prototype.init.apply(this, arguments);
            //Sizzle('[data-field=already_registered]', this.el)[0]
            $(this.fields.already_registered).onDom("change", function(e){
                return that.onRegisteredChange.apply(that, arguments);
            });
            $('.remind-password', this.el).onDom("click", function(e){
                return that.onRemindClick.apply(that, arguments);
            });
            this.updateRegisteredState();
        },
        updateRegisteredState: function( e ){
            var el = this.fields.already_registered;
            if(el.checked){
                global.Utils.removeClass(this.ui.passwordBlock, "hide");
                global.Utils.removeClass(this.fields.password, "noValidate");
                this.$submit[0].innerHTML = "Связать аккаунты";
            }else{
                global.Utils.addClass(this.ui.passwordBlock, "hide");
                global.Utils.addClass(this.fields.password, "noValidate");
                this.$submit[0].innerHTML = "Зарегистрироваться";
            }
            return true;
        },
        onRegisteredChange: function( e ){
            this.updateRegisteredState();
			return true;
        },
        onRemindClick: function( e ){
            this.hide();
            global.Widgets.PopupForm.showPopup("RemindPasswordPopupWidget","RemindPasswordPopup", {email:this.fields.email.value});
            return true;
        },
        showHandler: function( data ){
            global.Widgets.PopupForm.prototype.showHandler.apply(this, arguments);
            if(!data){
                return;
            }
            var providerField = Sizzle('[data-field=provider]', this.el)[0];
            providerField.value = data.extra.provider;

            this.ui.avatar[0].src = data.content.avatar;
            this.ui.name[0].innerHTML = data.content.name;

            global.Utils.addClass($('.provider-name', this.el), 'hidden');
            global.Utils.removeClass($('.name-'+data.extra.provider, this.el), 'hidden');

            global.Utils.addClass($('.social-icon', this.el), 'hidden');
            global.Utils.removeClass($('.icon-'+data.extra.provider, this.el), 'hidden');

        },
        handleErrorCode101: function(data){
            var item, key, data=data.error;
            if(!global.Utils.isString(data)){
                for(key in data){
                    item = this.$fields.filter(function(item){
                        return item.name == key;
                    })[0];
                    global.Utils.addClass(item, 'error');
                    this.showErrorLabel(item, data[key][0]);
                }
            }
        },
        handleErrorCode2: function(data){
            var item = this.fields.password;
            global.Utils.addClass(item, 'error');
            this.showErrorLabel(item, "Неправильный пароль");
        },
        handleRedirect: function(){
            var registered = Sizzle('[data-field=already_registered]', this.el)[0];
            if(registered.checked){
                StatisticsProxy.trackEvent(StatisticsProxy.EVENT.AUTH[this.data.extra.provider.toUpperCase()]);
            }else{
                StatisticsProxy.trackEvent(StatisticsProxy.EVENT.REGISTRATION[this.data.extra.provider.toUpperCase()]);
            }
            var that = this;
            setTimeout(function(){
                global.Widgets.PopupForm.prototype.handleRedirect.apply(that, arguments);
            }, 300);
        }
    });

    /**
     * START PAGE SIGNUP FORM
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.SignupFormWidget = global.Widgets.Form.extend({
        keyActivitySent: false,
        init: function(params){
            var that = this;
            this.parseParams(params);
            global.Widgets.Form.prototype.init.apply(this, arguments);
            $('input', this.el).on("keydown", function(e){
                if(!that.keyActivitySent) {
                    StatisticsProxy.trackEvent(StatisticsProxy.EVENT.REGISTRATION.KEYBOARD_ACTIVITY);
                    that.keyActivitySent = true;
                }
                return true;
            });
            global.Utils.bindCollapsibleBaloon(this.el);
        }
    });

    /**
     * START PAGE SIGNUP FORM
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.UnauthorizedTopPanelWidget = global.Widgets.Form.extend({
        init: function(params){
            var that = this;
            $('.enter-button', this.el).onDom("click", this.onEnterClick.bind(this));
            $('.register-button', this.el).onDom("click", this.onRegisterClick.bind(this));
        },
        onEnterClick: function(e){
            e.preventDefault();
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.AUTH.HEAD_CLICK);
            global.Widgets.PopupForm.showPopup("SigninPopupWidget","SigninPopup");
        },
        onRegisterClick: function(e){
            e.preventDefault();
            global.Utils.showGlobalPreloader();
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.REGISTRATION.HEAD_CLICK);
            var url = global.Utils.getData(e.currentTarget, "href") || global.Utils.getAttr(e.currentTarget, "href");
            global.Utils.redirectWithDelay(url, 500);
        }
    });

    /**
     * SIGNIN POPUP
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.SigninPopupWidget = global.Widgets.PopupForm.extend({
        ui:{
            avatar:         '.user-avatar'
            ,name:           '.user-name'
            ,provider:       '.provider-name'
        },
        name: 'SigninPopup',
        template: '#signin-popup-template',
        init: function(params){
            var that = this;

            global.Widgets.PopupForm.prototype.init.apply(this, arguments);

            $('.remind-password', this.el).onDom("click", function(e){
                e.preventDefault();
                that.onRemindClick.apply(that, arguments);
            });
            global.Utils.bindCollapsibleBaloon(this.el);
        },
        onRemindClick: function(e){
            this.hide();
            global.Widgets.PopupForm.showPopup("RemindPasswordPopupWidget","RemindPasswordPopup",{email:this.fields.email.value});
        },
        handleRedirect: function(){
            if(this.hasErrors){
                global.Widgets.PopupForm.prototype.handleRedirect.apply(this, arguments);
                return;
            }
            var that = this;
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.AUTH.SITE);
            setTimeout(function(){
                global.Widgets.PopupForm.prototype.handleRedirect.apply(that, arguments);
            }, 600);
        },
        handleErrorCode1: function(data){
            var item = this.fields.email;
            global.Utils.addClass(item, 'error');
            this.showErrorLabel(item, "Email не найден");
        },
        handleErrorCode2: function(data){
            var item = this.fields.password;
            global.Utils.addClass(item, 'error');
            this.showErrorLabel(item, "Неправильный пароль");
        }
    });

    /**
     * REMIND PASSWORD POPUP
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.RemindPasswordPopupWidget = global.Widgets.PopupForm.extend({
        ui:{
            completeBlock:          '.send-complete'
           ,sendForm:               '.popup-form'
           ,completeText:           '.complete-text'
        },
        name: 'RemindPasswordPopup',
        template: '#changepass-popup-template',
        init: function(params){
            global.Widgets.PopupForm.prototype.init.apply(this, arguments);
            if(this.ui.completeText && this.ui.completeText.length){
                this.completeTemplate = this.ui.completeText[0].innerHTML;
            }
        },
        onBackClick: function(e){
            this.hide();
            global.Widgets.PopupForm.showStack[global.Widgets.PopupForm.showStack.length-2].showHandler();
        },
        show: function(data){
            global.Widgets.PopupForm.prototype.show.apply(this, arguments);
            if(!this.fields.email){
                return;
            }
            this.fields.email.value = data.email;
            $(this.fields.email).trigger("keyup",{target:this.fields.email, currentTarget:this.fields.email});
            this.fields.email.focus();
        },
        hide: function(data){
            global.Widgets.PopupForm.prototype.hide.apply(this, arguments);
            this.showSendForm();
        },
        showCompleteBlock: function(){
            global.Utils.removeClass(this.ui.completeBlock, 'hidden');
            global.Utils.addClass(this.ui.sendForm, 'hidden');
            this.ui.completeText[0].innerHTML = this.completeTemplate.replace("#email#", this.fields.email.value);
        },
        showSendForm: function(){
            global.Utils.addClass(this.ui.completeBlock, 'hidden');
            global.Utils.removeClass(this.ui.sendForm, 'hidden');
        },
        onSubmitSuccess: function(data){
            global.Widgets.PopupForm.prototype.onSubmitSuccess.apply(this, arguments);
            var code = data.response.code,
                data = data.response.data;
            if(this.hasErrors){
                global.Utils.addClass(this.fields.email, 'error');
                this.showErrorLabel(this.fields.email, 'Ошибка ['+code+']! E-mail не найден.'); // TODO: send label from server
                return;
            }else{
                global.Utils.removeClass(this.fields.email, 'error');
            }
            this.showCompleteBlock();
        }
    });

    /**
     * BODY WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */

    global.Widgets.BodyStageConstructor = global.AbstractWidget.extend({
        init: function(params){
            if(params){
                for(var i in params){
                    this[i] = params[i];
                }
            }
        },
        lockHandler: function(data){
            var windowWidthBase = doc.body.clientWidth;
            global.Utils.addClass(this.el, this.locked || data || "lock");
            var windowWidthNew = doc.body.clientWidth;
            doc.body.style.marginRight = windowWidthNew - windowWidthBase + "px";
        },
        unlockHandler: function(data){
            global.Utils.removeClass(this.el, this.locked || data || "lock");
            doc.body.style.marginRight = "";
        }
    });


    /**
     * SOCIAL BUTTONS
     * @type {}
     */

    global.Widgets.SocialButtonsConstructor = global.AbstractWidget.extend({
        init: function(params){
            if(params){
                for(var i in params){
                    this[i] = params[i];
                }
            }
			if(this.templateId) {
				this.parseTemplate();
				return;
			}
			if(this.url) this.ajaxCall();
        },
		parseTemplate: function(){
			var html = Sizzle('#' + this.templateId)[0].innerHTML;
			this.insertButtons(global.Utils.decodeEntities(html));
		},
		insertButtons: function(data){
			global.Utils.insertNodes(data, this.el);
		},
		ajaxCall: function(){
			ajax({
				type: 'GET'
				, url: this.url
				, data: null
				, success: this.onAjaxCallSuccess
				, error: this.onAjaxCallFail
				, dataType: 'html'
				, context: this
			});
		},
		onAjaxCallSuccess: function(data){
			this.insertButtons(data);
		},
		onAjaxCallFail: function(){
			this.el.remove();
		}
    });



    /**
     *    ------------=========================================================-----------
     * --------------=====   - N - E - W -  - L - A - N - D - I - N - G -   =====----------------
     *    ------------=========================================================-----------
     */

    /**
     * NEW LANDING START PAGE SIGNUP FORM
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.LandingUnauthorizedTopPanelWidget = global.Widgets.UnauthorizedTopPanelWidget.extend({
        onEnterClick: function(e){
            e.preventDefault();
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.LANDING.AUTH.HEAD_CLICK);
            global.Widgets.PopupForm.showPopup("LandingSigninPopupWidget","SigninPopup");
        },
        onRegisterClick: function(e){
            e.preventDefault();
            global.Utils.showGlobalPreloader();
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.LANDING.REGISTRATION.HEAD_CLICK);
            var url = global.Utils.getData(e.currentTarget, "href") || global.Utils.getAttr(e.currentTarget, "href");
            global.Utils.redirectWithDelay(url, 500);
        }
    });

    /**
     * NEW LANDING SIGNIN POPUP
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.LandingSigninPopupWidget = global.Widgets.SigninPopupWidget.extend({
        handleRedirect: function(code, data){
            if(this.hasErrors){
                global.Widgets.PopupForm.prototype.handleRedirect.apply(this, arguments);
                return;
            }
            var that = this,
                args = arguments;
            if(this.noRedirectOnSuccess){
                this.hide();
                StatisticsProxy.trackEvent(StatisticsProxy.EVENT.QA.AUTH_COMPLETE_BEFORE_ASK);
                this.executeCommand("QuestionSubmitForm", "submitWithoutEmail");
                return;
            }
            global.Utils.showGlobalPreloader();
            StatisticsProxy.trackEvent(global.isMobile.any
                ? StatisticsProxy.EVENT.MOBILE.LANDING.AUTH.SUCCESS
                : StatisticsProxy.EVENT.LANDING.AUTH.SUCCESS);
            setTimeout(function(){
                global.Widgets.PopupForm.prototype.handleRedirect.apply(that, args);
            }, 1000);

        }
    });


    /**
     * CONTENT CONTAINER MENU FORM
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.ContentContainerWidget = global.AbstractWidget.extend({
        setMenuHandler: function(){
            this.setMenuMode();
        },
        setContentHandler: function(){
            this.setContentMode();
        },
        setMenuMode: function(){
            var that = this;
            $(this.el).onDom("click", this.onContentClick.bind(this));
        },
        setContentMode: function(){
            $(this.el).offDom("click", this.onContentClick);
            this.executeCommand('MobileMenuTrigger', 'hide');
        },
        onContentClick: function(e){
            e.preventDefault();
            this.setContentMode();
        }
    });

    /**
     * LANDING CONTENT CONTAINER MENU FORM
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.LandingContentContainerWidget = global.Widgets.ContentContainerWidget.extend({
        init:function(){
            //$('.kb-mark-link').onDom('click', this.onKBClick.bind(this));
        },
        onKBClick: function(e){
            global.Utils.showGlobalPreloader();
            StatisticsProxy.trackEvent(global.isMobile.any
                ? StatisticsProxy.EVENT.MOBILE.LANDING.KB_CLICK
                : StatisticsProxy.EVENT.LANDING.KB_CLICK
            );
            global.Utils.redirectWithDelay(global.Utils.getAttr(e.currentTarget, "href"), 500);
        }
    });

    /**
     * MOBILE MENU FORM
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.MobileMenuWidget = global.AbstractWidget.extend({
        init: function(params){
            $('.enter-button', this.el).onDom("click", this.onEnterClick.bind(this));
            $('.qa-link', this.el).onDom("click", this.onQAClick.bind(this));
            $('.kb-link', this.el).onDom("click", this.onKBClick.bind(this));
            $('.register-link', this.el).onDom("click", this.onRegisterClick.bind(this));
        },
        onQAClick: function(e){
            e.preventDefault();
            this.executeCommand('MobileMenuTrigger', 'hide');
            global.Utils.showGlobalPreloader();
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.MOBILE.LANDING.QA_CLICK);
            global.Utils.redirectWithDelay(global.Utils.getAttr(e.currentTarget, "href"), 500);
        },
        onKBClick: function(e){
            e.preventDefault();
            this.executeCommand('MobileMenuTrigger', 'hide');
            global.Utils.showGlobalPreloader();
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.MOBILE.LANDING.KB_CLICK);
            global.Utils.redirectWithDelay(global.Utils.getAttr(e.currentTarget, "href"), 500);
        },
        onRegisterClick: function(e){
            e.preventDefault();
            this.executeCommand('MobileMenuTrigger', 'hide');
            global.Utils.showGlobalPreloader();
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.MOBILE.LANDING.REGISTRATION.MENU_CLICK);
            var url = global.Utils.getData(e.currentTarget, "href") || global.Utils.getAttr(e.currentTarget, "href");
            global.Utils.redirectWithDelay(url, 500);
        },
        onEnterClick: function(e){
            e.preventDefault();
            this.executeCommand('MobileMenuTrigger', 'hide');

            //global.Widgets.PopupForm.showPopup("SigninPopupWidget","SigninPopup");

            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.MOBILE.LANDING.AUTH.MENU_CLICK);

            global.Utils.showGlobalPreloader();
            var url = global.Utils.getData(e.currentTarget, "href") || global.Utils.getAttr(e.currentTarget, "href");
            global.Utils.redirectWithDelay(url, 500);
        }
    });

    /**
     * MOBILE MENU FORM
     * @type {*|Object|AbstractViewMediator|Backbone.EventBinder}
     */
    global.Widgets.MobileMenuTriggerWidget = global.AbstractWidget.extend({
        init: function(params){
            var that = this;
            $(this.el).onDom("change", function(e){
                that.onMenuTriggerChanged.apply(that, arguments);
            });
        },
        onMenuTriggerChanged: function(e){
            var state = e.currentTarget.checked ? 1 : 0;
            this.executeCommand('ContentContainer', state ? 'setMenu' : 'setContent');
        },
        hideHandler: function(){
            $(this.el)[0].checked = false;
        }
    });

    /**
     * FORM SLIDER WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */
    var MAX_MOBILE_SCREEN_WIDTH = 600;
    global.Widgets.FormSliderWidget = global.AbstractWidget.extend({
        allowSlide: true,
        sliderParams: {

        },
        init: function(params){
            var that = this;
            this.sliderParams = {
                sliderId: "simple-slider",
                effect: screen.width < MAX_MOBILE_SCREEN_WIDTH ? "fade" : "slide",
                autoAdvance: true,
                pauseOnHover: true,
                pauseTime: 0,
                speed: 600,
                startSlide: 0,
                aspectRatio: "fixed",
                circular: true,
                touchCircular: true,
                mobileNav: false,
                nonClickablePager: true,
                preventSwipe: true,
                before: function(index, el){
                    that.onBeforeSlideChanged.apply(that, arguments);
                },
                after: function(index, el){
                    that.onAfterSlideChanged.apply(that, arguments);
                },
                multipleImages: {
                screenWidth: [0, 600],
                    path: ["/md/", "/lg/"]
                }
            };
            this.slider = new SimpleSlider(this.sliderParams);

            global.onresize = function(){
                if(!global.isMobile.any) {
                    that.refresh.call(that);
                }
            }

            $('input').onDom('focus', function(e){
                var el = e.currentTarget;
                //if (e.keyCode == 9) {
                    var hide = global.Utils.getParentByClass(el, 'hide');
                    console.log(hide);
                    if(hide) {
                        e.preventDefault();
                    }
                //}
            });
            $('select').onDom('focus', function(e){
                var el = e.currentTarget;
                //if (e.keyCode == 9) {
                    var hide = global.Utils.getParentByClass(el, 'hide');
                    if(hide) {
                        e.preventDefault();
                    }
                //}
            });
            $('textarea').onDom('focus', function(e){
                var el = e.currentTarget;
                //if (e.keyCode == 9) {
                    var hide = global.Utils.getParentByClass(el, 'hide');
                    if(hide) {
                        e.preventDefault();
                    }
                //}
            });

            global.addEventListener('orientationchange', this.onOrientationChanged.bind(this));

            // Initial execution if needed
            this.onOrientationChanged();
        },
        refresh: function(){
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth,
                y = w.innerHeight|| e.clientHeight|| g.clientHeight,
                that = this
            ;

            if(x < MAX_MOBILE_SCREEN_WIDTH){
                this.sliderParams.effect = "fade";
            }else{
                this.sliderParams.effect = "slide";
            }
            setTimeout(function(){
                that.slider.reload.call(that, that.sliderParams);
            }, 100);
        },
        prevHandler: function(){
            this.slider.prev();
        },
        nextHandler: function(){
            var that = this;
            setTimeout(function(){
                that.slider.next();
            }, 0);
        },
        gotoHandler: function(number){
            this.slider.slide(number);
        },
        reinitHandler: function(){
            this.refresh.call(this);
        },
        data: {},
        storeData: function(data){
            global.Utils.extend(this.data, data);
        },
        getData: function(){
            return this.data;
        },
        onOrientationChanged: function(){
            var that = this;
            switch(global.orientation){
                case -90:
                case 90:
                    console.log("landscape");
                    break;
                default:
                    console.log("portrait");
                    break;
            }
            this.refresh();
        },
        onBeforeSlideChanged: function(index, el){
            this.sliderParams.startSlide = index;
            return false;
        },
        onAfterSlideChanged: function(index, el){
        }
    });
    /**
     * MARK LIST WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */
    global.Widgets.MarkListWidget = global.AbstractWidget.extend({
        ui:{
            showAll:  '.show-all'
        },
        init: function(params){

            /*
            if(params){
                for(var i in params){
                    this[i] = params[i];
                }
            }
            */
            var that = this;
            $('.show-all', this.el).onDom("click", function(e){
                e.preventDefault();
                that.showAll.call(that);
            });
            $('.kb-mark-link', this.el).onDom("click", function(e){
                e.preventDefault();
                that.onMarkClick.apply(that, arguments);
            });

        },
        showAll: function(){
            global.Utils.addClass($('.top-marks', this.el)[0], 'hide');
            global.Utils.removeClass($('.all-marks', this.el)[0], 'hide');
        },
        onMarkClick: function(e){
            StatisticsProxy.trackEvent(global.isMobile.any
                    ? StatisticsProxy.EVENT.MOBILE.LANDING.KB_CLICK
                    : StatisticsProxy.EVENT.LANDING.KB_CLICK
            );
            this.executeCommand("EmailSubmitPopup", "show");
        }

    });

    /**
     * EXPERT SLIDER WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */
    global.Widgets.ExpertSliderWidget = global.AbstractWidget.extend({

        content: null,
        elementWidth: 0,

        init: function(params){
            var that = this;
            $('.next-button', this.el).onDom("click", function(e){
                e.preventDefault();
                that.nextHandler();
            });
            $('.prev-button', this.el).onDom("click", function(e){
                e.preventDefault();
                that.backHandler();
            });
            this.content = $('.slider-content', this.el)[0];
            this.elementWidth = parseInt(this.content.children[0].offsetWidth);
        },
        nextHandler: function(){
            var left = parseInt(this.content.style["margin-left"] || 0);
            left = parseInt(left - this.elementWidth);
            if(left < -this.elementWidth*(this.content.children.length-1)){
                left = -this.elementWidth*(this.content.children.length-1);//0;
            }
            this.content.style["margin-left"] = left + "px";
        },
        backHandler: function(){
            var left = parseInt(this.content.style["margin-left"] || 0);
            left = parseInt(left + this.elementWidth)
            if(left >= 0){
                left = 0;//-this.elementWidth*(this.content.children.length-1);
            }
            this.content.style["margin-left"] = left + "px";
        }
    });

    /**
     * SLIDER COMMON FORM WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */
    global.Widgets.SliderCommonFormWidget = global.Widgets.Form.extend({

        ui:{
            next: '.next-button',
            back: '.back-button',
            submit: '.submit-button'
        },

        init: function(params){
            global.Widgets.Form.prototype.init.apply(this, arguments);
            /*
             if(params){
             for(var i in params){
             this[i] = params[i];
             }
             }
             */

            var that = this;
            $('.next-button', this.el).onDom("click", function(e){
                e.preventDefault();
                that.nextHandler();
            });
            $('.back-button', this.el).onDom("click", function(e){
                e.preventDefault();
                that.backHandler();
            });
        },
        checkShowNext: function(){
            if(this.validate(null, true)){
                this.enableNext();
            }else{
                this.disableNext();
            }
        },
        checkShowSubmit: function(){
            if(this.validate(null, true)){
                this.enableSubmit();
            }else{
                this.disableSubmit();
            }
        },
        disableNext: function(){
            global.Utils.addClass($('.next-button', this.el)[0], 'btn_disabled');
        },
        enableNext: function(){
            global.Utils.removeClass($('.next-button', this.el)[0], 'btn_disabled');
        },
        disableSubmit: function(){
            global.Utils.addClass($('.submit-button', this.el)[0], 'btn_disabled');
        },
        enableSubmit: function(){
            global.Utils.removeClass($('.submit-button', this.el)[0], 'btn_disabled');
        },
        nextHandler: function(){
            var that = this;
            global.Utils.delayGlobalPreloader(function(){
                that.executeCommand.call(that, 'FormSlider', 'next');
            }, 700);
        },
        backHandler: function(){
            this.executeCommand('FormSlider', 'prev');
        }
    });

    /**
     * QUESTION FORM WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */
    global.Widgets.QuestionFormWidget = global.Widgets.SliderCommonFormWidget.extend({
        init: function(params){
            global.Widgets.SliderCommonFormWidget.prototype.init.apply(this, arguments);

            if(global.isMobile.any) {
                StatisticsProxy.trackEvent(StatisticsProxy.EVENT.MOBILE.LANDING.SHOW);
            }

            this.ui.next = $('.next-button', this.el);
            this.ui.back = $('.back-button', this.el);

            var that = this;

            $(this.fields.title).onDom("paste", function(e){
                setTimeout(that.checkShowNext.bind(that), 100);
            });
            $(this.fields.title).onDom("change keyup", function(e){
                that.checkShowNext();
            });
        },
        onFieldActivity: function(e){
            this.executeCommand("QuestionSubmitForm", "store", this.getData());
        },
        nextHandler: function(){
            var ok = this.validate();
            if(!ok) {
                StatisticsProxy.trackEvent(global.isMobile.any
                    ? StatisticsProxy.EVENT.MOBILE.LANDING.QA.STEP2_ERROR
                    : StatisticsProxy.EVENT.LANDING.QA.STEP2_ERROR);
                return;
            }

            global.logError(global.isMobile.any
                ? "EVENT.MOBILE.LANDING.QA.STEP2_SUCCESS"
                : "EVENT.LANDING.QA.STEP2_SUCCESS");

            StatisticsProxy.trackEvent(global.isMobile.any
                ? StatisticsProxy.EVENT.MOBILE.LANDING.QA.STEP2_SUCCESS
                : StatisticsProxy.EVENT.LANDING.QA.STEP2_SUCCESS);
            global.Widgets.SliderCommonFormWidget.prototype.nextHandler.apply(this, arguments);


        }
    });
    /**
     * QUESTION DETAILS FORM WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */
    global.Widgets.QuestionDetailsFormWidget = global.Widgets.SliderCommonFormWidget.extend({
        init: function(params){
            global.Widgets.SliderCommonFormWidget.prototype.init.apply(this, arguments);
            var that = this;
            $(this.fields.mark).onDom("change", function(e){
                that.checkShowNext();
            });
        },
        onFieldActivity: function(e){
            this.executeCommand("QuestionSubmitForm", "store", this.getData());
        },
        nextHandler: function(){
            var ok = this.validate();
            if(!ok) {
                StatisticsProxy.trackEvent(global.isMobile.any
                    ? StatisticsProxy.EVENT.MOBILE.LANDING.QA.STEP1_ERROR
                    : StatisticsProxy.EVENT.LANDING.QA.STEP1_ERROR);
                return;
            }

            StatisticsProxy.trackEvent(global.isMobile.any
                ? StatisticsProxy.EVENT.MOBILE.LANDING.QA.STEP1_SUCCESS
                : StatisticsProxy.EVENT.LANDING.QA.STEP1_SUCCESS);
            global.Widgets.SliderCommonFormWidget.prototype.nextHandler.apply(this, arguments);
        }
    });
    /**
     * QUESTION SUBMIT FORM WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */
    global.Widgets.QuestionSubmitFormWidget = global.Widgets.SliderCommonFormWidget.extend({
        data: {},
        init: function(params){
            global.Widgets.SliderCommonFormWidget.prototype.init.apply(this, arguments);
            this.ui.submit = $('.submit-button', this.el);
            var that = this;
            $(this.fields.email).onDom("paste", function(e){
                setTimeout(that.checkShowSubmit.bind(that), 100);
            });
            $(this.fields.email).onDom("change keyup", function(e){
                that.checkShowSubmit();
            });
            $('.submit-button', this.el).onDom("click", function(e){
                e.preventDefault();
                that.submitHandler();
            });
        },
        onFieldActivity: function(e){
            this.executeCommand("QuestionSubmitForm", "store", this.getData());
        },
        submitWithoutEmailHandler: function(){
            delete this.data['email'];
            this.submitHandler();
        },
        submitHandler: function(){
            var ok = this.validate();
            if(!ok) {
                return;
            }

            global.logError(global.isMobile.any
                ? "EVENT.MOBILE.LANDING.QA.STEP3_SUCCESS"
                : "EVENT.LANDING.QA.STEP3_SUCCESS");

            StatisticsProxy.trackEvent(global.isMobile.any
                ? StatisticsProxy.EVENT.MOBILE.LANDING.QA.STEP3_SUCCESS
                : StatisticsProxy.EVENT.LANDING.QA.STEP3_SUCCESS);
            global.Widgets.SliderCommonFormWidget.prototype.submit.call(this, this.data);
        },
        showErrorLabel: function(field, text){
            global.Widgets.SliderCommonFormWidget.prototype.showErrorLabel.apply(this, arguments);
            if(text == "Уже зарегистрирован"){
                setTimeout(function(){
                    StatisticsProxy.trackEvent(StatisticsProxy.EVENT.QA.SHOW_LOGIN_BEFORE_ASK);
                    global.Widgets.PopupForm.showPopup("LandingSigninPopupWidget", "SigninPopup", {noRedirectOnSuccess:true});
                }, 1500);

                StatisticsProxy.trackEvent(global.isMobile.any
                    ? StatisticsProxy.EVENT.MOBILE.LANDING.QA.STEP3_ALREADY_REGISTERED
                    : StatisticsProxy.EVENT.LANDING.QA.STEP3_ALREADY_REGISTERED)
                ;
            }
        },
        handleRedirect: function(code, data){
            if(this.hasErrors) {
                global.Widgets.SliderCommonFormWidget.prototype.handleRedirect.apply(this, arguments);
                return;
            }
            global.logError(global.isMobile.any
                ? "EVENT.MOBILE.LANDING.QA.ADD_QUESTION"
                : "EVENT.LANDING.QA.ADD_QUESTION");
            StatisticsProxy.trackEvent(global.isMobile.any
                ? StatisticsProxy.EVENT.MOBILE.LANDING.QA.ADD_QUESTION
                : StatisticsProxy.EVENT.LANDING.QA.ADD_QUESTION);
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.REGISTRATION.STEP2);
            StatisticsProxy.trackEvent(StatisticsProxy.EVENT.LANDING.QA.ASK_QUESTION_UNREGISTERED);
            var that = this;
            var args = arguments;
            setTimeout(function () {
                global.Widgets.SliderCommonFormWidget.prototype.handleRedirect.apply(that, args);
            }, 1000);

        },
        storeHandler: function(data){
            global.Utils.extend(this.data, data);
        }
    });
    /**
     * EMAIL SUBMIT FORM WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */
    global.Widgets.EmailSubmitFormWidget = global.Widgets.Form.extend({
        data: {},
        init: function(params){
            global.Widgets.Form.prototype.init.apply(this, arguments);
            //this.ui.submit = $('.submit-button', this.el);
            var that = this;
            $(this.fields.email).onDom("keyup", function(e){
                if(that.validate(null, true)){
                    that.enableSubmit.call(that);
                }else{
                    that.disableSubmit.call(that);
                }
            });
            $('form', this.el).onDom("submit", function(e){
                e.preventDefault();
                that.submitHandler();
            });
            $('.submit-button', this.el).onDom("click", function(e){
                e.preventDefault();
                that.submitHandler();
            });
        },
        submitHandler: function(){
            var ok = this.validate();
            if(!ok) {
                return;
            }
            var data = this.getData();

            global.logError("EVENT.LANDING.REGISTRATION.EMAIL_SENT: "+JSON.stringify(data), "signup/App.js", new Error());

            global.Widgets.Form.prototype.submit.call(this, data);
        },
        showErrorLabel: function(field, text){
            global.Widgets.Form.prototype.showErrorLabel.apply(this, arguments);
            /*if(text == "Уже зарегистрирован"){
                StatisticsProxy.trackEvent(global.isMobile.any
                    ? StatisticsProxy.EVENT.MOBILE.LANDING.QA.STEP3_ALREADY_REGISTERED
                    : StatisticsProxy.EVENT.LANDING.QA.STEP3_ALREADY_REGISTERED)
                ;
            }*/
        },
        handleRedirect: function(code, data){
            if(this.hasErrors) {
                global.Widgets.Form.prototype.handleRedirect.apply(this, arguments);
                return;
            }
            StatisticsProxy.trackEvent(global.isMobile.any
                ? StatisticsProxy.EVENT.MOBILE.LANDING.REGISTRATION.EMAIL_SUBSCRIBE
                : StatisticsProxy.EVENT.LANDING.REGISTRATION.EMAIL_SUBSCRIBE);

            global.logError("EVENT.LANDING.REGISTRATION.EMAIL_SUBSCRIBE: "+JSON.stringify(data), "signup/App.js", new Error());

            var that = this;
            var args = arguments;
            setTimeout(function () {
                global.Widgets.Form.prototype.handleRedirect.apply(that, args);
            }, 700);

        },
        disableSubmit: function(){
            global.Utils.addClass($('.submit-button', this.el)[0], 'btn_disabled');
        },
        enableSubmit: function(){
            global.Utils.removeClass($('.submit-button', this.el)[0], 'btn_disabled');
        }
    });
    /**
     * EMAIL SUBMIT POPUP WIDGET
     * @type {*|Object|AbstractWidget|Backbone.EventBinder}
     */
    global.Widgets.EmailSubmitPopupWidget = global.Widgets.PopupForm.extend(global.Widgets.EmailSubmitFormWidget.prototype);
    global.Widgets.EmailSubmitPopupWidget = global.Widgets.EmailSubmitPopupWidget.extend({
        init: function(){
            global.Widgets.PopupForm.prototype.init.apply(this, arguments);
            global.Widgets.EmailSubmitFormWidget.prototype.init.apply(this, arguments);
        },
        show: function(params){
            var result = global.Widgets.PopupForm.prototype.show.apply(this, arguments);
            return result;
        },
        hide: function(params){
            return global.Widgets.PopupForm.prototype.hide.apply(this, arguments);
        }
    });


})(window);


(function (global) {
    var StartAppConstructor = function() {
        var that = this;
        delete StartAppConstructor;
    }
    StartAppConstructor.prototype = {
        collection:{},
        init: function(params){
            console.log("init ok");
            this.bindWidgets();
        },
        bindWidgets: function(el){
            el = el || doc;
            global.DomParser._parse({
                '[data-widget]': 'Widget'
              , '[data-action]': 'Action'
              , '.blamper-asset': 'DynamicAsset'
            }, el);
        },
        redirect: function(url){
            global.Utils.redirect(url);
        }
    }
    global.StartApp = global.StartApp || new StartAppConstructor();
})(window);


StartApp.init({

});

domready(function () {
    if(global.appReadyCallbacks && global.appReadyCallbacks.length){
        for(var i in global.appReadyCallbacks){
            global.appReadyCallbacks[i](StartApp);
        }
    }
    if(urlParams){
        if(urlParams.jsapi && global.Blamper.API[urlParams.jsapi]){
            global.Blamper.API[urlParams.jsapi](urlParams.data);
        }
    }
    console.log("DOM READY");
});