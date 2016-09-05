'use strict';

var sinon = require('sinon');
var util = require('../src/util');

// This definitely only works client-side
global.window = {};
global.document = {
  documentElement: { scrollTop: 0 },
  readyState: 'loading'
};
var whenScroll = require('../src/when-scroll');

describe('when-scroll main function', function () {
	var triggerScroll;
  var triggerLoad;

	before(function () {
		util.on = function (event, el, cb) {
      switch (event) {
        case 'scroll':
          triggerScroll = function (scrollTop) {
    				document.documentElement.scrollTop = scrollTop;
    				cb();
    			};
        case 'DOMContentLoaded':
          triggerLoad = cb;
      }
		};
	});

	// THIS IS A REALLY STUPID TEST
	it('should work', function (done) {
		var i = 0;

		whenScroll('every 200px below 300px', function () {
			if (++i === 2) {
				done();
			}
		});

		triggerScroll(0);
		triggerScroll(200);
		triggerScroll(400);
		triggerScroll(400);
		triggerScroll(600);
		triggerScroll(700);
	});

  it('should only run when a scroll event occurs', function () {
    var cb = sinon.spy();
    triggerScroll(400);
    whenScroll('below 300px', cb);
    triggerScroll(400);
    cb.calledOnce.should.be.True;
  });

  it('should run once DOM is loaded if initialCheck is supplied', function () {
    var cb = sinon.spy();
    whenScroll('below 300px', cb, true);
    triggerLoad();
    cb.calledOnce.should.be.True;
  });

  it('should run immediatley if initialCheck is supplied and DOM readyState is interative', function () {
    global.document.readyState = 'interactive';
    var cb = sinon.spy();
    triggerScroll(400);
    whenScroll('below 300px', cb, true);
    cb.calledOnce.should.be.True;
  });

  it('should run immediatley if initialCheck is supplied and DOM readyState is complete', function () {
    global.document.readyState = 'complete';
    var cb = sinon.spy();
    triggerScroll(400);
    whenScroll('below 300px', cb, true);
    cb.calledOnce.should.be.True;
  });
});
