'use strict';

var gulp = require('gulp');
var loadLmnTask = require('lmn-gulp-tasks');

gulp.task('js', loadLmnTask('browserify', {
	src: 'src/when-scroll.js',
	dest: 'dist/when-scroll.min.js',
	minify: true
}));

gulp.task('default', ['js'], function () {
	gulp.watch(['src/**/*.js'], ['js']);
});
