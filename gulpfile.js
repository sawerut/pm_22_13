const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// HTML task
function html() {
    return src('app/html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'app/html'
        }))
        .pipe(dest('dist/'));
}

// SCSS compilation - ФІКСУЄМО ШЛЯХ!
function styles() {
    return src('app/scss/style.scss')  // Правильний шлях до головного SCSS
        .pipe(sass({ 
            outputStyle: 'compressed',
            includePaths: ['app/scss'] // Додаємо шлях для імпортів
        }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream());
}

// JavaScript
function scripts() {
    return src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());
}

// Images
function images() {
    return src('app/img/**/*')
        .pipe(dest('dist/img/'))
        .pipe(browserSync.stream());
}

// Bootstrap CSS
function bootstrapCSS() {
    return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream());
}

// Bootstrap JS
function bootstrapJS() {
    return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());
}

// BrowserSync
function serve() {
    browserSync.init({
        server: './dist',
        port: 3000
    });

    watch('app/html/**/*.html', html).on('change', browserSync.reload);
    watch('app/scss/**/*.scss', styles); // Спостереження за всіма SCSS файлами
    watch('app/js/*.js', scripts);
    watch('app/img/**/*', images);
}

// Export tasks
exports.bootstrapCSS = bootstrapCSS;
exports.bootstrapJS = bootstrapJS;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.html = html;

// Build task
exports.build = parallel(
    html, 
    styles, 
    scripts, 
    images, 
    bootstrapCSS, 
    bootstrapJS
);

// Default task
exports.default = series(
    parallel(html, styles, scripts, images, bootstrapCSS, bootstrapJS),
    serve
);