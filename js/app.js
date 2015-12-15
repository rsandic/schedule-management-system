var myApp = angular.module('myApp', [
    'ngRoute',
    'firebase'
]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/week', {
        templateUrl: 'partials/list.html',
        controller: 'ListController'
    }).when('/day/', {
        templateUrl: 'partials/admin.html',
        controller: 'AdminController'
    }).
    otherwise({
        redirectTo: '/week'
    });
}]);
