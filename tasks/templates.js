var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('templates', function () {
	return gulp.src('src/templates/*.html')
		.pipe($.htmlExtend({annotations: false,verbose: false}))
		.pipe(gulp.dest('public/'))
		.pipe($.connect.reload());
});