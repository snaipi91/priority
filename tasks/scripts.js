var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(); // автоматическая загрузка плагинов gulp

gulp.task('scripts', function () {
	return gulp.src([
        'src/assets/js/*.js'
    ])
		.pipe($.concat('script.js')) // Объединяем в один файл
		.pipe($.uglify()) // Минификация
		.on('error', function (err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(gulp.dest('public/assets/js/')) // Путь до компилированных скриптов
		.pipe($.connect.reload()); // Перезагружаем сервер
});