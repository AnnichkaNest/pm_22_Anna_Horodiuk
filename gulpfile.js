const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const fileInclude = require('gulp-file-include');

// HTML
function html() {
  return src('src/*.html')
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// SCSS
function styles() {
  return src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return src('src/js/**/*.js')
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Images
function images() {
  return src('src/images/**/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream());
}

// Reload
function reload(cb) {
  browserSync.reload();
  cb();
}

// Copy Bootstrap
function copyCSS() {
  return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(dest('dist/css'));
}

function copyJS() {
  return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(dest('dist/js'));
}

// Server
function serve() {
  browserSync.init({
    server: { baseDir: 'dist' },
    port: 3000
  });

  watch('src/**/*.html', html);
  watch('src/scss/**/*.scss', styles);
  watch('src/js/**/*.js', series(scripts, reload));
  watch('src/images/**/*', series(images, reload));
}

// Exports
exports.html = html;
exports.scss = styles;
exports.js = scripts;
exports.images = images;
exports.copyCSS = copyCSS;
exports.copyJS = copyJS;
exports.default = series(
  parallel(html, styles, scripts, images, copyCSS, copyJS),
  serve
);
