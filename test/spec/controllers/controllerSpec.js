/**
 * Created by marianne on 08.01.15.
 */

'use strict';

describe('Garden controllers', function() {

  beforeEach(function () {
    jasmine.addMatchers({
      toEqualData: function (util, customEqualityTesters) {
        return {
          compare: function (actual, expected) {
            var passed = angular.equals(actual, expected);
            return {
              pass: passed
            };
          }
        }
      }
    });
  });

  beforeEach(module('Garden'));

  describe('PlantDetailCtrl', function () {

    // load the controller's module


    var ctrl, scope, location, $httpBackend;
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://fancy.flowergarden/garden/plant').respond([{plantName: 'Tulip'}]);
      location = jasmine.createSpyObj("location", ["path"]);

      scope = $rootScope.$new();

      var locals = {
        $scope: scope,
        $location: location
      };
      ctrl = $controller('PlantDetailCtrl', locals);

    }));

    it('should init the plantDetailCtrl correctly', function () {
      expect(ctrl).toBeDefined();
      expect(scope.plant).toBeDefined();
    });

    it('should create garden model with one Tulip', function () {
      expect(scope.plants).toEqual([]);

      $httpBackend.flush();
      expect(scope.plants).toEqualData([{plantName: 'Tulip'}]);
    });

    it('should watch the plantType change', function () {
      scope.$apply();
      expect(scope.plant.name).toBe('Tulip');
      scope.plantType = "1";
      scope.$apply();
      expect(scope.plant.name).toBe('Flower');
      scope.plantType = "2";
      scope.$apply();
      expect(scope.plant.name).toBe('Daisy');
    });

    it('should save the plant', function () {
      scope.save(scope.plant);
      $httpBackend.expectPOST('http://fancy.flowergarden/garden/plant', {}).respond(201, '');
      $httpBackend.flush();
      expect(location.path).toHaveBeenCalled();
    });

  });

  describe('PlantListCtrl', function () {

    var ctrl, scope, $httpBackend;

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://fancy.flowergarden/garden/plant').respond([{id: 1}]);

      scope = $rootScope.$new();

      var locals = {
        $scope: scope
      };
      ctrl = $controller('PlantListCtrl', locals);

    }));

    it('should init the PlantListCtrl correctly', function () {
      expect(ctrl).toBeDefined();
      expect(scope.plants).toBeDefined();
      expect(scope.filteredResults).toBeFalsy();
    });

    it ('should create the model with one plant', function() {
      expect(scope.plants).toEqual([]);

      $httpBackend.flush();
      expect(scope.plants).toEqualData([{id: 1}]);
    });

    it ('should delete a plant and update all plants query', function() {
      $httpBackend.flush();
      expect(scope.plants.length).toBe(1);
      scope.deletePlant(1);
      $httpBackend.expectDELETE('http://fancy.flowergarden/garden/plant/1').respond({id: 1});
      $httpBackend.expectGET('http://fancy.flowergarden/garden/plant').respond([]);
      $httpBackend.flush();
      expect(scope.plants.length).toBe(0);
    });

    it ('should delete a plant and update plants query when search is on', function() {
      spyOn(scope, 'search').and.callFake(function() {
        scope.plants = [];
      });

      $httpBackend.flush();
      expect(scope.plants.length).toBe(1);

      scope.searchString = "Tulip";
      scope.filteredResults = true;
      scope.deletePlant(1);

      $httpBackend.expectDELETE('http://fancy.flowergarden/garden/plant/1').respond({id: 1});
      $httpBackend.flush();

      expect(scope.search).toHaveBeenCalled();
      expect(scope.plants.length).toBe(0);

    });

    it ('should search for plants with searchString Tulip', function () {
      $httpBackend.flush();
      expect(scope.plants.length).toEqual(1);
      expect(scope.filteredResults).toBeFalsy();
      scope.searchString = "Tulip";
      scope.search();
      $httpBackend.expectGET('http://fancy.flowergarden/garden/plant?searchString=Tulip').respond([]);
      $httpBackend.flush();
      expect(scope.filteredResults).toBeTruthy();
    });

    it ('should clear the search', function() {
      scope.searchString = "Tulip";
      scope.filteredResults = true;

      scope.clearSearch();
      expect(scope.searchString).toEqual(null);
      expect(scope.filteredResults).toBeFalsy();

      $httpBackend.expectGET('http://fancy.flowergarden/garden/plant').respond([{id: 1}]);
      $httpBackend.flush();

      expect(scope.plants.length).toBe(1);
    });
  });
});
