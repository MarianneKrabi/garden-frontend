/**
 * Created by marianne on 14.01.15.
 */

describe('filter', function () {
  beforeEach(module('Garden'));

  var $filter;
  describe('interpolate', function () {
    beforeEach(inject(function(_$filter_) {
      $filter = _$filter_;
    }));

    it('should return the version number string', function () {
      var version = $filter('interpolate');
      expect(version('0.2')).toBe('0.2');
    });
  });
});
