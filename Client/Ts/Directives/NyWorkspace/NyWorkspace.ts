/// <reference path="../../../../typings/underscore/underscore.d.ts" />

var materialAdmin: any;


materialAdmin.directive('nyWorkspace', function(){
    return {
        templateUrl: "./Ts/Directives/NyWorkspace/NyWorkspace.html",
        restrict: "E",
        scope: {
            model: "=model"
        },        
        controller : function($scope){
            $scope.nodes = $scope.model.Nodes;
        }
    }
});