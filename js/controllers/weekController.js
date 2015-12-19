myApp.controller('WeekController', ['$scope', '$rootScope', 'Positions', 'Employees', 'ShiftCollection',

    function($scope, $rootScope, Positions, Employees, ShiftCollection) {


        $scope.employeesList = [];
        $scope.allShifts = [];

        $scope.employeesList = Employees.getEmployeesDataList();
        $scope.allShifts = ShiftCollection.getAllShift();

        $scope.Alldays = [ 
                        ['2015-12-06', '2015-12-07', '2015-12-08', '2015-12-09', '2015-12-10', '2015-12-11', '2015-12-12'], 

                        ['2015-12-13', '2015-12-14', '2015-12-15', '2015-12-16', '2015-12-17', '2015-12-18', '2015-12-19'],

                        ['2015-12-20', '2015-12-21', '2015-12-22', '2015-12-23', '2015-12-24', '2015-12-25', '2015-12-26']

                    ];
        $scope.broadcastCurrentWeek = function(){
            $rootScope.$broadcast('handleChageCurrentWeek');
        }

        var caculateCurrentWeek = function(){}

        var today = new Date();
        var currentWeek =  moment(today).week();
        //get all days in current week
        $scope.currentWeekDates = $scope.Alldays[1]; 
        //definisati if > 0 < 54

        $scope.nextWeek = function(){
            currentWeek = currentWeek + 1;
            $scope.broadcastCurrentWeek();
        }
        $scope.prevWeek = function(){
            currentWeek = currentWeek - 1;
            $scope.broadcastCurrentWeek();
        }
        $scope.$on('handleChageCurrentWeek', function(){
            $scope.currentWeekDates = $scope.Alldays[currentWeek];      
        })


        $scope.prepareDayForHeadrView = function(){
            var tmp_prep_days = [];
            angular.forEach($scope.days, function(value, key) {

                tmp_prep_days.push(moment().day(value));
            });
        }

        //$scope.dayForHeadrView = 


        //matrih for table
        $scope.digestEmpByDays = function() {
            $scope.shiftsInDays = [];

            
            //iterate through all days
            angular.forEach($scope.currentWeekDates, function(value, key) {
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
                $scope.shiftsInDays.push(
                {
                    "day": value,
                    "shifts" : tmp_shifts
                });

            });

            
        }

        if ($scope.employeesList.length > 0) {
            $scope.digestEmpByDays();
        }

        $scope.$on('handleChagePositionssList', function() {
            $scope.PositionsList = Positions.getPositionsDataList();

        });

        $scope.$on('handleChageEmployeesList', function() {
            $scope.employeesList = Employees.getEmployeesDataList();
            
        });

        $scope.$on('handleChangeShiftList', function() {
            $scope.allShifts = ShiftCollection.getAllShiftDataList();
            $scope.digestEmpByDays();
        });

        $scope.isEmployeeInShift = function(emp_id, shift_emp) {

            var tmp_check = false;

            angular.forEach(shift_emp, function(value, key) {
                if (parseInt(value) === parseInt(emp_id)) {
                    tmp_check = true;
                }
            });

            return tmp_check;
        }

        console.log($scope.shiftsInDays);

    }
]);
