module.exports = function(gulp, config) {
  var del = require('del');

  gulp.task('av:clean:docs', function(cb) {
    del([config.docs.dest], function() {
      cb();
    });
  });

  gulp.task('av:clean:dist', function(cb) {
    del([config.lib.destDist], function() {
      cb();
    });
  });
};