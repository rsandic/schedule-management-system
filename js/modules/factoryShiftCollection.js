myApp.factory('ShiftCollection', ['$rootScope', '$firebaseArray', 'Shift',
    function($rootScope, $firebaseArray, Shift) {
        var factory = {};
        factory.all_shifts = [];
        factory.all_shifts_data = [];

        var tmp_shifts_list_all = [];
        var tmp_shifts_data_list = [];

        var ref = new Firebase("https://schedule-m-s.firebaseio.com/shifts");
        var tmp_all_shifts = $firebaseArray(ref);


        tmp_all_shifts.$loaded()
            .then(function() {
                angular.forEach(tmp_all_shifts, function(value, key) {
                    var tmp_shift = new Shift();
                    tmp_shift.setShiftValues(value);
                    tmp_shifts_list_all.push(tmp_shift);
                    tmp_shifts_data_list.push(tmp_shift.getData());
                });

                factory.broadcatShiftList();
            })
            .catch(function(err) {
                console.error(err);
            });

        factory.all_shifts = tmp_shifts_list_all;   
        factory.all_shifts_data = tmp_shifts_data_list;

        factory.broadcatShiftList = function() {
            $rootScope.$broadcast('handleChangeShiftList');
        };

        factory.getAllShift = function() {
            return factory.all_shifts;
        };

        factory.getAllShiftDataList = function() {
            return factory.all_shifts_data;
        };
        factory.getShiftForOneDay = function(shift_date){
            var tmp_shift_date = shift_date + '';
            var retValue = {};
            angular.forEach(factory.all_shifts_data, function(value, key) {
                if(value.date_time === tmp_shift_date){
                    retValue = value;
                } 
            });
            return retValue;
        };

        return factory;
    }
]);


myApp.factory('Shift', function(Employees, Positions) {
    var Shift = function() {
        var data = {
            name: '',
            date_time: '',
            position: [],
            employees: []
        }
        return {
            setData: function(new_data) {
                data = new_data;
            },
            getData: function() {
                return data;
            },
            setName: function(name) {
                data.name = name;
            },
            getName: function() {
                return data.name;
            },
            setDateTime: function(date_time) {
                data.date_time = date_time;
            },
            getDateTime: function() {
                return data.date_time;
            },
            setPosition: function(position_id) {
                data.position = Positions.getPositionById(position_id);
            },
            getPosition: function() {
                return data.position;
            },
            setEmployees: function(employees) {
                var retArray = [];
                angular.forEach(employees, function(value, key) {
                    var tmp_emp = Employees.getEmployeeById(value);
                    retArray.push(tmp_emp);
                });
                data.employees = retArray;
            },
            getEmployees: function() {
                return data.employees;
            },
            setShiftValues: function(item) {
                this.setName(item.name);
                this.setDateTime(item.date_time);
                this.setPosition(item.position);
                this.setEmployees(item.employees);
            }
        };
    };

    return Shift;
});
