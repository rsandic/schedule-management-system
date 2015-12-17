myApp.factory('ShiftCollection', ['$rootScope', '$firebaseArray', 'Shift',
    function($rootScope, $firebaseArray, Shift) {
        var factory = {};
        var allShifts = [];

        factory.allShifts = [];

        var ref = new Firebase("https://schedule-m-s.firebaseio.com/shifts");
        var tmp_all_shifts = $firebaseArray(ref);


        tmp_all_shifts.$loaded()
            .then(function() {
                angular.forEach(tmp_all_shifts, function(value, key) {
                    angular.forEach(value.position, function(value1, key1) {
                    });

                    var tmp_shift = new Shift();
                    tmp_shift.setShiftValues(value);
                    allShifts.push(tmp_shift.getData());
                });

                factory.broadcatShiftList();
            })
            .catch(function(err) {
                console.error(err);
            });

        factory.allShifts = allShifts;

        factory.broadcatShiftList = function() {
            $rootScope.$broadcast('handleChangeShiftList');
        }

        factory.getAllShift = function() {
            return factory.allShifts;
        }

        return factory;
    }
]);


myApp.factory('Shift', function() {
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

                data.position = position_id;
            },
            getPosition: function() {
                return data.position;
            },
            setEmployees: function(employees) {
                var retArray = [];
                angular.forEach(employees, function(value, key) {
                    retArray.push(value);
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
