define(
    function (require) {
        var Day = require('models/Day');
        require('backboneLocalStorage');

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