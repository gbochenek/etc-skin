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
          'etc_extension/scripts/script.min.js': ['script.js']
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
          'etc_extension/styles/style.min.css': 'style.css'
        }
      }
    },

    copy: {
      extension: {
        files: [{
          src: 'manifest.json',
          dest: 'etc_extension/'
        }, {
          expand: true,
          flatten: true,
          src: 'bower_components/font-awesome/fonts/*',
          dest: 'etc_extension/fonts/'
        }, {
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: 'bower_components/jquery/dist/jquery.min.js',
          dest: 'etc_extension/scripts/'
        }, {
          expand: true,
          flatten: true,
          src: 'images/extension_icons/*',
          dest: 'etc_extension/images/'
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
  grunt.registerTask('default', ['uglify', 'sass', 'cssnano', 'copy']);
  //Zip extension for chrome upload
  grunt.registerTask('extension', ['default', 'zip_directories']);
};
