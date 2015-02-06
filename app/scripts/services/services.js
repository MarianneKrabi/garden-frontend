'use strict';

/* Services */

var serv = angular.module('Garden.services', [ 'ngResource' ]);

serv.value('version', '0.1');
serv.factory('Plant', function ($resource) {
    var Plant = $resource(
      'http://10.10.4.57/garden/plant/:id', {
        id: '@id'
      }
    );

    return Plant;
  }
);

