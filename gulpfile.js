var gulp 	= require('gulp');
var lost 	= require('lost');
var postcss = require('gulp-postcss');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssnano = require('cssnano');
var plumber = require('gulp-plumber');
var animation = require('postcss-animation');
var autoprefixer = require('autoprefixer');

var dari ='base/css/';
var tujuan = 'app/css';

gulp.task('compress', function() {
  return gulp.src('base/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('sass',function(){
	var processors = [
		lost,
		animation,
		cssnano,
		autoprefixer({browsers: ['last 2 versions']})
	];

	gulp.src(dari + '*.scss')
	.pipe(plumber())
  .pipe(sass())
	.pipe(postcss(processors))
	.pipe(gulp.dest(tujuan));
});


gulp.task('watch', function(){
	gulp.watch(dari + '*.scss', ['sass']);
	gulp.watch( 'base/js/*.js', ['compress']);
});

gulp.task('default', ['watch']);
