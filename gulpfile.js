var gulp = require('gulp'),
    rename = require('gulp-rename'),
    del = require('del'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),

    livereload = require('gulp-livereload'),

    sass = require("gulp-sass"),
    autoprefixer = require('gulp-autoprefixer'),

    uglify = require('gulp-uglify'),

    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');

var config = {
    style: {
        src: "./src/scss",
        globs: "/**/*.scss",
        dist: "./dist/css",
        distName: "style.css",
        autoprefixer: {
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }
    },
    script: {
        src: "./src/js",
        globs: "/**/*.js",
        dist: "./dist/js",
        distName: "main.js"

    },
    images: {
        src: "./src/images",
        glob: "/**/*.{png,jpg,gif,ico}",
        dist: "./dist/images"
    }
};
var style = config.style,
    script = config.script,
    images = config.images;

//清理dist文件夹
gulp.task('clean', function (cb) {
    return del([style.dist, script.dist, images.dist], cb);
});

//编译并合并压缩sass文件成style.css 、style.min.css 和 style.min.css.map 文件
gulp.task('build:css', function () {
    return gulp.src(style.src + style.globs)
               .pipe(sourcemaps.init())
               .pipe(concat(style.distName))
               .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
               .pipe(autoprefixer(style.autoprefixer))
               .pipe(gulp.dest(style.dist))
               .pipe(rename({ suffix: '.min' }))
               .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest(style.dist))
               .pipe(livereload())
               .pipe(notify({ message: 'style task complete' }));
});

//编译并合并压缩js文件成main.js 、main.min.js 和 main.min.js.map 文件
gulp.task('build:js', function () {
    return gulp.src(script.src + script.globs)
      .pipe(concat(script.distName))
      .pipe(gulp.dest(script.dist))
      .pipe(sourcemaps.init())
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(script.dist))
      .pipe(livereload())
      .pipe(notify({ message: 'script task complete' }));
});

gulp.task('build:images', function () {
    return gulp.src(images.src + images.glob)
               .pipe(cache(imagemin({
                   optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                   progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                   interlaced: false, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                   multipass: false //类型：Boolean 默认：false 多次优化svg直到完全优化
               })))
               .pipe(imagemin())
               .pipe(gulp.dest(images.dist))
               .pipe(livereload())
               //.pipe(notify({ message: 'images task complete' }));
});

gulp.task('build:all', ['clean'], function () {
    gulp.start('build:js', 'build:css', 'build:images');
});

gulp.task('watch:css', function () {
    livereload.listen();
    gulp.watch(style.src + "/**/*.scss", ['build:css']);
});

gulp.task('watch:js', function () {
    livereload.listen();
    gulp.watch(script.src + script.globs, ['build:js']);
});

gulp.task('watch:images', function () {
    livereload.listen();
    gulp.watch(images.src + images.globs, ['build:images']);
});

gulp.task('watch:all', ['watch:css', 'watch:js', 'watch:images'], function () {
});