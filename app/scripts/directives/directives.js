'use strict';

/* Directives */

var dir = angular.module('Garden.directives', []);

dir.directive('appVersion', ['version', function (version) {
  return function (scope, elm) {
    elm.text(version);
  };
}]);

dir.directive('drawingCanvas', function () {
  return {
    restrict: 'E',
    scope: {
      plant: '=',
      plants: '=',
      saveCallback: '&',
      deleteCallback: '&'
    },
    template: '<canvas id="canvas" width="600" height="600" plant="plant" plants="plants" save-callback="save(plant)" delete-callback="deletePlant(plantId)">' +
    '<p>Your browser does not support the canvas element.</p>' +
    '</canvas>',
    replace: true,
    link: function (scope, elm) {
      var x = 0;
      var y = 0;
      var jumpingPony, jumpingPonyImg, jumpingAnimation;
      var eatingPony, eatingPonyImg, eatingAnimation;

      var audioElement;
      audioElement = document.createElement("audio");
      document.body.appendChild(audioElement);
      audioElement.setAttribute("src", "sounds/happy.mp3");
      audioElement.play();
      audioElement.loop = true;

      var isEating = false;

      var context2D = elm[0].getContext('2d');

      var backgroundImage = new Image();
      backgroundImage.src = "images/gras.jpg";

      jumpingPonyImg = new Image();

      jumpingPony = sprite({
        context: context2D,
        width: 2190,
        height: 250,
        image: jumpingPonyImg,
        numberOfFrames: 10,
        ticksPerFrame: 4,
        offsetLeft: scope.$root.ponyOffsetX,
        offsetTop: scope.$root.ponyOffsetY
      });

      eatingPonyImg = new Image();

      eatingPony = sprite({
        context: context2D,
        width: 740,
        height: 200,
        image: eatingPonyImg,
        numberOfFrames: 4,
        ticksPerFrame: 4,
        offsetLeft: scope.$root.ponyOffsetX,
        offsetTop: scope.$root.ponyOffsetY
      });

      backgroundImage.onload = function () {
        drawPlants();
      }

      elm.bind('click', function (evt) {
        var rect = elm[0].getBoundingClientRect();
        x = evt.clientX - rect.left;
        y = evt.clientY - rect.top;

        scope.plant.xposition = x;
        scope.plant.yposition = y;

        var image = new Image();
        image.src = scope.plant.imagePath;
        context2D.drawImage(image, x - parseInt(image.width / 2), y - parseInt(image.height / 2), image.width, image.height);

        scope.saveCallback({plant: scope.plant});

      });

      document.body.addEventListener('keydown', function (evt) {
        if (!isEating) {
          //LeftArrow
          if (evt.which == 37) {
            if (jumpingPony.offsetLeft > -200) {
              jumpingPony.offsetLeft -= 5;
            } else {
              jumpingPony.offsetLeft = elm[0].width - 50;
            }
          }
          // UpArrow
          else if (evt.which == 38) {
            if (jumpingPony.offsetTop > -250) {
              jumpingPony.offsetTop -= 5;
            } else {
              jumpingPony.offsetTop = elm[0].height - 50;
            }
          }
          // RightArrow
          else if (evt.which == 39) {
            if (jumpingPony.offsetLeft < elm[0].width - 50) {
              jumpingPony.offsetLeft += 5;
            } else {
              jumpingPony.offsetLeft = -200;
            }
          }
          // DownArrow
          else if (evt.which == 40) {
            if (jumpingPony.offsetTop < elm[0].height - 50) {
              jumpingPony.offsetTop += 5;
            } else {
              jumpingPony.offsetTop = -250;
            }
          }
        }
        if (evt.which == 69) {
          if (isEating) {
            window.cancelAnimationFrame(eatingAnimation);
            jumpingLoop();
            isEating = false;
            audioElement.setAttribute("src", "sounds/happy.mp3");
            audioElement.play();
            audioElement.loop = true;
          } else {
            window.cancelAnimationFrame(jumpingAnimation);
            eatingPony.offsetLeft = jumpingPony.offsetLeft;
            eatingPony.offsetTop = jumpingPony.offsetTop + 50; // add 50 because jumping pony has larger image
            eatingLoop();
            isEating = true;
            checkEatingPlant();

            audioElement.setAttribute("src", "sounds/schmatz.mp3");
            audioElement.play();
            audioElement.loop = true;
          }
        }
        scope.$root.ponyOffsetX = jumpingPony.offsetLeft;
        scope.$root.ponyOffsetY = jumpingPony.offsetTop;
      });

      function checkEatingPlant() {
        for (var i = 0; i < scope.plants.length; i++) {
          // mouth of pony is at position 45,70
          //+-20/+-50 get positive area for eating
          if (eatingPony.offsetLeft + 45 <= scope.plants[i].xposition + 30
            && eatingPony.offsetLeft + 45 >= scope.plants[i].xposition - 30
            && eatingPony.offsetTop + 70 <= scope.plants[i].yposition + 50
            && eatingPony.offsetTop + 70 >= scope.plants[i].yposition - 50) {
            var plantId = scope.plants[i].id;
            scope.deleteCallback({plantId: plantId});
          }
        }
      }

      function drawPlants() {
        for (var i = 0; i < scope.plants.length; i++) {
          var image = new Image();
          image.src = scope.plants[i].imagePath;
          var xPos = scope.plants[i].xposition - parseInt(image.width / 2);
          var yPos = scope.plants[i].yposition - parseInt(image.height / 2);

          context2D.drawImage(image, xPos, yPos, image.width, image.height);
        }
      }

      function jumpingLoop() {
        jumpingAnimation = window.requestAnimationFrame(jumpingLoop);
        jumpingPony.updateAndRender();
      }

      function eatingLoop() {
        eatingAnimation = window.requestAnimationFrame(eatingLoop);
        eatingPony.updateAndRender();
      }

      function sprite(options) {
        var that = {},
          frameIndex = 0,
          tickCount = 0,
          ticksPerFrame = options.ticksPerFrame || 0,
          numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;
        that.loop = options.loop;
        that.offsetLeft = options.offsetLeft;
        that.offsetTop = options.offsetTop;

        that.render = function () {
          context2D.clearRect(0, 0, elm[0].width, elm[0].height);
          context2D.drawImage(backgroundImage, 0, 0);
          drawPlants();
          that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
            that.width / numberOfFrames,
            that.height,
            that.offsetLeft,
            that.offsetTop,
            that.width / numberOfFrames,
            that.height
          );
        };

        that.updateAndRender = function () {
          tickCount += 1;
          if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (frameIndex > numberOfFrames - 2) {
              frameIndex = 0;
            } else {
              frameIndex += 1;
            }
            that.render();
          }
        };

        return that;
      }

      jumpingPonyImg.addEventListener('load', jumpingLoop);

      jumpingPonyImg.src = 'images/jumpingPony.gif';
      eatingPonyImg.src = 'images/eatingPony.gif';
    }
  }
    ;
})
;
