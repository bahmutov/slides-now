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

    concat: {
      options: {
        separator: ';\n'
      },
      dist: {
        src: [
          'components/angular/angular.min.js',
          'components/bespoke.js/dist/bespoke.min.js',
          'components/markdown/lib/markdown.js',
          'components/jquery/jquery.min.js',
          'drop.js'
        ],
        dest: 'dist/slides-now.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['coffee']);
};