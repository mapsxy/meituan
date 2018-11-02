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

gulp.task('dev', gulp.series('devSass', 'watch'));