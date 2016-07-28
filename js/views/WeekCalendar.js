define(
    ['jquery', 'backbone', 'collections/Days', 'collections/DayEvents', 'views/Event', 'utils/utils', 'underscore', 'app'],
    function ($, Backbone, DaysCollection, DayEventsCollection, Event, utils, _, app) {
        //$(function () {
            var dateFormat = utils.dateFormat('dd.MM.yyyy');
            var titleFormat = utils.dateFormat('dd.MM.yyyy ddd');

            return Backbone.View.extend({
                template: _.template($('#dayTemplate').html()),
                el: '.b-week-calendar_week',

                initialize: function () {
                    this.collection = new DaysCollection;
                    this.listenTo(this.collection, 'add', this.renderDay);
                    this.listenTo(this.collection, 'change:events', this.renderDay);
                    this.listenTo(this.collection, 'sync', this.renderCurrentWeek);

                    this.listenTo(this.collection, 'reset', this.addAllWeekEvents);

                    this.collection.fetch({reset: true});
                },
                renderCurrentWeek: function () {
                    this.clearAllEvents();
                    this.renderWeek(this.collection);
                },

                clearAllEvents: function () {
                    this.$('.b-event').remove();
                    this.$('.b-calendar-day').width(app.CONST.DAY_WIDTH);
                },

                addAllWeekEvents: function (dayCollection, options) {
                    options.date = options.date || new Date();

                    this.render(options.date);

                    if (!options.reset) {
                        this.renderCurrentWeek();
                    }
                },

                renderWeek: function (dayCollection) {
                    var $week;

                    $week = this.$('.b-calendar-day');

                    //render events of the day
                    $week.each(function (index, dayEl) {
                        var dayModel,
                            $el = $(dayEl);

                        dayModel = dayCollection.get($el.data('date'));
                        if (dayModel) {
                            this.renderDay(dayModel);
                        }
                    }.bind(this));
                },

                setExpand: function (dayEventsCollection, timeObj) {
                    var expand = 0;

                    timeObj = {
                        timeStart: utils.parseTime(timeObj.timeStart),
                        timeEnd: utils.parseTime(timeObj.timeEnd)
                    };

                    dayEventsCollection.forEach(function (event) {
                        var startEvent, endEvent,
                            eventJSON = event.toJSON();

                        startEvent = utils.parseTime(eventJSON.timeStart);
                        endEvent = utils.parseTime(eventJSON.timeEnd);

                        if (startEvent > timeObj.timeStart && startEvent < timeObj.timeEnd ||
                            endEvent > timeObj.timeStart && endEvent < timeObj.timeEnd ||
                            timeObj.timeStart >= startEvent && timeObj.timeStart <= endEvent ||
                            timeObj.timeEnd >= startEvent && timeObj.timeEnd <= endEvent) {

                            if (eventJSON.expand >= expand) {
                                expand = eventJSON.expand + 1;
                            }
                        }
                    });

                    return expand;
                },

                renderDay: function (dayModel) {
                    var date, $day;

                    date = dayModel.get('date');
                    $day = this.$('[data-date="' + date + '"]');

                    dayModel.get('events').forEach(function (model) {
                        this.addOneEvent(model, $day);
                    }, this);
                },

                addOneEvent: function (model, $day) {
                    var $dayTimeLine, $event, currentDayWidth,
                        newEvent = new Event({
                            model: model
                        });

                    $dayTimeLine = $day.find('.b-calendar-day_hours');
                    currentDayWidth = $day.width() - app.CONST.DAY_WIDTH;

                    if ($dayTimeLine.length) {
                        $event = newEvent.render().$el;
                        $dayTimeLine.append($event);

                        if ($event.position().left > currentDayWidth) {
                            currentDayWidth = $event.position().left
                        }

                        $day.width(currentDayWidth + app.CONST.DAY_WIDTH);
                    }

                },

                //create picked week
                render: function (pickedDate) {
                    var i, dayOfWeek, currentDay, title,
                        weekHTML = '', day, weekend;

                    this.$el.empty();
                    currentDay = titleFormat($.now());
                    dayOfWeek = (pickedDate.getDay() || 7) - 1;

                    pickedDate.setDate(pickedDate.getDate() - dayOfWeek);

                    for (i = 0; i < 7; i += 1) {
                        //render day from monday to sunday
                        weekend = i === 5 || i === 6;
                        title = titleFormat(pickedDate);
                        day = this.template({
                            day: {
                                title: title,
                                date: dateFormat(pickedDate),
                                currentDay: currentDay == title,
                                weekend: weekend
                            }
                        });
                        pickedDate.setDate(pickedDate.getDate() + 1);

                        weekHTML += day;
                    }

                    this.$el.html(weekHTML);

                    return this;
                },

                createEvent: function (newEvent) {
                    var dayModel, dayEventsCollection, expand;

                    dayModel = this.collection.get(newEvent.date);
                    if (dayModel) {
                        dayEventsCollection = dayModel.get('events');
                        expand = this.setExpand(dayEventsCollection, {
                            timeStart: newEvent.timeStart,
                            timeEnd: newEvent.timeEnd
                        });

                        dayEventsCollection.create({
                            title: newEvent.title,
                            description: newEvent.description,
                            timeStart: newEvent.timeStart,
                            timeEnd: newEvent.timeEnd,
                            id: newEvent.id || $.now(),
                            expand: expand
                        });
                        this.collection.create(dayModel);
                    } else {
                        this.collection.create({
                            date: newEvent.date,
                            events: new DayEventsCollection({
                                title: newEvent.title,
                                description: newEvent.description,
                                timeStart: newEvent.timeStart,
                                timeEnd: newEvent.timeEnd,
                                id: newEvent.id || $.now(),
                                expand: 0
                            })
                        });
                    }
                }
            });

        //});

    }
);