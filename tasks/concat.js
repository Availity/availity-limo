module.exports = function(gulp, config) {
  var using = require('gulp-using');
  var gulpif = require('gulp-if');
  var concat = require('gulp-concat');
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;

  gulp.task('av:concat:vendor', function() {
    gulp.src(config.vendor.src)
      .pipe(gulpif(config.args.verbose, using({prefix:'Task [concat:vendor] using'})))
      .pipe(concat(config.vendor.name))
      .pipe(gulp.dest(config.vendor.dest))
      .pipe(reload({ stream:true }));
  });

};