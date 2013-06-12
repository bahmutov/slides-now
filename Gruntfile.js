/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        files: {
          'drop.js': ['drop.coffee'] // compile and concat into single file
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

    copy: {
      main: {
        files: {
          'dist/index.html': 'index.html',
          'dist/README.md': 'README.md',
          'dist/drop.css': 'css/drop.css',
          'dist/style.css': 'components/bespoke.js/demo/style.css',
          'dist/themes.css': 'components/bespoke.js/demo/themes.css'
          /*
          'dist/slides-now.css': ['css/drop.css',
            'components/bespoke.js/demo/style.css',
            'components/bespoke.js/demo/themes.css']
          */
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['coffee', 'uglify', 'concat:dev', 'copy']);
};