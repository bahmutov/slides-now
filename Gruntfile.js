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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['coffee']);
};