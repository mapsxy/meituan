var gulp = require('gulp');
var sass = require('gulp-sass');
var auto = require('gulp-autoprefixer'); //自动添加前缀
var clean = require('gulp-clean-css'); //压缩css
var server = require('gulp-webserver'); //起服务拦截前端请求
var url = require('url');
var fs = require('fs');
var path = require('path');
var listjson = require('./src/mock/list.json');

gulp.task('devSass', function() {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .pipe(auto({
            browers: ['last 2 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/style.scss', gulp.series('devSass'))
})

gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080, //配置端口
            host: '169.254.162.41',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                }

                if (pathname === '/api/list') { //请求接口
                    res.end(JSON.stringify({ code: 1, data: listjson }));
                } else {
                    //请求文件
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})

gulp.task('dev', gulp.series('devSass', 'watch'));