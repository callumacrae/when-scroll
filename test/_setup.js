'use strict';

global.window = { location: {} };

global.fakeElement = function () {
	var el = {};
	var top = 2000;

	el.nodeType = 1;
	el.getBoundingClientRect = function () {
		return { top: top };
	};

	el._setTop = function (newTop) {
		top = newTop;
	};

	return el;
};
