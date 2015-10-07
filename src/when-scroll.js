'use strict';

var util = require('./util');
var Parser = require('./parser');

function whenScroll(scrollPattern, cb, initialCheck) {
	var handler = new Parser(scrollPattern);

	util.on('scroll', window, scrollHandler);

	if (initialCheck) {
		util.on('DOMContentLoaded', document, scrollHandler);
	}

	function scrollHandler() {
		var scrollTop = document.documentElement.scrollTop;
		if (handler.isTrue(scrollTop)) {
			cb(scrollTop);
		}
	}
}

window.whenScroll = module.exports = whenScroll;
