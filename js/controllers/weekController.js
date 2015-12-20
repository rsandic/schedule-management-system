myApp.controller('WeekController', ['$scope', '$rootScope', 'TimeCollection', 'Positions', 'Employees', 'ShiftCollection',

    function($scope, $rootScope, TimeCollection, Positions, Employees, ShiftCollection) {


        $scope.employees_list = [];
        $scope.all_shifts = [];
        $scope.tody_date_class = false;

        $scope.employees_list = Employees.getEmployeesDataList();
        $scope.all_shifts = ShiftCollection.getAllShift();

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
            } else {
                $scope.current_week = 1;
            }
            $scope.current_week_dates = $scope.all_weeks_with_days[$scope.current_week];
            $scope.arrangeEmpByDays();
        };

        $scope.arrangeEmpByDays = function() {
            $scope.shiftsInDays = [];


            //iterate through all days in current week
            angular.forEach($scope.current_week_dates, function(value, key) {
                var tmp_shifts = [];
                //iterate through all shifts
                angular.forEach($scope.all_shifts, function(value1, key1) {
                    //if time of shift and day is same 
                    if (value === value1.date_time) {
                        tmp_shifts.push(value1);
                    }
                });

                $scope.shiftsInDays.push({
                    "day": value,
                    "day_name": (moment(value).format('dddd')),
                    "shifts": tmp_shifts
                });

            });

        };

        if ($scope.employees_list.length > 0) {
            $scope.all_shifts = ShiftCollection.getAllShiftDataList();
            $scope.arrangeEmpByDays();
        }

        $scope.$on('handleChagePositionssList', function() {
            $scope.PositionsList = Positions.getPositionsDataList();

        });

        $scope.$on('handleChageemployees_list', function() {
            $scope.employees_list = Employees.getEmployeesDataList();

        });

        $scope.$on('handleChangeShiftList', function() {
            $scope.all_shifts = ShiftCollection.getAllShiftDataList();

            $scope.arrangeEmpByDays();
        });


    }
]);
