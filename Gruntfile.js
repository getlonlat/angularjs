(function(undefined) {
	module.exports = function(grunt) {

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			concat: {
				app: {
					dest: 'build/js/app.min.js',
					src: [
						'node_modules/angular/angular.js',
						'node_modules/angular-route/angular-route.js',
						'node_modules/angular-geohash/dist/angular-geohash.min.js',
						'node_modules/angular-clipboard/angular-clipboard.js',
						'node_modules/angular-toastr/dist/angular-toastr.min.js',
						'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',

						'app/app.js',
						'app/config.js',
						'app/constants.js',
						'app/routes.js',
						'app/components/home/HomeController.js',
						'app/services/MapService.js',
						'app/services/GeocoderService.js'
					]
				}
			},

			copy: {
				assets: {
					files: [{
						src: ['img/*'], dest: 'build/'
					}, {
						expand: true, flatten: true,
						src: ['js/**.*'], dest: 'build/js'
					}, {
						expand: true, flatten: true,
						src: ['node_modules/font-awesome/fonts/**.*'], dest: 'build/fonts'
					}]
				},
				deploy: {
					files: [{
						src: ['build/**/*'], dest: 'deploy/'
					}, {
						src: ['index.html'], dest: 'deploy/index.html'
					}, {
						src: ['app/components/home/home.html'], dest: 'deploy/app/components/home/home.html'
					}, {
						src: ['img/close.gif'], dest: 'deploy/img/close.gif'
					}]
				}
			},

			uglify: {
				app: {
					options: { mangle: false },
					files: { 'build/js/app.min.js': ['build/js/app.min.js'] }
				}
			},

			cssmin: {
				combine: {
					files: {
						'build/css/app.min.css': [
							'css/bootstrap-paper.min.css',
							'node_modules/font-awesome/css/font-awesome.css',
							'node_modules/angular-toastr/dist/angular-toastr.min.css',
							'css/app.css',
						]
					}
				}
			},

			watch: {
				js: {
					files: ['Gruntfile.js', 'app/**/*.js'],
					tasks: ['concat:app'],
					options: { atBegin: true, liveReload: true }
				},
				css: {
					files: ['Grutfile.js', 'css/**/*.css'],
					tasks: ['cssmin'],
					options: { atBegin: true, liveReload: true }
				}
			},

			'gh-pages': {
		    options: {
		      base: 'deploy',
					message: 'Deploy'
		    },
		    src: ['**']
		  },

		  notify_hooks: {
		    options: { enabled: true, success: true, max_jshint_notifications: 5 }
		  }
		});

		grunt.loadNpmTasks('grunt-notify');
		grunt.task.run('notify_hooks');

		grunt.registerTask('default', ['concat',  'cssmin', 'copy:assets']);
		grunt.registerTask('deploy', ['default', 'copy:deploy', 'gh-pages']);

		require('time-grunt')(grunt);
		require('jit-grunt')(grunt);
	};

})();
