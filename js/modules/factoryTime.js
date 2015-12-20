myApp.factory('TimeCollection', ['$rootScope', function($rootScope) {
    var factory = {};

    factory.array_of_weeks_with_days = [];
    factory.current_week = null;
    factory.current_week_with_dates = [];
    factory.weekdays_for_header = [];


    var today = new Date();
    //calculate current week with moment
    var current_week = moment(today).week();

    //get all days in current week
    factory.current_week = current_week;
    
    var begin = moment().isoWeekday(1).startOf('week');    


    //all dates and weeks in one year
    var tmp_weekdays = moment.weekdays();
    var tmp_array_of_weeks = [];
    var array_of_weeks_with_days = [];

    for (var i = 1; i < 54; i++) {
        tmp_array_of_weeks.push(i);
    }


    angular.forEach(tmp_array_of_weeks, function(value, key) {

        var tmp_array_of_days_in_week = [];

        angular.forEach(tmp_weekdays, function(value1, key1) {
            tmp_array_of_days_in_week.push(((moment().day(value1).week(value)).format('YYYY-MM-DD')));
        });

        array_of_weeks_with_days[value] = tmp_array_of_days_in_week;
    });

    //hold all weeks with dates inside
    factory.array_of_weeks_with_days = array_of_weeks_with_days;

    factory.weekdays_for_header = tmp_weekdays;

    factory.getWeekDaysForHeader = function(){
        return factory.weekdays_for_header;
    }

    factory.getAllWeeksWithDates = function() {
        return factory.array_of_weeks_with_days;
    };

    return factory;

}]);
