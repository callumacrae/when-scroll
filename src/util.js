'use strict';

var util = module.exports = {};

util.on = function onEvent(event, element, cb) {
	if (element.addEventListener) {
		element.addEventListener(event, cb);
	} else if (element.attachEvent) {
		var newHandler = function falseEventHandler (e) {
			e.preventDefault = function () {
				e.returnValue = false;
			};

			e.stopPropagation = function () {
				e.cancelBubble = true;
			};

			cb.call(element, e);
		};

		element.attachEvent('on' + event, newHandler);
	}
};

util.each = function (arr, cb, scope) {
	for (var i = 0; i < arr.length; i++) {
		cb.call(scope, arr[i], i, arr);
	}
};

util.reduce = function (arr, cb, initial) {
	if (typeof initial === 'undefined') {
		initial = arr.splice(0, 1)[0];
	}

	// It would be silly to carry on calling it initial
	var acc = initial;

	util.each(arr, function (curr) {
		acc = cb(acc, curr);
	});

	return acc;
};
