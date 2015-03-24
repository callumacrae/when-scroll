'use strict';

global.Node = {
	ELEMENT_NODE: 1
};

global.fakeElement = function () {
	var el = {};
	var top = 2000;

	el.nodeType = Node.ELEMENT_NODE;
	el.getBoundingClientRect = function () {
		return { top: top };
	};

	el._setTop = function (newTop) {
		top = newTop;
	};

	return el;
};
