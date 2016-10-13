/**
 * Created by Brandon on 10/12/2016.
 */
 angular.module('forumX').factory('UserService',
 	['$http', 'API_URL',function($http, API_URL){
 		var URL = API_URL + 'users?callback=JSON_CALLBACK'
 		factory = {};
 		factory.getAll = function(){
 			return $http.jsonp(URL).then(function(response){
 				var users = response.data;
 			})
 		}

 		factory.getAllForUser = function(){

 		}

 		return factory;

 	}])