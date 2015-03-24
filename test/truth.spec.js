/* global fakeElement */

'use strict';

var Truth = require('../src/truth');

describe('when-scroll Truth', function () {
	it('should exist', function () {
		Truth.should.be.ok;
	});

	it('should initiate correctly', function () {
		var truth = new Truth('below', '1000px');
		truth.should.be.instanceOf(Truth);
	});

	it('should error on invalid type', function () {
		(function () {
			new Truth('unfound', '1000px');
		}).should.throw(/unfound check not found/)
	});

	it('should set multiple properly', function () {
		new Truth('below', '1000px').multiple.should.be.False;
		new Truth('every', '1000px').multiple.should.be.True;
	});

	it('should detect below correctly', function () {
		var belowTruth = new Truth('below', '1000px');

		belowTruth.isTrue(900).should.be.False;
		belowTruth.isTrue(1100).should.be.True;
	});

	it('should detect above correctly', function () {
		var aboveTruth = new Truth('above', '1000px');

		aboveTruth.isTrue(900).should.be.True;
		aboveTruth.isTrue(1100).should.be.False;
	});

	it('should handle `every` properly', function () {
		var everyTruth = new Truth('every', '200px');

		everyTruth.isTrue(100).should.be.False;
		everyTruth.isTrue(200).should.be.True;
		everyTruth.isTrue(200).should.be.False;
		everyTruth.isTrue(300).should.be.False;
		everyTruth.isTrue(400).should.be.True;
		everyTruth.isTrue(500).should.be.False;
	});

	it('should handle elements', function () {
		window.innerHeight = 1000;
		var el = fakeElement();

		var elTruth = new Truth('within', '100px', el);

		el._setTop(2000);
		elTruth.isTrue().should.be.False;

		el._setTop(1500);
		elTruth.isTrue().should.be.False;

		el._setTop(1150);
		elTruth.isTrue().should.be.False;

		el._setTop(1050);
		elTruth.isTrue().should.be.True;

		el._setTop(-100);
		elTruth.isTrue().should.be.True;
	});
});
