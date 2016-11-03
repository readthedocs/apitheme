var gulp = require('gulp'),
    browserify = require('browserify'),
    debowerify = require('debowerify'),
    aliasify = require('aliasify'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    bower_resolve = require('less-plugin-bower-resolve'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    util = require('gulp-util'),
    watch = require('gulp-watch'),
    run = require('gulp-run'),
    es = require('event-stream');

/* Tasks */
gulp.task('default', ['lint', 'build']);

gulp.task('lint', function () {
    return lint_js();
});

gulp.task('build', function () {
    return es.merge([
        build_js(),
        build_css(),
        build_demo_docs()
    ]);
});

gulp.task('dev', function (done) {
    util.log('Continually building source files');

    watch(['static/css/**/*'], {awaitWriteFinish: true}, function (file) {
        util.log('File changed:', file.path);
        build_css()
            .pipe(build_demo_docs());
    });
    watch(['static/js/**/*'], {awaitWriteFinish: true}, function (file) {
        util.log('File changed:', file.path);
        build_js()
            .pipe(build_demo_docs());
    });
    watch(['apitheme/*.html'], {awaitWriteFinish: true}, function (file) {
        util.log('File changed:', file.path);
        es.readArray([file])
            .pipe(build_demo_docs());
    });
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
        transform: [
            aliasify.configure({
                aliases: {
                    waypoints: './bower_components/waypoints/lib/jquery.waypoints.js'
                }
            }),
            debowerify
        ]
    });

    return builder.bundle()
        .pipe(source('static/js/theme.js'))
        .pipe(buffer())
        .pipe(gulp.dest('apitheme/'));
}

function build_css () {
    util.log('Building CSS stylesheets');

    return es.merge(
        gulp.src('static/css/theme.less')
            .pipe(less({
                lint: true,
                plugins: [bower_resolve]
            }))
            .on('error', function (ev) {
                util.beep();
                util.log('LESS error:', ev.message);
            })
            .pipe(gulp.dest('apitheme/static/css/')),
        gulp.src('bower_components/notosans-fontface/fonts/*.{ttf,woff,woff2}')
            .pipe(gulp.dest('apitheme/static/font/'))
    )
}

function build_demo_docs (stream, done) {
    return es.wait(function (err, body) {
        util.log('Building demo docs');
        run('make html', {cwd: 'demo/', verbosity: 1})
            .exec('', function (err) {
                if (done) { done(err); }
            });
    });
}
