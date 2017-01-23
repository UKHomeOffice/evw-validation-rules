'use strict';

const moment = require('moment');
require('moment-timezone');

module.exports = {
  momentDate: function(datetime) {
    return moment.tz(`${datetime.date} ${datetime.time}`, datetime.timezone);
  }
};
