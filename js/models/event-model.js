(function ($, Backbone, models) {
    models.Event = Backbone.Model.extend({
        url: '/',

        defaults: function() {
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

})(jQuery, Backbone, window.app.models);