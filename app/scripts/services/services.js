'use strict';

/* Services */

angular.module('Garden.services', [ 'ngResource' ])
  .value('version', '0.1')
  .factory('Plant', function ($resource) {
    var Plant = $resource(
      'http://fancy.flowergarden/garden/plant/:id', {
        id: '@id'
      }
    );

    return Plant;
  });
