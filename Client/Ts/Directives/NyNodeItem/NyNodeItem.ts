/// <reference path="../../../../typings/underscore/underscore.d.ts" />

var materialAdmin: any;

function GetViewTemplate(nodeItem){
    switch(nodeItem.Type){
        case "TextPrompt":
            return "<div class=\"main\"><ny-text-prompt-tile></ny-text-prompt-tile></div>"; 
        case "AudioPrompt":
            return "<div class=\"main\"><ny-audio-prompt-tile></ny-audio-prompt-tile></div>";
        default:
            return "<div class=\"main\"></div>"; 
    }
    
    return "";    
}

materialAdmin.directive('nyNodeItem', function($compile){
    return {
        templateUrl: "./Ts/Directives/NyNodeItem/NyNodeItem.html",
        restrict: "E",
        scope: {
            model: "=model"
        },        
        controller : function($scope, $element){
            $scope.Click = function() {
                $scope.$emit("slotSelected", $scope.model);
            }
            $scope.properties = {
                text: $scope.model.Properties.Text,
                delay: $scope.model.Properties.Delay
            }
            var template = GetViewTemplate($scope.model);
            $element.find('.main').replaceWith($compile(template)($scope));                        
        }
    }
});