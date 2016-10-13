/**
* Created by Brandon on 10/12/2016.
*/
angular.module('forumX').controller('HomeCtrl',
	['$scope', '$log', 'PostService','$http',
	function ($scope, $log, Post, $http) {
		// Post.getAll().then(function(response){
		// 	var data = response.data;
		// 	console.log("data",data)
		// });
		$scope.posts = []; $http.get("http://jsonplaceholder.typicode.com/posts") 
  .success(function(data){
    console.log(data);
   $scope.posts = data; // Los datos traidos desde la api de jsonplaceholder serán almacenados en el atributo posts para luego usarlo en html
  })
  .error(function(err){
    
  });
	}]);