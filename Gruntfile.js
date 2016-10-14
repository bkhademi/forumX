"use strict";
var LIVERELOAD_PORT = 35728;
var lrSnippet = require("connect-livereload")({port: LIVERELOAD_PORT});

var mountFolder = function(connect, dir){
	return connect.static(require("path").resolve(dir));
};

module.exports = function(grunt){
	require("load-grunt-tasks")(grunt);
	require("time-grunt")(grunt);

	//paths
	var Configapp = {
		app:"client",
		dist:"dist",
		docs:"docs"
	};

	grunt.initConfig({
		appConfig:Configapp,
		watch:{
			html:{
				files:["<%= appConfig.app %>/views/**", "<%= appConfig.app %>/index.html"],
				tasks:["build"]
			},
			scripts:{
				files:["<%= appConfig.app %>/scripts/**"],
				tasks:['build']
			},
			styles:{
				files:["<%= appConfig.app %>/styles/**"],
				tasks:['build']
			},
			livereload:{
				options:{
					livereload: LIVERELOAD_PORT
				},
				files:[
				"<%= appConfig.app %>/index.html",
				"<%= appConfig.app %>/views/**/*.html",
				"<%= appConfig.app %>/styles-less/**/*.less",
				"<%= appConfig.app %>/scripts/**/*.js",
				"<%= appConfig.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}",
				]
			}
		},
		connect:{
			options:{
				port:8080,
				hostname:"0.0.0.0"
			},
			livereload:{
				options:{
					middleware:function(connect){
						return [lrSnippet,mountFolder(connect,'.tmp'), mountFolder(connect, 'dist')];
					}
				}
			},
			dist:{
				options:{
					middleware:function(connect){
						return [mountFolder(connect,'dist')];
					}
				}
			}
		},
		open:{
			server:{
				url:'http://localhost:<%= connect.options.port %>'
			}
		},
		clean:{
			dist:{
				files:[{
					dot:true,
					src:[".tmp", "<%= appConfig.dist %>/*", "!<%=appConfig.dist%>/.git*"]
				}]
			},
			all:[
			".tmp",
			"client/bower_components",
			],
			server:[".tmp"]
		},
		jshint:{
			options:{
				jshintrc:".jshintrc"
			},
			all:["Gruntfile.js","<%= appConfig.app %>/scripts/**/*.js"]
		},
		less:{
			server:{
				options:{
					stringMatch:true,
					dumpLineNumbers:true,
					sourceMap:true,
					sourceMapRootPath:"",
					outputSourceFiles:true
				},
				files:[
				{
					expand:true,
					cwd:"<%= appConfig.app %>/styles-less",
					src:"main.less",
					dest:".tmp/styles",
					ext:".css"
				}
				]
			},
			dist:{
				options:{
					cleancss:true,
					report:'min'
				},
				files:[
				{
					expand:true,
					cwd:"<%= appConfig.app %>.styles-less",
					src:"main.less",
					dest:".tmp/styles",
					ext:".css"
				}
				]
			}
		},
		useminPrepare:{
			html: "<%= appConfig.app %>/index.html",
			options:{
				dest:"<%= appConfig.dist %>",
				flow:{
					steps:{
						js:["concat"],
						css:["cssmin"]
					},
					post:[]
				}
			}
		},
		usemin:{
			html:["<%= appConfig.dist %>/**/*.html", "!<%= appConfig.dist %>/bower_components/**"],
			css:["<%= appConfig.dist %>/styles/**/*.css"],
			options:{
				dirs:["<%= appConfig.dist %>"]
			}
		},
		htmlmin:{
			dist:{
				options:{},
				files:[
				{
					expand:true,
					cwd:"<%= appConfig.app %>",
					src:["*.html", "views/*.html"],
					dest:"<%= appConfig.dist %>"
				}
				]
			}
		},
		copy:{
			dist:{
				files:[{
					expand:true,
					dot:true,
					cwd:"<%= appConfig.app %>",
					dest:"<%= appConfig.dist %>",
					src:[
					"favicon.ico",
					"bower_components/font-awesome/css/*",
					"bower_components/font-awesome/fonts/*",
					"images/**/*",
					"styles/images/**/*",
					"views/**/*"
					]
				},{
					expand:true,
					cwd:".tmp",
					dest:"<%= appConfig.dist %>",
					src:["styles/**"]
				},{
					expand:true,
					cwd:".tmp/images",
					dest:"<%= appConfig.dist %>/images",
					src:["generated/*"]
				}]
			},
			styles:{
				expand:true,
				cwd:"<%= appConfig.app %>/styles",
				dest:".tmp/styles/",
				src:"**/*.css"
			}
		},
		cssmin:{
			options:{
				keepSpecialComments: '0'
			},
			dist:{}    
		},
		concat:{
			options:{
				separator: grunt.util.linefeed + ';' + grunt.util.linefeed
			},
			dist:{}
		},
		uglify:{
			options:{
				beautify:true,
				mangle:false
			},
			dist:{
				files:{
					"<%= appConfig.dist %>/scripts/forumX.js": [
					".tmp/**/*.js",
					"<%= appConfig.app %>/scripts/**/*.js",
					"!<%= appConfig.app %>/scripts/vendors/**"
					]
				}
			}
		}
	});

	grunt.registerTask("server", function(target){
		var taskToRun = target==="dist"?'serve:dist':'serve';
		return grunt.task.run(taskToRun);
	});

	grunt.registerTask("serve", function(target){
		var tasksToRun= target==='dist'?['build','open','connect:dist:keepalive']:["clean:server",'build', 'connect:livereload', 'open', 'watch'];
		return grunt.task.run(tasksToRun);
	});

	grunt.registerTask('build', ["clean:dist", "useminPrepare",'htmlmin', 'copy:dist', 'cssmin', 'concat', 'usemin']);

	grunt.registerTask("default", ["server"]);

}