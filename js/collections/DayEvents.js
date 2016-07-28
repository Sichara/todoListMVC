define(
    ['jquery', 'backbone', 'models/Event', 'localstorage'],
    function ($, Backbone, Event) {
        return Backbone.Collection.extend({
            localStorage: new Backbone.LocalStorage("backbone-days-events-collection"),
            model: Event,

            initialize: function () {

            }

        });

    });