var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');

var paths = {
  views: ['./*.html'],
  scripts: ['./*/**.js'],
  styles: ['./sass/*.scss']
};

gulp.task('connect', function() {
  connect.server({
    app:[__dirname],
    port: 3000,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(paths.views)
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(connect.reload());
});


gulp.task('sass', function () {
  gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./styles'))
    .pipe( connect.reload() );
});

gulp.task('watch', function () {
  gulp.watch(paths.views, ['html']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['sass']);
});

gulp.task('default', ['connect', 'scripts', 'sass', 'html', 'watch']);
