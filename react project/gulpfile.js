"use strict";
var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URl in a web browser
var browserify = require('browserify'); // Bundles Js
var reactify = require('reactify'); // Transform react JSX to Js
var sorce = require('vinyl-source-stream'); // use conventional text streams with gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint'); //Lint Js files
var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    paths: {
        html: './source/*.html',
        js: './source/**/*.js',
        images: './source/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './source/main.js'
    }
}

//Start a local development server
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});
gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function(){
    gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

    //publish favicon
    gulp.src('./source/images/tavisca.jpg')
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(sorce('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
})
gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint({
            config: 'eslint.config.json'
        }))
        .pipe(lint.format());
});
gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html','images','lint', 'css', 'js', 'open', 'watch']);