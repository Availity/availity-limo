module.exports = function(gulp, config) {

  var verb = require('gulp-verb');

  gulp.task('av:readme', function() {
    return gulp.src(config.readme.src)
      .pipe(verb({dest: config.readme.name}))
      .pipe(gulp.dest(config.readme.dest));
  });
};
