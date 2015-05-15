module.exports = function(gulp, config) {
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');
  var jscs = require('gulp-jscs');

  gulp.task('av:lint:js', function() {
    gulp.src(config.js.src)
      .pipe(jscs())
      .pipe(jshint(config.js.jshintrc))
      .pipe(jshint.reporter(stylish));
  });

  gulp.task('av:lint:lib', function() {
    gulp.src(config.lib.targets)
      .pipe(jscs())
      .pipe(jshint(config.lib.jshintrc))
      .pipe(jshint.reporter(stylish));
  });
};
