/**
 * @project MediaDog
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.01.2015 18:58
 */


define([
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'./DynamicModuleManager'
    ,'helper/AppConsts'
    ,'helper/window'
    ,'jquery.appear'
    ,'jquery.mask'
    ,'utils'
    ,'data.utils'
    ,'jquery.datetimepicker'
    ,'jquery.tinycarousel'
], function (
    $
    ,_
    ,Backbone
    ,DynamicModuleManager
    ,AppConsts
    ,window
) {

    "use strict";

    var DomModulesParser = {

        pickerUsed: false,

        dynamicModuleManager: {},
        started: false,
        initModulesCount: 0,
        initModulesCountNS: {},

        isDomReady: false,
        isAppStarted: false,

        trackingList: {},

        initLoaded: false,

        initialize: function(){
            var that = this;
            this.dynamicModuleManager = new DynamicModuleManager();
            require(['App'], function(App) {
                that.onAppStarted.call(that);
                if(!App.isDomReady) {
                    App.vent.on('DomReady', that.onDomReady, that);
                }else{
                    that.onDomReady.call(that, App);
                }
            });
        },

        startOnce: _.once(function(){
console.log("#### App START ONCE", this);
            this.start();
            this.parse();
            this.started = true;
        }),

        start: function(){
console.log("#### App Parse Body");
            this.dynamicModuleManager.on(DynamicModuleManager.EVENT_ALL_LOADED, this.onDynamicModulesLoaded, this);
        },

        checkAllStarted: function(){
console.log("#### CHECK All Started: ", " DOMREADY: ", this.isDomReady, ' APP STARTED: ', this.isAppStarted);
            if(!this.isDomReady || !this.isAppStarted){
                return;
            }
            this.startOnce();
        },

        onAppStarted: function(){
            this.isAppStarted = true;
console.log("#### PARSE DOM: App Started");
            this.checkAllStarted();
        },
        onDomReady: function(App){
            this.isDomReady = true;
console.log("#### PARSE DOM: DOM Ready");
            this.parseBody();
            this.checkAllStarted();
            App.vent.trigger(AppConsts.EVENT.SYSTEM.AFTER_DOM_READY, this.isDomReady && this.isAppStarted);
        },
        onDynamicModulesLoaded: function() {
            var pushStateSupported = _.isFunction(history.pushState);
console.log("@A@ Dynamic Modules Loaded, history api: " + pushStateSupported);
            if (!Backbone.History.started){
                Backbone.history.start({pushState: false /*"pushState" in window.history*/});
            }
console.log("@A@ PAGE: "+Backbone.history.fragment);
            require('App').vent.trigger(AppConsts.EVENT.SYSTEM.ALL_MODULES_LOADED);
        },

        parseBody: function(){
            var $el = $(window.document);
            var $w = $el.find("body");
            var that = this;
            if($w.length){
                var App = require('App');
                App.params = _.extend({side:'client'}, $w.data('params') || {});
                var t = _.template.clone();
                var global = App.params;
                _.template = function(text, data, settings){
                    if(!text){
console.log("!!! WARNING !!! NO TEMPLATE FOR PROCESS");
                        return;
                    }
                    if(settings && settings.clear) {
                        text = text.replace(/[\r\n\s]+/gi, ' ');
                    }
                    if(data){
                        _.extend(data, {global:global});
                    }
                    var temp = t(text, data, settings);
                    if(data){
                        return temp;
                    }
                    return function(data){
                        _.extend(data, {global:global});
                        return temp(data);
                    }
                };
            }
        },

        parseSelectors: function(data, $el, namespace){
            var that = this;
            if(!$el){
                $el = $(window.document);
            }
            for(var i in data){
                var $w = $el.find(i).add($el.filter(i));

console.log("#### PARSE DOM: ", i, $w.length);

                if(i == '[data-module]'){
                    if(namespace){
console.log('#### PARSE DOM CALC MODULES COUNT: ', $w.length, namespace, $el.get(0).tagName, $el.get(0).className, $el);
                        this.initModulesCountNS[namespace] = $w.length;
                    }else if($el.get(0) == window.document){
console.log('#### PARSE DOM CALC NS MODULES COUNT: ', $w.length, namespace, $el.get(0).tagName, $el.get(0).className, $el);
                        this.initModulesCount = $w.length;
                    }
                }
                $w.each(function(id, el){
                    data[i].call(that, id, $(el), $el);
                });
            }
        },

        destroySelectors: function(data, $el, namespace){
            if(!$el){
                $el = $(window.document);
            }
            for(var i in data){
                var $w = $el.find(i).add($el.filter(i));

console.log("#### PARSE DOM: ", i, $w.length);

                if(i == '[data-module]'){
                    if(namespace){
                        console.log('#### PARSE DOM CALC MODULES COUNT: ', $w.length, namespace, $el.get(0).tagName, $el.get(0).className, $el);
                        this.initModulesCountNS[namespace] = $w.length;
                    }else if($el.get(0) == window.document){
                        console.log('#### PARSE DOM CALC NS MODULES COUNT: ', $w.length, namespace, $el.get(0).tagName, $el.get(0).className, $el);
                        this.initModulesCount = $w.length;
                    }
                }
                $w.each(data[i]);
            }
        },

        destroy: function($el){
            var that = this
                ,App = require('App')
                ,$win = $(window)
                ,$w
            ;
            var destroyHandlers = {
                '.js-scrollable': function(){
                    var instance = $(this).data('instance');
                    if(instance){
                        instance.destroy();
                    }
                },
                '[data-module]': function(){
                    var module = $(this).data('module-instance');
                    if(module) {
                        $(this).trigger('DestroyModule', this);
                        module.destroy();
                    }
                }
            };
            this.destroySelectors(destroyHandlers, $el);
        },

        parse: function($el, selectorHandlers, namespace){

console.log("#### PARSE DOM: Parse Dom Modules", namespace, $el);

            var stime = Date.now();

            var that = this
                ,App = require('App')
                ,$win = $(window)
                ,$w
            ;

            this.trackingList = {};

            var handlers = _.extend({

                '[data-lzhtml]': function (id, $this) {

                    var	lz = $this.data('lzhtml');

                    var html = $.B64.decode(lz);

                    var $insert = $(html);
                    $this.replaceWith($insert);
                    $this.parents('[data-module]').trigger('DomUpdated', $this);

                    _.defer(function(){
                         //that.parse.call(that, $insert);
                         $w = $insert.find('[data-lzhtml]');
                         if(!$w.length){
                            return;
                         }
                         that.parse.call(that, $w);
                    });
                },

                '[data-module]': function (id, $this) {

                    var modulePath = $this.data('module');
                    var params = $this.data('params');
                    if(!$.isObject(params)){
                        console.log('!!!--- WARNING: data-params for module ['+modulePath+'] is not an object', params);
                        params =  {};
                    }

                    var imports = $this.data('imports');
                    var moduleNamespace = $this.data('namespace') || namespace;
                    var modules = [modulePath];
                    // TODO: imports separeted by coma
                    if (imports) {
                        modules.push("module/" + imports);
                    }
                    that.dynamicModuleManager.addToLoadStack(modules);
console.log('@@MODULE REQUIRE: ' + modules[0], moduleNamespace);
                    require(modules, function (View, imports) {
                        params['el'] = $this.get(0);
                        params['$el'] = $this;
                        if(moduleNamespace !== undefined) {
                            params['eventNamespace'] = moduleNamespace;
                        }
                        var view = new View(params);
                        that.dynamicModuleManager.markLoaded(modules);
console.log('@@MODULE LOADED: ' + modules[0], moduleNamespace, view.cid, view);
                        that.calcLoadedModule.call(that, modules[0], moduleNamespace);
                        $this.data('moduleInstance', view);
                        return view;
                    }, function (err) {
                        var mess = '@@MODULE NOT LOADED !!!!: '
                                    + modules[0] + ', error: '
                                    + (err ? err.message : "");
                        console.log('!!! ERROR: ', mess, moduleNamespace);
                        that.calcNotLoadedModule.call(that, modules[0], moduleNamespace);
                        that.dynamicModuleManager.markNotLoaded(modules);
                    });
                },

                'input.js-datetime': function(id, $this){
                    var domain = window.assetDomain;
                    if(!that.pickerUsed){
                        require(['jquery','css!'+domain+'/css/plugin/jquery.datetimepicker.css'],function(){

                        });
                    }
                    $this.datetimepicker({
                        format:'d.m.Y H:i',
                        lang:'ru'
                    });
                    that.pickerUsed = true;
                },
                'select': function(id, $el){
                    var val = $el.val();


                    var $def = $el.find('option[value=0]');
                    if($def.attr('selected')){
                        $def.attr('selected','selected');
                    }

                    if(val && val != "0"){
                        $el.USelectorSelected();
                    }else{
                        $el.USelectorReset();
                    }
                    $el.on('change', function(e){
                        var $el = $(e.currentTarget);
                        var val = $el.val();
                        if(val && val != "0"){
                            $el.USelectorSelected();
                        }else{
                            $el.USelectorReset();
                        }
                    }).on('focus', function(e){
                        var $el = $(e.currentTarget);
                        $el.USelectorActive();
                    }).on('blur', function(e){
                        var $el = $(e.currentTarget);
                        $el.USelectorInactive();
                    });
                },
                'input': function(id, $el){
                    var focusClass = $el.data('focus-class')
                        ,targetSelector = $el.data('focus-target')
                    ;
                    if(focusClass) {
                        if(focusClass.indexOf(':')>-1){
                            focusClass = focusClass.split(':');
                            targetSelector = focusClass[0];
                            focusClass = focusClass[1];
                        }
                        $el.on('focus', function (e) {
                            console.log('SEARCH FOCUS');
                            $(targetSelector ? targetSelector : this).addClass(focusClass);
                        }).on('blur', function (e) {
                            console.log('SEARCH BLUR');
                            $(targetSelector ? targetSelector : this).removeClass(focusClass);
                        });
                    }
                },

                '.js-scrollable': function(id, $this){
                    var el = $this.get(0);
                    require(['view/common/ScrollableView'], function(ScrollableView){
                        $(el).data('instance', new ScrollableView({el:el}));
                    });
                },

                '[data-tab]': function(id, $el){
                    var $tabs = $el.find('.b-tabs-item');
                    var $content = $('[data-content-for-tab='+$el.data('tab')+'] [data-tab-content]');
                    $tabs.find('a').click(function(e){
                        e.preventDefault();
                    });
                    $tabs.click(function(e){
                        e.preventDefault();
                        var $tab = $(this);
                        $tabs.removeClass('b-tabs-item__current');
                        $content.addClass('hide');
                        $tab.addClass('b-tabs-item__current');
                        $content.filter('[data-tab-content='+$tab.data('target')+']').removeClass('hide');
                    });
                },

                '[data-href]': function(id, $el){
                    $el.attr('href', $el.data('href'));
                },


                '.js-slider': function(id, $this){
                    var display = $this.attr('data-display') || 1;
                    var options = _.extend({
                            bullets: true
                            , pager:true
                            , noMirror:true
                            , display: display
                        }, $this.data('options') || {}
                    );
                    var $slider = $this.find('.slider');
                    if(!$slider.length){
                        $slider = $this;
                    }
                    $slider.mycarousel(options);
                },

                '.js-clickable-block': function(id, $el){
                    var $a = $el.find('a');
                    var href = $el.data('href') || $el.attr('href') || $a.data('href') || $a.attr('href');
                    var statId = $el.attr('data-statistic-object-id')
                                        ? $el.data('statistic-object-id')
                                        : $el.find('[data-statistic-object-id]').data('statistic-object-id')
                    ;

                    $a.attr('href', href);

console.log('...... ++ js-clickable-block: ', statId);

                    $el.off('click.block');
                    $el.on('click.block', function(e){
                        e.preventDefault();
console.log('...... .js-clickable-block click');
                        if(statId){
                            var source = App.params.statistic.source;
                            App.callServerApi('/api/statistic/click',{
                                source: source,
                                object_ids: [statId],
                                count: 1
                            });
                        }

                        $($a.get(0)).trigger('BlockClicked', $el, href);
                        //App.redirect(href);

                        App.redirect(href, null, null, null, 500);

                    });
                },

                '.js-show-popup-on-click': function(id, $el, $global){
                    $el.off('click.popup');
                    $el.on('click.popup', function(e){
                        //e.preventDefault();
                        var path = $el.data('popup');
                        var instance = $global.find('[data-module="'+path+'"]').data('moduleInstance');
                        if(instance) {
                            instance.show();
                        }
                    });
                },

                '.js-revive': function(id, $el){
                    var params = $el.data('params');
                },

                '.js-revive-dynamic': function(id, $el){
                    /*
                    var params = $el.data('params');
                    if(!params["onlyDecorator"]){
                        return;
                    }
                    */
                    $el.UReviveBanner();
                },

                '[data-statistic-object-id]': function (id, $el) {
                    var source = App.params.statistic.source;

                    if($el.hasClass('js-clickable-block') || $el.parents('.js-clickable-block').length){
                        return;
                    }

                    var id = $el.data('statistic-object-id');
console.log('...... ++ data-statistic-object-id: ', id);
                    var $a = $('a', $el);
                    $a.off('click.stat');
                    var href = $el.data('href') || $el.attr('href') || $a.data('href') || $a.attr('href');
                    $a.on('click.stat', function(e){
                        e.preventDefault();
                        //e.stopPropagation();
console.log('...... data-statistic-object-id click', href);

                        App.callServerApi('/api/statistic/click',{
                            source: source,
                            object_ids: [id],
                            count: 1
                        });
                        App.redirect(href, null, null, null, 300);
                    });
                    // TODO: move to plugin class
                    $el.appear().on('appear', function(){

                        // TODO: delay for group requests

                        if($el.data('showed')){
                            return;
                        }
                        App.callServerApi('/api/statistic/view',{
                            source: source,
                            object_ids: [id],
                            count: 1
                        });
                        // TODO: do off from event
                        $el.attr('data-showed', true);
                    });
                },

                '.js-blamper-analytics': function(id, $this){
                    var id = $this.attr('data-id');
                    var	tracking = $this.data('tracking');
                    if(tracking && !that.trackingList[id]){
                        that.trackingList[id] = tracking;
                        var event = $this.data('start-event');
                        if(event){
                            App.vent.on(event, function(){
                                App.sendAnalytics(tracking);
                            });
                        }else {
                            App.sendAnalytics(tracking);
                        }
                    }
                },

                '.js-blamper-analytics-link': function(id, $this){
                    var	tracking = $this.data('tracking');
                    $this.on('click', function(e){
                        //e.preventDefault();
                        !that.sendAnalytics(tracking, $this) || e.preventDefault();
                    });
                },

                '.js-blamper-analytics-inner-links': function(id, $this){
                    var $a = $('a', $this);
                    var	tracking = $this.data('tracking');
                    $a.not('[data-no-tracking]').on('click', function(e){
                        var $el = $(e.currentTarget);
                        var elTrack = $el.data('tracking');
                        var elAddTrack = $el.data('add-tracking');
                        if(elAddTrack){
                            App.sendAnalytics(elAddTrack);
                        }
                        !that.sendAnalytics(elTrack || tracking, $el) || e.preventDefault();
                    });
                }

            }, selectorHandlers);

            this.parseSelectors(handlers, $el, namespace);

console.log("parse time: "+(Date.now()-stime)+" ms");
        },
        /**
         * Returns true if redirect executed, false if no need in redirect
         * @param tracking
         * @param $el
         * @returns {boolean}
         */
        sendAnalytics: function(tracking, $el){
            var url = $el.data('href') || $el.attr('href');
            if(url && url.replace(/\#.*?$/, '') != window.location.pathname + window.location.search) {
                $el.UShowPreloader();
                App.sendAnalyticsWithRedirect(tracking, url);
                return true;
            }
            App.sendAnalytics(tracking);
            if($el.attr('type')=='submit'){
                setTimeout(function(){
                    $el.parents('form').submit();
                }, 500);
                return true;
            }
            return false;
        },

        sendAllLoaded: function(namespace){
            if(!this.initLoaded){
                if(namespace){
console.log("~!@$ CALC INIT NS MODULES LOADED: "+this.initModulesCountNS[namespace], namespace);
                    require('App').sendNSEvent(namespace, AppConsts.EVENT.SYSTEM.INIT_MODULES_LOADED);
                }else {
console.log("~!@$ CALC INIT MODULES LOADED: "+this.initModulesCount);
                    require('App').vent.trigger(AppConsts.EVENT.SYSTEM.INIT_MODULES_LOADED);
                }
                this.initLoaded = true;
                //return;
            }
            if(namespace){
console.log("~!@# CALC ALL NS MODULES LOADED: "+this.initModulesCountNS[namespace], namespace);
                require('App').sendNSEvent(namespace, AppConsts.EVENT.SYSTEM.MODULES_LOADED);
            }else {
console.log("~!@# CALC ALL MODULES LOADED: "+this.initModulesCount);
                require('App').vent.trigger(AppConsts.EVENT.SYSTEM.MODULES_LOADED);
            }
        },
        calcLoadedModule: function(module, namespace){
            if(namespace){
                this.initModulesCountNS[namespace]--;
console.log("~!@% CALC LOADED NS MODULES: "+this.initModulesCountNS[namespace], module);
                if(this.initModulesCountNS[namespace] == 0){
                    this.sendAllLoaded(namespace);
                }
                return;
            }
            this.initModulesCount--;
console.log("~!@% CALC LOADED MODULES: "+this.initModulesCount, module);
            if(this.initModulesCount == 0){
                this.sendAllLoaded();
            }
        },
        calcNotLoadedModule: function(module, namespace){
            if(namespace){
                this.initModulesCountNS[namespace]--;
console.log("~!@^ CALC NOT LOADED NS MODULES: "+this.initModulesCountNS[namespace], module);
                if(this.initModulesCountNS[namespace] == 0){
                    this.sendAllLoaded(namespace);
                }
                return;
            }
            this.initModulesCount--;
console.log("~!@^ CALC NOT LOADED MODULES: "+this.initModulesCount, module);
            if(this.initModulesCount == 0){
                this.sendAllLoaded(namespace);
            }
        }

    };

    return DomModulesParser;
});