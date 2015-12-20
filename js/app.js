var myApp = angular.module('myApp', [
    'ngRoute',
    'firebase'
]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/week', {
        templateUrl: 'partials/week-view.html',
        controller: 'WeekController'
    }).when('/day/:date', {
        templateUrl: 'partials/day-view.html',
        controller: 'DayController'
    }).
    otherwise({
        redirectTo: '/week'
    });
}]);
