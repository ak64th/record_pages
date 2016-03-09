var gulp = require('gulp'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect');

gulp.task('css', function() {
  gulp.src('./style/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch('style/*.css', ['css']);
})

gulp.task('default', ['css', 'watch']);
