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
    },

    copy: {
      extension: {
        files: [{
          src: 'style.min.css',
          dest: 'etc_extension/styles/'
        }, {
          src: 'script.min.js',
          dest: 'etc_extension/scripts/'
        }]
      }
    },

    zip_directories: {
      extension: {
        files: [{
          filter: 'isDirectory',
          expand: true,
          src: ['etc_extension'],
          dest: './'
        }]
      }
    }
    // End of Task Config
  });

  // Task Registration

  // Default task
  grunt.registerTask('default', ['uglify', 'sass', 'cssnano']);
  grunt.registerTask('extension', ['default', 'copy', 'zip_directories']);
};
