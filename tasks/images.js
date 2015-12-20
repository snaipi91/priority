var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(); // автоматическая загрузка плагинов gulp

/**
 * Задача по оптимизации изображений
 */
gulp.task('images', function () {
	return gulp.src(['src/assets/images/*'])
		.pipe($.imagemin()) // Оптимизирует изображения
		.pipe(gulp.dest('public/assets/images/')) // Папка с оптимизированными изображениями
		.pipe($.connect.reload()); // Перезагружаем сервер
});

/**
 * Задача по оптимизации спрайта
 */
gulp.task('sprite', ['sprite_create'], function () {
	return gulp.src(['public/assets/images/sprite/*'])
		.pipe($.imagemin()) // Оптимизирует изображения
		.pipe(gulp.dest('public/assets/images/sprite/')) // Папка с оптимизированными изображениями
		.pipe($.connect.reload()); // Перезагружаем сервер
});

/**
 * Задача по созданию спрайта
 */
gulp.task('sprite_create', function() {
	var spriteData =
		gulp.src('src/assets/images/sprite/*') // путь, откуда берем картинки для спрайта
			.pipe($.spritesmith({
				cssFormat: 'less',
				cssName: 'sprite.less',
				algorithm: 'binary-tree',
				imgName: 'sprite.png',
				imgPath: '../images/sprite/sprite.png'
			}));

	spriteData.img.pipe(gulp.dest('public/assets/images/sprite')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('src/assets/less/')); // путь, куда сохраняем стили
});