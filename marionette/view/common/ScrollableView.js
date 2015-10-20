/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 13.04.2015 18:00
 */

define([
    'abstract/view/AbstractItemView'
    ,'helper/AppConsts'
], function (
    AbstractItemView
    ,AppConsts
) {

    "use strict";

    var ScrollableView = AbstractItemView.extend({

        events: {
            //'click':                        'onClick'
        },

        triggers: {},

        ui: {
            //button:                        '.button'
        },

        init: function () {
            var $el = this.$el;
            if(!this.$el.parents('body').length){
                return;
            }
            this.fixedClass = $el.data('fixed-class');
            this.bottomClass = $el.data('bottom-class');
            this.fixedArea = $el.data('area-selector');
            this.initOffset = $el.offset();
console.log('SCROLLABLE init: fixedArea: ', this.fixedArea);
            if(this.fixedArea) {
                this.$area = $el.parents(this.fixedArea);
                if (this.$area.length) {
                    this.$area.css({position:'relative'});
                }else{
                    this.fixedArea = null;
                }

                this.elH = $el.outerHeight();
                $el.addClass(this.fixedClass);
                this.elFixTop = parseInt($el.css('top')) || 0;
                $el.removeClass(this.fixedClass);
                setTimeout(function(){
                    this.initOffset = $el.offset();
                }.bind(this), 3000);
console.log('SCROLLABLE ', this.fixedArea, ' fixedTop: ', this.elFixTop);
            }
            require('App').vent.on(AppConsts.EVENT.SYSTEM.SCROLL, this.onScroll, this);
        },

        update: function(){
            this.initOffset = this.$el.offset();
console.log('SCROLLABLE: update: initOffset ', this.initOffset.top);
        },

        onScroll: function(scroll) {
console.log('SCROLLABLE onScroll: fixedArea: ', this.fixedArea, " check: ", scroll.y, " > ", this.initOffset.top);            if (scroll.y > this.initOffset.top) {
                if (this.fixedArea) {
                    var h = this.$area.height();
                    var maxY = h + this.$area.offset().top;
                    this.elH = this.$el.outerHeight();
console.log("SCROLLABLE: ", this.fixedArea, " maxY: ", h + " + " + this.$area.offset().top, " yBot: ", this.elH + " + ( " + this.elFixTop + " )  + " + scroll.y)
                    var yBot = this.elH + this.elFixTop + scroll.y;
                    if (this.initOffset.top + this.elH > maxY) {
                        return;
                    }
                    if (yBot && yBot > maxY) {
                        this.setStatic(true);
                    } else {
                        this.setScrollable();
                    }
                } else {
                    this.setScrollable();
                }
            } else {
                this.setStatic();
            }
        },

        setScrollable: function(){
console.log("SCROLLABLE: setScrollable ");
            this.$el.removeClass(this.bottomClass);
            this.$el.addClass(this.fixedClass);
            this.$el.trigger('IsScrollable', true);
        },

        setStatic: function(bottomStick){
console.log("SCROLLABLE: setStatic ", bottomStick);
            if(bottomStick) {
                this.$el.addClass(this.bottomClass);
            }else{
                this.$el.removeClass(this.bottomClass);
            }
            this.$el.removeClass(this.fixedClass);
            this.$el.trigger('IsScrollable', false);
        },


        destroy: function(){
console.log('SCROLLABLE ', this.fixedArea, ': destroy');
            this.$el.data('instance', null);
            require('App').vent.off(AppConsts.EVENT.SYSTEM.SCROLL, this.onScroll);
            return AbstractItemView.prototype.destroy.apply(this, arguments);
        }

    });

    return ScrollableView;


});