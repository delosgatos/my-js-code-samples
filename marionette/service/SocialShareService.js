/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 26.04.13 17:20
 */

define([
    'jquery'
    ,'settings'
    ,'fb.api'
    ,'vk.api'
    ,'helper/window'
], function (
    $
    ,Settings
   , FB
   , VK
    , window
) {
    "use strict";

    var ShareAction = function(){};
    ShareAction.prototype = {

        onSuccess: null,
        onError: null,

        share: function(service, data, onSuccess, onError){

            data = data || {};

            this.onSuccess = onSuccess;
            this.onError = onError;

            if($.isEmptyObject(data)){
                $('meta[property^="og:"]').each(function(){
                    var prop = $(this).attr('property');
                    data[prop.substr(3)] = $(this).attr('content');
                });
            }

            switch(service){
                case 'vk':
                    this.vk(data.url, data.title, data.img || data.image, data.text || data.description);
                    break;
                case 'ok':
                    this.ok(data.url, data.text || data.description);
                    break;
                case 'fb':
                    this.fb(data.url, data.title, data.img || data.image, data.text || data.description);
                    break;
                case 'tw':
                    this.tw(data.url, data.text);
                    break;
                case 'ma':
                    this.ma(data.url, data.title, data.img || data.image, data.text || data.description);
                    break;
            }
        },
        vk: function(purl, ptitle, pimg, text) {

            var that = this;
            VK = VK || window.VK;
            if(!VK || !VK.api){
                return;
            }
            VK.api('wall.post', {
                    'message': ptitle +"\n"+ text
                    ,'attachments': 'photo88950081_351566882,'+purl
                },
                function(response) {
                    if (response && !response.error) {
                        console.log('Posting completed.');
                        that.onSuccess.call(that, 'vk', response);
                    } else {
                        console.log('Error while posting.');
                        that.onError.call(that, 'vk', response);
                    }
                });

            /*VK.Share = VK.Share || {};
            VK.Share.count = function(index, count){
                debugger;
                that.onSuccess.apply(that, 'fb', index, count);
            };
            $.getJSON('http://vkontakte.ru/share.php?act=count&index=1&url=' + purl + '&format=json&callback=?');

            return;
            purl = purl || document.location;
            var url  = 'http://vkontakte.ru/share.php?';
            url += 'url='          + encodeURIComponent(purl);
            url += '&title='       + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&image='       + encodeURIComponent(pimg);
            url += '&noparse=true';
            this.popup(url);*/
        },
        ok: function(purl, text) {
            var that = this;
            purl = purl || document.location.href;
            var url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
            url += '&st.comments=' + encodeURIComponent(text);
            url += '&st._surl='    + encodeURIComponent(purl);
            this.popup(url);
            setTimeout(function(){
                that.onSuccess.call(that, 'ok');
            }, 15000)
        },
        fb: function(purl, ptitle, pimg, text) {
            var that = this;
            purl = purl || document.location.href;
            FB = FB || window.FB;
            if(!FB || !FB.api){
                return;
            }
            FB.ui(
                {
                    method: 'share',
                    href: purl
                },
                function(response) {
                    //debugger;
                    if (response && !response.error_code) {
                        console.log('Posting completed.');
                        that.onSuccess.call(that, 'fb', response);
                    } else {
                        console.log('Error while posting.');
                        that.onError.call(that, 'fb', response);
                    }
                }
            );


            /*var url;
            if(text || ptitle) {
                url = 'http://www.facebook.com/sharer.php?s=100';
                url += '&p[title]=' + encodeURIComponent(ptitle);
                url += '&p[summary]=' + encodeURIComponent(text);
                url += '&p[url]=' + encodeURIComponent(purl);
                url += '&p[images][0]=' + encodeURIComponent(pimg);
            }else{
                url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(purl);
            }
            this.popup(url);*/
        },
        tw: function(purl, ptitle) {
            purl = purl || document.location.href;
            var url  = 'http://twitter.com/share?';
            url += 'text='      + encodeURIComponent(ptitle);
            url += '&url='      + encodeURIComponent(purl);
            url += '&counturl=' + encodeURIComponent(purl);
            this.popup(url);
        },
        ma: function(purl, ptitle, pimg, text) {
            purl = purl || document.location.href;
            var url  = 'http://connect.mail.ru/share?';
            url += 'url='          + encodeURIComponent(purl);
            url += '&title='       + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&imageurl='    + encodeURIComponent(pimg);
            this.popup(url)
        },
        popup: function(url) {
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
            /*$(window).on("beforeunload", function() {

             });*/
        }
    };

    var SocialShareService = {

        fbAuth: {},
        vkAuth: {},

        init: function(){
            var that = this;
            FB = FB || window.FB;
            VK = VK || window.VK;
            if(FB && FB.init) {
                FB.init({
                    appId: Settings.api.facebook.appId
                });
                FB.getLoginStatus(function (response) {
                    if(response) {
                        that.fbAuth = response.authResponse;
                    }
                    console.log('>>> Facebook login status: ', response);
                });
            }
            if(VK && VK.init) {
                VK.init({
                    apiId: Settings.api.vkontakte.apiId
                });
                /*VK.init(function() {
                    console.log("API initialization succeeded");
                }, function() {
                    console.log("API initialization failed");
                }, '5.28');*/
                /*VK.getLoginStatus(function (response) {
                    if(response) {
                        debugger;
                        that.vkAuth = response;
                    }
                    console.log('>>> VK login status: ', response);
                });*/
            }
        },
        share: function(service, data, onSuccess, onError){
            var action = new ShareAction();
            return action.share(service, data, onSuccess, onError);
        }
    };
    return SocialShareService;
});