/// <reference path="../../../../typings/underscore/underscore.d.ts" />

var materialAdmin: any;

materialAdmin.directive('nyDashboard', function(){
    return {
        templateUrl: "./Ts/Directives/NyDashboard/NyDashboard.html",
        restrict: "E",
        scope: {
            model: "=model"
        },
        link: function(scope){
            scope.metaDataTabActive = true;
            scope.structureTabActive = false;
            scope.readOnly = false;
            if (scope.model.Active){
                scope.readOnly = true;
            }
        },     
        controller : function($scope, $http){
            if (!$scope.model.Active){
                $http.get('/linkableCompetences/').then(function (response) {
                    $scope.availableCompetences = response.data;
                    $scope.selectedCompetence = null;
                });
            }
            $scope.metaDataTabActive = true;
            $scope.structureTabActive = true;
            $scope.TabMetadataSelected = function(){
                $scope.metaDataTabActive = true;
                $scope.structureTabActive = false;
            }           
            
            $scope.TabStructureSelected = function(){
                $scope.metaDataTabActive = false;
                $scope.structureTabActive = true;
            }           
        }
    }
});