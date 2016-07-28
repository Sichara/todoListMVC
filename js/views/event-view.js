(function ($, Backbone, views, _, utils, CONST) {
    $(function () {
        views.Event = Backbone.View.extend({
            template: _.template($('#eventTemplate').html()),
            tagName: 'div',
            className: "b-event",

            events: {
                "dblclick .view": "edit"
            },

            initialize: function () {

            },

            render: function () {
                var height, left, top, expand,
                    start, end,
                    modelJSON;

                modelJSON = this.model.toJSON();
                this.$el.html(this.template(modelJSON));

                start = utils.parseTime(modelJSON.timeStart);
                end = utils.parseTime(modelJSON.timeEnd);
                expand = modelJSON.expand;

                top = CONST.HOUR_HEIGHT * start;
                height = CONST.HOUR_HEIGHT * (end - start);
                left = expand * CONST.DAY_WIDTH;
                this.$el.css({
                    top: top + 'px',
                    height: height + 'px',
                    left: left + 'px'
                }).data('id', this.model.get('id'));

                return this;
            }
        });

    });

})(jQuery,
    Backbone,
    window.app.views,
    _,
    window.app.utils,
    window.app.CONST);