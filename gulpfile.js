var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    addsrc = require('gulp-add-src'),
    rjs = require('gulp-requirejs');

var configRequirejs = {
    name: 'init',
    baseUrl: 'js',
    out: 'app.js',

    urlArgs: "bust=" + (new Date()).getTime(),

    paths: {
        "assets": "assets",
        "utils": "utils",
        "models": "models",
        "collections": "collections",
        "views": "views",

        "jquery": "assets/jquery-2.2.4.min",
        "underscore": "assets/underscore",
        "dateFormat": "assets/jquery-dateFormat.min",
        "backboneLocalStorage": "assets/backbone.localStorage",
        "backbone": "assets/backbone",
        "text": "assets/text"
    },
    shim: {
        'dateFormat': ['jquery'],
        'backbone': ['underscore', 'jquery'],
        'backboneLocalStorage': {
            deps: ['backbone'],
            exports: 'Backbone.LocalStorage'
        },
        'jquery-ui': {
            deps: ['jquery'],
            exports: 'jquery-ui'
        }
    }
};

gulp.task('css', function() {

    return sass('css/scss/main.scss', { style: 'expanded' })
        .pipe(addsrc('css/assets/*.css'))
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('imagesAssets', function () {
    return gulp.src(['css/assets/**/*.png', 'css/assets/**/*.jpg'])
        .pipe(gulp.dest('public/css'))
});

gulp.task('styles', function () {
    gulp.start('css', 'imagesAssets');
});

gulp.task('requirejs', function () {
    return gulp.src(['js/assets/require.js'])
        .pipe(gulp.dest('public/js'));
});

gulp.task('appjs', function () {
    return rjs(configRequirejs)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('scripts', function () {
    gulp.start('requirejs', 'appjs');
});

gulp.task('default', function () {
    gulp.start('scripts', 'styles');
});
