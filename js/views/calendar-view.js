(function ($, Backbone, views, _, utils) {
    $(function () {
        var hoursFormat = utils.dateFormat('HH');
        var minutesFormat = utils.dateFormat('mm');
        views.EventCalendar = Backbone.View.extend({
            template: _.template($('#timeLineTemplate').html()),
            el: '#calendar',
            events: {
                'submit #formAddEvent': 'addEvent',
                'dblclick .b-event': 'showChangeEventForm',
                'click #formChangeEvent [name=cancel]': 'closeChangeEventForm',
                'click #formChangeEvent [name=delete]': 'deleteEvent',
                'submit #formChangeEvent': 'changeEvent'
            },

            initialize: function () {
                var self = this;
                this.render();
                this.week = new views.WeekCalendar();
                this.$('[name=date]').datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    dateFormat: 'dd.mm.yy',
                    firstDay: 1
                });
                this.$('#date').datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    firstDay: 1,
                    onSelect: function (dateText) {
                        var date = new Date(Date.parse(dateText));

                        self.week.addAllWeekEvents(null, {date: date});
                    }
                });
            },

            changeEvent: function (e) {
                var form, eventToChange;
                e.preventDefault();

                form = e.currentTarget;

                eventToChange = {
                    title: form.title.value,
                    date: form.date.value,
                    timeStart: form.timeStart.value,
                    timeEnd: form.timeEnd.value,
                    description: form.description.value,
                    id: $(form).data('id')
                };

                this.deleteEvent();
                this.week.createEvent(eventToChange);
                this.closeChangeEventForm();
            },

            render: function () {
                var timeLine = [];
                var time = new Date();
                var currentDate = new Date();
                time.setHours(0);
                time.setMinutes(0);

                while (time.getDate() === currentDate.getDate()) {

                    timeLine.push({
                        hours: hoursFormat(time),
                        minutes: minutesFormat(time)
                    });
                    time.setMinutes(time.getMinutes() + 15);
                }

                this.$('.b-week-calendar').html(this.template({
                    timeLine: timeLine.filter(function (item) {
                        return item.minutes === '00';
                    })
                }));

                return this;
            },

            addEvent: function (e) {
                var form, event;
                e.preventDefault();

                form = e.currentTarget;

                event = {
                    title: form.title.value,
                    date: form.date.value,
                    timeStart: form.timeStart.value,
                    timeEnd: form.timeEnd.value,
                    description: form.description.value
                };

                this.week.createEvent(event);
                form.reset();
            },

            showChangeEventForm: function (e) {
                var formChangeEvent = this.$('#formChangeEvent'),
                    formAddEvent = this.$('#formAddEvent'),
                    $event = $(e.target),
                    $day = $event.parents('.b-calendar-day');

                e.preventDefault();
                formAddEvent.hide();
                formChangeEvent.show();
                formChangeEvent.data({
                    'id': $event.data('id'),
                    'date': $day.data('date')
                });
                this.fillForm($event.data('id'), $day.data('date'), formChangeEvent);
            },

            fillForm: function (eventId, date, $form) {
                this._curentEvent = this.week.collection.get(date).get('events').get(eventId).toJSON();
                this._curentEvent.date = date;

                $form.find(':input').each(function (index, input) {
                    if (input.name == 'date') {
                        input.value = this._curentEvent.date;
                    } else if (input.type !== 'button' && input.type !== 'submit') {
                        input.value = this._curentEvent[input.name];
                    }
                }.bind(this));

            },

            closeChangeEventForm: function () {
                var formChange = this.$('#formChangeEvent');

                formChange.trigger('reset');
                formChange.hide();
                this.$('#formAddEvent').show();
                this._curentEvent = {};
            },

            deleteEvent: function (e) {
                if (e) {
                    e.preventDefault()
                }
                Backbone.trigger('deleteEvent', this._curentEvent.id, this._curentEvent.date);
                this.closeChangeEventForm();
            }
        });

    });

})(jQuery,
    Backbone,
    window.app.views,
    _,
    window.app.utils);