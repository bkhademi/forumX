/**
 * Created by Brandon on 10/13/2016.
 */
angular.module('forumX').controller('ArticleFullCtrl', 
    ['$scope', '$routeParams','PostService','UserService','CommentService',
    function ($scope, $routeParams, Post, User, Comment) {
        
        // get the post details with its comments and the user details
        Post.get($routeParams.articleId).then(function(response){
            $scope.postInfo = response.data;
            return Comment.getForPost($routeParams.articleId);
        }).then(function(response){
            $scope.postInfo.comments = response.data;
            return User.get($scope.postInfo.userId);
        }).then(function(response){
            $scope.postInfo.user = response.data;
            console.log($scope.postInfo)
        })

    }]);