define(
    function (require) {
        var Backbone = require('backbone'),
            DayEvents = require('collections/DayEvents');

        return Backbone.Model.extend({
            url: '/',
            idAttribute: "date",

            defaults: function() {
                return {
                    date: '',
                    events: new DayEvents
                };
            },

            parse: function (response) {
                response.events = new DayEvents(response.events);

                return response;
            }

        });

    }
);