/// <reference path="../../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../../typings/jquery/jquery.d.ts" />

var materialAdmin: any;

// =========================================================================
// Property View Container
// =========================================================================

function GetPropertyViewTemplate(nodeItem){
    switch(nodeItem.Type){
        case "TextPrompt":
            return "<div class=\"main\"><ny-text-prompt-property-view></ny-text-prompt-property-view></div>"; 
        case "AudioPrompt":
            return "<div class=\"main\"><ny-audio-prompt-property-view></ny-audio-prompt-property-view></div>";
        default:
            return "<div class=\"main\"></div>"; 
    }
    
    return "";    
}

materialAdmin.directive('nyPropertyView', function($compile){
    return {
        templateUrl: "./Ts/Directives/NyPropertyView/NyPropertyView.html",
        restrict: "E",
        controller : function($scope, $element){
            function updatePropertyView(nodeItem){
                $scope.nodeItem = nodeItem;
                var template = GetPropertyViewTemplate(nodeItem);
                $element.find('.main').replaceWith($compile(template)($scope));       
            }
            
            $scope.$on("slotSelected", function(event, nodeItem) {
                updatePropertyView(nodeItem);
            });            
        }
    }
});

// =========================================================================
// Concrete Property Views
// =========================================================================

function BaseSetup(scope){
    scope.properties = $.extend({}, scope.nodeItem.Properties);

    scope.Save = function() {
        var keys = Object.keys(scope.nodeItem.Properties);
        keys.forEach((key) => {
            scope.nodeItem.Properties[key] = scope.properties[key];
        })
    }
}

materialAdmin.directive('nyTextPromptPropertyView', function(){
    return {
        templateUrl: "./Ts/Views/PropertyViews/NyTextPromptPropertyView.html",
        restrict: "E",
        controller : function($scope, $element){
            BaseSetup($scope);
        }
    }
});

materialAdmin.directive('nyAudioPromptPropertyView', function(){
    return {
        templateUrl: "./Ts/Views/PropertyViews/NyAudioPromptPropertyView.html",
        restrict: "E",
        controller : function($scope, $element){
            BaseSetup($scope);
        }
    }
});
