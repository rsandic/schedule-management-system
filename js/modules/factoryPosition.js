myApp.factory('Position', ['$rootScope', '$firebaseArray',
    function($rootScope, $firebaseArray) {

        var factory = {};
        factory.positions = [];

        var ref = new Firebase("https://schedule-m-s.firebaseio.com/position");
        var tmp_positions_list = $firebaseArray(ref);
        var tmp_positions_list_all = [];

        tmp_positions_list.$loaded()
            .then(function() {
                angular.forEach(tmp_positions_list, function(value, key) {
                    tmp_positions_list_all.push(value);
                });
                factory.broadcastPositionList();
            })
            .catch(function(err) {
                console.error(err);
            });

        factory.position = tmp_positions_list_all;

        factory.broadcastPositionList = function() {
            $rootScope.$broadcast('handleChagePositionsList');
        }
        factory.getPositionsList = function() {
            return factory.position;
        }
        //get color by id for each,tmp chek

        //get name by id

        return factory;
    }
]);
