module.exports = function(gulp, config) {
  var ghPages = require('gulp-gh-pages');
  var spawn = require('child_process').spawn;
  var bower = require(config.project.path + '/bower.json');

  gulp.task('av:publish:npm', function(done) {
    spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
  });

  gulp.task('av:publish:bower', function(done) {
    spawn('bower', ['register', bower.name, bower.repository], { stdio: 'inherit' }).on('close', done);
  });

  gulp.task('av:publish:ghpages', ['av:build:ghpages'], function () {
    var options = {};
    options.cacheDir = 'tmp/gh-pages'; //Check gulp-gh-pages to see if they have fixed the issue with tmp directory
    return gulp.src('./build/guide/**/*')
           .pipe(ghPages(options));
  });

};
