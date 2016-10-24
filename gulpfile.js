var gulp = require('gulp'),
    browserify = require('browserify'),
    debowerify = require('debowerify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    less = require('gulp-less'),
    bower_resolve = require('less-plugin-bower-resolve'),
    util = require('gulp-util'),
    jshint = require('gulp-jshint'),
    es = require('event-stream');

/* Tasks */
gulp.task('default', ['lint', 'build']);

gulp.task('lint', function () {
    return lint_js();
});

gulp.task('build', function () {
    return es.merge([
        build_js(),
        build_css()
    ]);
});

/* Task functions */
function lint_js () {
    return gulp.src('static/js/theme.js')
        .pipe(jshint({browserify: true, browser: true, devel: true}))
        .pipe(jshint.reporter('default'))
}

function build_js () {
    util.log('Building JavaScript files');

    var builder = browserify({
        entries: ['static/js/theme.js'],
        debug: true,
        transform: [debowerify]
    });

    return builder.bundle()
        .pipe(source('static/js/theme.js'))
        .pipe(buffer())
        .pipe(gulp.dest('apitheme/'));
}

function build_css () {
    util.log('Building CSS stylesheets');

    return gulp.src('static/css/theme.less')
        .pipe(less({
            lint: true,
            plugins: [bower_resolve]
        }))
        .on('error', function (ev) {
            util.beep();
            util.log('LESS error:', ev.message);
        })
        .pipe(gulp.dest('apitheme/static/css/'));
}
