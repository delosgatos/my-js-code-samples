/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 23.04.13 16:09
 */

Date = Date || {};
Date.now = Date.now || function() { return +new Date; };

if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function(callback){
        for (var i = 0; i < this.length; i++){
            callback.apply(this, [this[i], i, this]);
        }
    };
}

//if(!window.jsDebug) {
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function () {
            try {
                w.yaCounter22217446 = new Ya.Metrika({
                    id: 22217446,
                    webvisor: true,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    trackHash: true,
                    params: yaParams
                });
                w.yaCounter25535501z = new Ya.Metrika({
                    id: 25535501,
                    webvisor: true,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    trackHash: true,
                    params: yaParams
                });
            } catch (e) {
                throw new Error("Metrika can't load");
            }
        });
    })(document, window, "yandex_metrika_callbacks");

    (function (d, w, c) {
        (w[c] = w[c] || []).push(function () {
            try {
                w.yaCounter25535501 = new Ya.Petrika({
                    id: 25535501,
                    webvisor: true,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    trackHash: true,
                    params: window.yaParams || {}
                });
            } catch (e) {
                throw new Error("Petrika can't load");
            }
        });
    })(document, window, "yandex_petrika_callbacks");
//}

if(!window.jsDebug) {
    var initTrackJs = function () {
        // Automatically wrap everything in Marionette
        if (!window.trackJs) return;

        ["View", "Model", "Collection", "Router"].forEach(function (klass) {
            var Klass = Backbone[klass];
            Backbone[klass] = Klass.extend({
                constructor: function () {
                    // NOTE: This allows you to set _trackJs = false for any individual object
                    //       that you want excluded from tracking
                    if (typeof this._trackJs === "undefined") {
                        this._trackJs = true;
                    }

                    if (this._trackJs) {
                        // Additional parameters are excluded from watching. Constructors and Comparators
                        // have a lot of edge-cases that are difficult to wrap so we'll ignore them.
                        // childView and emptyView are specific to Marionette
                        window.trackJs.watchAll(this, "model", "constructor", "comparator", "childView", "emptyView");
                    }

                    return Klass.prototype.constructor.apply(this, arguments);
                }
            });
        });
    }
}

require(['App', 'helper/window'], function(App, window){
    if(!window.jsDebug) {
        initTrackJs();
    }
},function(err){

});