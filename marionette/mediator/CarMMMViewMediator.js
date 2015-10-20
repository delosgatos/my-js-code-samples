/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 25.12.13 12:50
 */

define([
    'abstract/view/AbstractViewMediator'
    , 'mediator/ChooseCarSelectorsViewMediator'
    , 'model/car/CarFilterModel'
    , 'helper/AppConsts'
], function (
    AbstractViewMediator
    , ChooseCarSelectorsViewMediator
    , CarFilterModel
    , AppConsts
) {

    "use strict";

    var CarMMMViewMediator = AbstractViewMediator.extend({

        carSelector: null,
        newForm: true,

        moduleEvents: {
            'UpdateMMM': 'onNeedUpdateMMM'
        },


        initialize: function (params) {
            AbstractViewMediator.prototype.initialize.apply(this, arguments);
        },

        initViews: function (){
            var $s = this.$el.find('select');
            this.carSelector = new ChooseCarSelectorsViewMediator({
                el: this.el
                ,model: new CarFilterModel()
                , fillFromHtml: this.fillFromHtml
                , newForm: this.newForm
                , ui: {
                    mark: $s.filter('[data-field=mark]')
                    , model: $s.filter('[data-field=model]')
                    , generation: $s.filter('[data-field=generation]')
                    , body: $s.filter('[data-field=body]')
                    , modification: $s.filter('[data-field=modification]')
                }
            });
            this.carSelector.model.on('change', this.onChange, this);
            this.addVentEvent(AppConsts.EVENT.CAR.GLOBAL_MMM_UPDATE, this.onGlobalNeedUpdateMMM);
        },

        doCommand: function(pack){
            if(!pack || !pack.command){
                return;
            }
            switch(pack.command) {
                case "clear":
                    if(!pack.data || !pack.data.entity){
                        // TODO: reset all;
                    }
                    this.carSelector.selectorViews[pack.data.entity].reset(true);
                    break;
            }
        },

        onGlobalNeedUpdateMMM: function(pack){
            this.doCommand(pack);
        },

        onNeedUpdateMMM: function(pack){
            this.doCommand(pack);
        },

        onChange: function(model, data){
            this.pub(AppConsts.EVENT.CAR.SELECTED, model.toJSON());
        }

    });

    return CarMMMViewMediator;
});