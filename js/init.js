require(['app', 'jquery', 'views/EventCalendar'],
    function (app, $, EventCalendar) {
        $(function () {
            app.initialize();
            var weekCalendar = new EventCalendar;
        });
    });
