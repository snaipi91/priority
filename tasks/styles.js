var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('styles', function () {
	return gulp.src([
			'src/assets/less/sprite.less',
			'src/assets/less/mixin.less',
			'src/assets/less/reset.less',
			'src/assets/less/normalize.less',
			'src/assets/less/fonts.less',
			'src/assets/less/main.less',
			'src/assets/less/about.less',
            'src/assets/less/news.less',
            'src/assets/less/portfolio.less',
            'src/assets/less/sphere.less',
            'src/assets/less/partners.less',
			'src/assets/less/partners-catalog.less',
            'src/assets/less/contacts.less',
            'src/assets/less/compare-products.less',
            'src/assets/less/cases-portfolio.less',
            'src/assets/less/activity.less',
			'src/assets/less/design.less',
			'src/assets/less/area.less',
			'src/assets/less/search.less',
			'src/assets/less/sitemap.less',
            'src/assets/less/partners-catalog-filter.less',
            'src/assets/less/partners-catalog-cart.less'
		])
		.pipe($.concat('style.css')) // Объединяем в один файл
		.pipe($.less()) // Запускаем less
		.on('error', function (err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe($.csso()) // Минификация
		.on('error', function (err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(gulp.dest('public/assets/css/')) // Путь до компилированных стилей
		.pipe($.connect.reload()); // перезагрузка сервера
});