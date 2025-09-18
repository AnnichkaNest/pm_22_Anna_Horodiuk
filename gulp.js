const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .on('end', () => console.log('HTML файли скопійовані в dist'));
});


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




// ТАСК для JS
gulp.task('js', function() {
    return gulp.src('src/js/*.js')   // беремо всі js файли з src/js
        .pipe(gulp.dest('dist/js')); // копіюємо у dist/js
});



