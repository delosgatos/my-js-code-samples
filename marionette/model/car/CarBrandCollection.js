/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 30.04.13 18:45
 */
define([
    './BaseCarCollection'
    ,'settings'
], function (
    BaseCarCollection
    ,Settings
) {
    "use strict";
    return BaseCarCollection.extend({
        baseUrl: Settings.API.HOST + Settings.API.CAR.MARKS
    });
});