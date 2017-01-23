'use strict';

const utils = require('../../../rules/lib/utils');

describe('lib/utils', function() {

  describe('#momentDate', function() {
    const datetime = {
      date: '2016-08-09',
      time: '13:45',
      timezone: 'Europe/London'
    };

    it('returns a moment object', function() {
      utils.momentDate(datetime).should.contain.property('_isAMomentObject', true);
    });

    it('returns a valid date', function() {
      utils.momentDate(datetime).should.contain.property('_isValid', true);
    });

    it('returns the correct date', function() {
      utils.momentDate(datetime).should.contain.property('_i', '2016-08-09 13:45');
    });

    it('returns the correct timezone', function() {
      utils.momentDate(datetime)._z.should.contain.property('name', 'Europe/London');
    });

    it('correctly observes a timezone that is not local', function() {
      datetime.timezone = 'Asia/Dubai';
      const date = utils.momentDate(datetime);
      date._z.should.contain.property('name', 'Asia/Dubai');
      date.tz("Europe/London").format('YYYY-MM-DD HH:mm').should.equal('2016-08-09 10:45');
    });
  });

});
