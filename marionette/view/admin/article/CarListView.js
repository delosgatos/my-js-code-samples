/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 20.12.13 17:21
 */

define([
    'marionette'
    ,'underscore'
], function (
    Marionette
    ,_
) {

    "use strict";

    var CarListView = Marionette.ItemView.extend({
        events: {
            'click .remove-car':             'onRemoveCar'
        },
        triggers: {

        },
        ui: {
            //button:                        '.button'
        },
        list: null,

        carTemplate: '#template--linked-parameter',

        initialize: function (params) {
            this.list = [];
            this.bindUIElements();
            this.carTemplate = $(this.carTemplate).html();
        },
        add: function (car) {
            if( !car.mark || parseInt(car.mark) <=0 ){
                return;
            }
            this.list.push(car);
            var unit = _.template(this.carTemplate)({item:{ car:car, key:this.list.length-1}});
            this.$el.append(unit);
        },
        remove: function (index) {
            this.list[index] = null;
            this.$el.find("[data-id="+index+"]").remove();
        },
        getList: function(){
            return _.filter(this.list, function(x){ return !!x; });
        },
        onRemoveCar: function (e) {
            var index = $(e.currentTarget).parent().data("id");
            this.remove(index);
        }

    });

    return CarListView;
});