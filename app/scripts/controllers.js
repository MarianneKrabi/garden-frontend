'use strict';

/* Controllers */

function PlantDetailCtrl($scope, $location, $routeParams, Plant) {
    /*Plant.query().then(function(result) {
        $scope.plants = result.data;
        },
    function(error) {
        console.log("Failed: "+error);
    });*/

    $scope.plantType = 'Flower';

    $scope.plants = {};

//    Plant.query(function(value){
//        $scope.plants = value;
//        console.log($scope.plants);
//    });

    $scope.filteredResults = false;

    $scope.$watch('plantType', function(newValue, oldValue) {

        if (newValue === "2") {
            $scope.plant = {
                name: "Daisy",
                imagePath: "images/daisy.gif",
                createDate: new Date()
            };
        } else if (newValue === "1"){
            $scope.plant = {
                name : "Flower",
                imagePath : "images/joannaFlowanna.gif",
                createDate: new Date()
            };
        } else {
            $scope.plant = {
                name: "Tulip",
                imagePath: "images/tulip.gif",
                createDate: new Date()
            };
        }
    });

   Plant.query(function(value){
	   $scope.plants = value;
   });

    $scope.save = function(plant) {
        Plant.save(plant, function(plant) {
            $location.path('/garden');
        });
    }
}

function PlantListCtrl($scope, Plant) {
    $scope.plants = Plant.query();
    $scope.filteredResults = false;

    $scope.deletePlant = function(plantId) {
        Plant.delete(
            {
                id: plantId
            },
            function () {
                if (!!$scope.searchString && !!$scope.filteredResults) {
                    $scope.search();
                } else {
                    $scope.plants = Plant.query();
                }
            });
    };

    $scope.search = function() {
        $scope.plants = Plant.query(
            {
                searchString: $scope.searchString
            },
            function() {
                $scope.filteredResults = true;
            }
        );
    };

    $scope.clearSearch = function() {
        $scope.searchString = null;
        $scope.filteredResults = false;
        $scope.plants = Plant.query();
    }
}
