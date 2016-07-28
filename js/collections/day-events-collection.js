(function ($, Backbone, collections, models) {
    collections.DayEvents = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("backbone-days-events-collection"),
        model: models.Event,

        initialize: function () {

        }

    });

})(jQuery, Backbone, window.app.collections, window.app.models);