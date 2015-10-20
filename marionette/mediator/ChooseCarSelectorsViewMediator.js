/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 20:16
 */

define([
    'view/form/BasicSelectorView'
    ,'abstract/view/AbstractViewMediator'
    ,'jquery'
], function (
    BasicSelectorView
    ,AbstractViewMediator
    ,$
) {
    "use strict";


    var ChooseCarSelectorsViewMediator = AbstractViewMediator.extend({

        fieldNames:["mark","model","generation","year","yearOwner","body","modification"],

        selectorViews:{},

        fillFromHtml: false,
        newForm: false,
        ui: {},

        initialize: function (params) {
            this.selectorViews = {};
            AbstractViewMediator.prototype.initialize.apply(this, arguments);
        },

        initViews: function () {

            var n, i;

            if (this.filter) {
                this.setFilter(this.filter);
            }

            this.model.on("change:year", this.onYearUpdated, this);

            if(this.fillFromHtml){
                for(i in this.fieldNames) {
                    n = this.fieldNames[i];
                    if(this.ui[n] && this.ui[n].length) {
                        this.model.set(n, $.trim(this.ui[n].val()), {silent: true});
                    }
                }
            }else{
                if(!$.isNumeric(this.ui.mark)){
                    this.model.updateBrands();
                }
            }

            if(this.ui.mark && $.isNumeric(this.ui.mark)){
                var options = {};
                if(this.fillFromHtml){
                    options = {silent: true};
                }
                this.model.set('mark', parseInt(this.ui.mark), options);
            }
            for(i in this.fieldNames) {
                n = this.fieldNames[i];
                if(!this.ui[n] || !this.ui[n].length) {
                    continue;
                }
                var initParams = {
                    collection: this.model[n+'Collection']
                    ,el: this.ui[n]
                    ,templateId: n+'Selector' + (this.newForm ? 'V2' : '')
                    ,fillCollectionFromUI: this.fillFromHtml
                };
                if(!this.fillFromHtml){
                    initParams.initValue = this.model.get(n);
                }
                console.log("SELECTOR", n, this.ui[n]);
                this.selectorViews[n] = new BasicSelectorView(initParams);
                console.log("SELECTORS", this.selectorViews[n].$el, this.selectorViews);
            }

            if(this.fillFromHtml){
                if(this.ui.mark && this.ui.mark.length && this.model.get("mark") && !this.newForm){
                    this.selectorViews["model"].unblock();
                }
            }

            for(i in this.fieldNames) {
                n = this.fieldNames[i];
                if (this.selectorViews[n]) this.selectorViews[n].on('changed updated', this["on"+ $.capitalize(n) +'Changed'], this);
            }

        }

        ,setFilter: function(filter){
            this.model.setFilter(filter);
        }

        ,addFilter: function(filter){
            this.model.addFilter(filter);
        }

        ,onYearUpdated: function(model, value){
            if(!this.selectorViews["yearOwner"]){
                return;
            }
            this.model.resetOwnYears();
            this.selectorViews["yearOwner"].block();
        }

        ,onMarkChanged: function(e){
            var val = e.view.getValue();
			if (!val && !e.view.collection.length) {
                if(this.selectorViews["model"]){
				    this.selectorViews["model"].block();
                }
                if(this.selectorViews["modification"]){
				    this.selectorViews["modification"].block();
                }
			}
            if(this.selectorViews["model"]) {
                this.selectorViews["model"].reset();
            }
            if(this.selectorViews["generation"]) {
                this.selectorViews["generation"].reset();
            }
            this.model.set('mark', "0", {silent:true});
            this.model.set('mark', val);
        }
        ,onModelChanged: function(e){
            var val = e.view.getValue();
			if (!val && !e.view.collection.length) {
                if(this.selectorViews["modification"]){
				    this.selectorViews["modification"].block();
                }
			}
            if(this.selectorViews["generation"]) {
                this.selectorViews["generation"].reset();
            }
            this.model.set('model', "0", {silent:true});
            this.model.set('model', val);
        }
        ,onGenerationChanged: function(e){
            var val = e.view.getValue();
			if (!val && !e.view.collection.length) {
				if(this.selectorViews["modification"]){
					this.selectorViews["modification"].block();
				}
			}
            this.model.set('generation', val);
        }
        ,onYearChanged: function(e){
            var val = e.view.getValue();
			if (!val && !e.view.collection.length) {
				if(this.selectorViews["modification"]){
					this.selectorViews["modification"].block();
				}
			}
            this.model.set('year', val);
        }
        ,onYearOwnerChanged: function(e){
            var val = e.view.getValue();
            this.model.set('ownYear', val);
        }
        ,onBodyChanged: function(e){
            var val = e.view.getValue();
            if (!val && !e.view.collection.length) {
                if(this.selectorViews["body"]){
                    this.selectorViews["body"].block();
                }
            }
            this.model.set('body', "");
            this.model.set('body', val);
        }
        ,onModificationChanged: function(e){
            var val = e.view.getValue();
			if( val == "" && !e.view.collection.length) {
				this.selectorViews["modification"].block();
			}
            this.model.set('modification', val);
        }

    });

    return ChooseCarSelectorsViewMediator;
});