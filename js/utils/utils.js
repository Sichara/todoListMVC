define(['jquery', 'dateFormat'],
    function ($) {
        return {
            dateFormat: function (format) {
                return function (date) {
                    return $.format.date(date, format);
                }
            },

            parseTime: function (time) {
                var arrTime = time.split(':');
                return parseInt(arrTime[0]) + parseInt(arrTime[1]) / 60;
            }
        };
    });