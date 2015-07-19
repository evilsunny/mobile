var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect'); 
var minifyCss = require('gulp-minify-css');


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
//Watch task
gulp.task('watch',function() {
    gulp.watch(path.sass,['sass']);
});

gulp.task('default', ['sass', 'serve', 'watch']);