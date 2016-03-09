var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  minify = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps');

// gulp.task('css', function() {
// 	gulp.src('./styles/*.css')
// 	  .pipe(concat('index.css'))
// 	  .pipe(autoprefixer({browsers: '> 1% in CN, iOS 7'}))
//     .pipe(gulp.dest('./css'));
// });

gulp.task('js', function() {
	gulp.src('./scripts/*.js')
	  .pipe(concat('packed.js'))
	  .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
  gulp.watch('styles/*.css', ['css']);
  gulp.watch('scripts/*.js', ['js']);
})

gulp.task('default', ['css', 'js', 'watch']);
