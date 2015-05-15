module.exports = function(gulp, config) {
  var gulpif = require('gulp-if');
  var browserSync = require('browser-sync');
  var using = require('gulp-using');
  var reload = browserSync.reload;

  gulp.task('av:sync:css', function() {

    return gulp.src(config.css.src)
      .pipe(gulpif(config.args.verbose, using({prefix:'Task [sync:css] using'})))
      .pipe(reload({stream:true}));
  });

};