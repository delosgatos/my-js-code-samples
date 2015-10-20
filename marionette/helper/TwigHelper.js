/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 27.11.13 11:06
 */

define([
    'twig'
    ,'underscore'
    ,'jquery'
    ,'utils'
    ,'data.utils'
    ,'jquery.timeago'
], function (
    Twig
    ,_
    ,$
) {

    "use strict";


    var TwigUtils = {
        constant: function(constant_name){
            return TwigHelper.constants.hasOwnProperty(constant_name) ? TwigHelper.constants[constant_name] : null;
        },
        getHTMLProfileRoute: function(id){
            return require('App').params.currentHost + "/" + id;
        },
        timeago: function(stamp){
            stamp = parseInt(stamp) * 1000;
            return $.timeago(stamp);
        },
        timeToString: function(stamp, lang, format){
            return $.timestampToString(parseInt(stamp), lang, format);
        },
        getImagePath: function(hash, width, height, defaultPath){
            return $.extractImagePathFromHash(hash, width, height, defaultPath);
        },
        wordByNumber: function(number, declensions){
            return $.wordByNumber(number, declensions);
        },
        size: function(object){
            return _.size(object);
        },
        inArray: function(array, value){
            return _.contains(array, value);
        },
        isArray: function(array){
            return _.isArray(array);
        },
        showBanner: function(params){
            var $el = $("<div></div>");
            $el.UReviveBanner(params);
            return $el.html();
        },
        cutText: function(html, max){
            return $.cutText(html, max);
        },
        replaceLinks: function(text){
            return $.replaceLinks(text);
        },
        generateEmbedVideo: function(link, width, height){
            return $.generateEmbedVideo(link, width, height);
        },
        relativePath: function(path){

            if(path.indexOf('@common_templates') != -1){
                return path.replace('@common_templates', 'asset/template');
            }

            if(path.indexOf('.') !== 0){
                return path;
            }
            var base = (this.rootId || this.id).replace(/\/[^\/]*?$/, '/');

            if(path.indexOf('../') === 0){
                while(path.indexOf('../') === 0) {
                    base = this.id.replace(/\/[^\/]*?\/$/, '/');
                    path = path.replace('../','');
                }
            }else if(path.indexOf('./') === 0){
                path = path.replace('./','');
            }
            return base + path;
        },
        showAnnounce: function(html){
            return html;
        }
    };

    var TwigHelper = {

        constants: {

            'Club::DUMMY_DEFAULT_SMALL_AVATAR':             '/img/void_club_s.png',
            'Club::DUMMY_DEFAULT_MEDIUM_AVATAR':            '/img/void_club_m.png',
            'User::DUMMY_SMALL_AVATAR':                     '/img/void_ava_s.png',
            'User::DUMMY_MEDIUM_AVATAR':                    '/img/void_ava_m.png',

            'UserHelper::FRIENDSHIP_STATUS_FRIEND':         2,
            'UserHelper::FRIENDSHIP_STATUS_PENDING':        1,
            'UserHelper::FRIENDSHIP_STATUS_STRANGER':       0,

            'UserHelper::VIEW_FRIEND':                      "friend",
            '\\\\common\\\\components\\\\article\\\\Service::TYPE_THEME': 5,
            '\\\\common\\\\components\\\\qa\\\\Service::TYPE_THEME': 7,
            '\\\\common\\\\components\\\\qa\\\\Service::TYPE_ANSWER': 8,
            '\\\\common\\\\components\\\\publication\\\\Service::TYPE_ARTICLE': 5,
            '\\\\common\\\\components\\\\publication\\\\Service::TYPE_QA': 7

        },

        init: function (params) {

            var that = this;

            /*
             ---====== FILTER =======---
             */
            Twig.extendFilter("serialize", function(obj){
                return JSON.stringify(obj);
            });
            Twig.extendFilter("serializeSafe", function(obj){
                function censor(key, value) {
                    if (typeof(value) == "string") {
                        var str = $.encodeHtmlEntity(value);
                        return str;
                    }
                    return value;
                }
                var str = JSON.stringify(obj, censor);
                str = str.replace(/\"/gi, "'");
                return str;
            });
            Twig.extendFilter("indexOf", function(obj, string){
                return obj.indexOf(string);
            });
            Twig.extendFilter("substring", function(string, fromTo){
                return String.prototype.substring.apply(string, fromTo);
            });
            Twig.extendFilter("substr", function(string, fromLen){
                return String.prototype.substr.apply(string, fromLen);
            });
            Twig.extendFilter("parseInt", function(string){
                return parseInt(string);
            });
            Twig.extendFilter("raw", function(string){
                return string;
            });
            Twig.extendFilter("replaceLinks", function(text){
                return $.replaceLinks(text);
            });
            Twig.extendFilter("filterText", function(text){
                return $.stripTags(text);
            });
            Twig.extendFilter("dateTime", function(stamp){
                return $.timestampToString(parseInt(stamp), $.LANG.RUSSIAN, 'd F Y, H:i');
            });
            Twig.extendFilter("replaceText", function(text, find, place){
                return text.replace(find, place);
            });

            /*
            ---====== FUNCTIONS =======---
             */
            Twig.extendFunction("constant", function(name){
                return TwigUtils.constant(name);
            });
            Twig.extendFunction("beginDynamic", function(context){

            });
            Twig.extendFunction("endDynamic", function(context){

            });
            Twig.extendFunction("getGlobal", function(){
                return require('App').params;
            });
            Twig.extendFunction("f", function(name, param1, param2, param3){
                var params = [].slice.call(arguments, 1);
                if(!TwigUtils[name]){
                    return null;
                }
                var result = TwigUtils[name].apply(this, params);
                return result;
            });
            Twig.extendFunction("widget", function(name, params){
                //debugger;
                name = name.replace(/\\\\/gi,'/') + '/WidgetView';
                return '<div data-params="{&quot;noRenderOnStart&quot;:false}" data-module="'+name+'"></div>';
            });
        }

    };

    return TwigHelper;
});