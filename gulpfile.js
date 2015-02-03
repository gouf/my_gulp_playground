var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    notify = require('gulp-notify');

// Scripts Task
// Uglifies
gulp.task('scripts', function () {
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(livereload())
        .pipe(notify({message: 'Scripts bult.'}))
});

// Styles Task
gulp.task('styles', function () {
    sass('scss/', { style: 'compressed' })
      .on('error', function (err) { console.error('Error', err.message) })
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/css'))
      .pipe(livereload())
      .pipe(notify({message: 'Styles bult.'}))
});

// Watch Task
// Waches JS
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('webserver', function () {
    gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListening: true,
      open: true
    }));
});

gulp.task('default', ['scripts', 'styles', 'watch', 'webserver']);
