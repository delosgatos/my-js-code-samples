var fakeConsole = function(){
    var console = {};
    console.log = function (message) {};
    console.error = function () {};
    console.warn = function () {};
    console.group = function () {};
    console.groupEnd = function () {};
    window.console = console;
}
if(!console || !console.log){
    fakeConsole();
}else if(!window.jsDebug) {
    if(!window.showLog) {
        fakeConsole();
    }
}
console.log("INIT OK");
requirejs.config({

    //baseUrl: 'http://oleg.local.s.blamper.ru:90/js/app',

    deps: ['start'],
    waitSeconds: 200,

    urlArgs: null, //window.jsDebug ? null : (new Date()).getTime(),

    paths: {
        'jquery':               '../vendor/bower/jquery/dist/jquery' + (window.jsDebug ? "" : ".min")
        ,'jquery.masonry':      '../vendor/jquery.masonry.min'
        ,'jquery.appear':       '../vendor/jquery.appear'
        ,'jquery.timeago':      '../vendor/jquery.timeago'
        ,'jquery.ui.widget':    '../vendor/jquery.ui.widget'
        ,'jquery.form':         '../vendor/jquery.form' + (window.jsDebug ? "" : ".min")
        ,'jquery.mask':         '../vendor/jquery.mask' + (window.jsDebug ? "" : ".min")
        ,'jquery.fancybox':     '../vendor/jquery.fancybox' + (window.jsDebug ? "" : ".min")
        ,'jcrop':               '../vendor/jquery.jcrop' + (window.jsDebug ? "" : ".min")
        ,'cropper':             '../vendor/crop/cropper'
        ,'jquery.autocomplete': '../vendor/jquery.autocomplete'
        ,'jquery.datetimepicker': '../vendor/jquery.datetimepicker'
        ,'jquery.tinycarousel': '../vendor/jquery.tinycarousel'
        ,'jquery.lazyload':     '../vendor/jquery.lazyload.min'
        ,'domReady':            '../vendor/domReady'
        ,'underscore':          '../vendor/underscore' + (window.jsDebug ? "" : ".min")
        ,'backbone':            '../vendor/backbone' + (window.jsDebug ? "" : ".min")
        ,'marionette':          '../vendor/backbone.marionette' + (window.jsDebug ? "" : ".min")
        ,'backbone.validation': '../vendor/backbone.validation-amd' + (window.jsDebug ? "" : ".min")
        ,'twig':                '../vendor/twig'
        ,'utils':               'util/Utils'
        ,'data.utils':          'util/DataUtils'
        ,'consts':              'helper/AppConsts'
        ,'text':                '../vendor/requirejs/text'
        ,'css':                 '../vendor/requirejs/css.min'
        ,'easing':              '../vendor/jquery.easing.1.3'
        ,'somegallery':         '../vendor/slider/somegallery'
        ,'mustache':            '../vendor/mustache.min'
        ,'window':              'helper/window'


        ,'fb.api':              ['//connect.facebook.net/ru_RU/all', '../vendor/fallback/vk-fake']
        ,'vk.api':              ['//vk.com/js/api/openapi', '../vendor/fallback/vk-fake']
        ,'metrika' :            /*window.jsDebug ? "../vendor/fallback/vk-fake" : */'//mc.yandex.ru/metrika/watch'
        , petrika :              window.jsDebug ? "../vendor/fallback/vk-fake" : '../vendor/ya/watch'
        , socketio:             '../vendor/socket.io'

    },

    config: {
        'text': {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
    },

    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'jquery.masonry': {
            deps: ['jquery']
        },
        'jquery.appear': {
            deps: ['jquery']
        },
        'jquery.form': {
            deps: ['jquery']
        },
        'jquery.fancybox': {
            deps: ['jquery']
        },
        'jquery.datetimepicker': {
            deps: ['jquery']
        },
        'jquery.tinycarousel': {
            deps: ['jquery']
        },
        'jquery.lazyload': {
            deps: ['jquery']
        },
        'cropper': {
            deps: ['jquery']
        },
        'somegallery': {
            deps: ['jquery']
        },
        'easing': {
            deps: ['jquery']
        },
        'utils': {
            deps: ['jquery', 'jquery.tinycarousel', 'jquery.lazyload', 'underscore']
        },
        'data.utils': {
            deps: ['jquery']
        },
        'backbone' : {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        'backbone.validation' : {
            deps: ['backbone']
        },
        'marionette': {
            exports: 'Marionette',
            deps: ['jquery', 'underscore', 'backbone']
        }
        ,"fb.api":                   { deps: [], exports: "FB" }
        ,"vk.api":                   { deps: [], exports: "VK" }
    }
});

