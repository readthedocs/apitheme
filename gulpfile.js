var gulp = require('gulp'),
    browserify = require('browserify'),
    debowerify = require('debowerify'),
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
        build_css()
    ]);
});

gulp.task('dev', function (done) {
    util.log('Continually building source files');

    demo_doc_stream = build_demo_docs();

    watch(['static/css/*'], {awaitWriteFinish: true}, function (file) {
        util.log('File changed:', file.path);
        build_css()
            .pipe(demo_doc_stream);
    });
    watch(['static/js/*'], {awaitWriteFinish: true}, function (file) {
        util.log('File changed:', file.path);
        build_js()
            .pipe(demo_doc_stream);
    });
    watch(['apitheme/*.html'], {awaitWriteFinish: true}, function (file) {
        util.log('File changed:', file.path);
        es.readArray([file])
            .pipe(demo_doc_stream);
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

function build_demo_docs (stream, done) {
    return es.wait(function (err, body) {
        util.log('Building demo docs');
        run('make html', {cwd: 'demo/', verbosity: 1})
            .exec('', function (err) {
                if (done) { done(err); }
            });
    });
}
