var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('watch', ['sass'], function() {
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
  return gulp.src('./src/styles/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('default', ['watch']);
