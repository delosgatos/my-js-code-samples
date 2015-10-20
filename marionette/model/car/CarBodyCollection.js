/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 18:46
 */

define([
    'backbone'
    ,'abstract/model/AbstractBlamperApiCollection'
    ,'underscore'
], function (
    Backbone
    ,AbstractBlamperApiCollection
    ,_
) {
    "use strict";

    var BodyModel = Backbone.Model.extend({
        idAttribute: "slug",
        initialize: function () {
            //console.log("=M= CarYearModel init");
        }
    });
    var CarBodyCollection = AbstractBlamperApiCollection.extend({
        model: BodyModel,
        initialize: function () {
        }
    });

    return CarBodyCollection;
});