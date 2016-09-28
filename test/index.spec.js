'use strict';

const rules = require('../index');

describe('index', function () {
  describe('rules', function () {
    describe('evw-self-serve', function () {
      it('should be an object', function () {
        rules['evw-self-serve'].should.be.an('object')
        .contain.all.keys([
          'arrival-date',
          'departure-date',
          'departure-time',
          'evw-number',
          'flight-number'
        ]);
      });
    });
  });
});
