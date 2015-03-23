'use strict';

var util = require('./util');
var Parser = require('./parser');

function whenScroll(scrollPattern, cb) {
	var handler = new Parser(scrollPattern);

	util.on('scroll', document, function scrollHandler() {
		var scrollTop = window.scrollY;
		if (handler.isTrue(scrollTop)) {
			cb(scrollTop);
		}
	});
}

window.whenScroll = module.exports = whenScroll;
