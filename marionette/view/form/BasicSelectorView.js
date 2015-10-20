/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 20:18
 */

define([
    'marionette'
    ,'backbone'
    ,'underscore'
    ,'text!../../asset/template/select/selectors.html'
], function (
    Marionette
    ,Backbone
    ,_
    ,selectorsTemplate
) {

    "use strict";

    var BasicSelectorView = Marionette.ItemView.extend({

        templateUIAssets: selectorsTemplate,
        templateId: 'basicSelector',
        events: {
            'change': 'onChange'
        },
        /*triggers: {
            'change': 'changed'
        },*/
        ui: {
            parentLine: ''
        },
        collectionEvents:{
            "sync": "onCollectionSync"
            ,"reset": "onCollectionReset"
            ,"fetch": "onCollectionFetch"
        },
        fillCollectionFromUI: false,
        blocked: false,
        initValue: null,
        options: {
            selectAll: false
        },

        serializeData: function(){
            var data = Marionette.ItemView.prototype.serializeData.apply(this, arguments);
            return _.extend({}, this.options, data);
        },

        getSelectedIndex: function(){
            return this.el.selectedIndex;
        },

        getValue: function(){
            return this.el.value;
        },

        getTemplate: function(){
            var template = $(this.templateUIAssets).filter("#"+this.templateId).html();
            return _.template(template);
        },

        /**
         * params.templateId (string) id of selector template in selectors.html template file
         */
        initialize: function (params) {
            if(params.templateId){
                this.templateId = params.templateId;
            }
            if(params.initValue){
                this.initValue = params.initValue;
            }
            if(params.fillCollectionFromUI){
                this.fillCollectionFromUI = params.fillCollectionFromUI;
            }
            if(!this.collection){
                this.collection = new Backbone.Collection();
            }

            this.options.nullTitle = this.$el.data('default');
            this.options.selectAll = this.$el.data('always-default');

            if(this.fillCollectionFromUI){
                this.bindUIElements();
            }else{
                this.render();
                this.selectElementByIndex(0);
            }
        },

        reset: function(keepData){
            this.selectElementByIndex(0);
            if(keepData){
                return;
            }
            this.collection.reset();
        },

        block: function(){
            var that = this;
            this.blocked = true;
            setTimeout(function(){
                that.$el.USelectorDisable();
            },0);
        },

        unblock: function(){
            var that = this;
            this.blocked = false;
            setTimeout(function(){
                that.$el.USelectorEnable();
            },0);
        },

        sendChangeEventToDom: function(){
            var _this = this;
            setTimeout(function(){
                _this.$el.trigger("change");
            },0);
        },

        selectElementByIndex: function(index){
            this.el.selectedIndex = index;
            var $el = this.$el.find('option').eq(index);
            $el.attr("selected", true);
            //console.log('Default Selected By Index: ', index, $el, $el.attr('value'), this.$el.val());
            this.sendChangeEventToDom();
        },

        selectElementByValue: function(val){
            var $sel = this.$el.find('option[value='+val+']');
            this.el.selectedIndex = $sel.index();
            $sel.attr("selected", true);
            //console.log('Default Selected By Value: ', val, $el, $el.attr('value'), this.$el.val());
            this.sendChangeEventToDom();
        },

        onCollectionSync: function(collection, response, options){
			// remove preloader
            //console.log("collection changes "+JSON.stringify(response));
			var index;

            this.render();
            if(!this.blocked){
                this.$el.USelectorEnable();
                index = 0;
                setTimeout(function(){
                    this.selectElementByIndex(index);
                }.bind(this),0);
            } else {
				this.unblock();
				index = this.$el.find(':selected').index();
                setTimeout(function(){
                    this.selectElementByIndex(index);
                }.bind(this),0);
			}
            if(this.initValue){
                setTimeout(function(){
                    this.selectElementByValue(this.initValue);
                }.bind(this),0);
                this.initValue = null;
            }
            this.trigger("updated", {
                view: this,
                collection: this.collection,
                model: this.model
            });
            this.sendChangeEventToDom();
			this.$el.USelectorHideListLoading();
        },

        onCollectionReset: function(collection, response, options){
            //console.log("collection changes "+JSON.stringify(response));
            this.render();
            this.selectElementByIndex(0);
            this.$el.USelectorDisable();
            this.trigger("updated", {view: this, collection: this.collection, model: this.model});
            this.sendChangeEventToDom();
			this.$el.USelectorHideListLoading();
        },

		onCollectionFetch: function(){
			console.log("-V- BasicSelectorView collection fetch");
			this.$el.USelectorShowListLoading();
        },

        onChange: function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            this.$el.trigger('changed', e);
            this.trigger('changed', {view: this, collection: this.collection});
        },


    });

    return BasicSelectorView;
});