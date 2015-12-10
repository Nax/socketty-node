'use strict';

var gulp        = require('gulp');
var browserify  = require('gulp-browserify');

gulp.task('default', ['build']);

gulp.task('build', function () {
    gulp.src('src/socketty.js')
        .pipe(browserify({
        }))
        .pipe(gulp.dest('./dist'));
});
