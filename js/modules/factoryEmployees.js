myApp.factory('Employees', ['$rootScope', '$firebaseArray', 'Employee',
    function($rootScope, $firebaseArray, Employee) {

        var factory = {};
        factory.employees = [];
        factory.employees_data = [];

        var ref = new Firebase("https://schedule-m-s.firebaseio.com/employees");
        var tmp_employees_list = $firebaseArray(ref);
        var tmp_employees_list_all = [];
        var tmp_employees_data_list = [];

        tmp_employees_list.$loaded()
            .then(function() {
                angular.forEach(tmp_employees_list, function(value, key) {
                    var tmp_employee = new Employee();
                    tmp_employee.setEmployeeValues(value);
                    tmp_employees_list_all.push(tmp_employee);
                    tmp_employees_data_list.push(tmp_employee.getData());
                });
                factory.broadcastEmployeesList();
            })
            .catch(function(err) {
                console.error(err);
            });

        factory.employees = tmp_employees_list_all;
        factory.employees_data = tmp_employees_data_list;

        factory.broadcastEmployeesList = function() {
            $rootScope.$broadcast('handleChageEmployeesList');
        }
        factory.getEmployeesList = function() {
            return factory.employees;
        }
        factory.getEmployeesDataList = function() {
            return factory.employees_data;
        }

        factory.getEmployeeById = function(id) {
            var tmp_ret_value = null;
            angular.forEach(factory.employees, function(value, key) {
                if (id === value.getId()) {
                    tmp_ret_value = value.getData();
                }
            });
            
            return tmp_ret_value;
        }

        return factory;
    }
]);

myApp.factory('Employee', function(Positions) {
    var Employee = function() {
        var data = {
            id: null,
            first_name: '',
            last_name: '',
            avatar: '',
            position: null
        }
        return {
            setData: function(new_data) {
                data = new_data;
            },
            getData: function() {
                return data;
            },
            setId: function(id) {
                data.id = id;
            },
            getId: function() {
                return data.id;
            },
            setFirstName: function(first_name) {
                data.first_name = first_name;
            },
            getFirstName: function() {
                return data.first_name;
            },
            setLastName: function(last_name) {
                data.last_name = last_name;
            },
            setAvatar: function(avatar) {
                data.avatar = avatar;
            },
            getAvatar: function() {
                return data.avatar;
            },
            getLastName: function() {
                return data.last_name;
            },
            setPosition: function(position_id) {
                data.position = Positions.getPositionById(position_id);
            },
            getPosition: function() {
                return data.position;
            },
            setEmployeeValues: function(item) {
                this.setId(item.id);
                this.setFirstName(item.first_name);
                this.setLastName(item.last_name);
                this.setAvatar(item.avatar);
                this.setPosition(item.position);
            }
        };
    };

    return Employee;
});
