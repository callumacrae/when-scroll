'use strict';

var Parser = require('../src/parser');
var Truth = require('../src/truth');

describe('when-scroll Parser', function () {
	describe('setup', function () {
		it('should exist', function () {
			Parser.should.be.ok;
		});

		it('should initiate correctly', function () {
			var parser = new Parser('below 1000px');
			parser.should.be.instanceOf(Parser);
		});

		it('should store the pattern', function () {
			new Parser('below 1000px').pattern.should.equal('below 1000px');
		});

		it('should error on invalid pattern', function () {
			(function () {
				new Parser('below 1000px extra')
			}).should.throw(/invalid pattern/);
		});

		it('should store Truths', function () {
			var parser = new Parser('every 200px below 1000px');
			parser._truths.length.should.equal(2);

			var firstTruth = parser._truths[0];
			firstTruth.should.be.instanceOf(Truth);
			firstTruth.type.should.equal('every');
			firstTruth.distance.should.equal(200);
		});

		it('should set multiple correctly', function () {
			new Parser('every 200px below 1000px').multiple.should.be.True;
			new Parser('below 1000px').multiple.should.be.False;
		});
	});

	describe('testing', function () {
		it('should work fine with one truth', function () {
			var parser = new Parser('below 1000px');

			parser.isTrue(900).should.be.False;
			parser.isTrue(1100).should.be.True;
			parser.isTrue(1100).should.be.False;
		});

		it('should only return once on non-multiple single truths', function () {
			var parser = new Parser('below 1000px');

			parser.isTrue(1000).should.be.True;
			parser.isTrue(2000).should.be.False;
		});

		it('should work with every', function () {
			var parser = new Parser('every 200px');

			parser.isTrue(100).should.be.False;
			parser.isTrue(200).should.be.True;
			parser.isTrue(200).should.be.False;
			parser.isTrue(400).should.be.True;
			parser.isTrue(500).should.be.False;
		});

		it('should work with multiple truths', function () {
			var parser = new Parser('every 200px below 300px');

			parser.isTrue(100).should.be.False;
			parser.isTrue(200).should.be.False;
			parser.isTrue(200).should.be.False;
			parser.isTrue(400).should.be.True;
			parser.isTrue(500).should.be.False;
			parser.isTrue(600).should.be.True;
		});

		it('should work with "and"', function () {
			var parser = new Parser('every 200px below 300px and above 550px');

			parser.isTrue(100).should.be.False;
			parser.isTrue(200).should.be.False;
			parser.isTrue(200).should.be.False;
			parser.isTrue(400).should.be.True;
			parser.isTrue(500).should.be.False;
			parser.isTrue(600).should.be.False;
		});
	});
});
