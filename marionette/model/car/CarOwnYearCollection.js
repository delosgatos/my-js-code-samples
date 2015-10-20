/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 18:46
 */

define([
    'backbone'
    ,'underscore'
], function (
    Backbone
    ,_
) {
    "use strict";

    var CarOwnYearCollection = Backbone.Collection.extend({
        initialize: function () {
            console.log("=M= CarOwnYearCollection init");
        }
        ,generateYears:function(fromYear, toYear){
            fromYear = parseInt(fromYear);
            toYear = parseInt(toYear);
            this.reset();
            if(!_.isNumber(fromYear) || _.isNaN(fromYear) || fromYear < 1
               || !_.isNumber(toYear) || _.isNaN(toYear) || toYear < 1){
                return;
            }
            for(var y = fromYear; y <= toYear; y++){
                this.add({"year": y});
            }
            this.trigger('sync', this, this.toJSON(), {});
        }
    });

    return CarOwnYearCollection;
});