const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));


// ТАСК для HTML
gulp.task('html', function() {
    return gulp.src('src/*.html')   // беремо всі html з папки src
        .pipe(gulp.dest('dist'));   // копіюємо у папку dist
});


// ТАСК для SCSS
gulp.task('scss', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});