/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 21.04.2014 12:04
 */

define([
    'marionette'
   ,'./ActionPublisher'
], function (
    Marionette
   ,ActionPublisher
) {

    "use strict";

    var ActionController = {
        onAction: function (action, value) {
            ActionPublisher.trigger(action, value);
        }
    };

    var ActionRouter = Marionette.AppRouter.extend({
        controller: ActionController,
        appRoutes: {
            "action/:action/:value": "onAction"
        }
    });
    return ActionRouter;
});