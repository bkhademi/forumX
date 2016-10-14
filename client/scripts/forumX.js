/**
 * Created by Brandon on 10/12/2016.
 */
angular.module('forumX', [

    //Angular Modules
    'ngRoute', 'ui.bootstrap', 'xeditable'

])
    .constant("API_URL", 'http://jsonplaceholder.typicode.com/')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/public/user/:name/:userId', {
                templateUrl: 'views/public_user_profile.html',
                controller: 'PublicUserProfileCtrl'
            })
            .when('/user/:userId/profile', {
                templateUrl: 'views/user_profile.html',
                controller: 'UserProfileCtrl'
            })
            .when('/article_full/:articleId', {
                templateUrl: 'views/article_full.html',
                controller: 'ArticleFullCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })

    }]);