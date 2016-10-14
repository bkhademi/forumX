/**
 * Created by Brandon on 10/13/2016.
 */
angular.module('forumX').directive('postPanel', function () {
    return {
        restrict: 'AE',
        templateUrl: 'views/directives/post_panel.html',
        replace: true,
        scope: {
            postInfo: '=',
            showImg: '='
        }
    }
});