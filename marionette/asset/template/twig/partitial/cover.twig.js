define(["twig"], function (Twig) {
	var twig, templates;
twig = Twig.twig;
templates = twig({id:"/article/content/views/partial/cover.twig", allowInlineIncludes:true, data:[{"type":"raw","value":"\r\n<!-- Article Lead (b-article-lead__no-photo)-->\r\n<div class=\"b-article-lead"},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.brackets","stack":[{"type":"Twig.expression.type.string","value":"cover"}]},{"type":"Twig.expression.type.test","filter":"empty"}],"output":[{"type":"raw","value":" b-article-lead__no-photo"}]}},{"type":"raw","value":"\""},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.brackets","stack":[{"type":"Twig.expression.type.string","value":"cover"}]},{"type":"Twig.expression.type.test","filter":"empty","modifier":"not"}],"output":[{"type":"raw","value":" style=\"background-image: url("},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.brackets","stack":[{"type":"Twig.expression.type.string","value":"cover"}]},{"type":"Twig.expression.type.key.brackets","stack":[{"type":"Twig.expression.type.string","value":"cover"}]}]},{"type":"raw","value":");\""}]}},{"type":"raw","value":">\r\n    <div class=\"b-article-lead-inner\">\r\n        <h1 data-bind=\"title\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"title"}]},{"type":"raw","value":"</h1>\r\n        "},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"lid"}],"output":[{"type":"raw","value":"\r\n        <div data-bind=\"lead\" class=\"b-article-subtitle\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"lid"}]},{"type":"raw","value":"</div>\r\n        "}]}},{"type":"raw","value":"\r\n        <div class=\"b-article-meta\">\r\n            <span class=\"b-article-views\"><i class=\"fico-views\"></i> <span data-bind=\"showed\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"visibled"}]},{"type":"raw","value":"</span></span>\r\n            <time datetime=\""},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"created"},{"type":"Twig.expression.type.key.period","key":"sec"},{"type":"Twig.expression.type.filter","value":"date","match":["|date","date"],"params":[{"type":"Twig.expression.type.parameter.start","value":"(","match":["("]},{"type":"Twig.expression.type.string","value":"Y-m-d\\\\TH:i:sP"},{"type":"Twig.expression.type.parameter.end","value":")","match":[")"],"expression":false}]}]},{"type":"raw","value":"\" class=\"b-article-date\"><i class=\"fico-time\"></i> <span data-bind=\"date\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"createdDate"}]},{"type":"raw","value":"</span></time>\r\n        </div>\r\n        "},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"tags"},{"type":"Twig.expression.type.test","filter":"empty","modifier":"not"}],"output":[{"type":"raw","value":"\r\n        <ul class=\"b-article-tags\" data-bind=\"tags\" data-type=\"list\">\r\n            "},{"type":"logic","token":{"type":"Twig.logic.type.for","key_var":null,"value_var":"tag","expression":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"tags"}],"output":[{"type":"raw","value":"\r\n                <li><a href=\"#"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"tag","match":["tag"]},{"type":"Twig.expression.type.key.period","key":"id"}]},{"type":"raw","value":"\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"tag","match":["tag"]},{"type":"Twig.expression.type.key.period","key":"name"}]},{"type":"raw","value":"</a></li>\r\n            "}]}},{"type":"raw","value":"\r\n        </ul>\r\n        "}]}},{"type":"raw","value":"\r\n        "},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"commonCar"},{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"commonCar"},{"type":"Twig.expression.type.test","filter":"empty","modifier":"not"},{"type":"Twig.expression.type.operator.binary","value":"and","precidence":13,"associativity":"leftToRight","operator":"and"}],"output":[{"type":"raw","value":"\r\n            <div class=\"b-article-model\">\r\n                Статья о\r\n                <a href=\"\" data-bind-href=\"model_url\">\r\n                    "},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"commonCar"},{"type":"Twig.expression.type.key.period","key":"mark"}],"output":[{"type":"raw","value":"<span data-bind=\"mark\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"commonCar"},{"type":"Twig.expression.type.key.period","key":"mark_name"}]},{"type":"raw","value":"</span>"}]}},{"type":"raw","value":"\r\n                    "},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"commonCar"},{"type":"Twig.expression.type.key.period","key":"model"},{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"commonCar"},{"type":"Twig.expression.type.key.period","key":"model"},{"type":"Twig.expression.type.test","filter":"empty","modifier":"not"},{"type":"Twig.expression.type.operator.binary","value":"and","precidence":13,"associativity":"leftToRight","operator":"and"}],"output":[{"type":"raw","value":"<span data-bind=\"model\">"},{"type":"output","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"commonCar"},{"type":"Twig.expression.type.key.period","key":"model"},{"type":"Twig.expression.type.key.period","key":"model_name"}]},{"type":"raw","value":"</span>"}]}},{"type":"raw","value":"\r\n                </a>\r\n            </div>\r\n        "}]}},{"type":"raw","value":"\r\n\r\n        "},{"type":"logic","token":{"type":"Twig.logic.type.if","stack":[{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"tags"},{"type":"Twig.expression.type.variable","value":"item","match":["item"]},{"type":"Twig.expression.type.key.period","key":"tags"},{"type":"Twig.expression.type.key.brackets","stack":[{"type":"Twig.expression.type.string","value":"faq"}]},{"type":"Twig.expression.type.test","filter":"empty","modifier":"not"},{"type":"Twig.expression.type.operator.binary","value":"and","precidence":13,"associativity":"leftToRight","operator":"and"}],"output":[{"type":"raw","value":"\r\n            <div class=\"b-article-section\">Инструкция</div>\r\n        "}]}},{"type":"raw","value":"\r\n        <!-- Social Sharing Block -->\r\n        <div class=\"b-social-share\" data-module=\"view/social/SocialButtonsView\">\r\n            <a href=\"#\" data-network=\"fb\" class=\"b-social-share-btn b-social-share-btn__fb fico-fb\">Share <span class=\"b-social-share-count\">6</span></a>\r\n            <a href=\"#\" data-network=\"vk\" class=\"b-social-share-btn b-social-share-btn__vk fico-vk\">Поделиться <span class=\"b-social-share-count\">622</span></a>\r\n            <a href=\"#\" data-network=\"ok\" class=\"b-social-share-btn b-social-share-btn__ok fico-ok\">Класс <span class=\"b-social-share-count\">1</span></a>\r\n        </div>\r\n    </div>\r\n</div>"}], precompiled: true});

	return templates;
});