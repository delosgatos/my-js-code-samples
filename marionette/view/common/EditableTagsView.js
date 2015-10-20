/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 03.03.2015 12:46
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
], function (
    AbstractItemView
    ,AppConsts
) {

    "use strict";

    var EditableTagsView = AbstractItemView.extend({

        events:{
            'mousedown .js-tag':            'onTagMouseDown'
            ,'mousemove .js-tag':           'onTagMouseMove'
            ,'mouseup .js-tag':             'onTagMouseUp'
            ,'click .js-tag':               'onTagClick'
            ,'click .js-tag-edit':          'onTagEditClick'
            ,'change .js-tag select':               'onTagSelectChanged'
            ,'click .js-tag select':               'onTagSelectClick'
        },

        ui:{
            tags:                      '.js-tag'
        },

        tagDropdownState: false,

        $activeTag: null,

        init: function () {
            this.addVentEvent(AppConsts.EVENT.SYSTEM.CLICK, this.onGlobalClick);
        },

        showValue: function(el, data){
            if(el) {
                this.$activeTag = $(el);
            }
            var $val = $('.js-tag-value',this.$activeTag);
            var $select = $('.js-tag-selector',this.$activeTag);
            $val.removeClass('hide');
            $select.addClass('hide');
            if(data){
                $('.js-tag-link', this.$activeTag)
                    .text(data.text)
                ;
                this.$activeTag.data(data);
                this.$activeTag.trigger('TagChanged', data);
            }
            this.$activeTag = null;
        },

        showTagDropdown: function(el){
            this.$activeTag = $(el);

            var $val = $('.js-tag-value',this.$activeTag);
            var $select = $('.js-tag-selector',this.$activeTag);

            $val.addClass('hide');
            $select.removeClass('hide');

            /*this.tagDropdownState = !this.tagDropdownState;
            $select.prop("size", this.tagDropdownState ? $("option",$select).length : 1);*/

        },

        onGlobalClick: function(){
            if(!this.$activeTag || !this.$activeTag.length){
                return;
            }
            this.showValue();
        },

        onTagMouseDown: function(e){
            console.log("mouse down")
            this.tagInitMouseY = e.pageY;
        },

        onTagMouseMove: function(e){
            this.tagMouseDeltaY = e.pageY - this.tagInitMouseY;
        },

        onTagMouseUp: function(e){
            this.tagMouseDeltaY = e.pageY - this.tagInitMouseY;
            console.log("mouse up")
        },

        onTagClick: function(e){
            console.log(e.target);
            var $target = $(e.target);
            e.preventDefault();
            if(this.tagMouseDeltaY > 4){
                this.showTagDropdown(e.currentTarget);
                this.tagInitMouseY = undefined;
                this.tagMouseDeltaY = 0;
                return;
            }
            this.tagInitMouseY = undefined;
            this.tagMouseDeltaY = 0;
            console.log("JUST CLICK");
        },

        onTagEditClick: function(e){
            console.log("edit click")
            e.preventDefault();
            e.stopPropagation();
            this.showTagDropdown($(e.currentTarget).parents('.js-tag'));
        },

        onTagSelectClick: function(e){
            //e.preventDefault();
            e.stopPropagation();
        },

        onTagSelectChanged: function(e){
            console.log("select changed");
            var $sel = $(e.currentTarget);
            var $val = $sel.find('option:selected');
            var $el = $sel.parents('.js-tag');
            this.showValue($el, {type:$el.data('type'), text:$val.text(), link:$val.data('link'), id:$sel.val()});
        }

    });
    return EditableTagsView;
});