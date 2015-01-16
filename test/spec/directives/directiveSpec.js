/**
 * Created by marianne on 14.01.15.
 */

describe('Garden Directives', function () {
  beforeEach(module('Garden'));

  describe('appVersion', function () {
    var elm, scope;

    beforeEach(inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      elm = angular.element('<span app-version></span>');

      $compile(elm)(scope);
      scope.$digest();
    }));

    it('should set the version number', function () {
      expect(elm[0].innerText).toBe('0.1');
    });
  });

  describe('drawing', function () {
    var elm, scope;

    var testPlants = [
      {
        imagePath: "tulip.gif",
        yposition: 50,
        xposition: 50
      },
      {
        imagePath: "daisy.gif",
        yposition: 100,
        xposition: 100
      }
    ];
    beforeEach(inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      elm = angular.element('<canvas id="garden" width="400" height="400" drawing plant="plant" plants="plants" save-callback="save(plant)"></canvas>');

      scope.plants = [];
      $compile(elm)(scope);
      scope.$digest();
    }));

    it('should define the directive with proper attributes', function () {
      expect(elm.attr('id')).toBe('garden');
      expect(elm.attr('height')).toBe('400');
      expect(elm.attr('width')).toBe('400');
    });

/*    it('should listen on click', function() {
      spyOn(elm.isolateScope(), 'saveCallback');
      elm.triggerHandler('click');
      scope.$apply;
      expect(elm.isolateScope().saveCallback).toHaveBeenCalled();
    });*/
  });
});
