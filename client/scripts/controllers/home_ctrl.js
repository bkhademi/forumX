/**
 * Created by Brandon on 10/12/2016.
 */
angular.module('forumX').controller('HomeCtrl', ['$scope', '$log',"PostService",
    function ($scope, $log, Post) {
        Post.getAll().then(
            function(response){
                $scope.posts = splitToThreeArrays(response.data);
                console.log($scope.posts)
            }
        )

        function splitToThreeArrays(array){
            var totalLength = array.length
            var newArray = []
            var segmentSize = Math.ceil(totalLength/3)
            for(var i= 0 ; i < 3; i++)
                newArray.push(array.slice(i*segmentSize,(i+1)*segmentSize))

            return newArray
        }
    }]);