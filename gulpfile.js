const fileInclude = require('gulp-file-include');
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano'); // мінімізує CSS
const rename = require('gulp-rename');   // для суфіксу .min


// HTML
function html() {
  return src('src/*.html') // тільки основні файли, не partials
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}


// SCSS таска
const styles = () => {
  return src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
};


// JS
function scripts() {
  return src('src/js/**/*.js')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// Images
function images() {
  return src('src/images/**/*')
    .pipe(imagemin()) // Optimize images
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}


// BrowserSync
function serve() {
  browserSync.init({
  server: { baseDir: 'dist' },
  port: 3000
});


  watch('src/**/*.html', html);
  watch('src/scss/**/*.scss', styles);
  watch('src/js/**/*.js', scripts);
  watch('src/images/**/*', images);}


// Exports
exports.html = html;
exports.scss = styles;
exports.js = scripts;
exports.images = images;
exports.default = series(
  parallel(html, styles, scripts, images),
  serve);