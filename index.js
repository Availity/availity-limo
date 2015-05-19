module.exports = function(gulp, config) {

  var logger = require('./gulp/utils/logger');
  var _ = require('lodash');
  var tasks = require('require-dir')('./gulp/tasks', {recurse: true});

  if (!config.args) {
    logger.error('config.args not defined');
  }

  _.forEach(tasks, function(task) {
    try {
      var result = /gulp\.task\(['"](.*)['"]/m.exec(task.toString());
      var taskName = (result && result.length > 1) ? result[1] : "unknown";
      task(gulp, config);
      logger.info(config, 'task added: ' + taskName);
    } catch (err) {
      if (config.args && config.args.verbose) {
        logger.warn('task skipped: ' + taskName + '; ' + err);
      }
    }
  });
};
