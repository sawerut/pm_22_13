const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// Окремі таски без browserSync
function html() {
    return src('app/html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'app/html'
        }))
        .pipe(dest('dist/'));
}

function styles() {
    return src('app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/css/'));
}

function scripts() {
    return src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js/'));
}

function images() {
    return src('app/img/*')
        .pipe(dest('dist/img/'));
}
// Таска для Bootstrap CSS
function bootstrapCSS() {
    return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream());
}

// Таска для Bootstrap JS
function bootstrapJS() {
    return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());
}

// Таска для Bootstrap JS map (якщо потрібно)
function bootstrapJSMaps() {
    return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map')
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());
}
// Окрема таска для browserSync stream
function browserSyncStream() {
    return src('dist/**/*')
        .pipe(browserSync.stream());
}

// Таска для browserSync reload
function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

// Ініціалізація browserSync
function browserSyncInit(cb) {
    browserSync.init({
        server: './dist',
        port: 3000
    });
    cb();
}

// Комбіновані таски з browserSync
function htmlWithSync() {
    return html().pipe(browserSync.stream());
}

function stylesWithSync() {
    return styles().pipe(browserSync.stream());
}

function scriptsWithSync() {
    return scripts().pipe(browserSync.stream());
}

function imagesWithSync() {
    return images().pipe(browserSync.stream());
}

// Сервер з окремим stream
function serve() {
    browserSyncInit(() => {});
    
    watch('app/html/**/*.html', series(htmlWithSync));
    watch('app/scss/*.scss', series(stylesWithSync));
    watch('app/js/*.js', series(scriptsWithSync));
    watch('app/img/*', series(imagesWithSync));
}

// Сервер з окремим reload
function serveWithReload() {
    browserSyncInit(() => {});
    
    watch('app/html/**/*.html', series(html, browserSyncReload));
    watch('app/scss/*.scss', series(styles, browserSyncReload));
    watch('app/js/*.js', series(scripts, browserSyncReload));
    watch('app/img/*', series(images, browserSyncReload));
}

// Експорт тасків
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;

exports.htmlSync = htmlWithSync;
exports.stylesSync = stylesWithSync;
exports.scriptsSync = scriptsWithSync;
exports.imagesSync = imagesWithSync;

exports.browserSync = browserSyncInit;
exports.reload = browserSyncReload;
exports.stream = browserSyncStream;

exports.bootstrapCSS = bootstrapCSS;
exports.bootstrapJS = bootstrapJS;
exports.bootstrapJSMaps = bootstrapJSMaps;

exports.build = parallel(html, styles, scripts, images, bootstrapCSS, bootstrapJS);
exports.buildSync = parallel(htmlWithSync, stylesWithSync, scriptsWithSync, imagesWithSync);

// Таска за замовчуванням
exports.default = series(
    parallel(html, styles, scripts, images, bootstrapCSS, bootstrapJS),
    serve
);