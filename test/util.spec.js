'use strict';

var util = require('../src/util');

describe('utility functions', function () {
	it('should loop stuff', function (done) {
		var scope = {};
		var i = 0;

		util.each([1, 2, 3], function (num, index, arr) {
			this.should.equal(scope);
			num.should.equal(index + 1);
			arr.should.containEql(num);

			if (++i === 3) {
				done();
			}
		}, scope);
	});

	it('should reduce stuff', function () {
		var i = 0;
		var total = util.reduce([1, 2, 3], function (acc, num) {
			++i;
			return acc + num;
		});

		i.should.equal(2);
		total.should.equal(6);
	});

	it('should reduce stuff with an initial argument', function () {
		var i = 0;
		var total = util.reduce([1, 2, 3], function (acc, num) {
			++i;
			return acc + num;
		}, -2);

		i.should.equal(3);
		total.should.equal(4);
	});

	it('should have a .some() function', function () {
		function moreThanFive(i) {
			return i > 5;
		}

		util.some([], moreThanFive).should.be.False;
		util.some([1, 4, 'test'], moreThanFive).should.be.False;
		util.some([1, 4, 7], moreThanFive).should.be.True;
		util.some([1, 6, 7], moreThanFive).should.be.True;
	});

	it('should have an .every() function', function () {
		function moreThanFive(i) {
			return i > 5;
		}

		util.every([], moreThanFive).should.be.True;
		util.every([1, 4, 'test'], moreThanFive).should.be.False;
		util.every([1, 4, 7], moreThanFive).should.be.False;
		util.every([6, 7, 9], moreThanFive).should.be.True;
	});

	it('should detect arrays', function () {
		util.isArray({}).should.be.False;
		util.isArray(2).should.be.False;
		util.isArray('test').should.be.False;
		util.isArray(arguments).should.be.False;
		util.isArray([1, 2, 3]).should.be.True;
		util.isArray([]).should.be.True;
	});
});
