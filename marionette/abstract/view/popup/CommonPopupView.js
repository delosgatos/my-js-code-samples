/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    './BasicTemplatePopupView'
    ,'underscore'
    ,'settings'
    ,'text!asset/template/popup/covers.html'
], function (
    BasicTemplatePopupView
    ,_
    ,Settings
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
    var CommonPopupView = BasicTemplatePopupView.extend({

        templateUIAssets:                   uiAssets,
        templateUIAssetId:                  'basic-mid-with-button',
        events:{
            'click .yes-button':            "onYesClicked"
            ,'click .no-button':            "onNoClicked"
        },

        ui: {

        },

        initialize: function (params) {
            BasicTemplatePopupView.prototype.initialize.apply(this, arguments);
        },

		parseParams: function(params){
			if(!BasicTemplatePopupView.prototype.parseParams.apply(this, arguments)){
				return;
			}
			//console.log("-V- CommonPopupView init: "+JSON.stringify(params));
			this.inputParams = params;
		},

        init: function () {
            BasicTemplatePopupView.prototype.init.call(this);
        },

        start: function () {
            BasicTemplatePopupView.prototype.start.call(this);
        },

        onYesClicked: function(e){
            e.preventDefault();
            this.trigger("Submited");
			if (this.inputParams && this.inputParams.okEvent) {
				require("App").vent.trigger(this.inputParams.okEvent);
			}
            this.hide();
        },

        onNoClicked: function(e){
            e.preventDefault();
            this.trigger("Closed");
            this.hide();
        }


    });

    return CommonPopupView;
});