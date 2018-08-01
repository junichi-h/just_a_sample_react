import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { config } from '../constants/config';

const $ = gulpLoadPlugins();

// 静的ファイルを移動
gulp.task('extras', () => {
  gulp.src([
    'app/*.*',
    '!app/*.pug'
  ], {
    dot: true
  }).pipe(gulp.dest(config.dist));

  /* gulp.src([
      '.tmp/assets/styles/!**'
  ]).pipe(gulp.dest('dist/assets/styles'));*/

  gulp.src([
     `${config.app}/${config.assets}/data/**`
  ], {
    dot: false
  }).pipe(gulp.dest(`${config.dist}/${config.assets}/data/`));
});

gulp.task('build', ['html', 'extras'], () => {
  return gulp.src(`${config.dist}/**/*`)
      .pipe($.size({title: 'build', gzip: true}));
});
