'use strict';

var util = require('./util');
var Parser = require('./parser');

/**
 * Initiate when-scroll.
 *
 * This function calls the parser, and sets up a scroll handler to check
 * whether the parser is true on scroll. If it is, will call the callback.
 *
 * @param {Array|string} scrollPattern The array or string to parse. See readme
 *     or {@see Parser}
 * @param {function} cb The callback to call when the pattern matches
 * @param {boolean} [initialCheck] If true, will check whether it's true on
 *     page load.
 */
function whenScroll(scrollPattern, cb, initialCheck) {
	var handler = new Parser(scrollPattern);

	util.on('scroll', window, scrollHandler);

	if (initialCheck) {
		if (document.readyState === 'interactive' || document.readyState === 'complete') {
			scrollHandler();
		} else {
			util.on('DOMContentLoaded', document, scrollHandler);
		}
	}

	function scrollHandler() {
		var scrollTop = document.documentElement.scrollTop;
		if (handler.isTrue(scrollTop)) {
			cb(scrollTop);
		}
	}
}

window.whenScroll = module.exports = whenScroll;
