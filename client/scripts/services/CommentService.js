/**
 * Created by Brandon on 10/12/2016.
 */
 angular.module('forumX').factory('CommentService',
 	['$http', 'API_URL','UserService',function($http, API_URL, User){
 		var URL = API_URL + 'comments';
 		var factory = {};
 		factory.getForPost = function(postId){
 			var qs = {postId:postId};
 			return $http.get(URL, {params:qs});

 		}

 		return factory;

 	}])