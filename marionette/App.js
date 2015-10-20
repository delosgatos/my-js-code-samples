console.log("APP LOADED");
define(
    [
        'jquery'
        ,'underscore'
        ,'backbone'
        ,'marionette'
        ,'service/DomModulesParser'
        ,'util/AppUtils'
        ,'plugin/MarionetteTwigRenderer'
        ,'helper/window'
        ,'domReady'
        ,'asset/template/TwigCommonPack'
    ]
    ,function(
        $
        , _
        , Backbone
        , Marionette
        , DomModulesParser
        , AppUtils
        , MarionetteTwigRenderer
        , window
        , domReady
    ) {

console.log("APP PROCCESSED");

        var App = new Marionette.Application({
            channelName: 'appChannel'
        });

        App.isDomReady = false;

        Backbone.App = App;
        window.App = App;

        App.vars = {
            startTime: (new Date()).getTime()
            ,windowSize: {
                width: $(window).width()
                ,height: $(window).height()
            }
            ,screenSize: window.screen
            ,initLocation: window.location
        };

        App.isDebug = window.jsDebug;

        try {
            AppUtils(App, window);
        }catch(e){
            console && console.error ? console.error("AppUtils ERROR: ", e) : console.log("AppUtils ERROR: ", e);
        }

        try {
            DomModulesParser.initialize();
        }catch(e){
            console && console.error ? console.error("DomModules ERROR: ", e) : console.log("DomModules ERROR: ", e);
        }

        App.parser = DomModulesParser;

        App.addInitializer(function(options) {
            App.vent.trigger("AppBeforeStarted", App);
            App.vent.trigger("AppStarted", App);
        });

        domReady(function(){
            console.log("-== DOM READY ==-");
            App.isDomReady = true;
            App.vent.trigger("DomReady", App);
            if(window.prefetchResources && window.prefetchResources.length) {
                App.prefetch(window.prefetchResources);
            }
        });

        window.onbeforeunload = function (event) {
            //window.logTime("Page Unload", 4);
            //console.log("PAGE REDIRECT DETECTED: " + event.target.URL);
            //$('body').UShowPreloader();
            //return false;
        };

        return App;

    }
);