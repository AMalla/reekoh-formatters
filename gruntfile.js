'use strict';

module.exports = function (grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverJS: ['./atrack/*.js', './gosafe/*.js', './meitrack/*.js' ,'./queclink/*.js']
	};

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		jshint: {
			all: {
				src: watchFiles.serverJS,
				options: {
					jshintrc: true
				}
			}
		}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function () {

	});
	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// Default task(s).
	grunt.registerTask('default', ['lint']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig']);
};
