/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 20.12.13 17:21
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
    ,'underscore'
    ,'settings'
], function (
    AbstractItemView
    ,AppConsts
    ,_
    ,Settings
) {

    "use strict";

    var AdminArticleListView = AbstractItemView.extend({

        events: {
            'click .js-action-apply':            'onActionApplyClick'
            ,'change .js-head-checkbox':         'onHeadCheckboxChange'
            ,'change .js-item-checkbox':         'onItemCheckboxChange'
        },

        triggers: {},

        ui: {
            actionApply:                         '.js-action-apply'
           ,actionSelector:                      '.js-action-selector'
           ,headCheckbox:                        '.js-head-checkbox'
           ,itemCheckbox:                        '.js-item-checkbox'
           ,actionForm:                          '.js-action-form'
        },

        categoryTemplate: "",

        init: function () {

        },

        doAction: function(){
            var action = this.ui.actionSelector.val();
            var ids = [];
            var that = this;
            this.ui.itemCheckbox.filter(":checked").each(function(index){
                var $el = $(this);
                ids.push($el.val());
                var $block = $el.parents('.js-item-block');
                if(action == "hide"){
                }else if(action == "unpublish"){
                    var $s = $block.find('.js-publish-status');
                    $s.removeClass($s.data('publish-class')).addClass($s.data('unpublish-class')).html($s.data('unpublish-text'));
                    $el.removeAttr('checked');
                }else{

                }

                var input = $("<input>")
                    .attr("type", "hidden")
                    .attr("name", $el.attr('name')).val($el.val());
                that.ui.actionForm.append(input);

            });
            if(!ids.length){
               return;
            }
            if(action == "hide" && !confirm("Внимание! Вы точно хотите скрыть от индексирования выбранную статью?")){
                return;
            }
            this.ui.actionForm.submit();
            /*this.callServer(Settings.API.HOST + Settings.API.ADMIN.ARTICLE.APPLY_LIST_ACTION, {
                action: action
                ,items: ids
            });*/
        },

        onActionApplyClick: function (e) {
            e.preventDefault();
            this.doAction();
        },

        onHeadCheckboxChange: function (e) {
            var $el = $(e.currentTarget);
            if($el.is(':checked')) {
                this.ui.itemCheckbox.prop('checked', true);
            }else{
                this.ui.itemCheckbox.removeAttr('checked');
            }
        },

        onItemCheckboxChange: function (e) {
            this.ui.headCheckbox.removeAttr('checked');
        }

    });
    return AdminArticleListView;
});