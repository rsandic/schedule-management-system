myApp.factory('Employees', ['$rootScope', '$firebaseArray',
    function($rootScope, $firebaseArray) {

        var factory = {};
        factory.employees = [];

        var ref = new Firebase("https://schedule-m-s.firebaseio.com/employees");
        var tmp_employees_list = $firebaseArray(ref);
        var tmp_employees_list_all = [];

        tmp_employees_list.$loaded()
            .then(function() {
                angular.forEach(tmp_employees_list, function(value, key) {
                    tmp_employees_list_all.push(value);
                });
                factory.broadcastEmployeesList();
            })
            .catch(function(err) {
                console.error(err);
            });

        factory.employees = tmp_employees_list_all;

        factory.broadcastEmployeesList = function() {
            $rootScope.$broadcast('handleChageEmployeesList');
        }
        factory.getEmployeesList = function() {
            return factory.employees;
        }

        factory.getEmployeeById = function(id) {
            var tmp_ret_value = null;
            angular.forEach(factory.employees, function(value, key) {
                if(id === value.id){
                    tmp_ret_value = value;
                }
            });
            return tmp_ret_value;
        }

        return factory;
    }
]);