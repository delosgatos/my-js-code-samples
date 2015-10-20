/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 21.01.2015 20:32
 */

define([
    'jquery'
    ,'underscore'
    ,'helper/window'
], function (
    $
    ,_
    ,window
){
    "use strict";
    var ApiService = {
        api: function(url, data, successCallback, errorCallback, failCallback){
            var apiUrl = url;
            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                }
            });
            console.log("*S* API [%s] Sending: %O", url, JSON.stringify(data));
            $.ajax(url, {
                data:       data,
                dataType:   "json",
                type:       "POST"
            }).done(function ( data ) {
                if(!data || !_.isNumber(data.status) || !data.response){
                    ApiService.onFail(data, apiUrl, failCallback);
                    return;
                }
                if($.inArray(parseInt(data.status), [500, 501, 502, 503, 504, 505, 506, 507, 509, 510, 511]) != -1){
                    console.log("*S* API [%s] Error: ", apiUrl, JSON.stringify(data));
                    if(errorCallback){
                        errorCallback(data.response, data.status);
                    }
                    return;
                }
                console.log("*S* API [%s] Success: %O", apiUrl, JSON.stringify(data.response));
                if(successCallback){
                    successCallback(data.response, data.status);
                }
            }).fail(function(jqXHR, textStatus) {
                if(window && window.logError){
                    window.logError("Can't connect API ["+ apiUrl +"]", 'service/ApiService', 49);
                }
                ApiService.onFail(jqXHR, apiUrl, failCallback || errorCallback);
            });
        },
        onFail: function(data, url, callback){
            console.log("*S* API [%s] Failed: %O", url, JSON.stringify(data));
            if(callback){
                callback(data);
            }
        }
    };
    return ApiService;
});