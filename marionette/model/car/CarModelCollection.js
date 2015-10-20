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

    var CarModelCollection = BaseCarCollection.extend({
        brandId: 0,
        baseUrl: Settings.API.HOST + Settings.API.CAR.MODELS + '?mark=<%=mark%>',
        getBaseUrlData: function(){
            return {
                mark:this.brandId,
                year:this.year
            };
        },
        fetchByBrandId:function(id){
            if(!id || parseInt(id) === 0){
                return;
            }
            this.brandId = id;
            this.fetch({cache:false});
        }
    });

    return CarModelCollection;
});