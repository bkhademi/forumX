/**
 * Created by Brandon on 10/12/2016.
 */
 angular.module('forumX').factory('PostService',
 	['$http', 'UserService', 'API_URL',function($http,User, API_URL){
 		var URL = API_URL + 'posts/1';
 		console.log("url",URL)
 		factory = {};
 		factory.getAll = function(){
 			var posts = null;
 			return $http.get("http://jsonplaceholder.typicode.com/posts").then(function(response){
 				posts = response;
 				return User.getAll();
 			}).then(function(response){
 				var users = response.data
 				var pos = posts
 				debugger
 			})
 		}

 		factory.getAllForUser = function(){

 		}
 		return factory;
 	}])