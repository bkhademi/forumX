/**
 * Created by Brandon on 10/12/2016.
 */
 angular.module('forumX').factory('PostService',
 	['$http', 'UserService', 'API_URL',function($http,User, API_URL){
 		var URL = API_URL + 'posts';
 		factory = {};
 		// get all the posts in the database and load them in this service's all
 		factory.getAll = function(){
 			var promise = $http.get(URL)
 			
 			promise.then(function(response){
 				factory.all = response.data;
 				var promise = User.getAll();
				return promise;
 			}) .then(function(response){
 				var users = response.data
 				// convert users to hash
 				var usersHash = {}
 				angular.forEach(users, function(user){
 					usersHash[user.id] = user;
 				});
 				angular.forEach(factory.all, function(item){
 					item.user = usersHash[item.userId];
 				})
 			})
 			return promise
 		}

 		factory.get = function(postId){
 			return $http.get(URL+'/'+postId)
 		}

 		// requests the posts for a user and returns 
 		factory.getAllForUser = function(userId){
 			var qs = {userId:userId}
 			return $http.get(URL, {params:qs})
 		}




 		return factory;
 	}])