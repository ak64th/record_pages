var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  minify = require('gulp-clean-css'),
  prefix = require('gulp-autoprefixer'),
  stylus = require('gulp-stylus')
  maps = require('gulp-sourcemaps');

var themes = ['theme1', 'theme2', 'theme3'];

themes.forEach(function (theme){
  gulp.task(theme, function() {
    return gulp.src('./'+ theme + '/styles/*.stylus')
      .pipe(maps.init())
        .pipe(stylus())
        .pipe(prefix({browsers: '> 1% in CN, iOS 7'}))
        .pipe(concat('main.css'))
        .pipe(minify())
      .pipe(maps.write())
      .pipe(gulp.dest('./' + theme + '/css'));
  });

  gulp.task('deploy_' + theme, [theme], function(){
    return gulp.src('./' + theme + '/**/*')
      .pipe(gulp.dest('./public/' + theme));
  });
});

gulp.task('css', themes);

gulp.task('js', function() {
	return gulp.src('./scripts/*.js')
    .pipe(maps.init())
      .pipe(concat('packed.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./js'));
});

gulp.task('deploy_themes', themes.map(function(theme){return 'deploy_' + theme;}))

gulp.task('deploy_js', ['js'], function(){
  return gulp.src('./js/*.js')
    .pipe(maps.init())
      .pipe(uglify())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('deploy_html', function(){
  return gulp.src('./index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('vendor', function(){
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/underscore/underscore.js',
    './bower_components/backbone/backbone.js'
  ])
  .pipe(gulp.dest('./js'));
});

gulp.task('deploy_vender', function(){
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/underscore/underscore.js',
    './bower_components/backbone/backbone.js'
  ]).pipe(gulp.dest('./public/js'));
});

gulp.task('deploy', ['deploy_js', 'deploy_themes', 'deploy_html', 'deploy_vender']);

gulp.task('watch', function() {
  themes.forEach(function (theme){
    gulp.watch('./'+ theme + '/styles/*.stylus', [theme]);
  });
  gulp.watch('scripts/*.js', ['js']);
})

gulp.task('default', ['css', 'js','vendor', 'watch']);
