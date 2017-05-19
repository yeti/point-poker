var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();

gulp.task('watch-sass', ['sass'], function() {
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('browser-sync', () => {
    bs.init({
        proxy: 'localhost:3000',
    });
});

gulp.task('sass', function() {
  return gulp.src('./src/styles/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: [
          'last 2 versions',
          'not ie <= 10',
          'not ie_mob <= 10' // Avoid old flexbox https://developers.google.com/web/tools/lighthouse/audits/old-flexbox
        ],
        cascade: false
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('reload', ['browser-sync'], () => {
  gulp.watch(['public/**/*.*']).on('change', bs.reload);
});

gulp.task('default', ['sass']);
