/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 03.06.13 13:56
 */

define([
    './AbstractBlamperApiModel'
    ,'../../../vendor/backbone-validation-amd'
], function(
    AbstractBlamperApiModel
){
    "use strict";


    var AbstractValidationModel = AbstractBlamperApiModel.extend({

        constructor : function(){

            AbstractBlamperApiModel.prototype.constructor.apply(this, arguments);
            if(!arguments){
                return;
            }
            var args  = Array.prototype.slice.call(arguments);
            if(args[1]){
                var params = args[1];
                if(params.validation){
                    this.validation = params.validation;
                }
                if(params.url){
                    this.url = params.url;
                }
                if(params.functions){
                    _.extend(this, params.functions);
                }
            }
        },

        toJSON: function(){
            return _.clone(this.attributes);
        },

        save: function(attr, options){
            this.unset("invalid", {silent: true});
            var res = AbstractBlamperApiModel.prototype.save.apply(this, arguments);
            return res;
        },

        handleFetchDataError: function(code, data){
            var that = this;
            setTimeout(function(){
                that.set("invalid", data && data.error ? data.error : data);
            }, 0);
        }

    });

    return AbstractValidationModel;
});