/**
 * Created by d.maljavkin on 24.09.2015.
 */
define([
    'underscore'
    ,'abstract/model/AbstractValidationModel'
    ,'abstract/view/AbstractItemView'
    ,'settings'
    ,'helper/AppConsts'
    ,'helper/Analytics'
    ,'jquery.autocomplete'
    ,'utils'
    ,'data.utils'
], function(
    _
    ,AbstractValidationModel
    ,AbstractItemView
){
    var PayYadFormView = AbstractItemView.extend({
        ui : {
            form:  'form'
        },
        events: {
            'click .js-submit-button': 'onSubmitClick',
            'click .js-back-link': 'onBackClick'
        },

        init: function(params){

        },

        onSubmitClick: function(e){
            e.preventDefault();

            this.ui.form.submit();
        },
        onBackClick: function(){
            this.ui.step2.addClass('hide');
            this.ui.phone.val('');
            this.ui.step1.removeClass('hide');
        }
    });

    return PayYadFormView;
});