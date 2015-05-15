var gUtil = require('gulp-util');
var chalk = require('chalk');
var util = require('util');

var prefix = chalk.yellow('[availity]');

var log = function(color, args) {
  var message = util.format.apply(util, args);
  message = chalk[color](message);
  message = [prefix, message].join(' ');
  gUtil.log(message);
};

var logger = {};

logger.info = function(config, args) {
  if (!config.args.verbose) {
    return;
  }
  args = Array.prototype.slice.call(args);
  log('blue', args);
};

logger.warn = function() {
  var args = Array.prototype.slice.call(arguments);
  log('yellow', args);
};

logger.error = function() {
  var args = Array.prototype.slice.call(arguments);
  log('red', args);
};

module.exports = logger;
