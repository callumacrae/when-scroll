'use strict';

var util = module.exports = {};
var fix = require('fix-ev');

/**
 * Add an event handler to an element across multiple browsers.
 *
 * @param {string} event Name of event to listen for.
 * @param {HTMLElement} element Event to listen on.
 * @param {function} cb Callback to call when event is fired on element.
 */
util.on = function onEvent(event, element, cb) {
	if (element.addEventListener) {
		element.addEventListener(event, cb);
	} else if (element.attachEvent) {
		element.attachEvent('on' + event, fix(cb));
	}
};

/**
 * Iterates through an array.
 *
 * @param {Array} arr The array to iterate over.
 * @param {function} cb Function to call every iteration.
 * @param {*} [scope] Optional scope to call the function with.
 */
util.each = function arrayEach(arr, cb, scope) {
	for (var i = 0; i < arr.length; i++) {
		cb.call(scope, arr[i], i, arr);
	}
};

/**
 * A reduce / fold function.
 *
 * @param {Array} arr The array to iterate over.
 * @param {function} cb Function to call every iteration.
 * @param {*} initial The initial value of the reduce.
 * @returns {*} The value returned by the function.
 */
util.reduce = function arrayReduce(arr, cb, initial) {
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

/**
 * Basically Array.prototype.some(). Returns true if cb is true for any member
 * of the array.
 *
 * @param {Array} arr The array to iterate over.
 * @param {function} cb Function to call every iteration.
 * @returns {boolean} True if cb(array[i]) is sometimes true.
 */
util.some = function (arr, cb) {
	for (var i = 0; i < arr.length; i++) {
		if (cb(arr[i])) {
			return true;
		}
	}

	return false;
};

/**
 * Basically Array.prototype.every(). Returns true if cb is true for ALL members
 * of the array. Complements util.some().
 *
 * @param {Array} arr The array to iterate over.
 * @param {function} cb Function to call every iteration.
 * @returns {boolean} True if cb(array[i]) is true every time.
 */
util.every = function (arr, cb) {
	for (var i = 0; i < arr.length; i++) {
		if (!cb(arr[i])) {
			return false;
		}
	}

	return true;
};

/**
 * Tests whether a thing is an Array.
 *
 * @param {*} obj Something which might be an Array.
 * @returns {boolean} True if obj is an Array.
 */
util.isArray = function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};
