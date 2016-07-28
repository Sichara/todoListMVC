define(
    ['backbone', 'collections/DayEvents'],
    function (Backbone, DayEvents) {
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