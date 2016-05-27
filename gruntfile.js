/* global module */
module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Code Quality Tasks
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    uglify: {
      dist: {
        files: {
          'script.min.js': ['script.js']
        }
      }
    },

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Sass/CSS Tasks
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    sass: {
      options: {

      },
      dist: {
        files: {
          'style.css': 'style.scss'
        }
      }
    },

    cssnano: {
      options: {

      },
      dist: {
        files: {
          'style.min.css': 'style.css'
        }
      }
    }
    // End of Task Config
  });

  // Task Registration

  // Default task
  grunt.registerTask('default', ['uglify', 'sass', 'cssnano']);
};
