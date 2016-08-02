define(
    function (require) {
        var $ = require('jquery'),
            Backbone = require('backbone');

        return Backbone.Model.extend({
            url: '/',

            defaults: function () {
                return {
                    title: "",
                    description: '',
                    timeStart: '00:00',
                    timeEnd: '00:00',
                    id: $.now(),
                    expand: 0
                };
            }

        });
    }
);