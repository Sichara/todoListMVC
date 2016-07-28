define(
    ['jquery', 'backbone', 'models/Day', 'localstorage'],
    function ($, Backbone, Day) {
        return Backbone.Collection.extend({
            model: Day,
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

    });