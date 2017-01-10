'use strict';

const moment = require('moment');
require('moment-timezone');
const rules = require('../../../index')['evw-self-serve']['departure-date'];

describe('rules/evw-self-serve/departure-date', function() {
  let flightDetails;
  let model;

  beforeEach(function() {
    flightDetails = {
      departureDateRaw: moment().add(2, 'days').format('YYYY-MM-DD'),
      departureTime: moment().add(10, 'minutes').tz('Asia/Dubai').format('HH:mm'),
      departureTimezone: 'Asia/Dubai'
    };
    model = {
      get: function() {
        return flightDetails;
      }
    };
  });

  it('should return false in no issues are found', function() {
    rules('32-08-2016', model).should.be.false;
  });

  it('should be a valid date', function() {
    flightDetails.departureDateRaw = '2016-08-32';
    rules('32-08-2016', model).should.deep.equal({
      length: {
        minimum: 100,
        message: 'departure-date.invalid'
      }
    });
  });

  it('should be within 3 months', function() {
    const threeMonthsInFuture = moment().add(3, 'months').add(1, 'day').format('YYYY-MM-DD');
    flightDetails.departureDateRaw = threeMonthsInFuture;
    rules(threeMonthsInFuture, model).should.deep.equal({
      length: {
        minimum: 12,
        message: 'departure-date.too-far-in-future'
      }
    });
  });

  it('should be at least 48 hours in the future', function() {
    const twoDaysInFuture = moment().add(2, 'days').format('YYYY-MM-DD');
    const oneMinuteInFuture = moment().subtract(1, 'minute').tz('Asia/Dubai').format('HH:mm');
    flightDetails.departureDateRaw = twoDaysInFuture;
    flightDetails.departureTime = oneMinuteInFuture;
    rules(twoDaysInFuture, model).should.deep.equal({
      length: {
        minimum: 12,
        message: 'departure-date.within-48-hours'
      }
    });
  });
});
