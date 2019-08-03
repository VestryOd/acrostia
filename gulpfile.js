'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css'),
      sourcemaps = require('gulp-sourcemaps'),
      prefixer = require('gulp-autoprefixer'),
      rigger = require('gulp-rigger'),
      del = require('del'),
      uglify = require('gulp-uglify'),
      browserSync = require('browser-sync').create(),
      imagemin = require('gulp-imagemin'),
      cache = require('gulp-cache'),
      fileinclude = require('gulp-file-include');

var path = {
    dist: {
        html: 'dist/',
        style: 'dist/assets/css',
        css_vendors: 'dist/assets/css',
        mapcss: './map',
        js: 'dist/assets/js',
        js_vendors: 'dist/assets/js',
        mapjs: './map',
        img: 'dist/assets/img',
        static: 'dist/',
        fonts: 'dist/assets/fonts',
        icons: 'dist/assets/icons',
        docs: 'docs/'
    },
    src: {
        html: 'src/index.html',
        style: 'src/assets/scss/main.scss',
        css_vendors: 'src/assets/vendors/css/vendors.css',
        js: 'src/js/script.js',
        js_vendors: 'src/assets/vendors/js/vendors.js',
        img: 'src/assets/img/**/*.*',
        icons: 'src/assets/icons/**/*.*',
        static: 'src/static/**/*.*',
        fonts: 'src/assets/fonts/**/*.*',
        dist: 'dist/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        js_vendors: 'src/assets/vendors/js/vendors.js',
        style: 'src/assets/scss/**/*.scss',
        css_vendors: 'src/assets/vendors/css/vendors.css',
        img: 'src/assets/img/**/*.*',
        static: 'src/static/**/*.*',
        fonts: 'src/assets/fonts/**/*.*',
        icons: 'src/assets/icons/**/*.*'
    }
};

function htmls() {
    return gulp.src(path.src.html)
        // .pipe(rigger())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          }))
        .pipe(gulp.dest(path.dist.html))
        .pipe(browserSync.stream());
};

function styles() {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(prefixer({
                cascade: true
            }))
            .pipe(cleanCSS({
                level: 0
            }))
        .pipe(sourcemaps.write(path.dist.mapcss))
        .pipe(gulp.dest(path.dist.style))
        .pipe(browserSync.stream());
};

function css_vendors() {
    return gulp.src(path.src.css_vendors)
        .pipe(cleanCSS({
            level: 1,
            rebase: false
        }))
        .pipe(gulp.dest(path.dist.css_vendors))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write(path.dist.mapjs))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.stream());
};

function js_vendors() {
    return gulp.src(path.src.js_vendors)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.js_vendors))
        .pipe(browserSync.stream());
}

function fonts() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(browserSync.stream());
};

function other() {
    return gulp.src(path.src.static)
        .pipe(gulp.dest(path.dist.static))
        .pipe(browserSync.stream());
};

function icons() {
    return gulp.src(path.src.icons)
        .pipe(gulp.dest(path.dist.icons))
        .pipe(browserSync.stream());
};

function images() {
    return gulp.src(path.src.img)
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ])))
        .pipe(gulp.dest(path.dist.img))
        .pipe(browserSync.stream());
};

function docs() {
    return gulp.src(path.src.dist)
        .pipe(gulp.dest(path.dist.docs));
}

function clean() {
    return del(['dist/*']);
};

function cleanDocs() {
    return del(['docs/*']);
};

function clear() {
    return cache.clearAll();
};

function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        tunnel: true
    });

    gulp.watch(path.watch.html, htmls);
    gulp.watch(path.watch.style, styles);
    gulp.watch(path.watch.css_vendors, css_vendors);
    gulp.watch(path.watch.js, scripts);
    gulp.watch(path.watch.js_vendors, js_vendors);
    gulp.watch(path.watch.img, images);
    gulp.watch(path.watch.static, other);
    gulp.watch(path.watch.fonts, fonts);
    gulp.watch(path.watch.icons, icons);
};

gulp.task('clean', clean);
gulp.task('clear', clear);
gulp.task('watch', watch);
gulp.task('html:build', htmls);
gulp.task('style:build', styles);
gulp.task('css_vendors:build', css_vendors);
gulp.task('script:build', scripts);
gulp.task('js_vendors:build', js_vendors);
gulp.task('fonts:build', fonts);
gulp.task('icons:build', icons);
gulp.task('images:build', images);
gulp.task('other:build', other);
gulp.task('docs:build', gulp.series(cleanDocs, docs));

gulp.task('build', gulp.series(clean,
                        gulp.parallel(
                            htmls,
                            styles,
                            css_vendors,
                            scripts,
                            js_vendors,
                            fonts,
                            icons,
                            other,
                            images)
                        ));

gulp.task('dev', gulp.series('build', 'watch'));
gulp.task('default', gulp.series('watch'));