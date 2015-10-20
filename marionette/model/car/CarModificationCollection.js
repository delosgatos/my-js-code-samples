/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 18:45
 */

define([
    'backbone'
    ,'./BaseCarCollection'
    ,'settings'
    ,'underscore'
    ,'data.utils'
], function (
    Backbone
    ,BaseCarCollection
    ,Settings
    ,_
) {
    "use strict";

    var TYPE_BASE = "base",
        TYPE_LIST = "list"
    ;

    var CarModificationModel = Backbone.Model.extend({
        idAttribute: 'modification_id'
    });
    var CarModificationCollection = BaseCarCollection.extend({
        model: CarModificationModel,
        generationId: 0,
        baseUrl: Settings.API.HOST + Settings.API.CAR.MODIFICATIONS + '?generation=<%=generation%>',
        getBaseUrlData: function(){
            return {
                generation:this.generationId
            };
        },
        fetchByGenerationId:function(id){
            if(!id || parseInt(id) === 0){
                return;
            }
            this.generationId = id;
            this.fetch({cache:false});
        }
    });

    return CarModificationCollection;

});