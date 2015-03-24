'use strict';

var util = require('./util');
var Truth = require('./truth');

function Parser(scrollPattern) {
	this.pattern = scrollPattern;

	scrollPattern = patternToArray(scrollPattern);

	if (!patternOkay(scrollPattern)) {
		throw new Error('when-scroll error: invalid pattern');
	}

	this._truths = [];

	for (var i = 0; i < scrollPattern.length; i += 2) {
		var el = scrollPattern[i + 2];
		if (!el || el.nodeType !== Node.ELEMENT_NODE) {
			el = undefined;
		}

		this._truths.push(new Truth(scrollPattern[i], scrollPattern[i + 1], el));

		if (el) {
			i++;
		}
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

function patternOkay(scrollPattern) {
	if (scrollPattern.length % 2 === 0) {
		return true;
	}

	return (scrollPattern[0] === 'within' && scrollPattern.length === 3);
}
