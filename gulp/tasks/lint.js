module.exports = function(gulp, config) {
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');
  var jscs = require('gulp-jscs');
  var logger = require('../utils/logger');

  gulp.task('av:lint', function() {
    if (config && config.js && config.js.jshintrc) {
      var src = [];
      if (config && config.js && config.js.src) {
        src = src.concat(config.js.src);
      }
      if (config && config.lib && config.lib.src) {
        src = src.concat(config.lib.src);
      }

      if (src.length > 0) {
        gulp.src(src)
          .pipe(jscs())
          .pipe(jshint(config.js.jshintrc))
          .pipe(jshint.reporter(stylish));
      } else {
        logger.error('You must define config.js.src and/or config.lib.src.');
      }
    } else {
      logger.error('You must define config.js.jshintrc');
    }
  });
};
