'use strict';

var util = require('./util');
var Truth = require('./truth');

function Parser(scrollPattern) {
	this.pattern = scrollPattern;

	// Assume a string for now
	scrollPattern = util.reduce(scrollPattern.split(' '), function (acc, word) {
		if (word !== 'and') {
			acc.push(word);
		}

		return acc;
	}, []);

	if (scrollPattern.length % 2 === 1) {
		throw new Error('when-scroll error: invalid pattern');
	}

	this._truths = [];

	for (var i = 0; i < scrollPattern.length; i += 2) {
		this._truths.push(new Truth(scrollPattern[i], scrollPattern[i + 1]));
	}

	// If any of the Truths are multiple, the entire thing should be
	this.multiple = util.reduce(this._truths, function (acc, truth) {
		return acc || truth.multiple;
	}, false);

	this.fired = false;
}

Parser.prototype.isTrue = function parserIsTrue(scrollTop) {
	if (this.fired && !this.multiple) {
		return false;
	}

	var isTrue = util.reduce(this._truths, function (acc, truth) {
		return acc && truth.isTrue(scrollTop);
	}, true);

	if (isTrue) {
		// YOU'RE FIRED
		this.fired = true;
	}

	return isTrue;
};

module.exports = Parser;
