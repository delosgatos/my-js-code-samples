/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    './BasicTemplatePopupView'
    ,'text!asset/template/popup/asset-data.xml'
    ,'text!asset/template/popup/covers.html'
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
    var StandardTemplatePopupView = BasicTemplatePopupView.extend({

        // TODO: parse and add data from asset
        templateDataAssets:                 assetsData,
        templateUIAssets:                   uiAssets,
        templateUIAssetId:                  'basic-min-with-button',

        ui: {},

        /*initialize: function () {
            BasicTemplatePopupView.prototype.initialize.apply(this, arguments);
        },*/

        initProcess: function(){
            var that = this;
            this.fancySettings['afterClose'] = function(){
                that.onFancyClosed.apply(that, arguments);
            };
        },

        showProcess: function(){
            var that = this;
            this.fancySettings.afterShow = function() {
                that.onAfterShow.apply(that, arguments);
            };
            $.fancybox(this.$el, this.fancySettings);
        },

        closeProcess: function(){
            $.fancybox.close();
        },


    });

    return StandardTemplatePopupView;
});