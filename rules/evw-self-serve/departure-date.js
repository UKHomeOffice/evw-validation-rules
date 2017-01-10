'use strict';

const moment = require('moment');
const utils = require('../lib/utils');

module.exports = (fieldValue, model) => {
  if (model.get('flightDetails') === null) {
    return false;
  }
  const departureDate = model.get('flightDetails').departureDateRaw;
  const departureTime = model.get('flightDetails').departureTime;
  const departureTimezone = model.get('flightDetails').departureTimezone;
  const departureDateTime = utils.momentDate({date: departureDate, time: departureTime, timezone: departureTimezone}).tz('Europe/London');
  const threeMonths = moment().add(3, 'months');
  const fourtyEight = moment().add(48, 'hours');

  if (!departureDateTime.isValid()) {
    return {
      length: {
        minimum: 100,
        message: 'departure-date.invalid'
      }
    };
  }

  if (threeMonths.isBefore(departureDateTime, 'second')) {
    return {
      length: {
        minimum: 12,
        message: 'departure-date.too-far-in-future'
      }
    };
  }

  if (fourtyEight.isAfter(departureDateTime, 'second')) {
    return {
      length: {
        minimum: 12,
        message: 'departure-date.within-48-hours'
      }
    };
  }

  return false;
};
