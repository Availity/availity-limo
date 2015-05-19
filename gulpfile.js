var gulp = require('gulp');
var _ = require('lodash');
var logger = require('./gulp/utils/logger');
var tasks = require('require-dir')('./gulp/tasks', { recurse: true });
var config = require('./gulp/config');

_.forEach(tasks, function(task) {
  try {
    var result = /gulp\.task\(['"](.*?)['"]/m.exec(task.toString());
    var taskName = (result && result.length > 1) ? result[1] : 'unknown';
    task(gulp, config);
    logger.info(config, 'task added: ' + taskName);
  } catch (err) {
    logger.warn('task skipped: ' + taskName + '; ' + err);
  }
});
