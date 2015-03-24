'use strict';

var util = require('../src/util');

// This definitely only works client-side
global.window = {};
global.document = { documentElement: { scrollTop: 0 }};
var whenScroll = require('../src/when-scroll');

describe('when-scroll main function', function () {
	var triggerScroll;

	before(function () {
		util.on = function (event, el, cb) {
			triggerScroll = function (scrollTop) {
				document.documentElement.scrollTop = scrollTop;
				cb();
			};
		};
	});

	// THIS IS A REALLY STUPID TEST
	it('should work', function (done) {
		var i = 0;

		whenScroll('every 200px below 300px', function () {
			if (++i === 2) {
				done();
			}
		});

		triggerScroll(0);
		triggerScroll(200);
		triggerScroll(400);
		triggerScroll(400);
		triggerScroll(600);
		triggerScroll(700);
	});
});