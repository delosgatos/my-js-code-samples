/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 27.09.13 15:43
 */

if(window && window.logTime) {
    window.logTime("App init loaded", 10, true);
}

requirejs.onError = function (err) {
    if(window && window.logError){
        window.logError("Error loading ["+err.requireType+"] js modules: "+ JSON.stringify(err.requireModules) +"", 'core-init', 9);
    }
};

require.config({
    deps: ['core']
    ,waitSeconds: 200
    ,urlArgs: (typeof debug_disabled == "undefined") ? (new Date()).getTime() : version
    ,baseUrl:"/js/app/"
    ,paths:{
        'vk.api':                   '//vk.com/js/api/openapi'
        ,'fb.api':                  '//connect.facebook.net/ru_RU/all'
        //,metrika :                  '//mc.yandex.ru/metrika/watch'
        //,optimizely:                '//cdn.optimizely.com/js/1511193221'
    }
});
