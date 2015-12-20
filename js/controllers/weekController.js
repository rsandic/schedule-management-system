myApp.controller('WeekController', ['$scope', '$rootScope', 'TimeCollection', 'Positions', 'Employees', 'ShiftCollection',

    function($scope, $rootScope, TimeCollection, Positions, Employees, ShiftCollection) {


        $scope.employeesList = [];
        $scope.allShifts = [];

        $scope.employeesList = Employees.getEmployeesDataList();
        $scope.allShifts = ShiftCollection.getAllShift();

        $scope.today_date = moment(new Date()).format('YYYY-MM-DD');
        
        $scope.current_week = TimeCollection.current_week;
        $scope.all_weeks_with_days = TimeCollection.getAllWeeksWithDates();
        $scope.current_week_dates = $scope.all_weeks_with_days[$scope.current_week];
        $scope.weekdays_for_header = TimeCollection.getWeekDaysForHeader();
    
        $scope.prevWeek = function() {
            if ($scope.current_week > 1) {
                $scope.current_week = $scope.current_week - 1;
            } else {
                $scope.current_week = 53;
            }
            $scope.current_week_dates = $scope.all_weeks_with_days[$scope.current_week];
            $scope.arrangeEmpByDays();
        };

        $scope.nextWeek = function() {
            if ($scope.current_week > 0 && $scope.current_week < 53) {
                $scope.current_week = $scope.current_week + 1;
            }
            else {
                $scope.current_week = 1;
            }
            $scope.current_week_dates = $scope.all_weeks_with_days[$scope.current_week];
            $scope.arrangeEmpByDays();
        };

        $scope.arrangeEmpByDays = function() {
            $scope.shiftsInDays = [];


            //iterate through all days
            angular.forEach($scope.current_week_dates, function(value, key) {
                var tmp_shifts = [];

                // console.log($scope.allShifts);
                //iterate through all shifts
                angular.forEach($scope.allShifts, function(value1, key1) {
                    //if time of shift and day is same 
                    //console.info(value1);
                    if (value === value1.date_time) {
                        tmp_shifts.push(value1);
                    }
                });

                $scope.shiftsInDays.push({
                    "day": value,
                    "day_name" : (moment(value).format('dddd')),   
                    "shifts": tmp_shifts
                });

            });

        };

        if ($scope.employeesList.length > 0) {

            $scope.arrangeEmpByDays();
        }

        $scope.$on('handleChagePositionssList', function() {
            $scope.PositionsList = Positions.getPositionsDataList();

        });

        $scope.$on('handleChageEmployeesList', function() {
            $scope.employeesList = Employees.getEmployeesDataList();

        });

        $scope.$on('handleChangeShiftList', function() {
            $scope.allShifts = ShiftCollection.getAllShiftDataList();

            $scope.arrangeEmpByDays();
        });


    }
]);
