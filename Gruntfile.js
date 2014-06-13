module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
         src:[
              'assets/js/modernizr.js',
              'assets/js/phoneformat.js',
              'assets/js/es5.js',
              'assets/js/event_emmitter.js',
        ],
        dest: 'dist/app.js'
      },

      css: {
        //src: ['assets/css/font.css', 'assets/css/**/*.css'],
        src: ['assets/css/**/*.css'],
        dest: 'dist/styles.css'
      }
    },

    sass: {
      dev: {
        sourcemap: true,
        files: [{
          expand: true,
          cwd: 'assets/sass/',
          src: '**/*.scss',
          dest: 'assets/css',
          ext: '.css'
        }]
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.min.js': ['dist/app.js']
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/styles.min.css': ['dist/styles.css']
        }
      }
    },

    processhtml: {
      dist: {
        files: {
          'dist/index.html' : ['index.html']
        }
      }
    },

    copy: {
      dist: {
        src: 'assets/images/**/*',
        dest: 'dist/'
      },

      // fonts: {
      //   src: 'assets/fonts/*',
      //   dest: 'dist/'
      // }
    },

    watch: {
      styles: {
        files: ['assets/sass/**/*', 'index.html'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },

      reload: {
        files: ['assets/js/**/*'],
        options: {
          livereload: true
        }
      }
    },

    'string-replace': {
      dist: {
        files: {
          'dist/styles.css' : 'dist/styles.css',
          'dist/index.html' : 'dist/index.html'
        },

        options: {
          replacements : [
            {
              pattern: /\.\.\/\.\./g,
              replacement: "assets"
            },
            {
              pattern: /\.\./g,
              replacement: "assets" 
            }
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('dist', ['processhtml', 'sass', 'concat', 'string-replace', 'uglify', 'cssmin', 'copy']);
};
