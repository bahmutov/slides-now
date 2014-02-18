/*global module, require*/
module.exports = function(grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'nice-package': {
      all: {
        options: {
        }
      }
    },

    sync: {
      all: {
        options: {
          sync: ['author', 'name', 'version', 'private', 'license', 'keywords'],
        }
      }
    },

    bower: {
      install: {
        options: {
          targetDir: 'bower_components',
          copy: false,
          verbose: true,
          bowerOptions: {
            forceLatest: true
          }
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      'default': {
        src: ['Gruntfile.js', 'src/*.js']
      }
    },

    'jshint-solid': {
      all: {
        options: {}
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

    uglify: {
      components: {
        files: {
          'tmp/app.min.js': ['tmp/app.js']
        }
      }
    },

    concat: {
      css_app: {
        options: {
          separator: '\n',
          stripBanners: true,
          banner: '/*! <%= pkg.name %> - <%= pkg.version %> */\n\n'
        },
        src: [
          'css/*.css',
          'css/themes/*.css'
        ],
        dest: 'dist/slides-now.css'
      },
      css_vendor: {
        options: {
          separator: '\n',
          stripBanners: true,
          banner: '/*! <%= pkg.name %> - <%= pkg.version %> vendor css */\n\n'
        },
        src: [
          'components/alertify/alertify.css',
          'components/alertify/alertify.default.css',
          'bower_components/code-box/code-box.css'
        ],
        dest: 'dist/slides-now-vendor.css'
      },
      js_app: {
        options: {
          separator: ';\n',
          stripBanners: false,
          banner: '/*! <%= pkg.name %> - <%= pkg.version %> ' +
          'built on <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          'author: <%= pkg.author %>, support: @bahmutov */\n\n'
        },
        src: [
          'src/recenter.js',
          'src/recenterImages.js',
          'src/recenterCodeBlocks.js',
          'tmp/app.js'
        ],
        dest: 'dist/slides-now.js'
      },
      js_vendor: {
        options: {
          separator: ';\n',
          stripBanners: false,
          banner: '/*! <%= pkg.name %> - <%= pkg.version %> vendor js\n' +
          'built on <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          'author: <%= pkg.author %>, support: @bahmutov */\n\n'
        },
        src: [
          'bower_components/es5-shim/es5-shim.min.js',
          'bower_components/jquery/jquery.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/bespoke.js/dist/bespoke.min.js',
          'bower_components/bespoke-hash/dist/bespoke-hash.min.js',
          'bower_components/progress-bars/bar.js',
          'bower_components/purl/purl.js',
          'components/alertify/alertify.js',
          'components/flowType/flowtype.js',
          'bower_components/code-box/code-box.js'
        ],
        dest: 'dist/slides-now-vendor.js'
      }/*,
      min: {
        options: {
          separator: ';\n'
        },
        src: [
          'bower_components/es5-shim/es5-shim.min.js',
          'bower_components/jquery/jquery.min.js',
          'bower_components/angular/angular.min.js',
          'components/bespoke.js/dist/bespoke.min.js',
          'bower_components/purl/purl.js',
          'components/alertify/alertify.min.js',
          'bower_components/code-box/code-box.js',
          'src/recenter.js',
          'src/recenterImages.js',
          'src/recenterCodeBlocks.js',
          'tmp/app.min.js'
        ],
        dest: 'dist/slides-now.min.js'
      }*/
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
      },
      jquery: {
        options: {
          patterns: [
            {
              match: '//@ sourceMappingURL=es5-shim.map',
              replacement: '',
              expression: false,
              force: true
            },
            {
              match: '//@ sourceMappingURL=jquery-2.0.2.min.map',
              replacement: '',
              expression: false,
              force: true
            },
            {
              match: '//# sourceMappingURL=angular.min.js.map',
              replacement: '',
              expression: false,
              force: true
            }
          ],
          prefix: ''
        },
        files: {
          'dist/slides-now.js': 'dist/slides-now.js'
        }
      }
    },

    copy: {
      main: {
        files: {
          'dist/README.md': 'README.md',
          'dist/CHANGES.md': 'CHANGES.md',
          'dist/favicon.png': 'favicon.png'
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
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: [
        'CHANGES.md', 'README.md',
        'cache.manifest', 'favicon.png',
        'index.html',
        'sample.html',
        '*.css', '*.js'
      ]
    },

    watch: {
      all: {
        files: ['Gruntfile.js', 'src/**/*.js', 'css/**/*.css'],
        tasks: ['build']
      }
    }
  });

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('check', ['deps-ok', 'nice-package', 'jshint-solid', 'coffeelint', 'sync', 'bower']);
  grunt.registerTask('concat-all', ['concat:css_app', 'concat:css_vendor', 'concat:js_app', 'concat:js_vendor']);
  grunt.registerTask('test', ['clean-console']);
  grunt.registerTask('build', ['browserify', 'uglify', 'concat-all', 'replace', 'copy']);
  grunt.registerTask('default', ['check', 'build', 'test']);
};
