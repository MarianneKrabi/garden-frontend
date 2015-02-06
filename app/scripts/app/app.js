'use strict';


// Declare app level module which depends on filters, services and directives
var app = angular.module('Garden', ['ngRoute', 'Garden.controllers', 'Garden.filters', 'Garden.services', 'Garden.directives']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/garden', {
    templateUrl: 'views/garden.html',
    controller: "PlantDetailCtrl"
  });
  $routeProvider.when('/plant-list', {
    templateUrl: 'views/plant-list.html',
    controller: "PlantListCtrl"
  });
  $routeProvider.otherwise({
    redirectTo: '/garden'
  });
}]);

app.run(function ($rootScope) {
  $rootScope.ponyOffsetX = 0;
  $rootScope.ponyOffsetY = 0;
});
