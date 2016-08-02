define(
    function (require) {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            utils = require('utils/utils'),
            CONST = require('const'),
            template = require('text!../../templates/event_template.html');

        return Backbone.View.extend({
            template: _.template(template),
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

    }
);