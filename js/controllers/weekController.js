myApp.controller('WeekController', ['$scope', '$rootScope', 'TimeCollection', 'Positions', 'Employees', 'ShiftCollection',

    function($scope, $rootScope, TimeCollection, Positions, Employees, ShiftCollection) {


        $scope.employees_list = [];
        $scope.all_shifts = [];
        $scope.tody_date_class = false;
        $scope.matrix = [
            []
        ];
        $scope.matrix1 = [
            []
        ];

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

        $scope.broadcastMatrix = function() {
            $rootScope.$broadcast('handleChangeMatrix');
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

        $scope.makeMatrix = function() {

            $scope.current_week_dates_with_current_date = [];
            $scope.current_week_dates_with_current_date = $scope.today_date + ',';
            $scope.current_week_dates_with_current_date =
                $scope.current_week_dates_with_current_date.concat($scope.current_week_dates);
                
            $scope.matrix[0] = $scope.current_week_dates_with_current_date;

            angular.forEach($scope.employees_list, function(value, key) {

                var tmp_shift_names = [];
                var tmp_week_shifts = [];
                angular.forEach($scope.current_week_dates, function(value1, key1) {
                    var tmp_shifts_in_day = [];

                    tmp_shifts_in_day = ShiftCollection.getShiftForOneDay(value1);
                    tmp_shift_names_in_day = ShiftCollection.getAllEmpInShift(tmp_shifts_in_day, value.id);

                    tmp_week_shifts.push(tmp_shift_names_in_day);


                });

                tmp_week_shifts.unshift(value.first_name);

                $scope.matrix[value.first_name] = tmp_week_shifts;


            });

        };


        if ($scope.employees_list.length > 0) {
            $scope.all_shifts = ShiftCollection.getAllShiftDataList();
            $scope.arrangeEmpByDays();
        }

        $scope.$on('handleChagePositionsList', function() {
            $scope.PositionsList = Positions.getPositionsListData();

        });

        $scope.$on('handleChageEmployeesList', function() {
            $scope.employees_list = Employees.getEmployeesDataList();

        });

        $scope.$on('handleChangeShiftList', function() {
            $scope.all_shifts = ShiftCollection.getAllShiftDataList();
            $scope.makeMatrix();
            //console.log($scope.matrix);
            $scope.broadcastMatrix();
            $scope.arrangeEmpByDays();
        });

        $scope.$on('handleChangeMatrix', function() {
            console.log($scope.matrix);
            $scope.matrix1 = $scope.matrix;
        });
        


    }
]);
