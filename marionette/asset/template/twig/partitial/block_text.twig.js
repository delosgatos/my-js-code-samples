define(["twig"], function (Twig) {
	var twig, templates;
twig = Twig.twig;
templates = twig({id:"/article/content/views/partial/block_text.twig", allowInlineIncludes:true, data:[{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.filter","value":"raw","match":["|raw","raw"]}]}], precompiled: true});

	return templates;
});