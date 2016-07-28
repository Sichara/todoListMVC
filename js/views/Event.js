define('Event',
    ['jquery', 'backbone', 'app', 'underscore'],
    function ($, Backbone, app, _) {
        //$(function () {
        return Backbone.View.extend({
                template: _.template($('#eventTemplate').html()),
                tagName: 'div',
                className: "b-event",

                events: {
                    "dblclick .view": "edit"
                },

                render: function () {
                    var height, left, top, expand,
                        start, end,
                        modelJSON;

                    modelJSON = this.model.toJSON();
                    this.$el.html(this.template(modelJSON));

                    start = app.utils.parseTime(modelJSON.timeStart);
                    end = app.utils.parseTime(modelJSON.timeEnd);
                    expand = modelJSON.expand;

                    top = app.CONST.HOUR_HEIGHT * start;
                    height = app.CONST.HOUR_HEIGHT * (end - start);
                    left = expand * app.CONST.DAY_WIDTH;
                    this.$el.css({
                        top: top + 'px',
                        height: height + 'px',
                        left: left + 'px'
                    }).data('id', this.model.get('id'));

                    return this;
                }
            });

        //});
    }
);