myApp.factory('TimeCollection', ['$rootScope', function($rootScope) {
    var factory = {};

    factory.array_of_weeks_with_days = [];
    factory.current_week = null;
    factory.current_week_with_dates = [];

    //test dates only 3 weeks
    factory.all_days = [
        ['2015-12-06', '2015-12-07', '2015-12-08', '2015-12-09', '2015-12-10', '2015-12-11', '2015-12-12'],

        ['2015-12-13', '2015-12-14', '2015-12-15', '2015-12-16', '2015-12-17', '2015-12-18', '2015-12-19'],

        ['2015-12-20', '2015-12-21', '2015-12-22', '2015-12-23', '2015-12-24', '2015-12-25', '2015-12-26']

    ];

    var today = new Date();
    //calculate current week with moment
    var current_week = moment(today).week();

    //get all days in current week
    factory.current_week = current_week;
    
    //generic solution for all dates and weeks in one year
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

    //factory.current_week_with_dates = factory.array_of_weeks_with_days[51]; 


    factory.getAllWeeksWithDates = function() {
        return factory.array_of_weeks_with_days;
    };

    // factory.getCurrentWeekWithDates = function() {
    //     return factory.current_week_with_dates;
    // };
  

    return factory;

}]);
