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
      // elm = angular.element('<canvas id="garden" width="400" height="400" drawing plant="plant" plants="plants" save-callback="save(plant)"></canvas>');

      scope.plants = [];
      elm = $compile(angular.element('<canvas id="garden" width="400" height="400" drawing plant="plant" plants="plants" save-callback="save(plant)"></canvas>'))(scope);

    }));

    it('should define the directive with proper attributes', function () {
      //scope.$digest();
      expect(elm.attr('id')).toBe('garden');
      expect(elm.attr('height')).toBe('400');
      expect(elm.attr('width')).toBe('400');
    });

    it('should watch the plants model', function () {
      spyOn(elm[0].getContext('2d'), 'drawImage');
      expect(elm[0].getContext('2d').drawImage).not.toHaveBeenCalled();
      elm.isolateScope().plants = testPlants;
      elm.scope().$apply();
      expect(elm[0].getContext('2d').drawImage).toHaveBeenCalled();
    });

    it('should listen on click', function () {
      spyOn(elm.isolateScope(), 'saveCallback');

      elm.isolateScope().plants = testPlants;
      elm.isolateScope().plant = testPlants[0];

      elm.triggerHandler('click');
      elm.scope().$apply;

      expect(elm.isolateScope().saveCallback).toHaveBeenCalled();
    });

    it('should draw canvas with flowers on load', function() {
      spyOn(elm[0].getContext('2d'), 'drawImage');
      expect(elm[0].getContext('2d').drawImage).not.toHaveBeenCalled();
      elm.isolateScope().plants = [];

      elm.scope().$apply();
      expect(elm[0].getContext('2d').drawImage).toHaveBeenCalled();
    });
  });
});
