module.exports = function(gulp, config) {

  var verb = require('gulp-verb');
  var logger = require('../utils/logger');

  gulp.task('av:readme', function() {
    if (config && config.readme && config.readme.src && config.readme.dest) {
      return gulp.src(config.readme.src)
        .pipe(verb({dest: 'README.md'}))
        .pipe(gulp.dest(config.readme.dest));
    } else {
      logger.error('You must define config.readme.src and config.readme.dest.');
    }
  });
};
