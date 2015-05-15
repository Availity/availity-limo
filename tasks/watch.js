module.exports = function(gulp, config) {

  gulp.task('av:watch:css', function() {
    gulp.watch(config.css.src, ['sync:css']);
  });

  gulp.task('av:watch:partials', function() {
    gulp.watch(config.docs.partials.src, ['build:handlebars:partials', 'build:docs']);
  });

  gulp.task('av:watch:docs', function() {
    gulp.watch([
        config.docs.all.src,
        config.docs.templates.targets,
        config.docs.partials.targets],
        ['av:build:docs']);
  });
};
