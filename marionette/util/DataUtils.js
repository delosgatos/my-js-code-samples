/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 20.05.13 14:56
 */
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

Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() {
        return that.apply(this, arguments);
    };
    for( key in this ) {
        temp[key] = this[key];
    }
    return temp;
};
if (!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt /*, from*/){
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++){
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}
/*Object.prototype.clone = function() {
    var obj = this;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = obj[i].clone();
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr].clone();
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};*/

// ==== XML TO JSON CONVERTER ====
(function ($, window, undefined) {

    $.xmlToJson = function(xml) {

        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = $.xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push($.xmlToJson(item));
                }
            }
        }
        return obj;
    };

    $.xmlToJsonPlain = function(xml) {
        if(!xml){
            console.log("!!! ERROR no xml node to parse");
            return;
        }
        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            /*
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
            */
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            var count = xml.childNodes.length;
            for(var i = 0; i < count; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName.toLowerCase();
                if(nodeName == "#cdata-section"){
                    obj = item.nodeValue;
                    break;
                }
                if(nodeName == "#text"){
                    if(count == 1){
                        obj = item.nodeValue;
                        break;
                    }
                    continue;
                }
                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = $.xmlToJsonPlain(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push($.xmlToJsonPlain(item));
                }
            }
        }
        return obj;
    };

    $.LANG = {
        RUSSIAN:        "ru",
        ENGLISH:        "en",
        UKRAINIAN:      "uk",
        SPANISH:        "es"
    };
    $.timestampToString = function(timestamp, lang, template){
        lang = lang || $.LANG.RUSSIAN;
        var a = new Date(timestamp*1000);
        var months = [];
        var fullMonths = [];
        if(lang == $.LANG.RUSSIAN){
            months = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
            fullMonths = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
        }else if(lang == $.LANG.ENGLISH){
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            fullMonths = ['January','February','March','April','May','June','Jule','August','September','October','November','December'];
        }
        var year = a.getYear();
        var fullYear = a.getFullYear();
        var month = a.getMonth();
        var monthName = months[a.getMonth()];
        var fullMonthName = fullMonths[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var usec = a.getMilliseconds();
        var timeString;
        if(template){
            timeString = template;
            timeString = timeString.replace('u',usec);
            timeString = timeString.replace('s',$.addZeroBefore(sec,2));
            timeString = timeString.replace('i',$.addZeroBefore(min,2));
            timeString = timeString.replace('G',hour);
            timeString = timeString.replace('H',$.addZeroBefore(hour,2));
            timeString = timeString.replace('j',date);
            timeString = timeString.replace('d',$.addZeroBefore(date,2));
            timeString = timeString.replace('n',month);
            timeString = timeString.replace('m',$.addZeroBefore(month,2));
            timeString = timeString.replace('M',monthName);
            timeString = timeString.replace('F',fullMonthName);
            timeString = timeString.replace('Y',fullYear);
            timeString = timeString.replace('y',year);
        }else{
            timeString = $.addZeroBefore(date, 2)+'-'+monthName+'-'+year+' '+$.addZeroBefore(hour,2)+':'+$.addZeroBefore(min,2)+':'+$.addZeroBefore(sec,2) ;
        }
        return timeString;
    };

    $.addZeroBefore = function(num, length){
        num += "";
        while(num.length<length){
            num = '0'+num;
        }
        return num;
    };

    $.normalizeLinks = function(links){
        links = _.map(links,function(val){
            val = val.fulltrim();
            if(val.indexOf('http://') < 0 && val.indexOf('https://') < 0){
                return 'http://'+val;
            }
            return val;
        });
        return _.uniq(links);
    };

    $.nl2br = function(str){
        return str.replace(/([^>])\n/g, '$1<br/>');
    };

    $.stripTags = function (string) {
        if(!string){
            return "";
        }
        string = string.replace(/<[^>]+?>/gi, " ");
        string = string.replace(/\&nbsp\;/gi," ");
        string = string.replace(/\000-\0176/gi, ' ');
        string = string.replace(/ +/gi," ");
        return string;
    };

    $.stripTagsAndFormat = function (string) {
        if(!string){
            return "";
        }
        string = string.replace(/<[^>]+?>/gi, " ");
        string = string.replace(/\&nbsp\;/gi," ");
        string = string.replace(/\000-\0176/gi, ' ');
        string = string.replace(/[\r\n ]+/gi," ");
        return string;
    };

    $.linkRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    $.cutText = function(html, max){
        if(!max){max = 200;}
        if(html.length > max){
            html = html.substr(0, max-10);
            html = html.replace(/[^ ]+$/gi,"");//.fulltrim();
            return html;
        }
        return html;
    };

    $.replaceLinks = function(text){
        if(!text){
            return "";
        }
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        var res = text.replace(urlRegex, function(url) {
            return '<a href="/redirect/?url=' + url + '" rel="nofollow" target="_blank">' + url + '</a>';
        });
        return res;
    };

    $.extractImagePathFromHash = function(hash, width, height, defaultPath){
        if(!hash){
            return defaultPath ? defaultPath : "";
        }
        if(!_.isString(hash)){
            console.log("!!! WARNING: image hash is not string: "+JSON.stringify(hash));
        }

        if(hash.hash){
            hash = hash.hash;
        }
        if(hash["$id"]){
            hash = hash["$id"];
        }
        //console.log("hash: "+JSON.stringify(hash));
		//var src = temp ? "/tmp/" : "/steady/";
		var src = "/steady/";

        width = parseInt(width);
        height = parseInt(height);

        if(width > 0 && height >= 0){
            return src
                    +hash.substr(0,2)+"/"
                    +hash.substr(2,2)+"/"
                    +hash.substr(4,2)+"/"
                    +"covers/"
                    +hash+"/"
                    +width+"x"+height+".jpg";
        } else {
            return src
                +hash.substr(0,2)+"/"
                +hash.substr(2,2)+"/"
                +hash.substr(4,2)+"/"
                +"original/"
                +hash
                +".jpg";
        }
    };

    $.extractImageHashFromPath = function(url){
        if(!url){
            return "";
        }
        if($.isHash(url)){
            return url;
        }
		var url = url.indexOf('original') > -1
                ? url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'))
                : url.substring(0, url.lastIndexOf('/')),
			hash = url.substring( url.lastIndexOf('/') + 1);
		return hash.length === 24 ? hash : false;
    };

    $.isHash = function(hash){
		return hash.length === 24 ? true : false;
    };

    $.wordByNumber = function(n, textFormArray){
        n = Math.abs(n) % 100;
        var n1 = n % 10;
        if (n > 10 && n < 20) {
            return textFormArray[2];
        }
        if (n1 > 1 && n1 < 5) {
            return textFormArray[1];
        }
        if (n1 == 1) {
            return textFormArray[0];
        }
        return textFormArray[2];
    };

    $.decodeHtmlEntity = function(str) {
        return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        });
    };

    $.encodeHtmlEntity = function(str) {
        var buf = [];
        for (var i=str.length-1;i>=0;i--) {
            buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }
        return buf.join('');
    };

    var transliterationMatrix = {
        "А":"A","Б":"B","В":"V","Г":"G",
        "Д":"D","Е":"E","Ж":"J","З":"Z","И":"I",
        "Й":"Y","К":"K","Л":"L","М":"M","Н":"N",
        "О":"O","П":"P","Р":"R","С":"S","Т":"T",
        "У":"U","Ф":"F","Х":"H","Ц":"TS","Ч":"CH",
        "Ш":"SH","Щ":"SCH","Ъ":"","Ы":"YI","Ь":"",
        "Э":"E","Ю":"YU","Я":"YA","а":"a","б":"b",
        "в":"v","г":"g","д":"d","е":"e","ж":"j",
        "з":"z","и":"i","й":"y","к":"k","л":"l",
        "м":"m","н":"n","о":"o","п":"p","р":"r",
        "с":"s","т":"t","у":"u","ф":"f","х":"h",
        "ц":"ts","ч":"ch","ш":"sh","щ":"sch","ъ":"y",
        "ы":"yi","ь":"","э":"e","ю":"yu","я":"ya"
    };
    $.translit = function(string){
        return string.split('').map(function (char) {
            return transliterationMatrix.hasOwnProperty(char) ? transliterationMatrix[char] : char;
        }).join("");
    };
    /**
     * Чистим название
     */
    $.removeBadSymbols = function(text){
        text = text.replace(/[^\d\w ]+/gi, "");
        text = text.replace(/[\s]+/gi, "-");
        return text.toLowerCase();
    };

    $.translitAndClear = function(string){
        return $.removeBadSymbols($.translit(string).trim());
    };

    $.isObject = function (val) {
        if (val === null) { return false;}
        return ( (typeof val === 'function') || (typeof val === 'object') );
    }

    $.objectToUrlParams = function(obj, prefix) {
        var str = [];
        for(var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
                $.objectToUrlParams(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    };

    $.clearHtmlText = function (string) {
        string = string.replace(/<[A-Za-z0-9]+?\:/gi, '<');
        string = string.replace(/(<(?![p\/])[^>]*?>)|(<\/(?!p)[^>]*?>)|(<p[^\ >]+?[^>]*?>)|(<\/p[^\ >]+?[^>]*?>)/gi, '');
        string = string.replace(/(<[^\ >]+)[^>]*?>/gi, "$1>");
        string = string.replace(/\&nbsp\;/gi," ");
        string = string.replace(/\000-\0176/gi, ' ');
        string = string.replace(/[\r\n ]+/gi," ");
        return string;
    };

    $.removeTags = function (string) {
        string = string.replace(/<[^\>]+?>/gi, '');
        return string;
    };

    $.generateEmbedVideo = function(link, width, height, $thumb){
        if(!link) return "";
        width = width || 400;
        height = height || 300;
        return link.replace(
            /(?:https{0,1}:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^\&]+).*$/g,
            '<iframe width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'
        );
    }

    $.generateVideoUrlFromEmbedLink = function(url){
        if(!url) return "";
        return url.replace(
            /.+?embed\/(.+?)/gi,
            'www.youtube.com/?watch=$1'
        );
    }

    $.each(['Arguments', 'String', 'Date', 'RegExp'], function(index, name) {
        $['is' + name] = function(obj) {
            return toString.call(obj) == '[object ' + name + ']';
        };
    });
    $.isArray = Array.isArray || function(obj) {
        return toString.call(obj) == '[object Array]';
    };
    $.hasKey = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };
    $.isEmpty = function(obj) {
        if (obj == null) return true;
        if ($.isArray(obj) || $.isString(obj)) return obj.length === 0;
        for (var key in obj) if ($.hasKey(obj, key)) return false;
        return true;
    };

    $.extendAndUnion = function(obj, obj2){
        if(_.isArray(obj) && _.isArray(obj2)){
            var diff = _(obj).difference(obj2)
            if(!diff.length){
                return obj2;
            }
            return _.union(obj, obj2);
        }
        if((!_.isObject(obj) && !_.isObject(obj2)) || (typeof obj != typeof obj2)){
            return obj2;
        }
        var i, result = {};
        for(i in obj){
            if(!obj2.hasOwnProperty(i)){
                result[i] = obj[i];
                continue;
            }
            result[i] = $.extendAndUnion(obj[i], obj2[i]);
        }
        for(i in obj2){
            if(result.hasOwnProperty(i)){
                continue;
            }
            result[i] = obj2[i];
        }
        return result;
    };

    $.constructObjectFromSerializedKeys = function(subkeys, value, oGetVars){
        var nextkey = subkeys.replace(/\[([^\]]*)\].*$/, '$1');
        var subkeys = subkeys.replace(/\[([^\]]*)\]/, '');
        var resultObject;
        if(subkeys){
            if(nextkey){
                resultObject = {};
                resultObject[nextkey] = $.constructObjectFromSerializedKeys(subkeys, value, oGetVars);
            }else{
                resultObject = [];
                resultObject.push($.constructObjectFromSerializedKeys(subkeys, value, oGetVars));
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
    };

    $.getUrlParamsAsObject = function(urlParams){
        var oGetVars = {};
        var processCouple = function(couple, obj){
            var aItKey = couple.split("=");
            var rawKey = decodeURIComponent(aItKey[0]);
            var value = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
            if(rawKey.indexOf('[') > -1){
                var key = rawKey.replace(/\[.+$/gi,'');
                var subkeys = rawKey.replace(key,'');
                var arr = _.clone($.constructObjectFromSerializedKeys(subkeys, value, obj));
                if(!obj[key]){
                    obj[key] = _.clone(arr);
                }else{
                    if($.isArray(obj[key])){
                        obj[key] = _.union(obj[key], arr);
                    }else{
                        obj[key] = $.extendAndUnion(obj[key], arr);
                    }
                }
            }else{
                obj[rawKey] = value;
            }
            return obj;
        }
        urlParams = urlParams || window.location.search;
        if (urlParams.length > 1) {
            if(urlParams.indexOf('?') === 0 || urlParams.indexOf('&') === 0){
                urlParams.substr(1);
            }
            for (var nKeyId = 0, aCouples = urlParams.split("&"); nKeyId < aCouples.length; nKeyId++) {
                oGetVars = processCouple(aCouples[nKeyId], oGetVars);
            }
        }
        return oGetVars;
    };

    $.getCookies = function(){
        var pairs = document.cookie.split(";");
        var cookies = {};
        for (var i=0; i<pairs.length; i++){
            var pair = pairs[i].split("=");
            cookies[pair[0]] = decodeURI(pair[1]);
        }
        return cookies;
    };

    $.setCookie = function (key, value, options) {
        if(!_.isString(value) && !_.isNumber(value)){
            value = JSON.stringify(value);
        }
        options = options || {};
        if(!options.expires) {
            options.expires = new Date();
            options.expires.setTime(options.expires.getTime() + (1 * 24 * 60 * 60 * 1000));
        }
        var cook = [
            key, '=', value,
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path    ? '; path=' + options.path : '',
            options.domain  ? '; domain=' + options.domain : '',
            options.secure  ? '; secure' : ''
        ].join('');
        document.cookie = cook;
    };

    $.getCookie = function (key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        if(!keyValue){
            return null;
        }
        keyValue = keyValue[2];
        if((keyValue.indexOf("[")>-1 && keyValue.indexOf("]")>-1)
            || (keyValue.indexOf("{")>-1 && keyValue.indexOf("}")>-1)
        ){
            keyValue = JSON.parse(keyValue);
        }
        return keyValue;
    };

    $.parseUri = function (str) {
        str = str || document.referrer;
        var	o   = $.parseUri.options,
            m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
            uri = {},
            i   = 14;

        while (i--) uri[o.key[i]] = m[i] || "";

        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if ($1) uri[o.q.name][$1] = $2;
        });

        return uri;
    };

    $.parseUri.options = {
        strictMode: false,
        key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
        q:   {
            name:   "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };

    $.capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    $.decodeBase64 = function(s) {
        var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
        var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for(i=0;i<64;i++){e[A.charAt(i)]=i;}
        for(x=0;x<L;x++){
            c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
            while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
        }
        return r;
    };

    /*
     Copyright Vassilis Petroulias [DRDigit]

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
     */
    $.B64 = {
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        lookup: null,
        ie: /MSIE /.test(navigator.userAgent),
        ieo: /MSIE [67]/.test(navigator.userAgent),
        encode: function (s) {
            var buffer = this.toUtf8(s),
                position = -1,
                len = buffer.length,
                nan0, nan1, nan2, enc = [, , , ];
            if (this.ie) {
                var result = [];
                while (++position < len) {
                    nan0 = buffer[position];
                    nan1 = buffer[++position];
                    enc[0] = nan0 >> 2;
                    enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                    if (isNaN(nan1))
                        enc[2] = enc[3] = 64;
                    else {
                        nan2 = buffer[++position];
                        enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                        enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                    }
                    result.push(this.alphabet.charAt(enc[0]), this.alphabet.charAt(enc[1]), B64.alphabet.charAt(enc[2]), B64.alphabet.charAt(enc[3]));
                }
                return result.join('');
            } else {
                var result = '';
                while (++position < len) {
                    nan0 = buffer[position];
                    nan1 = buffer[++position];
                    enc[0] = nan0 >> 2;
                    enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                    if (isNaN(nan1))
                        enc[2] = enc[3] = 64;
                    else {
                        nan2 = buffer[++position];
                        enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                        enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                    }
                    result += this.alphabet[enc[0]] + this.alphabet[enc[1]] + this.alphabet[enc[2]] + B64.alphabet[enc[3]];
                }
                return result;
            }
        },
        decode: function (s) {
            if (s.length % 4)
                throw new Error("InvalidCharacterError: 'B64.decode' failed: The string to be decoded is not correctly encoded.");
            var buffer = this.fromUtf8(s),
                position = 0,
                len = buffer.length;
            if (this.ieo) {
                var result = [];
                while (position < len) {
                    if (buffer[position] < 128)
                        result.push(String.fromCharCode(buffer[position++]));
                    else if (buffer[position] > 191 && buffer[position] < 224)
                        result.push(String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63)));
                    else
                        result.push(String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63)));
                }
                return result.join('');
            } else {
                var result = '';
                while (position < len) {
                    if (buffer[position] < 128)
                        result += String.fromCharCode(buffer[position++]);
                    else if (buffer[position] > 191 && buffer[position] < 224)
                        result += String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63));
                    else
                        result += String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63));
                }
                return result;
            }
        },
        toUtf8: function (s) {
            var position = -1,
                len = s.length,
                chr, buffer = [];
            if (/^[\x00-\x7f]*$/.test(s)) while (++position < len)
                buffer.push(s.charCodeAt(position));
            else while (++position < len) {
                chr = s.charCodeAt(position);
                if (chr < 128)
                    buffer.push(chr);
                else if (chr < 2048)
                    buffer.push((chr >> 6) | 192, (chr & 63) | 128);
                else
                    buffer.push((chr >> 12) | 224, ((chr >> 6) & 63) | 128, (chr & 63) | 128);
            }
            return buffer;
        },
        fromUtf8: function (s) {
            var position = -1,
                len, buffer = [],
                enc = [, , , ];
            if (!this.lookup) {
                len = this.alphabet.length;
                this.lookup = {};
                while (++position < len)
                    this.lookup[this.alphabet.charAt(position)] = position;
                position = -1;
            }
            len = s.length;
            while (++position < len) {
                enc[0] = this.lookup[s.charAt(position)];
                enc[1] = this.lookup[s.charAt(++position)];
                buffer.push((enc[0] << 2) | (enc[1] >> 4));
                enc[2] = this.lookup[s.charAt(++position)];
                if (enc[2] == 64)
                    break;
                buffer.push(((enc[1] & 15) << 4) | (enc[2] >> 2));
                enc[3] = this.lookup[s.charAt(++position)];
                if (enc[3] == 64)
                    break;
                buffer.push(((enc[2] & 3) << 6) | enc[3]);
            }
            return buffer;
        }
    };

    $.deepCompare = function () {
        var leftChain, rightChain;

        function compare2Objects (x, y) {
            var p;

            // remember that NaN === NaN returns false
            // and isNaN(undefined) returns true
            if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                return true;
            }

            // Compare primitives and functions.
            // Check if both arguments link to the same object.
            // Especially useful on step when comparing prototypes
            if (x === y) {
                return true;
            }

            // Works in case when functions are created in constructor.
            // Comparing dates is a common scenario. Another built-ins?
            // We can even handle functions passed across iframes
            if ((typeof x === 'function' && typeof y === 'function') ||
                (x instanceof Date && y instanceof Date) ||
                (x instanceof RegExp && y instanceof RegExp) ||
                (x instanceof String && y instanceof String) ||
                (x instanceof Number && y instanceof Number)) {
                return x.toString() === y.toString();
            }

            // At last checking prototypes as good a we can
            if (!(x instanceof Object && y instanceof Object)) {
                return false;
            }

            if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                return false;
            }

            if (x.constructor !== y.constructor) {
                return false;
            }

            if (x.prototype !== y.prototype) {
                return false;
            }

            // check for infinitive linking loops
            if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                return false;
            }

            // Quick checking of one object beeing a subset of another.
            // todo: cache the structure of arguments[0] for performance
            for (p in y) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }
            }

            for (p in x) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }

                switch (typeof (x[p])) {
                    case 'object':
                    case 'function':

                        leftChain.push(x);
                        rightChain.push(y);

                        if (!compare2Objects (x[p], y[p])) {
                            return false;
                        }

                        leftChain.pop();
                        rightChain.pop();
                        break;

                    default:
                        if (x[p] !== y[p]) {
                            return false;
                        }
                        break;
                }
            }

            return true;
        }

        if (arguments.length < 1) {
            return true; //Die silently? Don't know how to handle such case, please help...
            // throw "Need two or more arguments to compare";
        }

        for (var i = 1, l = arguments.length; i < l; i++) {

            leftChain = []; //todo: this can be cached
            rightChain = [];

            if (!compare2Objects(arguments[0], arguments[i])) {
                return false;
            }
        }

        return true;
    }

    $.hasObject = function () {
        var leftChain, rightChain;

        function hasObject (x, y) {
            var p;

            // remember that NaN === NaN returns false
            // and isNaN(undefined) returns true
            if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                return true;
            }

            // Compare primitives and functions.
            // Check if both arguments link to the same object.
            // Especially useful on step when comparing prototypes
            if (x === y) {
                return true;
            }

            // Works in case when functions are created in constructor.
            // Comparing dates is a common scenario. Another built-ins?
            // We can even handle functions passed across iframes
            if ((typeof x === 'function' && typeof y === 'function') ||
                (x instanceof Date && y instanceof Date) ||
                (x instanceof RegExp && y instanceof RegExp) ||
                (x instanceof String && y instanceof String) ||
                (x instanceof Number && y instanceof Number)) {
                return x.toString() === y.toString();
            }

            // At last checking prototypes as good a we can
            if (!(x instanceof Object && y instanceof Object)) {
                return false;
            }

            if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                return false;
            }

            if (x.constructor !== y.constructor) {
                return false;
            }

            if (x.prototype !== y.prototype) {
                return false;
            }

            // check for infinitive linking loops
            if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                return false;
            }

            for (p in y) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }

                switch (typeof (y[p])) {
                    case 'object':
                    case 'function':

                        leftChain.push(x);
                        rightChain.push(y);

                        if (!hasObject (x[p], y[p])) {
                            return false;
                        }

                        leftChain.pop();
                        rightChain.pop();
                        break;

                    default:
                        if (x[p] !== y[p]) {
                            return false;
                        }
                        break;
                }
            }

            return true;
        }

        if (arguments.length < 1) {
            return true; //Die silently? Don't know how to handle such case, please help...
            // throw "Need two or more arguments to compare";
        }

        for (var i = 1, l = arguments.length; i < l; i++) {

            leftChain = []; //todo: this can be cached
            rightChain = [];

            if (!hasObject(arguments[0], arguments[i])) {
                return false;
            }
        }

        return true;
    }

})(jQuery, this);


