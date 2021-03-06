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
  if (config && config.args && config.args.verbose) {
    log('blue', message);
  }
};

logger.warn = function(message) {
  log('yellow', message);
};

logger.error = function(message) {
  log('red', message);
};

module.exports = logger;
