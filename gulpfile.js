const babel = require('gulp-babel')
const del = require('del')
const fs = require('fs')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const uglify = require('gulp-uglify')

gulp.task('styles:compress', () =>
  gulp
    .src('src/styles/styles.css')
    .pipe(postcss())
    .pipe(gulp.dest('dist/styles'))
)

gulp.task('scripts:compress', () =>
  gulp
    .src('src/scripts/scripts.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
)

gulp.task('images:compress', () =>
  import('gulp-imagemin').then((gulpImagemin) => {
    gulp
      .src('src/assets/**/**.{png,jpg,jpeg,svg}')
      .pipe(
        gulpImagemin.default([
          gulpImagemin.mozjpeg({ progressive: true }),
          gulpImagemin.optipng({ optimizationLevel: 3 }),
          gulpImagemin.svgo(),
        ])
      )
      .pipe(gulp.dest('dist/assets'))
  })
)

gulp.task('clean', () => del(['dist/styles', 'dist/scripts']))

gulp.task(
  'build',
  gulp.series(
    'clean',
    'styles:compress',
    'scripts:compress',
    'images:compress',
  )
)
