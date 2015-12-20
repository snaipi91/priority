var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('watch', ['sprite', 'styles', 'scripts', 'templates', 'images'], function() {
	gulp.watch('src/assets/js/*.js', ['scripts']);
	gulp.watch('src/assets/less/*.less', ['styles']);
	gulp.watch('src/assets/images/*', ['images']);
    gulp.watch('src/assets/images/sprite/*', ['sprite']);
	gulp.watch([
		'src/templates/layouts/*.html',
		'src/templates/partials/*.html',
		'src/templates/*.html'
	], ['templates']);
});
