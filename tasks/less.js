module.exports = function(gulp, config) {
  var less = require('gulp-less');

  gulp.task('av:less', function() {
    return gulp.src(config.less.src)
      .pipe(less())
      .pipe(gulp.dest(config.less.dest));
  });
};