/**
 * Created by d.maljavkin on 23.09.2015.
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
    var PayMobileFormView = AbstractItemView.extend({
        ui : {
            form:  'form',
            code:  '.js-code-input',
            phone: '.js-phone-input',

            error: '.js-error-label',
            cps_phone: 'input[name=cps_phone]',

            step1: '.js-data-step1',
            step2: '.js-data-step2'

        },
        events: {
            'click .js-submit-button': 'onSubmitClick',
            'click .js-back-link': 'onBackClick'
        },

        init: function(params){

        },

        onSubmitClick: function(e){
            e.preventDefault();

            var phone = this.ui.phone.val();

            if(phone.length < 13 || phone.match(/[^0-9\+\ ]/)){
                this.ui.error.addClass('e-input-wrapper__invalid');
                return;
            } else {
                this.ui.error.removeClass('e-input-wrapper__invalid');
            }
            var code = this.ui.code.text();
            this.ui.cps_phone.val(code.replace(/[^0-9\+]/ig,'') + phone.replace(/\s+/g, ''));
            this.ui.form.submit();
            this.ui.step1.addClass('hide');
            this.ui.step2.removeClass('hide');
        },
        onBackClick: function(){
            this.ui.step2.addClass('hide');
            this.ui.phone.val('');
            this.ui.step1.removeClass('hide');
        }
    });


    return PayMobileFormView;
});