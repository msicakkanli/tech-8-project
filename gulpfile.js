'use strict';

let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let saas = require('gulp-sass');
let maps = require('gulp-sourcemaps');
let image = require('gulp-image');
let del = require('del');
let imagemin = require('gulp-imagemin');
let OptiPng = require('optipng');
let serve = require('gulp-connect');



gulp.task("scripts", function () {
    gulp.src([
        'js/global.js',
        'js/circle/autogrow.js',
        'js/circle/circle.js'
    ])
        .pipe(maps.init())
        .pipe(concat("all.min.js"))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest("dist/scripts"));
});

gulp.task('styles', function () {
    gulp.src("sass/global.scss")
    .pipe(concat("all.min.css"))
    .pipe(maps.init())
    .pipe(saas())
    .pipe(maps.write('./'))
    .pipe(gulp.dest("dist/stysles"))
})

gulp.task('images', function () {
    gulp.src(['./images/*', './icons/svg/*', './icons/*'],{ base: './'})
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/content'));
});


gulp.task('serve', function() {
    serve.server({
      root: '.',
      livereload: true
    })
  });

gulp.task('clean', function() {
    del('dist');
});

gulp.task('build',['scripts','styles', 'images', 'serve']);


gulp.task("default", ["clean"], function() {
    gulp.start('build');
  });