'use strict';

function Truth(type, distance) {
	this.type = type;
	this.distance = parseScrollDistance(distance);

	this._check = checks[this.type];

	if (typeof this._check !== 'function') {
		throw new Error(this.type + ' check not found');
	}

	this.multiple = this._check.multiple || false;
}

Truth.prototype.isTrue = function truthIsTrue(scrollTop) {
	return this._check(this.distance, scrollTop);
};

module.exports = Truth;

var checks = {};

checks.below = function belowCheck(distance, scrollTop) {
	return distance <= scrollTop;
};

checks.above = function aboveCheck(distance, scrollTop) {
	return distance >= scrollTop;
};

checks.every = function everyCheck(distance, scrollTop) {
	if (!this._lastFiredAt) {
		this._lastFiredAt = 0;
	}

	if (Math.abs(this._lastFiredAt - scrollTop) >= distance) {
		this._lastFiredAt = scrollTop;
		return true;
	} else {
		return false;
	}
};
checks.every.multiple = true;

/**
 * Converts a string into a number of pixels. Currently only supports pixels.
 *
 * @todo: Support more than pixels!
 *
 * @param {string} distance The distance down the page in pixels.
 * @returns {Number} The distance down the page in pixels.
 */
function parseScrollDistance(distance) {
	return parseInt(distance);
}
