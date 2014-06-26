
var cheerio = require('cheerio');
var _ = require('underscore');

module.exports = {
    book: {
        assets: "./book",
        js: [
            "test.js"
        ],
        css: [
            "test.css"
        ],
        html: {
            "html:start": function() {
                return "<!-- Start book "+this.options.title+" -->"
            },
            "html:end": function() {
                return "<!-- End of book "+this.options.title+" -->"
            },

            "head:start": "<!-- head:start -->",
            "head:end": "<!-- head:end -->",

            "body:start": "<!-- body:start -->",
            "body:end": "<!-- body:end -->"
        }
    },
    hooks: {

        // Before html generation
        "page": function(page) {
	    
	    sections = _.select(page.sections, function(section) {
		return section.type == 'normal';
	    }); // pluck all normal sections -- are they ever not normal?

	    _.forEach(sections, function(section) {
	
		var $ = cheerio.load(section.content);
		$(':header').each(function(i, elem) {
		    var header = $(elem);
		    var id = header.attr('id');
		    header.prepend('<a name="' + id + '" class="anchor" ' 
				   + 'href="#' + id + '">' 
				   + '<span class="fa fa-link"></span>'
				   + '</a>');
		});
		section.content = $.html();
	    });
	    
            return page;
        }
/*  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + '>'
    + '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '"\
>'
    + '<span class="fa fa-link"></span>'
    + '</a>'
    + text
    + '</h' + level + '>';
};*/
    }
};
