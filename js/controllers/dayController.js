myApp.controller('DayController', ['$scope', '$rootScope', '$routeParams', 'Position', 'Employees', 'ShiftCollection',

    function($scope, $rootScope, $routeParams, Position, Employees, ShiftCollection) {

    	$scope.today_shift_date = $routeParams.date;
    	$scope.today_shift_data = ShiftCollection.getShiftForOneDay($scope.today_shift_date);
    	$scope.first_shift_start = 8;
    	$scope.second_shift_start = 16;
    	$scope.shift_length = 8;

    	

    	console.log($scope.today_shift_data);
    }
]);
