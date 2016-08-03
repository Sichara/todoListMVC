require(
    ['jquery', 'views/EventCalendar', 'text!../templates/main.html', 'config'],
    function ($, EventCalendar, template) {

        $('body').append(template);
        new EventCalendar;
    });
