'use strict';

const moment = require('moment');
const rules = require('../../../index')['evw-self-serve']['arrival-date'];

describe('rules/evw-self-serve/arrival-date', function() {
  let model = {
    get: function (key) {
      return this.attributes[key];
    },
    attributes: {
      flightDetails: {
        arrivalTime: '12:23'
      }
    }
  };

  it('should be a valid date', function() {
    rules('32-08-2016', model).should.deep.equal({
      length: {
        minimum: 12,
        message: 'arrival-date.invalid'
      }
    });
  });

  it('should be less than 3 months in the future', function() {
    rules(moment().add(4, 'months').format('DD-MM-YYYY'), model).should.deep.equal({
      length: {
        minimum: 12,
        message: 'arrival-date.too-far-in-future'
      }
    });
  });

  it('should be more than 48 hours in the future', function() {
    rules(moment().add(1, 'day').format('DD-MM-YYYY'), model).should.deep.equal({
      length: {
        minimum: 12,
        message: 'arrival-date.within-48-hours'
      }
    });
  });
});
