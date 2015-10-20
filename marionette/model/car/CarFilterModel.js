/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 14:19
 */

define([
    'backbone'
    ,'model/car/CarBrandCollection'
    ,'model/car/CarModelCollection'
    ,'model/car/CarGenerationCollection'
    ,'model/car/CarYearCollection'
    ,'model/car/CarOwnYearCollection'
    ,'model/car/CarBodyCollection'
    ,'model/car/CarModificationCollection'
], function (
    Backbone
    ,CarBrandCollection
    ,CarModelCollection
    ,CarGenerationCollection
    ,CarYearCollection
    ,CarOwnYearCollection
    ,CarBodyCollection
    ,CarModificationCollection
) {

    "use strict";

    var CarFilterModel = Backbone.Model.extend({

        addFilter: function(filter){
            this.markCollection.addFilter(filter);
            this.modelCollection.addFilter(filter);
            this.yearCollection.addFilter(filter);
            //this.bodyCollection.addFilter(filter);
            //this.generationCollection.addFilter(filter);
            this.modificationCollection.addFilter(filter);
        },

        setFilter: function(filter){
            this.markCollection.setFilter(filter);
            this.modelCollection.setFilter(filter);
            this.yearCollection.setFilter(filter);
            //this.bodyCollection.setFilter(filter);
            //this.generationCollection.setFilter(filter);
            this.modificationCollection.setFilter(filter);
        },

        setApiUrls: function(brandUrl, modelUrl, yearUrl, modificationUrl){
            this.markCollection.setBaseUrl(brandUrl);
            this.modelCollection.setBaseUrl(modelUrl);
            this.yearCollection.setBaseUrl(yearUrl);
            this.modificationCollection.setBaseUrl(modificationUrl);
        },

        initialize: function () {
            this.markCollection        = new CarBrandCollection();
            this.modelCollection        = new CarModelCollection();
            this.generationCollection   = new CarGenerationCollection();
            this.yearCollection         = new CarYearCollection();
            this.yearOwnerCollection      = new CarOwnYearCollection();
            this.bodyCollection         = new CarBodyCollection();
            this.modificationCollection = new CarModificationCollection();

            this.on('change:mark',         this.onMarkChanged,        this);
            this.on('change:model',         this.onModelChanged,        this);
            this.on('change:generation',    this.onGenerationChanged,   this);
            this.on('change:year',          this.onYearChanged,         this);
            this.on('change:ownYear',       this.onYearOwnerChanged,      this);
            this.on('change:body',          this.onBodyChanged,         this);
            this.on('change:modification',  this.onModificationChanged, this);
        },

        resetCollections: function(){
            this.modelCollection.reset();
            this.generationCollection.reset();
            this.yearCollection.reset();
            this.yearOwnerCollection.reset();
            this.bodyCollection.reset();
            this.modificationCollection.reset();
        },

        updateBrands: function(){
            this.modelCollection.reset();
            this.generationCollection.reset();
            this.yearCollection.reset();
            this.yearOwnerCollection.reset();
            this.bodyCollection.reset();
            this.modificationCollection.reset();
            this.markCollection.fetch({cache:false});
        },
        updateModelsByBrandId: function(id){
            //id = parseInt(id) || 0;
            this.generationCollection.reset();
            this.yearCollection.reset();
            this.yearOwnerCollection.reset();
            this.bodyCollection.reset();
            this.modificationCollection.reset();
            if(!id || parseInt(id) === 0){
                this.modelCollection.reset();
                return;
            }
            this.modelCollection.fetchByBrandId(id);
        },
        updateGenerationByModelId: function(id){
            //id = parseInt(id);
            this.bodyCollection.reset();
            this.modificationCollection.reset();
            if(!id || parseInt(id) === 0){
                this.generationCollection.reset();
                return;
            }
            this.generationCollection.fetchByModelId(id);
        },
        updateBodyByGenerationId: function(id){
            id = parseInt(id);
            this.modificationCollection.reset();
            var model = this.generationCollection.findWhere({generation_id:id});
            if(!model || _.isEmpty(model.attributes)){
                this.bodyCollection.reset();
                return;
            }
            var bodyList = _.values(model.get("body"));
            this.bodyCollection.set(bodyList, {silent: false});
            this.bodyCollection.trigger('sync');
        },
        updateYearsByModelId: function(id){
            //id = parseInt(id);
            this.yearOwnerCollection.reset();
            this.modificationCollection.reset();
            if(!id || parseInt(id) === 0){
                this.yearCollection.reset();
                return;
            }
            this.yearCollection.setMarkId(this.get("mark"));
            this.yearCollection.fetchByModelId(id);
        },
        updateOwnYears: function(noFire){
            var buildYear = parseInt(this.get("year"));
            if(!buildYear){
                return;
            }
            this.generateOwnYears(buildYear, noFire)
        },

        generateOwnYears: function(from, noFire){
            if(!this.yearOwnerCollection){
                return;
            }
            var curYear = parseInt(this.get("currentYear"));
            this.yearOwnerCollection.generateYears(from, curYear);
            if(noFire){
                return;
            }
            /*this.modificationCollection.fetchByModelIdAndYear(
                this.get("model"),
                this.get("year"),
                this.get("mark")
            );*/
        },

        updateModificationByBodySlug: function(body){
            var model = this.bodyCollection.findWhere({slug:body});
            if(!model || _.isEmpty(model.attributes)){
                this.modificationCollection.reset();
                return;
            }
            var modificationList = _.values(model.get("modifications"));
            //this.modificationCollection.fetchList(modificationList);
        },
        resetOwnYears: function(){
            this.yearOwnerCollection.reset();
            //this.modificationCollection.reset();
        },
        onMarkChanged: function(model, id){
            this.updateModelsByBrandId(id);
        },
        onModelChanged: function(model, id){
            //this.updateYearsByModelId(id);
            this.updateGenerationByModelId(id);
        },
        onGenerationChanged: function(model, id){
            this.updateBodyByGenerationId(id);
            var gen = this.generationCollection.findWhere({'generation_id':parseInt(id)});
            if(!gen){
                this.modificationCollection.reset();
                //return;
            }
            this.modificationCollection.fetchByGenerationId(id);
            //this.generateOwnYears(gen.get("start_production"), true);
        },
        onYearChanged: function(model, year){
			this.yearOwnerCollection.reset();
			this.modificationCollection.reset();
            this.updateOwnYears();
        },
        onYearOwnerChanged: function(model, year){
            console.log("YEAR CHANGED: "+year);
        },
        onBodyChanged: function(model, body){
            this.updateModificationByBodySlug(body);
        },
        onModificationChanged: function(model, modification){
            console.log("MODIFICATION CHANGED: "+modification);
        }
    });

    return CarFilterModel;

});