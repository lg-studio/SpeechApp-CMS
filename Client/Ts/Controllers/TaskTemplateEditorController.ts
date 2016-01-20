// =========================================================================
// Task Template
// =========================================================================

var taskTemplate = {
    "CreatedById" : "55b84908f6493af8cbfb68c3",
    "Caption" : "Interview Game 2 - Competence D",
    "CompetenceId" : "55daeb71491e454550dc2b3e",
    "Type" : "Simple",
    "Kind" : "Interview",
    "Nodes" : [ 
        {
            "Id" : 1,
            "Type" : "Output",
            "Properties" : {
                "Items" : [ 
                    {
                        "Properties" : {
                            "Name" : "<%BOT.NAME%>",
                            "Text" : "Hi there <%PLAYER.NAME%>! Let's make a Software Engineering interview!",
                            "PictureUrl" : "<%BOT.PICTUREURL%>",
                            "Delay" : 2
                        },
                        "Type" : "TextPrompt",
                        "Id" : 2
                    }
                ]
            }
        },
        {
            "Id" : 3,
            "Type" : "Output",
            "Properties" : {
                "Items" : [ 
                    {
                        "Properties" : {
                            "AudioUrl" : "<%HOST.ORIGIN%>/Resource/55cb2047e2758cb407bc0aa0",
                            "Name" : "<%BOT.NAME%>",
                            "HeaderText" : "First let's find out something about you.",
                            "PictureUrl" : "<%BOT.PICTUREURL%>",
                            "Delay" : 0
                        },
                        "Type" : "AudioPrompt",
                        "Id" : 4
                    }
                ]
            }
        }         
    ],
    "IconUrl" : "http://46.4.214.252:8080/interview_logo.png"
}


materialAdmin.controller('taskTemplateEditorCtrl', function($scope, $stateParams, $http, $timeout){
    var id = $stateParams.id;
    var metadata = $stateParams.metadata;
	if (id){
        $http.get('/taskTemplateViewModel/'+ id).then(function(response){
            $scope.taskTemplateViewModel = response.data;
        });
    }
    else {
		$scope.taskTemplateViewModel = {
            Template : taskTemplate
        };
        $scope.taskTemplateViewModel.Template.Type = metadata.selectedClass;
        $scope.taskTemplateViewModel.Template.Kind = metadata.selectedType;
    }
});
