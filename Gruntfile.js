/* jshint node:true */
'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			main: {
				src: ['*.js', 'lib/**/*'],
				options: {
					jshintrc: true
				}
			}
		},
		jscs: {
			main: {
				config: '.jscsrc',
				src: ['*.js', 'lib/**/*'],
			}
		}
	});

	grunt.registerTask('default', [
		'jshint',
		'jscs'
	]);

};
