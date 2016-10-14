/**
 * Created by Brandon on 10/13/2016.
 */
 angular.module('forumX').controller('PublicUserProfileCtrl',
     ['$scope', '$routeParams','UserService', 'PostService',
     function ($scope, $routeParams, User, Post) {
        
        User.get($routeParams.userId).then(function(response){
            $scope.user = response.data;
            return Post.getAllForUser($routeParams.userId);
        }).then(function(response){
            $scope.user.posts = response.data;
        })

    }
    ]);