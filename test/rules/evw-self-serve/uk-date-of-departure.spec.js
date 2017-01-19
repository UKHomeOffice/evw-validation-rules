'use strict';

const moment = require('moment');
const rules = require('../../../index')['evw-self-serve']['uk-date-of-departure'];

const error = type => {
  return {
    length: {
      minimum: 100,
      message: `uk-date-of-departure.${type}`
    }
  };
} ;

describe('rules/evw-self-serve/uk-date-of-departure', function() {
  it('should accept valid dates', function() {
    rules(moment().add(10, 'days')).should.be.false;
  });

  it('should be a valid date', function() {
    rules('32-08-2016').should.deep.equal(error('invalid'));
  });

  it('should be at least 48 hours from today', function() {
    rules(moment().add(1, 'day')).should.deep.equal(error('in-past'));
  });

  it('should be within 6 months', function() {
    rules(moment().add(7, 'months')).should.deep.equal(error('in-future'));
  });
});
