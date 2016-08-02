define(
    function (require) {
        var EventCalendar = require('views/EventCalendar'),
            $ = require('jquery'),
            template = require('text!../templates/main.html');

        $('body').append(template);
        new EventCalendar;
    });
