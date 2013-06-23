/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // compile and concat into single file
    coffee: {
      compile: {
        files: {
          'drop.js': ['presentation.coffee', 'drop.coffee']
        }
      }
    },

    uglify: {
      components: {
        files: {
          'components/markdown/lib/markdown.min.js': ['components/markdown/lib/markdown.js'],
          'drop.min.js': ['drop.js']
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
          'components/markdown/lib/markdown.min.js',
          'components/jquery/jquery.min.js',
          'drop.js'
        ],
        dest: 'dist/slides-now.js'
      },
      min: {
        src: [
          'components/angular/angular.min.js',
          'components/bespoke.js/dist/bespoke.min.js',
          'components/markdown/lib/markdown.min.js',
          'components/jquery/jquery.min.js',
          'drop.min.js'
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

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('default', ['coffee', 'uglify', 'concat:dev', 'replace', 'copy']);
};