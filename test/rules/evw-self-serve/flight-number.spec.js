'use strict';

const rules = require('../../../index')['evw-self-serve']['flight-number'];

describe('rules/evw-self-serve/flight-number', function() {
  it('should return the correct validation rules', function() {
    rules().should.deep.equal({
      presence: {
        message: 'flight-number.required'
      },
      length: {
        maximum: 9,
        tooLong: 'flight-number.too-long'
      },
      format: {
        pattern: '[a-z0-9]{2,3}[0-9]{1,4}[a-z]?',
        flags: 'i',
        message: 'flight-number.format'
      }
    });
  });
});
