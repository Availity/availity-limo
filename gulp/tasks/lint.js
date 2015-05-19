module.exports = function(gulp, config) {
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');
  var jscs = require('gulp-jscs');
  var logger = require('../utils/logger');

  gulp.task('av:lint', ['av:lint:js', 'av:lint:lib']);

  gulp.task('av:lint:js', function() {
    if (config && config.js && config.js.src) {
      if (config && config.js && config.js.jshintrc) {
        gulp.src(config.js.src)
          .pipe(jscs())
          .pipe(jshint(config.js.jshintrc))
          .pipe(jshint.reporter(stylish));
      } else {
        logger.error('You must define config.js.jshintrc.');
      }
    } else {
      logger.warn('config.js.src not defined; skipping.');
    }
  });

  gulp.task('av:lint:lib', function() {
    if (config && config.lib && config.lib.src) {
      if (config && config.lib && config.lib.jshintrc) {
        gulp.src(config.lib.src)
          .pipe(jscs())
          .pipe(jshint(config.lib.jshintrc))
          .pipe(jshint.reporter(stylish));
      } else {
        logger.error('You must define config.lib.jshintrc.');
      }
    } else {
      logger.warn('config.lib.src not defined; skipping.');
    }
  });
};
