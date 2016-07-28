define(
    'app', function () {
        return {
            initialize: function () {
                this.CONST.DAY_WIDTH = 100;
                this.CONST.HOUR_HEIGHT = 60;
                var weekCalendar = new this.views.EventCalendar;
            },

            views: {},
            models: {},
            collections: {},
            CONST: {}
        };
    }
);
