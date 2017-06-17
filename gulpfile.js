const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('pug', () =>
  gulp.src('./src/pug/**/*.pug')
      .pipe(pug(gutil.env.production ? {} : { pretty: true }))
      .on('error', notify.onError('Error: <%= error.message %>'))
      .pipe(gulp.dest('./public'))
      .pipe(notify('File: ./public/<%= file.relative %> Compiled!'))
);

gulp.task('sass', () =>
  gulp.src('./src/sass/app.scss')
      .pipe(sourcemaps.init())
      .pipe(sass(gutil.env.production ? { outputStyle: 'compressed' } : {}))
      .on('error', notify.onError('Error: <%= error.message %>'))
      .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./public/css'))
      .pipe(notify('File: ./public/css/<%= file.relative %> Compiled!'))
      .pipe(browserSync.stream({ match: '**/*.css' }))
);

gulp.task('clean:dist', () =>
  gulp.src('./public')
      .pipe(clean())
);

gulp.task('clean', ['clean:dist']);

gulp.task('watch', () => {
  browserSync.init({
    host: '0.0.0.0',
    server: './public',
    open: false
  });

  gulp.watch('./src/pug/**/*.pug', e =>
    gulp.src(e.path, { base: './src/pug' })
        .pipe(pug({ pretty: true }))
        .on('error', notify.onError('Error: <%= error.message %>'))
        .pipe(gulp.dest('./public'))
        .pipe(notify('File: ./<%= file.relative %> Compiled!'))
        .pipe(browserSync.reload({ stream: true }))
  );
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['pug', 'sass']);
