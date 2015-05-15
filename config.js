var argv = require('minimist')(process.argv.slice(2));
var path = require('path');

module.exports = {
  args: {
    verbose: !!argv.verbose
  },
  project: {
    path: path.resolve(__dirname, '.')
  },
  verb: {
    src: ['docs/readme/readme.config.md'],
    name: 'README.md',
    dest: './'
  },
  js: {
    src: ['gulpfile.js', 'tasks/*.js', 'utils/*.js']
  },
  test: {
    src: ['./test/**/*.js']
  },
  dotfiles: {
    src: [
      {
        url: 'https://git.availity.com/projects/API/repos/availity-dotfiles/browse/jshint/.jshintrc?raw',
        dest: './.jshintrc'
      },
      {
        url: 'https://git.availity.com/projects/API/repos/availity-dotfiles/browse/jshint/.jshintignore?raw',
        dest: './.jshintignore'
      },
      {
        url: 'https://git.availity.com/projects/API/repos/availity-dotfiles/browse/jscs/.jscsrc?raw',
        dest: './.jscsrc'
      }
    ]
  }
};
