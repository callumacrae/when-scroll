'use strict';

// Polyfill for Node.ELEMENT_NODE
var ELEMENT_NODE = typeof window !== 'undefined' && window.Node ? Node.ELEMENT_NODE : 1;

/**
 * Handles a part of a scroll pattern. Similar to the parser, but handles only
 * part of the pattern, and contains the actual logic for whether it is true.
 *
 * @param {string} type Type of check: "below", "above", "within" or "every".
 * @param {string|number} distance An amount of pixels.
 * @param {HTMLElement} [el] An optional element for if the check needs one.
 * @constructor
 */
function Truth(type, distance, el) {
	this.type = type;
	this.distance = parseScrollDistance(distance);

	if (el && el.nodeType === ELEMENT_NODE) {
		this.el = el;
	}

	this._check = checks[this.type];

	if (typeof this._check !== 'function') {
		throw new Error(this.type + ' check not found');
	}

	// The multiple property means the callback can be called multiple times
	this.multiple = this._check.multiple || false;
}

/**
 * Called by parser.isTrue(), executes the relevant check and returns whether
 * the Truth is true.
 *
 * @param {number} scrollTop window.scrollY, I guess.
 * @returns {boolean} True if true.
 */
Truth.prototype.isTrue = function truthIsTrue(scrollTop) {
	return this._check(scrollTop);
};

module.exports = Truth;

// These checks are called by .isTrue().
var checks = Truth.checks = {};

// "below 1000px"
checks.below = function belowCheck(scrollTop) {
	return this.distance <= scrollTop;
};

// "above 1000px"
checks.above = function aboveCheck(scrollTop) {
	return this.distance >= scrollTop;
};

// ["within 100px of", element]
checks.within = function withinCheck() {
	var viewportOffset = this.el.getBoundingClientRect().top;
	var windowHeight = window.innerHeight || document.documentElement.clientHeight;
	return viewportOffset - windowHeight < this.distance;
};

// "every 200px"
checks.every = function everyCheck(scrollTop) {
	if (!this._lastFiredAt) {
		this._lastFiredAt = 0;
	}

	var needsFiring = Math.abs(this._lastFiredAt - scrollTop) >= this.distance;
	if (needsFiring) {
		this._lastFiredAt = scrollTop;
		return true;
	}

	return false;
};
checks.every.multiple = true;

/**
 * Converts a string into a number of pixels. Currently only supports pixels.
 *
 * @todo: Support more than pixels!
 *
 * @param {string} distance The distance down the page in pixels.
 * @returns {number} The distance down the page in pixels.
 */
function parseScrollDistance(distance) {
	return parseInt(distance);
}