(function($) {
    $.fn.contextDelete = function(options) {
        var set = {
            'obj': $(this),
            'menu': false,
            'paste': false,
            'cut': false,
            'copy': false,
            'set': '',
            'ie': null,
        };
        var opts = $.extend({
            'contextDelete': function() {},
            'paste': function() {},
            'cut': function() {},
            'copy': function() {},
            'allContext': false,
        }, options);

        $(window).bind({
            click: function() {
                set.menu = false;
            },
            keyup: function() {
                set.menu = false;
            }
        });

        set.obj.bind({
            contextmenu: function() {
                set.menu = true;
                set.paste = false;
                set.cut = false;
                set.copy = false;
                set.val = set.obj.val();

                // Hack for IE:
                if ($.browser.msie) {
                    set.ie = setInterval(function() {
                        set.obj.trigger($.Event('input'));
                        if (!set.menu) {
                            clearInterval(set.ie);
                        }
                    }, 300);
                }
                // End IE Hack
            },
            paste: function(e) {
                set.paste = true;
                if (opts.allContext) {
                    if (set.menu) {
                        opts.paste(e);
                        set.menu = false;
                    }
                }
                else {
                    opts.paste(e);
                }
            },
            cut: function(e) {
                set.cut = true;
                if (opts.allContext) {
                    if (set.menu) {
                        opts.cut(e);
                        set.menu = false;
                    }
                }
                else {
                    opts.cut(e);
                }
            },
            copy: function(e) {
                set.copy = true;
                if (opts.allContext) {
                    if (set.menu) {
                        opts.copy(e);
                        set.menu = false;
                    }
                }
                else {
                    opts.copy(e);
                }
            },
            input: function(e) {
                if (set.menu && (!set.paste) && (!set.cut) && (!set.copy)) {
                    if (set.obj.val().length < set.val.length) {
                        opts.contextDelete(e);
                        set.menu = false;
                    }
                }
            }
        });
    };
})(jQuery);
