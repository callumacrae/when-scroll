# when-scroll [![Build Status](https://travis-ci.org/callumacrae/when-scroll.svg)](https://travis-ci.org/callumacrae/when-scroll)

when-scroll is a library which will fire a callback after certain scroll
patterns—such as scrolling below 1000px, or arriving at an element.

It accepts two arguments:

```
whenScroll( /* array|string */ scrollPattern, /* function */ callback);
```

The scrollPattern could be a string like one of these:

- `below 1000px`
- `above 200px` (not usually useful unless added later)
- `every 100px`

So, the following code will log "We're here!" to the console when the user
scrolls below 1000px:

```
whenScroll('below 1000px', function () {
	console.log('We\'re here!');
});
```

If you're using an `every`, you can chain them:

- `every 100px below 1000px`
- `every 200px below 500px and above 1500px`

The `and` is optional, and will just be removed.

You can also use an array and pass in an element:

- `['within 100px of', el]`
- `['every 100px below', el]`

## Installation

```
$ npm install --save when-scroll
```

## License

Released under the MIT license.
