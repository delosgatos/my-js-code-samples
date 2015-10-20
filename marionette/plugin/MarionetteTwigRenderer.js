/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 06.03.2015 14:19
 */
require([
    'marionette'
], function(
    Marionette
){
    var nativeRender = Marionette.Renderer.render;

    Marionette.Renderer.render = function(template, data) {
        if (!template) {
            throw new Marionette.Error({
                name: 'TemplateNotFoundError',
                message: 'Cannot render the template since its false, null or undefined.'
            });
        }
        if(template && _.isFunction(template.render)){
            return template.render(data);
        }
        var templateFunc = _.isFunction(template)
            ? template
            : Marionette.TemplateCache.get(template);
        return templateFunc(data);
    };
});