/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'abstract/view/AbstractItemView'
    ,'service/SocialShareService'
    //,'underscore'
    //,'helper/AppConsts'
    //,'settings'
], function (
    AbstractItemView
    ,SocialShareService
    //,_
    //,AppConsts
    //,Settings
) {

    "use strict";

    var SocialButtonsView = AbstractItemView.extend({

        events:{
            'click [data-network]':   "onShareClick"
        },

        ui: {
            question:                           '.question-text'
        },
        share: {},

        onShareClick: function(e){
            e.preventDefault();
            var id = $(e.currentTarget).data("network");
            SocialShareService.share(id, this.share);
        }


    });

    return SocialButtonsView;
});