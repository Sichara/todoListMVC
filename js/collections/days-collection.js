(function ($, Backbone, collections, models) {
    collections.Days = Backbone.Collection.extend({
        model: models.Day,
        localStorage: new Backbone.LocalStorage("backbone-days-collection"),

        initialize: function () {
            this.listenTo(Backbone, 'deleteEvent', this.deleteEvent);
        },

        deleteEvent: function (idEvent, date) {
            var dayModel = this.get(date);
            dayModel.get('events').remove(idEvent);

            this.create(dayModel);
        }
    });

})(jQuery,
    Backbone,
    window.app.collections,
    window.app.models);