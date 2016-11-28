'use strict';

var util = require('./util');
var Truth = require('./truth');

// Polyfill for Node.ELEMENT_NODE
var ELEMENT_NODE = typeof window !== 'undefined' && window.Node ? Node.ELEMENT_NODE : 1;

/**
 * The parser that powers when-scroll. Takes a string or array containing a
 * a string and element, and exposes a method which can be called to see
 * whether the pattern is true yet.
 *
 * @param {Array|string} scrollPattern The array or string to parse. Could be
 *     something like "below 1000px" or could be something more complicated.
 *     Could also have something like an element in, for examples like
 *     ["within 100px of", el].
 * @constructor
 */
function Parser(scrollPattern) {
	this.pattern = scrollPattern;

	scrollPattern = patternToArray(scrollPattern);

	if (!patternOkay(scrollPattern)) {
		throw new Error('when-scroll error: invalid pattern');
	}

	this._truths = [];

	// This splits the scroll pattern into multiple "truths", so "every 100px
	// below 200px" will turn into two truths, one "every 100px" and the other
	// "below 200px".
	for (var i = 0; i < scrollPattern.length; i += 2) {
		var el = scrollPattern[i + 2];
		if (!el || el.nodeType !== ELEMENT_NODE) {
			el = undefined;
		}

		this._truths.push(new Truth(scrollPattern[i], scrollPattern[i + 1], el));

		if (el) {
			i++;
		}
	}

	// If any of the Truths are multiple, the entire thing should be
	// The multiple property means the callback can be called multiple times
	this.multiple = util.some(this._truths, function (truth) {
		return truth.multiple;
	});

	this.fired = false;
}

/**
 * Returns whether the scroll pattern is now true. Call this for example on
 * scroll.
 *
 * @param {number} scrollTop window.scrollY, probably.
 * @returns {boolean} True if scroll pattern is true.
 */
Parser.prototype.isTrue = function parserIsTrue(scrollTop) {
	if (this.fired && !this.multiple) {
		return false;
	}

	var isTrue = util.every(this._truths, function (truth) {
		return truth.isTrue(scrollTop);
	});

	if (isTrue) {
		// YOU'RE FIRED
		this.fired = true;
	}

	return isTrue;
};

module.exports = Parser;

/**
 * Turns the scroll pattern into an array. Basically removes words like "and"
 * and "of" and turns the entire thing into a flat array of single words and
 * elements.
 *
 * @param {Array|string} scrollPattern The scroll pattern to process.
 * @returns {Array} Processed scroll pattern. Like ["below", "1000px"].
 */
function patternToArray(scrollPattern) {
	if (util.isArray(scrollPattern)) {
		return util.reduce(scrollPattern, function (acc, item) {
			if (typeof item === 'string') {
				return acc.concat(patternToArray(item));
			}

			acc.push(item);
			return acc;
		}, []);
	}

	return util.reduce(scrollPattern.split(' '), function (acc, word) {
		if (word !== 'and' && word !== 'of') {
			acc.push(word);
		}

		return acc;
	}, []);
}

/**
 * Tests whether a scroll pattern is valid.
 *
 * @param {Array} scrollPattern The scroll pattern after patternToArray work
 * @returns {boolean} True if valid. False if not.
 */
function patternOkay(scrollPattern) {
	if (scrollPattern.length % 2 === 0) {
		return true;
	}

	return (scrollPattern[0] === 'within' && scrollPattern.length === 3);
}
