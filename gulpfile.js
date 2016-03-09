var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  minify = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps');

themes = ['theme1', 'theme2', 'theme3'];

gulp.task('css', function() {
  themes.forEach(function (theme){
    gulp.src('./'+ theme + '/styles/*.css')
      .pipe(concat(theme + '.css'))
      .pipe(autoprefixer({browsers: '> 1% in CN, iOS 7'}))
      .pipe(gulp.dest('./' + theme + '/css'));
  });
});

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
