module.exports = function(gulp, config) {

  var frontMatter = require('gulp-front-matter');
  var _ = require('lodash');
  var fs = require('fs');
  var gulpsmith = require('gulpsmith');
  var templates = require('metalsmith-templates');
  var collections = require('metalsmith-collections');
  var metalsmithPrism = require('metalsmith-prism');
  var metalsmithMock = require('metalsmith-mock');
  var metalsmithPaths = require('metalsmith-path');
  var filter = require('gulp-filter');
  var gulpif = require('gulp-if');
  var rename = require('gulp-rename');
  var using = require('gulp-using');
  var moment = require('moment');
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;

  var Sort = require('../utils/metalsmith.title.sorting');
  var handlebarsPaths = require('../utils/handlebars.paths');
  var handlebarsPartials = require('../utils/handlebars.partials');

  var Handlebars = require('handlebars');

  //-----------------Tasks Below-------------------------------------------

  gulp.task('av:build:handlebars:partials', function() {

    Handlebars.registerHelper('base', handlebarsPaths);
    var partials = handlebarsPartials(config);

    _.each(partials, function(path, name) {
      Handlebars.registerPartial(name, fs.readFileSync(path, 'utf8'));
    });

    Handlebars.registerHelper('is', function(a, b, opts) {
      if(a === b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    });

    Handlebars.registerHelper('date', function() {
      return moment().format('YYYY');
    });

    // http://funkjedi.com/technology/412-every-nth-item-in-handlebars/
    Handlebars.registerHelper('grouped_each', function(every, context, options) {
      var out = '';
      var subcontext = [];
      var i;
      if(context && context.length > 0) {
        for(i = 0; i < context.length; i++) {
          if(i > 0 && i % every === 0) {
            out += options.fn(subcontext);
            subcontext = [];
          }
          subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
      }
      return out;
    });
  });

  gulp.task('av:build:docs', function() {
    var sortComponents;
    if(config.docs.sort.components !== null && config.docs.sort.components !== undefined && config.docs.sort.components !== '') {
      sortComponents = new Sort(config.docs.sort.components);
    }

    return gulp.src(config.docs.all.src)
      .pipe(gulpif(config.args.verbose, using({prefix:'`build:docs` [dest] using'})))
      .pipe(frontMatter()).on('data', function(file) {
        _.assign(file, file.frontMatter);
        delete file.frontMatter;
      })
    .pipe(gulpsmith()
        .use(collections(config.collections(sortComponents)))
        .use(metalsmithPaths())
        .use(metalsmithPrism())
        .use(metalsmithMock())
        .use(templates({
          engine: config.docs.templates.engine,
          directory: config.docs.templates.src
        }))
        .on('error', console.log.bind(console))
        )
      // only include full pages and ignore page snippets in dest build folder
      .pipe(filter(config.filters))
      .pipe(gulpif(config.args.verbose, using({prefix:'`build:docs` [dest] using'})))
      .pipe(rename(function(file) {
        if(!/\.hbs/.test(file.extname)) {
          return;
        }
        file.extname = '.html';
      }))
    .pipe(gulp.dest(config.docs.dest))
      .pipe(reload({stream:true}));
  });

  // this will probably need to get the tasks from the config file.
  //gulp.task('av:build:ghpages', config.task.ghpages);
};
