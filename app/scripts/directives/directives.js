'use strict';

/* Directives */

var dir = angular.module('Garden.directives', []);

dir.directive('appVersion', [ 'version', function(version) {
  return function(scope, elm) {
    elm.text(version);
  };
} ]);

dir.directive('drawing', function() {
  return {
    restrict: 'A',
    scope: {
      plant: '=',
      plants: '=',
      saveCallback: '&'
    },
    link: function (scope, elm) {
      var x = 0;
      var y = 0;
      var scale = 2;

      var backgroundImage = new Image();
      backgroundImage.src = "images/gras.jpg";

      var context2D = elm[0].getContext('2d');

      elm.bind('load', function() {
        context2D.clearRect(0, 0, elm[0].width, elm[0].height);
        context2D.drawImage(backgroundImage, 0, 0);

        drawAll();
      });

      elm[0].addEventListener('click', function (evt) {
        var rect = elm[0].getBoundingClientRect();
        x = evt.clientX - rect.left;
        y = evt.clientY - rect.top;

        scope.plant.xposition = x;
        scope.plant.yposition = y;

        var image = new Image();
        image.src = scope.plant.imagePath;

        context2D.drawImage(image, x - parseInt(image.width / (scale * 2)), y - parseInt(image.height / (scale * 2)), parseInt(image.width / scale), parseInt(image.height / scale));

        scope.saveCallback(scope.plant);

      });

      scope.$watch('plants', function (newValue, oldValue) {
        drawAll();
      });

      function drawAll() {
        context2D.clearRect(0, 0, elm[0].width, elm[0].height);
        context2D.drawImage(backgroundImage, 0, 0);
        for (var i = 0; i < scope.plants.length; i++) {
          var image = new Image();
          image.src = scope.plants[i].imagePath;
          var xPos = scope.plants[i].xposition - parseInt(image.width / (scale * 2));
          var yPos = scope.plants[i].yposition - parseInt(image.height / (scale * 2));
          var width = parseInt(image.width / scale);
          var height = parseInt(image.height / scale);
          context2D.drawImage(image, xPos, yPos, width, height);
        }
      }
    }
  };
} );
