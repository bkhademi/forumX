/**
 * Created by Brandon on 10/12/2016.
 */
 angular.module('forumX').factory('UserService',
 	['$http', 'API_URL',function($http, API_URL){
 		var URL = API_URL + 'users'
 		factory = {};
 		factory.getAll = function(){
 			return $http.get(URL)
 		}

 		factory.get = function(userId){
 			return $http.get(URL+'/'+userId)
 		}

 		factory.update = function(user){
 			var promise = $http.put(URL+'/'+user.id)

 			promise.then(function(response){
 				alert("update was successfull");
 			}, function(err){
 				alert("there was an error trying to update the user, Please try again",err);
 			})

 			return promise
 		}


 		return factory;

 	}])