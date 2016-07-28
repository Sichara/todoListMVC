/*(function ($, Backbone, models) {


 })(jQuery, Backbone, window.app.models);*/

define(
    ['jquery', 'backbone'],
    function ($, Backbone) {
        Event = Backbone.Model.extend({
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