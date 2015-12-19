myApp.factory('Positions', ['$rootScope', '$firebaseArray', 'Position',
    function($rootScope, $firebaseArray, Position) {

        var factory = {};
        factory.positions = [];
        factory.positions_data = [];

        var ref = new Firebase("https://schedule-m-s.firebaseio.com/position");
        var tmp_positions_list = $firebaseArray(ref);
        var tmp_positions_list_all = [];
        var tmp_positions_data_list = [];

        tmp_positions_list.$loaded()
            .then(function() {
                angular.forEach(tmp_positions_list, function(value, key) {
                    var tmp_position = new Position();
                    tmp_position.setPositionValues(value);
                    tmp_positions_list_all.push(tmp_position);
                    tmp_positions_data_list.push(tmp_position.getData());
                });
                factory.broadcastPositionList();
            })
            .catch(function(err) {
                console.error(err);
            });

        factory.positions = tmp_positions_list_all;
        factory.positions_data = tmp_positions_data_list;

        factory.broadcastPositionList = function() {
            $rootScope.$broadcast('handleChagePositionsList');
        }
        factory.getPositionsList = function() {
            return factory.positions;
        }
        factory.getPositionsListData = function() {
            return factory.positions_data;
        }
        factory.getPositionById = function(id) {
            var tmp_value = {};
            angular.forEach(factory.positions, function(value, key) {
                if (value.getId() === id) {
                    tmp_value = value.getData();
                }
            });

            return tmp_value;

        }


        return factory;
    }
]);

myApp.factory('Position', function() {
    var Position = function() {
        var data = {
            id: null,
            name: '',
            color: ''
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
            setName: function(name) {
                data.name = name;
            },
            getName: function() {
                data.name;
            },
            setColor: function(color) {
                data.color = color;
            },
            getColor: function() {
                return data.color;
            },
            setPositionValues: function(item) {
                this.setId(item.id);
                this.setName(item.name);
                this.setColor(item.color);
            }
        };
    };

    return Position;
});
