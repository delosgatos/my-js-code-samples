/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 13:15
 */

define([
    'helper/Analytics'
], function (
    Analytics
) {
    "use strict";

    var SocialAuthService = {
        auth: function(network, signin){
            signin = signin ? true : false;
            var network, sendData = {};
            switch (network) {
                case "fb":
                    network = "facebook";
                    sendData = signin ? Analytics.AUTH.FB : Analytics.REGISTRATION.FB;
                    break;
                case "vk":
                    network = "vkontakte";
                    sendData = signin ? Analytics.AUTH.VK : Analytics.REGISTRATION.VK;
                    break;
                case "gp":
                    network = "google";
                    sendData = signin ? Analytics.AUTH.GP : Analytics.REGISTRATION.GP;
                    break;
                case "tw":
                    network = "twitter";
                    sendData = signin ? Analytics.AUTH.TW : Analytics.REGISTRATION.TW;
                    break;
                case "ma":
                    network = "mail";
                    sendData = signin ? Analytics.AUTH.MA : Analytics.REGISTRATION.MA;
                    break;
                case "ok":
                    network = "odnoklassniki";
                    sendData = signin ? Analytics.AUTH.OK : Analytics.REGISTRATION.OK;
                    break;
                default :
                    network = "vkontakte";
                    sendData = null;
            }
            require('App').sendAnalytics(sendData);

            window.open(
                "//" + window.location.host + "/user/signup/social/?authclient="+network,
                "",
                "height=400,width=600,left=center,top=middle,menubar=no")
            ;
        }
    };
    return SocialAuthService;
});