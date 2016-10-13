/**
 * Created by Brandon on 10/12/2016.
 */
angular.module('forumX', [

    //Angular Modules
    'ngRoute', 'ui.bootstrap'

])
.constant("API_URL", 'http://jsonplaceholder.typicode.com/')
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        })

}]);