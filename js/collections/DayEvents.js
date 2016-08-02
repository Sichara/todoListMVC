define(
    function (require) {
        var Event = require('models/Event');
        require('backboneLocalStorage');

        return Backbone.Collection.extend({
            localStorage: new Backbone.LocalStorage("backbone-days-events-collection"),
            model: Event,

            initialize: function () {

            }
        });
    });