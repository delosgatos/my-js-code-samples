/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 26.04.13 18:36
 */

define([
    'underscore'
    ,'settings'
    ,'service/ODKL'
    ,'fb.api'
    ,'vk.api'
], function (
    _
    ,Settings
    ,ODKL
    ,FB
    ,VK
) {
    "use strict";


    var SocialNetworkAdapter = function(){};
    SocialNetworkAdapter.prototype = {
        uid: 0,
        accessToken: "",
        init: function(autoLoginCallback, notLoggedCallback){},
        login: function(successCallback, cancelCallback, permissions){},
        api: function(method, data, successCallback, errorCallback){},
        getMe: function(successCallback, errorCallback){},
        getUser: function(id, successCallback, errorCallback){},
        getFriends: function(id, successCallback, errorCallback){}
    };

    /*
     * ======= F A C E B O O K   A D A P T E R =======
     */
    var FacebookAdapter = function(){};
    _.extend(FacebookAdapter.prototype, SocialNetworkAdapter.prototype, {
        init: function(autoLoginCallback, notLoggedCallback){
            FB.Event.subscribe('auth.login', function(response) {
                console.log("FB subscribed auth.login");
                //_this.socialAdapter = FBA;
                //_this.onLogin();
                /* Авторизованный в Open API пользователь */
            });
            FB.Event.subscribe('auth.logout', function(response) {
                console.log("FB subscribed auth.logout");
                //_this.onLogout();
            });
            FB.init({
                appId      : Settings.api.facebook.appId,
                channelUrl : window.location.protocoll + '//' + window.location.host + Settings.api.facebook.channelUrl,
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });
            FB.getLoginStatus(function(response) {
                console.log("FB autologin status "+JSON.stringify(response));
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token
                    // and signed request each expire
                    this.uid = response.authResponse.userID;
                    this.accessToken = response.authResponse.accessToken;
                    console.log("FB auto connected");
                    if(autoLoginCallback){
                        autoLoginCallback(response.session);
                    }
                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook,
                    // but has not authenticated your app
                    console.log("FB auto not authorized");
                    if(notLoggedCallback){
                        notLoggedCallback(response);
                    }
                } else {
                    // the user isn't logged in to Facebook.
                    console.log("FB auto user is not logged");
                    if(notLoggedCallback){
                        notLoggedCallback(response);
                    }
                }
            });
        },
        getMe: function(successCallback, errorCallback){
            FB.api('/me', function(response) {
                if (!response || response.error) {
                    if(errorCallback){
                        errorCallback(response);
                    }
                } else {
                    if(successCallback){
                        successCallback(response);
                    }
                }
            });
        },
        getUser: function(id, successCallback, errorCallback, fields){
            if(!fields){
                fields = ["uid", "name", "first_name", "last_name", "username", "sex", "meeting_sex", "meeting_for", "relationship_status", "birthday_date", "hometown_location", "current_location", "timezone", "pic_small", "pic", "pic_big", "profile_url", "website", "work", "political", "religion", "contact_email", "education"];
            }
            var fql_where = "";
            if(!id || id == "me"){
                this.getMe(successCallback, errorCallback);
            }else{
                fql_where = "uid = "+id;
            }
            var fql = "SELECT "+fields.join(",")+" FROM user WHERE "+fql_where;
            this.apiFQL('fql.query', fql, successCallback, errorCallback);
        },
        apiFQL: function(method, fql, successCallback, errorCallback){
            FB.api({
                    method: method,
                    query: fql
                },
                function(response) {
                    if (!response || response.error) {
                        if(errorCallback){
                            errorCallback(response);
                        }
                    } else {
                        if(successCallback){
                            successCallback(response);
                        }
                    }
                }
            );
        },
        api: function(method, data, successCallback, errorCallback){
            FB.api(method, data, function(response) {
                if (!response || response.error) {
                    if(errorCallback){
                        errorCallback(response);
                    }
                } else {
                    if(successCallback){
                        successCallback(response);
                    }
                }
            });
        },
        login: function(successCallback, cancelCallback, permissionsString) {
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log("FB login OK");
                    if(successCallback){
                        successCallback(response.authResponse);
                    }
                } else {
                    console.log("FB auth cancel");
                    if(cancelCallback){
                        cancelCallback(response);
                    }
                }
            }, {scope: permissionsString  ? permissionsString : "email"});
        }
        /*setStatus: function(){
            // Проверяем, зарегистрировался ли пользовательы:
            FB.getLoginStatus(function(response) {
                if (response.session) {
                    var new_status = document.getElementById('status').value;
                    FB.api(
                        {
                            method: 'status.set',
                            status: new_status
                        },
                        function(response) {
                            if (response == 0){
                                alert('Ваш статус Facebook не обновлен. Установите права для обновления статуса.');
                            }
                            else{
                                alert('Ваш статус Facebook обновлен');
                            }
                        }
                    );
                } else {
                    alert('Сначала зарегистрируейтесь :)');
                }
            });
        },*/
    });

    var VKAdapter = function(){};
    _.extend(VKAdapter.prototype, SocialNetworkAdapter.prototype, {
        permissions: 0,
        apiId: Settings.api.vkontakte.apiId,
        init: function(autoLoginCallback, notLoggedCallback){
            VK.init({
                    apiId: this.apiId
                }
            /*function() {
                $(function(){
                    // API initialization succeeded
                    // Your code here
                    console.log("VK inited");
                    this.refreshPermissions(function(){
                        this.grantPermissions(8193);
                    });
                    if(callback){
                        VK.addCallback("onSettingsChanged", callback);
                    }
                });
            }*/
            );
            VK.Auth.getLoginStatus(function(response) {
                console.log("VK autologin status "+JSON.stringify(response));
                if (response.session) {
                    /* Авторизованный в Open API пользователь */
                    console.log("VK auto connected");
                    if(autoLoginCallback){
                        autoLoginCallback(response.session);
                    }
                } else {
                    console.log("VK auto not authorized");
                    /* Неавторизованный в Open API пользователь */
                    if(notLoggedCallback){
                        notLoggedCallback(response);
                    }
                }
            });
        },/*
        refreshPermissions: function(userId, callback){
            // Проверяем, зарегистрировался ли пользовательы:
            VK.api("getUserSettings", {"test_mode":1, "user_id":userId}, function(data){
                if(data.response){
                    if(data.response.error){
                        *//*
                         1              Unknown error occurred.
                         2              Application is disabled. Enable your application or use test mode.
                         4              Incorrect signature.
                         5              User authorization failed.
                         6              Too many requests per second.
                         *//*
                        console.log("VK error: "+data.response.error);
                    }else{
                        //currentPermissions = data.response;
                        if(callback) callback(data.response);
                    }
                }else if(data.error){
                    *//*
                     1              Unknown error occurred.
                     2              Application is disabled. Enable your application or use test mode.
                     4              Incorrect signature.
                     5              User authorization failed.
                     6              Too many requests per second.
                     *//*
                    console.log("VK error: "+data.error);
                }else{
                    console.log("can't read permissions: "+JSON.stringify(data));
                }
            });

        },
        grantPermissions: function(level){
            if(this.permissions & level) return;
            this.permissions = this.permissions | level;
            VK.callMethod("showSettingsBox", this.permissions);
        },
        onSettingsChanged: function(settings){
            this.permissions = settings;
        },*/
        api: function(method, data, successCallback, errorCallback){
            VK.Api.call(method, data, function(response) {
                if (!response || response.error) {
                    if(errorCallback){
                        errorCallback(response);
                    }
                } else {
                    if(successCallback){
                        successCallback(response);
                    }
                }
            });
        },
        getMe: function(successCallback, errorCallback, fields){
            this.getUser(this.uid, successCallback, errorCallback, fields);
        },
        getUser: function(id, successCallback, errorCallback, fields){
            if(!fields){
                fields = ["uid", "first_name", "last_name", "nickname", "sex", "bdate", "city", "country", "timezone", "photo", "photo_medium", "photo_big", "domain", "has_mobile", "rate", "contacts", "education"];
            }
            var fields = fields.join();
            var data = {uids:id};
            if(fields){
                data["fields"] = fields;
            }
            var _this = this;
            this.api(
                'users.get',
                data,
                function(data){
                    if(data.response){
                        successCallback(data.response[0]);
                    }else{
                        errorCallback(data);
                    }
                },
                errorCallback
            );
        },
        login: function(successCallback, cancelCallback, permissionsString) {
            var _this = this;
            VK.Auth.login(function(response){
                if (response.status == "connected") {
                    console.log("VK login OK: "+JSON.stringify(response));
                    _this.uid = response.session.user.id;
                    _this.accessToken = response.session.sig;
                    if(successCallback){
                        successCallback(response.session);
                    }
                    /*if (response.settings) {
                    }*/
                } else {
                    console.log("VK auth cancel");
                    if(cancelCallback){
                        cancelCallback(response);
                    }
                }
            }, {scope: permissionsString  ? permissionsString : 7});
        }
    });


    var GooglePlusAdapter = function(){};
    _.extend(GooglePlusAdapter.prototype, SocialNetworkAdapter.prototype, {
        clientId: Settings.api.google.clientId,
        apiKey: Settings.api.google.apiKey,
        scopes: Settings.api.google.scopes,
        permissions: 0,
        autoLoginCallback: null,
        notLoggedCallback: null,
        init: function(autoLoginCallback, notLoggedCallback){
            _.bindAll(this
                ,'handleClientLoad'
                ,'checkAuth'
                ,'handleAutoAuth'
            );
            this.autoLoginCallback = autoLoginCallback;
            this.notLoggedCallback = notLoggedCallback;
            window.googlePlusLoginButtonRender = this.handleClientLoad;
            (function() {
                var po = document.createElement('script');
                po.type = 'text/javascript'; po.async = true;
                po.src = 'https://apis.google.com/js/client:plusone.js?onload=googlePlusLoginButtonRender';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            })();
        },
        // Use a button to handle authentication the first time.
        handleClientLoad: function() {
            var _this = this;
            gapi.client.setApiKey(this.apiKey);
            setTimeout(function(){
                    _this.checkAuth();
                },
                1
            );
        },
        checkAuth: function () {
            gapi.auth.authorize({
                    client_id: this.clientId,
                    scope: this.scopes,
                    immediate: true
                },
                this.handleAutoAuth
            );
        },
        handleAutoAuth: function (authResult) {
            if (authResult && !authResult.error) {
                if(this.autoLoginCallback){
                    this.autoLoginCallback(authResult);
                }
            } else {
                if(this.notLoggedCallback){
                    this.notLoggedCallback(authResult);
                }
            }
        },
        api: function(method, data, successCallback, errorCallback){
            var restRequest = gapi.client.request({
                'path': method
                ,'params': data
            });
            restRequest.execute(function(response) {
                if (response && !response.error) {
                    if(successCallback){
                        successCallback(response);
                    }
                }else{
                    if(errorCallback){
                        errorCallback(response);
                    }
                }
            });
        },
        getMe: function(successCallback, errorCallback, fields){
            this.getUser('me', function(response){
                    gapi.client.load('oauth2', 'v2', function() {
                        gapi.client.oauth2.userinfo.get().execute(function(userinfo) {
                            _.extend(response, userinfo);
                            if(successCallback){
                                successCallback(response)
                            }
                        })
                    });
                }, errorCallback, fields
            );
        },
        getUser: function(id, successCallback, errorCallback, fields){
            if(!fields){
                fields = ["uid", "first_name", "last_name", "nickname", "sex", "bdate", "city", "country", "timezone", "photo", "photo_medium", "photo_big", "domain", "has_mobile", "rate", "contacts", "education"];
            }
            gapi.client.load('plus', 'v1', function() {
                var request = gapi.client.plus.people.get({
                    'userId': id
                });
                request.execute(function(response) {
                    if (response && !response.error) {
                        if(successCallback){
                            successCallback(response);
                        }
                    }else{
                        if(errorCallback){
                            errorCallback(response);
                        }
                    }
                });
            });
        },
        login: function(successCallback, errorCallback, permissions) {
            gapi.auth.authorize({
                    client_id: this.clientId,
                    scope: this.scopes,
                    immediate: false
                },
                function (authResult) {
                    if (authResult && !authResult.error) {
                        if(successCallback){
                            successCallback(authResult);
                        }
                    } else {
                        if(errorCallback){
                            errorCallback(authResult);
                        }
                    }
                }
            );
        }
    });

    var MailRuAdapter = function(){};
    _.extend(MailRuAdapter.prototype, SocialNetworkAdapter.prototype, {
        clientId: Settings.api.mailru.clientId,
        privateKey: Settings.api.mailru.privateKey,
        sdkUrl: Settings.api.mailru.sdkUrl,
        permissions: 0,
        autoLoginCallback: null,
        notLoggedCallback: null,
        loginSuccessCallback: null,
        loginErrorCallback: null,
        init: function(autoLoginCallback, notLoggedCallback){
            var _this = this;
            this.autoLoginCallback = autoLoginCallback;
            this.notLoggedCallback = notLoggedCallback;

            require([Settings.api.mailru.sdkUrl], function(scope){
                mailru.loader.require('api', function() {
                    mailru.connect.init(_this.clientId, _this.privateKey);
                    // регистрируем обработчики событий,
                    // которые будут вызываться при логине и логауте
                    mailru.events.listen(mailru.connect.events.logout, function(){
                        console.log("USER LOGOUT");
                        // TODO: Social network Logout callback
                        //window.location.reload();
                    });

                    mailru.events.listen(mailru.connect.events.login, function(session){
                        console.log("USER LOGIN COMPLETE: %O", session);
                        if(!session || session.error){
                            if(_this.loginErrorCallback){
                                _this.loginErrorCallback(session);
                            }
                        }else{
                            if(_this.loginSuccessCallback){
                                _this.loginSuccessCallback(session);
                            }
                        }
                    });

                    mailru.connect.getLoginStatus(function(result) {
                        _this.handleAutoAuth.call(_this, result);
                    });
                });
            });
        },
        handleAutoAuth: function (result) {
            if (result.is_app_user != 1) {
                console.log("MAIL.RU not auto logged");
                if(this.notLoggedCallback){
                    this.notLoggedCallback(result);
                }
            } else {
                console.log("MAIL.RU auto logged");
                if(this.autoLoginCallback){
                    this.autoLoginCallback(result);
                }
            }
        },
        api: function(method, data, successCallback, errorCallback){
        },
        getMe: function(successCallback, errorCallback, fields){
            mailru.common.users.getInfo(function(result){
                if(!result || !result[0] || result.error){
                    console.log("MAIL.RU user data error: %O", result);
                    if(errorCallback){
                        errorCallback(result);
                    }
                }else{
                    console.log("MAIL.RU user data: %O", result[0]);
                    if(successCallback){
                        successCallback(result[0]);
                    }
                }
            });
        },
        getUser: function(id, successCallback, errorCallback, fields){
        },
        login: function(successCallback, errorCallback, permissions) {
            // проверка статуса логина, в result callback'a приходит
            // вся информация о сессии (см. следующий раздел)
            this.loginSuccessCallback = successCallback;
            this.loginErrorCallback = errorCallback;
            mailru.connect.login();
        }
    });
    var OdnoklassnikiAdapter = function(){};
    _.extend(OdnoklassnikiAdapter.prototype, SocialNetworkAdapter.prototype, {
        appId: Settings.api.odnoklassniki.appId,
        privateKey: Settings.api.odnoklassniki.privateKey,
        sdkUrl: Settings.api.odnoklassniki.sdkUrl,
        permissions: 0,
        autoLoginCallback: null,
        notLoggedCallback: null,
        loginSuccessCallback: null,
        loginErrorCallback: null,
        init: function(autoLoginCallback, notLoggedCallback){
            var _this = this;
            this.autoLoginCallback = autoLoginCallback;
            this.notLoggedCallback = notLoggedCallback;
        },
        handleAutoAuth: function (result) {
            if (result.is_app_user != 1) {
                console.log("OK not auto logged");
                if(this.notLoggedCallback){
                    this.notLoggedCallback(result);
                }
            } else {
                console.log("OK auto logged");
                if(this.autoLoginCallback){
                    this.autoLoginCallback(result);
                }
            }
        },
        api: function(method, data, successCallback, errorCallback){
        },
        getMe: function(successCallback, errorCallback, fields){
        },
        getUser: function(id, successCallback, errorCallback, fields){
        },
        login: function(successCallback, errorCallback, permissions) {
            ODKL.Oauth2(
                this.appId,
                'VALUABLE ACCESS', //SET STATUS;
                'http://blamper.ru/_ok_receiver.html'
            );
        }
    });
    var TwitterAdapter = function(){};
    _.extend(TwitterAdapter.prototype, SocialNetworkAdapter.prototype, {
        clientId: Settings.api.mailru.clientId,
        privateKey: Settings.api.mailru.privateKey,
        sdkUrl: Settings.api.mailru.sdkUrl,
        permissions: 0,
        autoLoginCallback: null,
        notLoggedCallback: null,
        loginSuccessCallback: null,
        loginErrorCallback: null,
        init: function(autoLoginCallback, notLoggedCallback){
            var _this = this;
            this.autoLoginCallback = autoLoginCallback;
            this.notLoggedCallback = notLoggedCallback;


        },
        handleAutoAuth: function (result) {
            if (result.is_app_user != 1) {
                console.log("OK not auto logged");
                if(this.notLoggedCallback){
                    this.notLoggedCallback(result);
                }
            } else {
                console.log("OK auto logged");
                if(this.autoLoginCallback){
                    this.autoLoginCallback(result);
                }
            }
        },
        api: function(method, data, successCallback, errorCallback){
        },
        getMe: function(successCallback, errorCallback, fields){
        },
        getUser: function(id, successCallback, errorCallback, fields){
        },
        login: function(successCallback, errorCallback, permissions) {

        }
    });

    var FBA = new FacebookAdapter();
    var VKA = new VKAdapter();
    var GPA = new GooglePlusAdapter();
    var MAA = new MailRuAdapter();
    var OKA = new OdnoklassnikiAdapter();
    var TWA = new TwitterAdapter();


    var SocialActions = function(){};
    SocialActions.prototype = {

        NETWORK_FACEBOOK:       "fb",
        NETWORK_VKONTAKTE:      "vk",
        NETWORK_GOOGLE:         "gp",
        NETWORK_TWITTER:        "tw",
        NETWORK_MAIL:           "ma",
        NETWORK_ODNOKLASSNIKI:  "ok",

        socialAdapter: new SocialNetworkAdapter(),

        init: function(){
            this.initFB();
            this.initVK();
            GPA.init();
            MAA.init();
            OKA.init();
            TWA.init();
        },
        initFB: function(){
            var _this = this;

            window.fbAsyncInit = function() {
                // FB.Event isn't working ??

                FBA.init();

            };
            // Load Facebook SDK Asynchronously
            (function(d){
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/ru_RU/all.js";
                ref.parentNode.insertBefore(js, ref);
            }(document));
        },
        initVK: function(){
            window.vkAsyncInit = function() {
                VKA.init();
            };
            /*setTimeout(function() {
                var el = document.createElement("script");
                el.type = "text/javascript";
                el.src = "http://vkontakte.ru/js/api/openapi.js";
                el.async = true;
                document.getElementById("vk_api_transport").appendChild(el);
            }, 0);*/
            (function(d){
                var js, id = 'vk-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//vkontakte.ru/js/api/openapi.js";
                ref.parentNode.insertBefore(js, ref);
            }(document));
        },
        auth: function(network, successCallback, cancelCallback, permissions){
            if(network == this.NETWORK_FACEBOOK){
                FBA.login(successCallback, cancelCallback, permissions);
            }else if(network == this.NETWORK_VKONTAKTE){
                VKA.login(successCallback, cancelCallback, permissions);
            }else if(network == this.NETWORK_GOOGLE){
                GPA.login(successCallback, cancelCallback, permissions);
            }else if(network == this.NETWORK_MAIL){
                MAA.login(successCallback, cancelCallback, permissions);
            }else if(network == this.NETWORK_ODNOKLASSNIKI){
                OKA.login(successCallback, cancelCallback, permissions);
            }

        },
        getMe: function(network, successCallback, errorCallback){
            if(network == this.NETWORK_FACEBOOK){
                FBA.getMe(successCallback, errorCallback);
            }else if(network == this.NETWORK_VKONTAKTE){
                VKA.getMe(successCallback, errorCallback);
            }else if(network == this.NETWORK_GOOGLE){
                GPA.getMe(successCallback, errorCallback);
            }else if(network == this.NETWORK_MAIL){
                MAA.getMe(successCallback, errorCallback);
            }else if(network == this.NETWORK_ODNOKLASSNIKI){
                OKA.getMe(successCallback, errorCallback);
            }
        }
    };
    var SA = new SocialActions();
    SA.init();
    return SA;


    /*$("div.fb-like iframe").click(function(){
     alert("resize");
     });*/
    // <fb:login-button autologoutlink='true'  perms='email,user_birthday,status_update,publish_stream'></fb:login-button>

});