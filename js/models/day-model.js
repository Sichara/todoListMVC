(function ($, Backbone, models, collections) {
    models.Day = Backbone.Model.extend({
        url: '/',
        idAttribute: "date",

        defaults: function() {
            return {
                date: '',
                events: new collections.DayEvents
            };
        },

        parse: function (response) {
            response.events = new collections.DayEvents(response.events);

            return response;
        }

    });

})(jQuery, Backbone, window.app.models, window.app.collections);