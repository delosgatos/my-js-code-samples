/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.08.13 12:15
 */

define([
    'abstract/view/AbstractItemView'
    ,'jquery'
    ,'underscore'
], function (
    AbstractItemView
    ,$
    ,_
) {
    "use strict";

    var AbstractWidgetView = AbstractItemView.extend({
        place: '',
        extra: {},
        constructor: function(params){
            /*if(params
                && params.hasOwnProperty("onlyDecorator")
                && !params.hasOwnProperty('noRenderOnStart')
            ){
                params.noRenderOnStart = !params.onlyDecorator;
            }*/
            AbstractItemView.prototype.constructor.apply(this, arguments);
            if(this.model){
                this.model.place = this.place;
            }
        }
    });

    return AbstractWidgetView;
});