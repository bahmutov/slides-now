/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      'default': {
        src: ['src/*.js']
      }
    },

    coffeelint: {
      options: {
        max_line_length: {
          level: 'ignore'
        }
      },
      app: ['src/*.coffee']
    },

    // compile and concat into single file
    browserify: {
      'tmp/app.js': ['src/*.coffee'],
      options: {
         transform: ['coffeeify']
      }
    },

    coffee: {
      compile: {
        files: {
          'tmp/app.js': ['src/presentation.coffee', 'src/drop.coffee']
        }
      }
    },

    uglify: {
      components: {
        files: {
          // 'components/markdown/lib/markdown.min.js': ['components/markdown/lib/markdown.js'],
          'tmp/app.min.js': ['tmp/app.js']
        }
      }
    },

    concat: {
      options: {
        separator: ';\n'
      },
      dev: {
        src: [
          'components/angular/angular.min.js',
          'components/bespoke.js/dist/bespoke.min.js',
          'components/bespoke-hash/dist/bespoke-hash.min.js',
          //'components/markdown/lib/markdown.min.js',
          'components/jquery/jquery.min.js',
          'components/progress-bars/bar.js',
          'tmp/app.js'
        ],
        dest: 'dist/slides-now.js'
      },
      min: {
        src: [
          'components/angular/angular.min.js',
          'components/bespoke.js/dist/bespoke.min.js',
          // 'components/markdown/lib/markdown.min.js',
          'components/jquery/jquery.min.js',
          'tmp/app.min.js'
        ],
        dest: 'dist/slides-now.min.js'
      }
    },

    replace: {
      dist: {
        options: {
          variables: {
            version: 'version: <%= pkg.version %>',
            timestamp: 'timestamp: <%= grunt.template.today() %>'
          },
          prefix: '@@'
        },
        files: {
          'dist/index.html': 'index.html',
          'dist/cache.manifest': 'cache.manifest'
        }
      }
    },

    copy: {
      main: {
        files: {
          'dist/README.md': 'README.md',
          'dist/drop.css': 'css/drop.css',
          'dist/style.css': 'css/style.css',
          'dist/themes.css': 'css/themes.css',
          'dist/favicon.png': 'favicon.png'
        }
      }
    }
  });

  var plugins = require('matchdep').filter('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['coffeelint', 'browserify', 'uglify', 'concat:dev', 'replace', 'copy']);
};