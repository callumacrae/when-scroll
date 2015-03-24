# when-scroll [![Build Status](https://travis-ci.org/callumacrae/when-scroll.svg)](https://travis-ci.org/callumacrae/when-scroll)

when-scroll is a library which will fire a callback after certain scroll
patterns—such as scrolling below 1000px, or arriving at an element.

It accepts two arguments:

```
whenScroll(scrollPattern, callback);
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

## Examples

The following code will log "We're here!" to the console when the user scrolls
below 1000px:

```js
whenScroll('below 1000px', function () {
	console.log('We\'re here!');
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

## Installation

Take the files from the dist directory, or install through npm:

```
$ npm install --save when-scroll
```

## License

Released under the MIT license.
