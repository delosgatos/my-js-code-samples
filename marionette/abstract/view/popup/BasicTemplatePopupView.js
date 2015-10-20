/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 14:24
 */

define([
    'jquery'
    ,'marionette'
    ,'./BasicPopupView'
    ,'data.utils'
], function (
    $
    ,Marionette
    ,BasicPopupView
) {

    "use strict";

    var BasicTemplatePopupView = BasicPopupView.extend({

        /** extra data for asset assigning in initialize from params.data */
        data: {},
        dataForAsset: {},
        /** xml data for asset
         * NEED to override or pass with constructor params */
        templateDataAssets: {},
        /** element id in xml data asset
         * NEED to override or pass with constructor params */
        templateDataAssetId: '',
        /** file with html templates
         * NEED to override or pass with constructor params */
        templateUIAssets: '',
        /** id of html template
         * NEED to override or pass with constructor params */
        templateUIAssetId: '',

        getTemplate: function(){
            var template = this.template;
            if(this.templateUIAssets){
                if(this.templateUIAssetId){
                    template = $(this.templateUIAssets).filter("#"+this.templateUIAssetId).html();
                }else{
                    template = $(this.templateUIAssets).html();
                }
            }
            return _.template(template);
        },

        serializeData: function(){
            var data = {};
            if(this.templateDataAssets){
                if(this.templateDataAssetId){
                    var xmlDoc = $.parseXML(this.templateDataAssets);
                    var xml = $(xmlDoc).find("asset#"+this.templateDataAssetId).get(0);
                    data = $.xmlToJsonPlain(xml);
                }else{
                    if($.isXMLDoc(this.templateDataAssets)){
                        data = $.xmlToJsonPlain(this.templateDataAssets);
                    }else{
                        data = this.templateDataAssets;
                    }
                }
            }
            _.extend(data, this.data);
            this.dataForAsset = data;
            return {asset: data};
        },

        parseParams: function(params){
            if(!BasicPopupView.prototype.parseParams.apply(this, arguments)){
                return false;
            }
            if(params.data){
                this.data = params.data;
            }
            if(params.templateDataAssets){
                this.templateDataAssets = params.templateDataAssets;
            }
            if(params.templateUIAssets){
                this.templateUIAssets = params.templateUIAssets;
            }
            if(params.templateDataAssetId){
                this.templateDataAssetId = params.templateDataAssetId;
            }
            if(params.templateUIAssetId){
                this.templateUIAssetId = params.templateUIAssetId;
            }
            if(params.extra){
                if(this.model){
                    this.model.set(params.extra);
                }
                this.extra = params.extra;
            }
            if(params.popup){
                _.extend(this.data, params.popup);
            }
            if(params.content){
                this.content = params.content;
            }
            var result = this.parseAdditionalParams(params);
            return result !== false ? true : false;
        },

        parseAdditionalParams: function(params){
            return true;
        },

        show: function(params, noRender){
            this.parseParams(params);
            if(!noRender) {
                this.render();
                require('App').parser.parse(this.$el.children());
            }
            BasicPopupView.prototype.show.apply(this, arguments);
        }

    });

    return BasicTemplatePopupView;
});