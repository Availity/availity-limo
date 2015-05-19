module.exports = function(gulp, config) {
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');
  var jscs = require('gulp-jscs');
  var logger = require('../utils/logger');

  gulp.task('av:lint', function() {
    if (config && config.js && config.js.src) {
      gulp.src(config.js.src)
        .pipe(jscs())
        .pipe(jshint(config.js.jshintrc))
        .pipe(jshint.reporter(stylish));
    } else {
      logger.error('You must define config.js.src.');
    }
  });
};
