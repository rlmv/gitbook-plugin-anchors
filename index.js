
var cheerio = require('cheerio');
var _ = require('underscore');

module.exports = {
    book: {
        assets: "./book",
        js: [
            "test.js"
        ],
        css: [
            "plugin.css"
        ],
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
