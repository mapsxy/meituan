var gulp = require('gulp');
var sass = require('gulp-sass');
var auto = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');

gulp.task('devSass', function() {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .pipe(auto())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/style.scss', gulp.series('devSass'))
})

<<<<<<< HEAD
gulp.task('dev', gulp.series('devSass', 'watch'));
=======
gulp.task('dev', gulp.paraller('devSass', 'watch'));
>>>>>>> 7fd86090b6019ad10406ba4a3038c9ad2555e75f
