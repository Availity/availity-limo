var gUtil = require('gulp-util');
var chalk = require('chalk');

var prefix = chalk.yellow('[availity]');

var log = function(color, message) {
  message = chalk[color](message);
  message = [prefix, message].join(' ');
  gUtil.log(message);
};

var logger = {};

logger.info = function(config, message) {
  if (!config.args.verbose) {
    return;
  }
  //var args = Array.prototype.slice.call(arguments);
  log('blue', message);
};

logger.warn = function(message) {
  log('yellow', message);
};

logger.error = function(message) {
  log('red', message);
};

module.exports = logger;
