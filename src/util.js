'use strict';

var util = module.exports = {};
var fix = require('fix-ev');

util.on = function onEvent(event, element, cb) {
	if (element.addEventListener) {
		element.addEventListener(event, cb);
	} else if (element.attachEvent) {
		element.attachEvent('on' + event, fix(cb));
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
