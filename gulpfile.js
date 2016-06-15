var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var del = require('del');
var gulp = require('gulp');
var sitemap = require('gulp-sitemap');

var config = {
  src: 'themes/standard/source',
  // dist: 'dist/AD/'
  dist: '../../wamp/www/AD'
}

gulp.task('clean', del.bind(null, [config.dist]));

gulp.task('default', ['clean'], function () {
});

gulp.task('scripts', ['scripts:vendor', 'scripts:main']);

// gets these scripts from libs/ and combine them in theme script
// so hexo can pick up on it
gulp.task('scripts:vendor', function () {
  return gulp.src([
      config.src + '/_scripts/vendors/*.js',
      'node_modules/hexo-renderer-ejs/node_modules/ejs/ejs.js'
    ])
    .pipe(concat('vendors.js'))
    // .pipe(gulp.dest(config.dist + '/assets/js'));
    .pipe(gulp.dest(config.dist + '/js'));
});

//
gulp.task('scripts:main', function () {
  return gulp.src([
      config.src + '/_scripts/app.js',
      config.src + '/_scripts/components/*.js',
    ])
    .pipe(concat('main.js'))
    // .pipe(gulp.dest(config.dist + '/assets/js'));
    .pipe(gulp.dest(config.dist + '/js'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('styles', function () {
  return gulp.src(config.src + '/_scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dist + '/css'));
});

// production ready styles
gulp.task('styles:prod', function () {
  return gulp.src(config.src + '/_scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('templates', function () {
  return gulp.src(config.src + '/AD/templates/*.ejs')
    .pipe(gulp.dest(config.dist + '/templates'));
});


gulp.task('watch', ['scripts', 'styles', 'templates', 'hexo', 'serve'], function () {
  gulp.watch(['app/**/*.md', 'themes/standard/layout/**/*.ejs', 'themes/standard/source/_scripts/*.js', 'themes/standard/source/_scripts/**/*.js'], ['reload:hard']);

  // styles updated? recompile and get hexo to move them to dist
  // hexo is smart and only regens the changed files
  gulp.watch(config.src + '/**/*.scss', ['styles', 'reload:soft']);

  // Copy images
  gulp.watch(config.src + '/images', ['images'], ['reload:hard']);

  // Copy fonts
  gulp.watch(config.src + '/fonts', ['fonts'], ['reload:hard']);

  // Copy templates
  gulp.watch(config.src + '/AD/templates/*.ejs', ['templates', 'reload:hard']);
});

// stand alone as we want to trigger whenever we want
// it has inbuilt checksum to only regenerate changed files xD
gulp.task('hexo', function () {
  return gulp.src('')
  .pipe(shell([
    'hexo generate'
  ]));
});

gulp.task('reload:hard', ['scripts', 'hexo'], function(){
  browserSync.reload();
});

gulp.task('reload:soft', ['styles', 'hexo'], function(){
  browserSync.reload([config.dist + '/**/*.css']);
});

// Static Server + watching scss/html files
gulp.task('serve', ['styles'], function () {

    browserSync.init({
      notify: false,
      proxy: "localhost:81",
      // port: 9000,
      // server: "./dist/",
      ghostMode: {
          scroll: true
        }
    });

    // gulp.watch('themes/standard/source/**/*.scss', ['styles']);
});


// builds the site, used for teamcity?
gulp.task('build', ['clean', 'scripts:vendor', 'styles:prod', 'templates', 'hexo']);