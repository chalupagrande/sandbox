var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');


gulp.task('serve', ['compile-sass', 'compile-js'], function(){
  browserSync.init({
    server: {
      baseDir:'./'
    }
  })

  gulp.watch(['src/scripts/**/*.js'] , ['compile-js'])
  gulp.watch(['src/styles/**/*.scss'] , ['compile-sass'])
  gulp.watch(['src/**/*.js', 'src/**/*.scss', '*.html', 'views/*.html']).on('change', browserSync.reload)
})

gulp.task('compile-js', function(){
  return gulp.src(['src/scripts/*.js'])
             .pipe(plumber())
             .pipe(babel({
               presets: ['es2015']
             }))
             .pipe(plumber.stop())
             .pipe(gulp.dest('./dist/scripts'))
})


gulp.task('compile-sass', function(){
  return gulp.src(['src/styles/*.scss','src/styles/*.css'])
            .pipe(plumber())
            .pipe(sass())
            .pipe(plumber.stop())
            .pipe(gulp.dest('./dist/styles/'))
})


gulp.task('default', ['serve'])
