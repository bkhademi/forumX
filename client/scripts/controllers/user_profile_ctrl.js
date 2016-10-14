/**
 * Created by Brandon on 10/13/2016.
 */
angular.module('forumX').controller('UserProfileCtrl',
    ['$scope', '$routeParams','UserService', 'PostService',
        function ($scope, $routeParams, User, Post) {

            User.get($routeParams.userId).then(function(response){
                $scope.user = response.data;
                return Post.getAllForUser($routeParams.userId);
            }).then(function(response){
                $scope.user.posts = response.data;
            });

            $scope.saveUser = function () {
                var userCopy = angular.copy($scope.user);
                delete (userCopy.posts);
                User.update(userCopy)
            }

        }
    ]);