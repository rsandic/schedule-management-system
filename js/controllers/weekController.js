myApp.controller('WeekController', ['$scope', '$rootScope', 'Position', 'Employees', 'ShiftCollection',

    function($scope, $rootScope, Position, Employees, ShiftCollection) {


        $scope.employeesList = [];
        $scope.allShifts = [];

        $scope.employeesList = Employees.getEmployeesList();
        $scope.allShifts = ShiftCollection.getAllShift();

        $scope.shiftsInDays = {};
        $scope.days = ['2015-12-13', '2015-12-14', '2015-12-15', '2015-12-16', '2015-12-17T09', '2015-12-18', '2015-12-19'];


        $scope.digestEmpByDays = function() {
            $scope.shiftsInDays = {
                "days": $scope.days,
                "employs": $scope.employeesList,
                "shifts": []
            };

            //iterate through all days
            angular.forEach($scope.shiftsInDays.days, function(value, key) {
                var tmp_check_in_day = false;
                var tmp_check_in_shift = false;

                //iterate through all shifts
                angular.forEach($scope.allShifts, function(value1, key1) {
                    //if time of shift and 
                    if (value === value1.date_time) {
                        tmp_check_in_day = true;
                        angular.forEach(value1.employees, function(value2, key2) {

                            var tmp_emp = Employees.getEmployeeById(value2);
                            if (tmp_emp != null) {
                                tmp_check_in_shift = true;
                            }
                            console.log(tmp_emp);

                        });

                        if (tmp_check_in_shift) {
                            $scope.shiftsInDays.shifts.push(value1);
                        }

                    }
                });
                //
                if (!tmp_check_in_day) {
                    $scope.shiftsInDays.shifts.push('');
                }

            });

            console.log($scope.shiftsInDays);
        }



        if ($scope.employeesList.length > 0) {
            $scope.digestEmpByDays();
        }

        $scope.$on('handleChagePositionsList', function() {
            $scope.positionList = Position.getPositionsList();

        });



        $scope.$on('handleChageEmployeesList', function() {
            $scope.employeesList = Employees.getEmployeesList();
            $scope.digestEmpByDays();

        });

        $scope.$on('handleChangeShiftList', function() {
            $scope.allShifts = ShiftCollection.getAllShift();
            //console.log($scope.allShifts);
            $scope.digestEmpByDays();
        });

        // $scope.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        $scope.isEmployeeInShift = function(emp_id, shift_emp) {

            var tmp_check = false;

            angular.forEach(shift_emp, function(value, key) {
                if (parseInt(value) === parseInt(emp_id)) {
                    tmp_check = true;
                }
            });

            return tmp_check;
        }



    }
]);
