var gulp = require('gulp');
var _ = require('lodash');
var logger = require('./utils/logger');
var tasks = require('require-dir')('./tasks', { recurse: true });
var config = require('./config');

_.forEach(tasks, function(task) {
  try {
    var result = /gulp\.task\(['"](.*)['"]/m.exec(task.toString());
    var taskName = (result && result.length > 1) ? result[1] : 'unknown';
    logger.info(config, 'task added: ' + taskName);
    task(gulp, config);
  } catch (err) {
    logger.warn('task skipped: ' + taskName + '; ' + err);
  }
});
