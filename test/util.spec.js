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
});
