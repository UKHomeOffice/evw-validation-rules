'use strict';

const rules = require('../../../index')['evw-self-serve']['evw-number'];

describe('rules/evw-self-serve/evw-number', function() {
  let model = {
    get: function (key) {
      return this.attributes[key];
    },
    attributes: {}
  };

  describe('evwLookupError is equal to CASE_NOT_FOUND', function() {
    before(function() {
      model.attributes = {
        evwLookupError: 'CASE_NOT_FOUND'
      };
    });

    it('returns the validation rules', function() {
      rules('', model).should.deep.equal({
        length: {
          minimum: 999,
          tooShort: 'evw-number.not-found'
        }
      });
    });
  });

  describe('evwLookupError is null', function() {
    before(function() {
      model.attributes = {
        evwLookupError: null
      };
    });

    it('returns undefined', function() {
      should.equal(rules(null, model), undefined);
    });
  });
});
