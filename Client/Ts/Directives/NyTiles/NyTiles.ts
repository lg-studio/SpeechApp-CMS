/// <reference path="../../../../typings/underscore/underscore.d.ts" />
var materialAdmin: any;

materialAdmin.directive('nyTextPromptTile', function($compile){
    return {
        templateUrl: "./Ts/Views/NodeItemTiles/NyTextPromptTile.html",
        restrict: "E",
        controller : function($scope, $element){

        }
    }
});

materialAdmin.directive('nyAudioPromptTile', function($compile){
    return {
        templateUrl: "./Ts/Views/NodeItemTiles/NyAudioPromptTile.html",
        restrict: "E",
        controller : function($scope, $element){
        }
    }
});
