'use strict';


// Declare app level module which depends on filters, services and directives
angular.module('Garden', [ 'ngRoute', 'Garden.filters', 'Garden.services', 'Garden.directives' ])
        .config([ '$routeProvider', function($routeProvider) {
            $routeProvider.when('/garden', {
                templateUrl : 'views/garden.html',
                controller : PlantDetailCtrl
            });
            $routeProvider.when('/plant-list', {
                templateUrl : 'views/plant-list.html',
                controller : PlantListCtrl
            });
            $routeProvider.otherwise({
                redirectTo : '/garden'
            });
        } ]);
