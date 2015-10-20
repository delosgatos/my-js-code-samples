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
    var PayOtherFormView = AbstractItemView.extend({

    });

    return PayOtherFormView;
});