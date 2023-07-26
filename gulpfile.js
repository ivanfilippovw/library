const {src, dest, watch, parallel, series} = require('gulp');

const concat = require('gulp-concat');
const scss = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const svgSprite = require('gulp-svg-sprite');
const include = require('gulp-include');

function pages() {
  return src('app/pages/*.html')
  .pipe(include({
    includePaths: 'app/components'
  }))
  .pipe(dest('.'))
  .pipe(browserSync.stream())
}

//не работает правильно
function fonts() {
  return src('app/fonts/src/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({overrideBrowserslist: ['last 3 version']}))
    .pipe(concat('style.min.css'))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function images() {
  return src(['app/images/src/*.*', '!app/images/src/*.svg'])
    .pipe(newer('app/images'))
    .pipe(avif({ quality : 50}))

    .pipe(src('app/images/src/*.*'))
    .pipe(newer('app/images'))
    .pipe(webp())

    .pipe(src('app/images/src/*.*'))
    .pipe(newer('app/images'))
    .pipe(imagemin())

    .pipe(dest('app/images'))
}

function sprite() {
  return src('app/images/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
          example: true
        }
      }
    }))
    .pipe(dest('app/images'))
}

function scripts() {
  return src('app/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function watching() {
  browserSync.init({
    server: {
        baseDir: "."
    }
  });
  watch(['app/scss/style.scss'], styles)
  watch(['app/scss/**/*.scss'], styles)
  watch(['app/images/src'], images)
  watch(['app/js/main.js'], scripts)
  watch(['app/components/*', 'app/pages/*'], pages)
  watch(['*.html']).on('change', browserSync.reload)
}

function cleanDist() {
  return src('dist')
    .pipe(clean())
}

function building() {
  return src([
    'app/css/style.min.css',
    'app/images/*.*',
    '!app/images/*.svg',
    'app/images/sprite.svg',
    'app/fonts/*.*',
    'app/js/main.min.js',
    'app/**/*.html',
    '!app/images/stack/sprite.stack.html'
  ], {base : 'app'})
    .pipe(dest('dist'))
}

exports.fonts = fonts; //оставлены тестовые шрифты, у меня они не проходят корректно, буду проверять на других
exports.images = images;
exports.sprite = sprite;

exports.styles = styles;
exports.scripts = scripts;
exports.pages = pages;
exports.watching = watching;

exports.building = building;
exports.build = series(cleanDist, building); //перезаписать папку dist
// exports.default = parallel(styles, images, scripts, pages, watching);
exports.default = parallel(styles, scripts, pages, watching);

// Когда начинаем делать проект
// gulp fonts
// gulp images
// gulp sprite

// Работаем над проектом, обновление в процессе работы
// gulp
// contral + c (выключили отслеживание)

// Собрать папку dist первый раз
// gulp building
