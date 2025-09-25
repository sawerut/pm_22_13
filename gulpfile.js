const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// 1. Таска для HTML
function html() {
    return src('app/*.html')
        .pipe(dest('dist/'));
}

// 2. Таска для SCSS → CSS
function styles() {
    return src('app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/css/'));
}

// 3. Таска для JS
function scripts() {
    return src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js/'));
}

// 4. Таска для зображень
function images() {
    return src('app/img/*')
        .pipe(dest('dist/img/'));
}

// 5. BrowserSync сервер
function serve() {
    browserSync.init({
        server: './dist'
    });
    
    // Спостереження за змінами
    watch('app/*.html').on('change', series(html, browserSync.reload));
    watch('app/scss/*.scss').on('change', series(styles, browserSync.reload));
    watch('app/js/*.js').on('change', series(scripts, browserSync.reload));
    watch('app/img/*').on('change', series(images, browserSync.reload));
}

// Індивідуальні таски
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;

// Основна таска build
exports.build = parallel(html, styles, scripts, images);

// Таска за замовчуванням (з сервером)
exports.default = series(
    parallel(html, styles, scripts, images),
    serve
);