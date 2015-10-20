/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 26.04.13 17:20
 */

define([
    'jquery'
    ,'underscore'
    ,'window'
], function (
    $
    ,_
    ,window
){
    "use strict";
    var BlamperApiService = {
        api: function(url, data, successCallback, errorCallback, failCallback){
            var apiUrl = url;
            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                }
            });
            console.log("*S* Blamper API [%s] Sending: %O", url, data);
            $.ajax(url, {
                data:       data,
                dataType:   "json",
                type:       "POST"
            }).done(function ( data ) {
                if(!data || !_.isNumber(data.status) || !data.response){
                    BlamperApiService.onFail(data, apiUrl, failCallback);
                    return;
                }
                if($.inArray(parseInt(data.status), [500, 501, 502, 503, 504, 505, 506, 507, 509, 510, 511]) != -1){
                    console.log("*S* Blamper API [%s] Error: ", apiUrl, data);
                    if(errorCallback){
                        errorCallback(data.response, data.status);
                    }
                    return;
                }
                console.log("*S* Blamper API [%s] Success: %O", apiUrl, data.response);
                if(successCallback){
                    successCallback(data.response, data.status);
                }
            }).fail(function(jqXHR, textStatus) {
                if(window && window.logError){
                    window.logError("Can't connect Blamper API ["+ apiUrl +"]", 'service/BlamperApiService', 49);
                }
                BlamperApiService.onFail(jqXHR, apiUrl, failCallback || errorCallback);
            });
        },
        onFail: function(data, url, callback){
            console.log("*S* Blamper API [%s] Failed: %O", url, data);
            if(callback){
                callback(data);
            }
        }
    };
    return BlamperApiService;
});