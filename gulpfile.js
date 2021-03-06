var gulp = require('gulp');
  watch = require('gulp-watch'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  util = require('gulp-util'),
  concat = require('gulp-concat'),

  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),

  cache = require('gulp-cached'),

  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),

  imagemin = require('gulp-imagemin');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>")
  util.log(util.colors.red('Error'), error.message);
}

gulp.task('js', function() {
  gulp.src([
    'js/nav.js',
    'js/main.js'
  ])
  .pipe(concat('site.js'))
  .pipe(sourcemaps.init())
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(gulp.dest('js'))
  .pipe(uglify())
  .on('error', errorNotify)
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('/'))
  .on('error', errorNotify)
  .pipe(gulp.dest('js'))
  .on('error', errorNotify)
  .pipe(notify({ message: 'Js task complete' }));
});

gulp.task('style', function() {
  return gulp.src('css/site.styl')
  .pipe(stylus())
  .on('error', errorNotify)
  .pipe(autoprefixer())
  .on('error', errorNotify)
  .pipe(gulp.dest('css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .on('error', errorNotify)
  .pipe(gulp.dest('css'))
  .pipe(notify({ message: 'Style task complete' }));
});

gulp.task('images', function () {
    return gulp.src('src/img/*.*')
    .pipe(cache('images'))
    .pipe(imagemin({
      progressive: false
    }))
    .on('error', errorNotify)
    .pipe(gulp.dest('img'))
		.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('sprites', function () {
    return gulp.src('src/img/sprites/*.*')
    .pipe(cache('sprites'))
    .pipe(imagemin({
      progressive: false
    }))
    .on('error', errorNotify)
    .pipe(gulp.dest('img/sprites'))
		.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('watch', function() {
  gulp.watch(['js/nav.js', 'js/main.js'], ['js']);
  gulp.watch(['css/site.styl'], ['style']);
});

gulp.task('default', ['watch']);
