define(
    ['jquery', 'backbone', 'localstorage', 'models/Event'],
    function ($, Backbone, backboneLocalStorage, Event) {
        return Backbone.Collection.extend({
            localStorage: new Backbone.LocalStorage("backbone-days-events-collection"),
            model: Event,

            initialize: function () {

            }

        });

    });