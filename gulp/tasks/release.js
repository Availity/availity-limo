module.exports = function(gulp, config) {

  var logger = require('../utils/logger');

  if (config && config.project && config.project.path) {
    var bump = require('gulp-bump');
    var prompt = require('gulp-prompt');
    var semver = require('semver');
    var git = require('gulp-git');
    var filter = require('gulp-filter');
    var tagVersion = require('gulp-tag-version');
    var pkg = require(config.project.path + '/package.json'); // this needs to be relative to the path of the project it is running from
    var type = 'patch';

    gulp.task('av:release', function() {
      if (config && config.packages && config.packages.src) {
        return gulp.src('')
          .pipe(prompt.prompt({
            type: 'rawlist',
            name: 'bump',
            message: 'What type of version bump would you like to do ? (current version is ' + pkg.version + ')',
            choices: [
              'patch (' + pkg.version +' --> ' + semver.inc(pkg.version, 'patch') + ')',
              'minor (' + pkg.version + ' --> ' + semver.inc(pkg.version, 'minor') + ')',
              'major (' + pkg.version + ' --> ' + semver.inc(pkg.version, 'major') + ')',
              'none (exit)'
            ]
          }, function(res) {
            if(res.bump.match(/^patch/)) {
              type = 'patch';
            } else if(res.bump.match(/^minor/)) {
              type = 'minor';
            } else if(res.bump.match(/^major/)) {
              type = 'major';
            } else {
              type = null;
            }
            if (type) {
              gulp.start('release:sequence');
            }
          }));
      } else {
        logger.error('You must define config.packages.src.');
      }
    });

    gulp.task('av:release:tag', function() {
      return gulp.src(config.packages.src)
        .pipe(git.commit('bump package version')) // commit the changed version number
        .pipe(filter('package.json'))
        .pipe(tagVersion());
    });

    gulp.task('av:release:bump', function() {
      return gulp.src(config.packages.src)
        .pipe(bump({ type: type }))
        .pipe(gulp.dest('./'));
    });

    gulp.task('release:sequence', function() {
      var runSequence = require('run-sequence').use(gulp);
      runSequence(
        'av:lint',
        'av:release:bump',
        'av:readme',
        'av:release:tag'
      );
    });
  } else {
    logger.error('You must define config.project.path');
  }
};
