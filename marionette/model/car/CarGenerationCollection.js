/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 18:46
 */

define([
    './BaseCarCollection'
    ,'settings'
    ,'underscore'
], function (
    BaseCarCollection
    ,Settings
    ,_
) {
    "use strict";

    var CarGenerationCollection = BaseCarCollection.extend({
        modelId: 0,
        baseUrl: Settings.API.HOST + Settings.API.CAR.GENERATIONS + '?model=<%=model%>',
        getBaseUrlData: function(){
            return {
                mark:this.markId,
                model:this.modelId
            };
        },
        fetchByModelId:function(id){
            if(!id || parseInt(id) === 0){
                return;
            }
            this.modelId = id;
            this.fetch({cache:false});
        }
    });

    return CarGenerationCollection;
});