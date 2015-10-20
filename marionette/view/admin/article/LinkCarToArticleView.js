/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 21.04.2015 20:09
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'./CarListView'
], function (
    AbstractItemView
    , AppConsts
    , CarListView
) {

    "use strict";

    var LinkCarToArticleView = AbstractItemView.extend({

        events: {
            'click .js-modification-list a':                'onRemoveModification'
            ,'click .js-add-modification':                  'onAddModification'
            ,'click .js-add-binding':                       'onAddBinding'
            ,'click .js-remove-binding':                    'onRemoveBinding'
        },

        triggers: {},

        ui: {
            list:                        '.js-modification-list'
            ,bindingList:                '.js-binding-list'
            ,bindings:                   '.js-binding-container'
            ,mark:                       '[data-field=mark]'
            ,model:                      '[data-field=model]'
            ,generation:                 '[data-field=generation]'
            ,modification:               '[data-field=modification]'
        },

        modificationTemplate:            '#template--modification-tag',

        init: function () {
            this.modificationTemplate = $(this.modificationTemplate).html();
            this.addVentEvent(AppConsts.EVENT.CAR.SELECTED, this.onCarSelected);
            this.carList = new CarListView({el:this.ui.bindingList.get(0)});
        },

        onCarSelected: function (data) {
            this.clearModificationList();
            if(!data || !data.mark){
                return;
            }
            if(!data.modification){

                return;
            }
            if(data.modification == -1){
                this.addAllModifications();
                return;
            }
            this.addCurrentModification();
        },

        addCar: function(car){
            this.ui.bindings.removeClass("hide");
            this.carList.add(car);
        },

        clearModificationList: function(){
            this.ui.list.html("");
        },

        addModification: function(data){
            var html = _.template(this.modificationTemplate)(data);
            this.ui.list.append(html);
        },

        getCurrentMMM: function(){
            var filter = {
                mark:parseInt(this.ui.mark.val())
                ,model:parseInt(this.ui.model.val())
                ,generation:parseInt(this.ui.generation.val())
                ,modification:parseInt(this.ui.modification.val())
                ,mark_name:this.ui.mark.find(":selected").text()
                ,model_name:this.ui.model.find(":selected").text()
                ,generation_name:this.ui.generation.find(":selected").text()
                ,modification_name:this.ui.modification.find(":selected").text()
            };
            return filter;
        },

        addCurrentModification: function(){
            this.addModification(this.getCurrentMMM());
        },

        addAllModifications: function(){
            var that = this;
            var filter = this.getCurrentMMM();
            this.ui.modification.find("option").not('[value=0]').not('[value=-1]').each(function(){
                var id = parseInt($(this).val());
                var name = $(this).text();
                if(!parseInt(id)){
                    return;
                }
                filter = _.extend(filter, {modification: id, modification_name:name});
                that.addModification(filter);
            });
        },

        onAddModification: function (e) {
            var $el = $(e.currentTarget);
            $el.parent().remove();
        },

        onAddBinding: function (e) {
            var that = this;
            var $mods = this.ui.list.find('.js-modification-unit');
            var filter = this.getCurrentMMM();
            if($mods.length) {
                $mods.each(function () {
                    var id = parseInt($(this).data('id'));
                    var name = $(this).text();
                    filter = _.extend(filter, {modification: id, modification_name:name});
                    that.addCar(filter);
                });
                return;
            }
            that.addCar(filter);
        },

        onRemoveModification: function (e) {
            e.preventDefault();
            var $el = $(e.currentTarget);
            $el.parent().remove();
        },

        onRemoveBinding: function (e) {
            e.preventDefault();
            var $el = $(e.currentTarget);
            $el.parent().remove();
        }

    });

    return LinkCarToArticleView;


});