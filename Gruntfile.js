/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
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
          'tmp/app.min.js': ['tmp/app.js']
        }
      }
    },

    concat: {
      css: {
        options: {
          separator: '\n',
          stripBanners: true,
          banner: '/*! <%= pkg.name %> - <%= pkg.version %> */\n\n'
        },
        src: [
          'css/drop.css',
          'css/style.css',
          'css/themes.css',
          'components/alertify/alertify.css',
          'components/alertify/alertify.default.css',
          'bower_components/code-box/code-box.css',
          'css/drop.css',
        ],
        dest: 'dist/slides-now.css'
      },
      dev: {
      	options: {
        	separator: ';\n',
          stripBanners: false,
          banner: '/*! <%= pkg.name %> - <%= pkg.version %> ' +
          'built on <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          'author: <%= pkg.author %>, support: @bahmutov */\n\n'
      	},
        src: [
          'bower_components/angular/angular.min.js',
          'bower_components/bespoke.js/dist/bespoke.min.js',
          'bower_components/bespoke-hash/dist/bespoke-hash.min.js',
          'bower_components/jquery/jquery.min.js',
          'bower_components/progress-bars/bar.js',
          'bower_components/purl/purl.js',
          'components/alertify/alertify.js',
          'components/flowType/flowtype.js',
          'bower_components/code-box/code-box.js',
          'src/recenter.js',
          'src/recenterImages.js',
          'src/recenterCodeBlocks.js',
          'tmp/app.js'
        ],
        dest: 'dist/slides-now.js'
      },
      min: {
        options: {
          separator: ';\n'
        },
        src: [
          'bower_components/angular/angular.min.js',
          'components/bespoke.js/dist/bespoke.min.js',
          'bower_components/jquery/jquery.min.js',
          'bower_components/purl/purl.js',
          'components/alertify/alertify.min.js',
          'bower_components/code-box/code-box.js',
          'src/recenter.js',
          'src/recenterImages.js',
          'src/recenterCodeBlocks.js',
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
          'dist/CHANGES.md': 'CHANGES.md',
          'dist/favicon.png': 'favicon.png',
          'dist/jquery.min.map': 'bower_components/jquery/jquery.min.map'
        }
      },
      sample: {
        files: {
          'dist/sample.html': 'sample.html'
        }
      }
    },

    'clean-console': {
      all: {
        options: {
          url: 'dist/index.html'
        }
      }
    }
  });

  var plugins = require('matchdep').filter('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('check', ['coffeelint']);
  grunt.registerTask('concat-all', ['concat:css', 'concat:dev']);
  grunt.registerTask('test', ['clean-console']);
  grunt.registerTask('default', ['check', 'browserify', 'uglify', 'concat-all', 'replace', 'copy', 'test']);
};
