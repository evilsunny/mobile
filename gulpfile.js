var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect'); 
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
  

var path = {
	sass: [
	'./scss/**/*.scss',
    './scss/**/**/*.scss'
	]
}


gulp.task('serve', function() {
  connect.server({
    livereload: false,
    root: 'public'
  });
});

gulp.task('sass', function() {
  gulp.src('./scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css/'))
    .pipe(sass({
            errLogToConsole: true
        }))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(connect.reload());
});

gulp.task('watch',function() {
    gulp.watch(path.sass,['sass']);
});
 
gulp.task('minify-css', function() {
  return gulp.src('./public/css/*.css')  
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('autoprefixer'  , function () {
    return gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('default', ['sass', 'serve', 'watch','minify-css','autoprefixer']);