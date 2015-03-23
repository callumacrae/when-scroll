'use strict';

var gulp = require('gulp');
var loadLmnTask = require('lmn-gulp-tasks');

gulp.task('js', loadLmnTask('browserify', {
	src: 'src/when-scroll.js',
	dest: 'dist/when-scroll.min.js'
}));

gulp.task('default', ['js'], function () {
	gulp.watch(['index.js', 'src/**/*.js'], ['js']);
});
