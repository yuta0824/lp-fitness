const gulp = require("gulp");
const del = require("del");

//scss
const sass = require("gulp-dart-sass");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sassGlob = require("gulp-sass-glob-use-forward");
const mmq = require("gulp-merge-media-queries");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");
const browserSync = require("browser-sync");

//画像圧縮
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

// 入出力するフォルダを指定
const srcBase = "../src";
const srcAssetsBase = "../src/assets";
const distBase = "../fitness";
const distAssetsBase = "../fitness/assets";

const srcPath = {
  scss: srcBase + "/scss/**/*.scss",
  js: srcAssetsBase + "/js/**/*.js",
  img: [srcAssetsBase + "/img/**/*", "!" + srcAssetsBase + "/img/svg/*.svg"],
  html: srcBase + "/**/*.html",
  php: srcBase + "/**/*.php",
  library: srcAssetsBase + "/library/**/*",
};

const distPath = {
  css: distAssetsBase + "/css/",
  js: distAssetsBase + "/js/",
  img: distAssetsBase + "/img/",
  html: distBase + "/",
  php: distBase + "/",
  library: distAssetsBase + "/library/",
};

/**
 * clean
 */
const clean = () => {
  return del([distBase + "/**"], {
    force: true,
  });
};

/**
 * sass
 */
const cssSass = () => {
  return gulp
    .src(srcPath.scss)
    .pipe(plumber({
      errorHandler: notify.onError("Error:<%= error.message %>")
    }))
    .pipe(sassGlob())
    .pipe(sass({
      outputstyle: "expanded",
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(postcss([cssdeclsort({
      order: "alphabetical"
    })]))
    .pipe(mmq())
    .pipe(gulp.dest(distPath.css))
    .pipe(browserSync.stream())
};

/**
 * 画像圧縮
 */
const imgImagemin = () => {
  return gulp
    .src(srcPath.img)
    .pipe(imagemin([imageminMozjpeg({quality: 80,}),imageminPngquant(),],{verbose: true,}))
    .pipe(gulp.dest(distPath.img));
};

/**
 * srcからdistへ出力
 */
const html = () => {
  return gulp.src(srcPath.html).pipe(gulp.dest(distPath.html));
};
const js = () => {
  return gulp.src(srcPath.js).pipe(gulp.dest(distPath.js));
};
const php = () => {
  return gulp.src(srcPath.php).pipe(gulp.dest(distPath.php));
};
const library = () => {
  return gulp.src(srcPath.library).pipe(gulp.dest(distPath.library));
};

/**
 * ローカルサーバー立ち上げ
 */
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
};
const browserSyncOption = {
  server: distBase,
};

/**
 * リロード
 */
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

/**
 *ファイル変更監視
 */
const watchFiles = () => {
  gulp.watch(srcPath.scss, gulp.series(cssSass));
  gulp.watch(srcPath.html, gulp.series(html, browserSyncReload));
  gulp.watch(srcPath.js, gulp.series(js, browserSyncReload));
  gulp.watch(srcPath.img, gulp.series(imgImagemin, browserSyncReload));
  gulp.watch(srcPath.php, gulp.series(php, browserSyncReload));
  gulp.watch(srcPath.font, gulp.series(font, browserSyncReload));
  gulp.watch(srcPath.library, gulp.series(library, browserSyncReload));
};

/**
 *タスク実行
 */
exports.default = gulp.series(
  clean,
  gulp.parallel(html, cssSass, js, imgImagemin, php, library),
  gulp.parallel(watchFiles, browserSyncFunc)
);
