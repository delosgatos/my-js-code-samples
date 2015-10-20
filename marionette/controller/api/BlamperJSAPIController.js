/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 31.05.13 20:44
 */

define([
    'controller/manager/PopupManager'
    ,'controller/manager/AssetManager'
], function (
    PopupManager
    ,AssetManager
) {
    "use strict";
    var BlamperJSAPIController = {
        initialize: function () {
            require(['App'], function(App){
                console.log("$ BlamperAPIController initialize");
                var popupManager = new PopupManager();
                var assetManager = new AssetManager();
                App.execute(
                    "App:RegisterExternalAPI:Method",
                    'createAndShowPopup',
                    popupManager.createAndShowPopup,
                    popupManager
                );
                App.execute(
                    "App:RegisterExternalAPI:Method",
                    'showPopup',
                    popupManager.showById,
                    popupManager
                );
                App.execute(
                    "App:RegisterExternalAPI:Method",
                    'getPopup',
                    popupManager.get,
                    popupManager
                );
                App.execute(
                    "App:RegisterExternalAPI:Method",
                    'addPopup',
                    popupManager.add,
                    popupManager
                );
                App.execute(
                    "App:RegisterExternalAPI:Method",
                    'addAsset',
                    assetManager.add,
                    assetManager
                );
                App.execute(
                    "App:RegisterExternalAPI:Method",
                    'getAsset',
                    assetManager.get,
                    assetManager
                );
                App.execute(
                    "App:RegisterExternalAPI:Registered"
                );
            });
        }
    };

    return BlamperJSAPIController;
});