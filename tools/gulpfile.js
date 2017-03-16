var gulp = require('gulp');
var concat = require('../demo/demo/node/gulp/gulp-requirejs-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
    gulp.src([
        'src/**/*.js',
        'deps/zepto.js'
    ])
    .pipe(concat({
        baseUrl: 'src/',
        paths: {
            zepto: 'deps/zepto',
            Class: 'base/Class'
        },
        shim: {
            zepto: {
                exports: 'Zepto'
            }
        },
        outFile: 'test.js',
        copyFile: true
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
