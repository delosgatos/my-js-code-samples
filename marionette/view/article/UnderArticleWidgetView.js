/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.03.2015 14:59
 */

define([
    'abstract/view/AbstractWidgetView'
    ,'helper/AppConsts'
    ,'underscore'
], function (
    AbstractWidgetView
    ,AppConsts
    ,_
) {

    "use strict";

    var UnderArticleWidgetView = AbstractWidgetView.extend({

        noRenderOnStart:                    true,
        modelEvents: {
            'sync':                         'onSync'
        },

        events: {

        },

        ui:{

        },

        request_data: null,


        initialize: function (params) {
console.log('UnderArticleWidgetView initialize');
            _.bindAll(this
                ,'onSelectChange'
                ,'getByForm'
            );

            this.ui.formElements = '[data-field]';
            this.$el.find('[data-field]').on('change', this.onSelectChange);

            this.lazyGetByForm = _.throttle(this.getByForm, 1000);

            var result = AbstractWidgetView.prototype.initialize.apply(this, arguments);

            if(this.request_data && this.model) {
                this.model.setExtraData(this.request_data);
            }
            //this.addVentEvent(AppConsts.EVENT.CAR.SELECTED, this.onFilterChanged);
            return result;
        },

        bindUIElements: function(){
            AbstractWidgetView.prototype.bindUIElements.apply(this, arguments);
            this.ui.container = this.$el.find('.js-list-container');
        },

        onFilterChanged: function(data){
            this.getByMMM(data);
        },

        getByMMM: function (filter) {
            //this.firstRender = true;
            if(this.model) {
                this.model.getByFilter(filter);
            }
        },

        getByForm: function(){
            var data = {};
            this.ui.formElements.each(function(){
                data[$(this).attr('name')] = $(this).val();
            });
            if(this.model) {
                this.model.getByFilter(data);
            }
        },

        lazyGetByForm: function(){

        },

        reRender: function () {
            //ArticleWidgetView.prototype.render.apply(this, arguments);
            if(!this.model){
                return;
            }
            var html = this.listTemplate.render(this.model.toJSON());
            this.ui.container.html(html);
        },

        onSelectChange: function (e) {
            var $el = $(e.currentTarget);
            var field = $el.data('field');
            var that = this;
            //debugger;
            _.delay(function(){
                //debugger;
                that.getByForm.call(that);
            }, 50);
        },

        onFilterInited: function (filter) {
            this.getByFilter(filter);
        },

        onSync: function(model, response){
            this.render();
        }

    });

    return UnderArticleWidgetView;


});