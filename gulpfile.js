var gulp = require('gulp');


// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var bower = require('main-bower-files');

/* YOU MAY EDIT FROM HERE ON OUT */

var jsSrc = ['./src/js/*.js'];
var cssSrc = ['./src/sass/*.scss','./src/sass/**/*.scss'];

// Tasks that compile our project CSS and templates

// Lint Task
gulp.task('lint', function() {
    return gulp.src(jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Libs
gulp.task('libs', function() {
  return gulp.src(bower())
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/libs'));
});

// Postprocess our CSS
gulp.task('autoprefixer', ['sass'], function() {
    return gulp.src('./dist/css/default.css')
        .pipe(autoprefixer('last 4 versions'))
        .pipe(gulp.dest('./dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(jsSrc)
        .pipe(concat('default.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('default.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// Connect
gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

// Compile sass
gulp.task('sass', function() {
    return gulp.src(cssSrc)
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

// Move gfx
gulp.task('gfx', function() {
    return gulp.src(['./src/gfx/*','./src/gfx/**/*'])
        .pipe(gulp.dest('./dist/css/gfx'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(jsSrc, ['lint', 'scripts']);
    gulp.watch(cssSrc, ['autoprefixer','gfx']);
});

// Default Task
gulp.task('default', ['libs','autoprefixer', 'gfx', 'scripts', 'connect', 'watch']);
