/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.05.13 20:50
 */

define([
], function () {
    "use strict";

    var ODKL_HOST = 'www.odnoklassniki.ru';

    //if (typeof( window.ODKL ) == "undefined") { ODKL = {};}
    var ODKL = {};
    if (!ODKL.OAUTH2_CONF) {ODKL.OAUTH2_CONF = {
        main_host : ODKL_HOST,
        w : (screen.width-100),
        h : (screen.height-100),
        l : 25,
        t : 25,
        wSmall: 750,
        hSmall: 370,
        lSmall : (screen.width/2 - 300),
        tSmall : (screen.height/2 - 210),
        main_url: 'http://'+ODKL_HOST+'/oauth/authorize?client_id={clientId}&scope={scope}&response_type={responseType}&redirect_uri={redirectUri}',
        requests : null
    };
    }


    if (!ODKL.Oauth2) {
        ODKL.Oauth2 = function(clientId, scope, redirectUri){
            /*
            if(el.className.toLowerCase().indexOf("odkl-oauth-oc")!=-1){
                ODKL.Oauth2OC(el);// one click button clicked
                return;
            }
            */
            var url = ODKL.OAUTH2_CONF.main_url.replace( "{clientId}", clientId ).replace("{responseType}", "code").replace("{redirectUri}", encodeURIComponent(redirectUri)).replace("{scope}",  encodeURIComponent(scope));
            var w = window.open('','_blank', 'top='+ODKL.OAUTH2_CONF.tSmall+',left='+ODKL.OAUTH2_CONF.lSmall+',width='+ODKL.OAUTH2_CONF.wSmall+',height='+ODKL.OAUTH2_CONF.hSmall+',resizable=1');
            var t =
                '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'+
                    '<html lang="ru" xml:lang="ru" xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="content-type" content="text/html; charset=UTF-8" />'+
                    '<title>Одноклассники.ru</title>'+
                    '</head><body style="margin:0;padding:0;"><div style="width:100%;padding:17px 0;text-align:center;background-color:#F93;color:white;font:normal 14px/16px verdana">Происходит загрузка...</div>'+
                    '</body></html>';

            w.document.write(t);
            w.onclose = function(){
                //w.moveTo( ODKL.OAUTH2_CONF.l, ODKL.OAUTH2_CONF.t );
                //w.resizeTo( ODKL.OAUTH2_CONF.w, ODKL.OAUTH2_CONF.h );
                alert("CLOSE POPUP WINDOW");
            };
            w.location.href=url;
            //return false;
        }
    }

    return ODKL;
});