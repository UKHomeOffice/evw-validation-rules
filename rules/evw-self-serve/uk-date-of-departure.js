'use strict';

const moment = require('moment');

module.exports = (fieldValue) => {
  const ukDepartureDate = moment(fieldValue, 'DD-MM-YYYY');

  if (!ukDepartureDate.isValid()) {
    return {
      length: {
        minimum: 100,
        message: 'uk-date-of-departure.invalid'
      }
    };
  }

  if (ukDepartureDate.isBefore(moment().add(48, 'hours'))) {
    return {
      length: {
        minimum: 100,
        message: 'uk-date-of-departure.in-past'
      }
    };
  }

  if (ukDepartureDate.isAfter(moment().add(6, 'months'))) {
    return {
      length: {
        minimum: 100,
        message: 'uk-date-of-departure.in-future'
      }
    };
  }

  return false;
};
