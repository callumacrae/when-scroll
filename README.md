# when-scroll [![Build Status](https://travis-ci.org/callumacrae/when-scroll.svg)](https://travis-ci.org/callumacrae/when-scroll)

when-scroll is a library which will fire a callback after certain scroll
patterns—such as scrolling below 1000px, or arriving at an element.

```
whenScroll(scrollPattern, callback, [ initialCheck=false ] );
```

The scrollPattern could be a string like one of these:

- `below 1000px`
- `above 200px` (not usually useful unless added later)
- `every 100px`

Or it can be a string like one of these:

- `every 100px below 100px`
- `every 200px below 400px and above 1000px` (the "and" will be removed)

Or it can be an array, containing an element:

- `['within 100px of', el]` (again, "of" will be removed)

The optional third argument (which defaults to false) will check immediately (or as soon as the page is ready)
whether the scroll pattern is true, instead of waiting for the user to scroll.
This is good for something like a lazy loading library where stuff could be on
screen initially.

## Examples

The following code will log "We're here!" to the console when the user scrolls
below 1000px:

```js
whenScroll('below 1000px', function () {
	console.log('We\'re here!');
});
```

The following will log "You've scrolled 200px" every time the user scrolls
another 200px, but only between 500px and 1000px:

```js
whenScroll('every 200px below 500px and above 1000px', function () {
	console.log('You\'ve scrolled 200px');
});
```

The following will call `lazyLoad()` when the image is 200px off the bottom
of the screen, so about to appear:

```js
var img = document.querySelector('.foo');
whenScroll(['within 100px of', img], function () {
	lazyLoad(img);
});
```

The following will execute straight away without the user having to scroll!

```js
whenScroll('above 1000px', function () {
	console.log('You haven\'t even scrolled yet');
}, true);
```

## Installation

Take the files from the dist directory, or install through npm:

```
$ npm install --save when-scroll
```

## License

Released under the MIT license.
