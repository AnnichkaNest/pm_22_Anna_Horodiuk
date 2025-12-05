const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const fileInclude = require('gulp-file-include');

// HTML: шукає index.html в src і збирає шматочки з components
function html() {
  return src('src/*.html') 
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// SCSS: бере тільки головний index.scss, бо в ньому вже є @import всіх інших
function styles() {
  return src('src/scss/index.scss') 
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename('index.min.css')) // Як у завданні
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// JS: переносить твої скрипти
function scripts() {
  return src('src/js/**/*.js')
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Images: стискає картинки
function images() {
  return src('src/images/**/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream());
}

// Копіювання CSS Bootstrap
function copyCSS() {
  return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(dest('dist/css'));
}

// Копіювання JS Bootstrap
function copyJS() {
  return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(dest('dist/js'));
}

// Server: запускає локальний сервер і слідкує за змінами
function serve() {
  browserSync.init({
    server: { baseDir: 'dist' },
    port: 3000,
    notify: false // Вимикає набридливе повідомлення справа зверху
  });

  // Якщо змінюється будь-який HTML (головний або компоненти) -> перезапуск html()
  watch(['src/*.html', 'src/components/**/*.html'], html);
  
  // Якщо змінюється будь-який SCSS (головний, утиліти або компоненти) -> перезапуск styles()
  watch(['src/scss/**/*.scss', 'src/components/**/*.scss'], styles);
  
  watch('src/js/**/*.js', series(scripts, reload));
  watch('src/images/**/*', series(images, reload));
}

// Функція перезавантаження для JS/Images
function reload(cb) {
  browserSync.reload();
  cb();
}

// Експорт завдань
exports.html = html;
exports.scss = styles;
exports.js = scripts;
exports.images = images;
exports.copyCSS = copyCSS;
exports.copyJS = copyJS;

// Дефолтний таск (запускається просто командою 'gulp')
exports.default = series(
  parallel(html, styles, scripts, images, copyCSS, copyJS),
  serve
);