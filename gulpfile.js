'use strict';

let gulp = require('gulp')
    , istanbul = require('gulp-istanbul')
    , mocha = require('gulp-mocha');

gulp.task('pretest', () => {
    return gulp.src(['./*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pretest'], () => {
    return gulp.src(['./test/*.test.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({
        reporters: [
            'html'
            , 'text'
        ]
    }));
});