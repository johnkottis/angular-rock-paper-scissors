'use strict';

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            materialFonts: {
                expand: true,
                flatten: true,
                src: 'fonts/Material-Design-Iconic-Font/**',
                dest: 'public/fonts/',
                filter: 'isFile'
            }
        },

        eslint: {
            target: [
                'gruntfile.js',
                'js/**/*.js'
            ]
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'vendors/angular/angular.min.js',
                    'js/apps/rps.app.js',
                    'js/controllers/rps.controller.js',
                    'js/factories/helpers.factory.js',
                    'js/factories/ai.factory.js',
                    'js/factories/game.factory.js'
                ],
                dest: 'temp/js/scripts.concat.js'
            }
        },

        babel: {
            options: {
                presets: ['es2015']
            },
            dist: {
                files: {
                    'temp/js/scripts.es2015.js': 'temp/js/scripts.concat.js'
                }
            }
        },

        uglify: {
            options: {
                sourceMap: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            buildBower: {
                src: 'temp/js/scripts.es2015.js',
                dest: 'public/js/scripts.min.js'
            }
        },

        sass: {
            dist: {
                files: {
                    'temp/css/main.css': 'scss/main.scss'
                }
            }
        },

        csso: {
            dynamic_mappings: {
                expand: true,
                cwd: 'temp/css',
                src: ['*.css', '!*.min.css'],
                dest: 'public/css',
                ext: '.min.css'
            }
        },

        clean: {
            temp: [
                '.sass-cache',
                'temp',
                '.grunt'
            ]
        },

        sasslint: {
            all: 'scss/main.scss',
            options: {
                bundleExec: false,
                config: '.scss-lint.yml'
            }
        }
    });

    grunt.registerTask('production', [
        'copy',
        'eslint',
        'sasslint',
        'concat',
        'babel',
        'uglify',
        'sass',
        'csso',
        'clean:temp'
    ]);
};
