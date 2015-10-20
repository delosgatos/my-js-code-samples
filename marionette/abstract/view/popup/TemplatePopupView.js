/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    './BasicTemplatePopupView'
    ,'text!asset/template/popup/assets.xml'
    ,'text!asset/template/popup/containers.html'
], function (
    BasicTemplatePopupView
    ,assetsData
    ,uiAssets
) {

    "use strict";

    /**
     * Use it for popup with button
     * constructor: ( {data:{
     *      title: '',
     *      content: '',
     *      button:{
     *          class: '',
     *          title: ''
     *      }
     * }} );
     */
    var TemplatePopupView = BasicTemplatePopupView.extend({

        // TODO: parse and add data from asset
        templateDataAssets:                 assetsData,
        templateUIAssets:                   uiAssets,
        templateUIAssetId:                  'basic',
        ui: {},

    });

    return TemplatePopupView;
});