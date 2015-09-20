module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ["build"],
            release: ["dist"]
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'build/main.css': 'app/styles/main.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')()
                ]
            },
            dist: {
                src: 'build/main.css'
            }
        },
        //jshint: {
        //    all: ['Gruntfile.js', 'build/app.js']
        //},
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/jQuery-One-Page-Nav/jquery.nav.js',
                    'bower_components/jquery-dateFormat/dist/jquery-dateFormat.js',
                    'bower_components/react/react.js',
                    'build/components/SearchResult.js',
                    'build/components/TeamSearchBox.js',
                    'build/app.js'
                ],
                dest: 'build/bundle.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/bundle.min.js': 'build/bundle.js'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/bundle.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                        'bower_components/font-awesome/css/font-awesome.min.css',
                        'build/main.css'
                    ]
                }
            }
        },
        babel: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/scripts',
                    src: ["**/*.{jsx,js}"],
                    dest: 'build',
                    ext: '.js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('js',
        ['babel', /*'jshint',*/ 'concat', 'uglify']
    );

    grunt.registerTask('css',
        ['sass', 'postcss', 'cssmin']
    );

    grunt.registerTask('default',
        ['clean', 'js', 'css']
    );
};
