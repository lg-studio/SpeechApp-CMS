/// <reference path="../../../../../typings/underscore/underscore.d.ts" />
var materialAdmin: any;
function GetPossibleTypesForClass(templateClass){
    switch(templateClass){
        case "Simple":
            return ['Interview', 'Opinion'];
        case "MultipleChoice":
            return ['Choose Topic', 'ReverseDraw'];
        default:
            return null;
    }
}

function GetPossibleTemplateStructuresForType(templateType){
    switch(templateType){
        case 'Interview':
            return ['OneQuestion', 'TwoQuestions', 'ThreeQuestions'];
        default:
            return null;
    }
}

function IsCompleteConfiguration(configuration){
    var complete = true;
    if (!configuration.selectedClass || !configuration.selectedType){
        complete = false;
    }
    else {
        if (!configuration.templateStructureOptions && 
            GetPossibleTemplateStructuresForType(configuration.selectedType) != null){
                complete = false;
            }
    }
    return complete;
}

materialAdmin.directive('nyNewTaskTemplateModal', function(){
    return {
        templateUrl: "./Ts/Directives/Modals/NewTaskTemplateModal/NewTaskTemplateModal.html",
        restrict: "E",        

        controller : function($scope, $element, $state){
            var defaultSelectedClass = "Simple";
            var config = {
                selectedClass : defaultSelectedClass,
                selectedType : null,
                selectedStructure : null,
                templateClassOptions : ["Simple", "MultipleChoice"],
                templateTypeOptions: GetPossibleTypesForClass(defaultSelectedClass),
                templateStructureOptions : null
            }
            
            $scope.configuration = config; 
            $scope.canCreate = false;
            function classSelected(){
                $scope.configuration.templateTypeOptions = GetPossibleTypesForClass(config.selectedClass)
                $scope.configuration.templateStructureOptions = null;
                $scope.canCreate = IsCompleteConfiguration($scope.configuration);
            }
            
            function typeSelected(){
                $scope.configuration.templateStructureOptions = GetPossibleTemplateStructuresForType(config.selectedType)
                $scope.canCreate = IsCompleteConfiguration($scope.configuration);
            }
            
            function structureSelected(){
                $scope.canCreate = IsCompleteConfiguration($scope.configuration);
            }
            
            $scope.ClassSelected = classSelected;
            $scope.TypeSelected = typeSelected;
            $scope.StructureSelected = structureSelected;
            $scope.GetPossibleTypesForClass = function(){
                GetPossibleTypesForClass($scope.configuration.selectedClassOption);
            }
            $scope.Create = function(){
                debugger;
                var params = {
                    id: null,
                    metadata :{
                        selectedClass : $scope.configuration.selectedClass,
                        selectedType: $scope.configuration.selectedType,
                        selectedStructure: $scope.configuration.selectedStructure
                    }
                };

                (<any>$('#myModal')).modal('hide');
                $('#myModal').on('hidden.bs.modal', function(){
                    $state.go("taskTemplateEditor", params);
                })
            }
            
            $scope.GetPossibleTemplateStructuresForType = function(){
                GetPossibleTemplateStructuresForType($scope.configuration.selectedTypeOption);
            }
        }
    }
});