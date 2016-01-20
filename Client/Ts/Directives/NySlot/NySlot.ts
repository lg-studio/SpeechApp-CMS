/// <reference path="../../../../typings/underscore/underscore.d.ts" />
var materialAdmin: any;

function GetNodeItems(node){
    var nodeItems = [];
    _.forEach(node.Properties.Items, function(nodeItem){
        nodeItems.push(nodeItem);
    });
    return nodeItems;
}

materialAdmin.directive('nySlot', function(){
    return {
        templateUrl: "./Ts/Directives/NySlot/NySlot.html",
        restrict: "E",
        scope: {
            model: "=model"
        },        
        controller : function($scope){
            $scope.nodeItems = GetNodeItems($scope.model);
        }
    }
});