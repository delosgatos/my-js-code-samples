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


    var CarYearCollection = BaseCarCollection.extend({
        modelId: 0,
        markId: 0,
        baseUrl: Settings.api.blamper.car.yearListUrl + '?model_id=<%=model%>',
        setMarkId: function(mark){this.markId = mark;},
        fetchByModelId:function(id){
            if(!id || parseInt(id) === 0){
                return;
            }
            this.modelId = id;
            this.fetch({cache:false});
        },
        getBaseUrlData: function(){
            return {
                model:this.modelId,
                mark:this.markId
            };
        },
        mapServerData: function(data) {
            var years = data.production_year ? data.production_year : data;
            return years;
        }
    });

    return CarYearCollection;
});