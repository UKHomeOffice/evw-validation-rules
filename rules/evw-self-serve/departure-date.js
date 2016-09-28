'use strict';

const moment = require('moment');

module.exports = (fieldValue, model) => {
  let departureDate = moment(fieldValue, 'DD-MM-YYYY');
  let arrivalDateMinusOneDay = moment(model.get('arrival-date'), 'DD-MM-YYYY').subtract(1, 'day');
  let arrivalDatePlusOneDay = moment(model.get('arrival-date'), 'DD-MM-YYYY').add(1, 'day');

  if (!departureDate.isValid()) {
    return {
      length: {
        minimum: 100,
        message: 'departure-date.invalid'
      }
    };
  }

  if (departureDate.isBefore(arrivalDateMinusOneDay)) {
    return {
      length: {
        minimum: 100,
        message: 'departure-date.in-past'
      }
    };
  }

  if (departureDate.isAfter(arrivalDatePlusOneDay)) {
    return {
      length: {
        minimum: 100,
        message: 'departure-date.in-future'
      }
    };
  }

  return false;
};
