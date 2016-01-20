/// <reference path="../../../../../typings/underscore/underscore.d.ts" />

var materialAdmin: any;
module CertificateConfigurator {
    var CertificatesList =
    [
        {
            Id: "55fab398246c236c87605013",
            Name : "Cambridge Certificates"
        },
        {
            Id: "55fab3d4246c236c87605014",
            Name : "TOEFL - iBT"
        },
        {
            Id: "55fab3e3246c236c87605015",
            Name : "School's Language Lab"
        },
        {
            Id: "55fab69b246c236c87605016",
            Name : "Rating"
        }
    ];
    
    var SubcertificatesDict = {
        "55fab398246c236c87605013" : [
            {
                Id: 2,
                Name: "IELTS"
            },
            {
                Id: 3,
                Name: "FCE"
            },
            {
                Id: 4,
                Name: "CAE"
            }],
        "55fab3d4246c236c87605014" : [],
        "55fab3e3246c236c87605015" : [],
        "55fab69b246c236c87605016" : [
            {
                Id: 2,
                Name: "F"
            },
            {
                Id: 3,
                Name: "G"
            }
        ]
    }
    
    var TopicList = [
        {
            Id: 1,
            Name: "Topic 1"
        },
        {
            Id: 2,
            Name: "Topic 2"
        },
        {
            Id: 3,
            Name: "Topic 3"
        }
    ]
    
    class SelectServices {
        http;
        timeout;
        constructor(http, timeout){
            this.http = http;
            this.timeout = timeout;   
        }
    }
    
    class Mediator{
        public certificateSelect : CertificateSelect;
        public subcertificateSelect: SubcertificateSelect;
        public topicListSelect: TopicListSelect;
        public stateIcon: StateIcon;
        public configurationChangeCallback;
        public services : SelectServices;
        
        constructor(services){
            this.services = services;
        }
        
        public RegisterCertificateSelect(certificateSelect){
            this.certificateSelect = certificateSelect;
        }
        
        public RegisterSubcertificateSelect(subCertificateSelect){
            this.subcertificateSelect = subCertificateSelect;        
        }
        public RegisterTopicListSelect(topicListSelect){
            this.topicListSelect = topicListSelect;        
        }
        
        public registerStateIcon(stateIcon){
            this.stateIcon = stateIcon;
        }
        
        public CertificateChanged(){
            var certSelection = this.certificateSelect.selection;
            this.subcertificateSelect.Disable();
            this.topicListSelect.Disable();
            this.subcertificateSelect.FetchOptions(certSelection.Id, (result) =>{
                if (this.subcertificateSelect.optionsList.length > 0){
                    this.subcertificateSelect.Enable();
                    this.UpdateStateIcon();
                }
                else{
                    this.topicListSelect.FetchOptions(certSelection.Id, null, (response) =>{
                        this.topicListSelect.optionsList = response;
                        this.topicListSelect.Enable();
                        this.UpdateStateIcon();
                    })
                }
            });
        }
        
        public SubcertificateChanged(){
            var certSelection = this.certificateSelect.selection;
            var subCertSelection = this.subcertificateSelect.selection;
            this.topicListSelect.Disable();
            this.topicListSelect.FetchOptions(certSelection.Id, subCertSelection.Id, (response) =>{
                this.topicListSelect.Enable();
                this.UpdateStateIcon();
            })
        }
        
        public TopicListChanged(){
            this.UpdateStateIcon();
        }
        
        public UpdateStateIcon(){
            if (this.topicListSelect.selection){
                this.configurationChangeCallback(true);
                this.stateIcon.enabled = true;
            }
            else{
                this.configurationChangeCallback(false);
                this.stateIcon.enabled = false;
            }
        }
    }
    
    class BaseSelect{
        public labelCaption : string;
        public mediator : Mediator;
        public selection;
        public optionsList;
        public enabled : boolean;
        
        public Changed(){
            this.mediator.CertificateChanged();
            console.log(this.selection);
        }
        
        public Disable(){
            this.enabled = false;
            this.selection = null;
        }
        
        public Enable(){
            this.enabled = true;
        }
        
        constructor(mediator:Mediator){
            this.mediator = mediator;
            this.selection = null;
        }
    }
    
    class CertificateSelect extends BaseSelect{
        constructor(mediator:Mediator){
            super(mediator);
            mediator.RegisterCertificateSelect(this);

            this.labelCaption = "Certificates";
            this.enabled = true;
            this.FetchOptions((response) =>{});
        }

        public Changed(){
            this.mediator.CertificateChanged();
        }
        
        public FetchOptions(callback){
            this.mediator.services.http({
                method: 'GET',
                url: 'configurationCertificatesViewModel'
            }).then((response)=>{
                this.optionsList = response.data;
                callback(this.optionsList);
            })
        }   
    }
    
    class SubcertificateSelect extends BaseSelect{
        constructor(mediator: Mediator){
            super(mediator);
            mediator.RegisterSubcertificateSelect(this);

            this.labelCaption = "Subcertificates";
            this.optionsList = null;
            this.enabled = false;
        }
        
        public Changed(){
            this.mediator.SubcertificateChanged();
        }
        
        public FetchOptions(certificateId, callback){
            this.mediator.services.http({
                method: 'GET',
                url: 'configurationSubcertificatesViewModel/?certificateId=' + certificateId
            }).then((response)=>{
                this.optionsList = response.data;
                callback(this.optionsList);
            })
        }   
    }

    class TopicListSelect extends BaseSelect{
        constructor(mediator: Mediator){
            super(mediator);
            this.mediator.RegisterTopicListSelect(this);

            this.labelCaption = "TopicList";
            this.optionsList = null;
            this.enabled = false;
        }
        
        public Changed(){
            this.mediator.TopicListChanged();
        }
        
        public FetchOptions(certificateId, subcertificateId, callback){
            this.mediator.services.http({
                method: 'GET',
                url: 'configurationTopicListViewModel/?certificateId=' + certificateId + '&subcertificateId=' + subcertificateId
            }).then((response)=>{
                this.optionsList = response.data;
                callback(this.optionsList);
            })            
        }   
    }
    
    class StateIcon{
        public enabled;
        constructor(mediator: Mediator){
            mediator.registerStateIcon(this);
            this.enabled = false;
        }
    }
    
    materialAdmin.directive('nyCertificateConfigurator', function(){
        return {
            templateUrl: "./Ts/Directives/NyDashboard/NyCertificateConfigurator/NyCertificateConfigurator.html",
            restrict: "E",
            scope: {
                configurationModel: "=model",
                handler: "=handler"
            },
            link: function(scope){
            },     
            controller : function($scope, $http, $timeout){
                debugger;
                var services = new SelectServices($http, $timeout);
                var defaultCallback = function(){};
                var med = new Mediator(services);
                med.configurationChangeCallback = $scope.handler || defaultCallback;
                $scope.stateIcon  = new StateIcon(med);

                if (!$scope.configurationModel){
                    $scope.selectComponents = [new CertificateSelect(med), new SubcertificateSelect(med) , new TopicListSelect(med)];
                }
                else {
                    var cert = {
                        labelCaption : "Certificates",
                        Name : $scope.configurationModel.Certificate.Name || ""
                    }
                    var subCert = {
                        labelCaption : "Subcertificates",
                        Name: $scope.configurationModel.Subcertificate.Name || ""
                    }
                    var topicList = {
                        labelCaption : "TopicList",
                        Name: $scope.configurationModel.TopicList.Name || ""
                    }
                    
                    $scope.stateIcon.enabled = true;
                    $scope.preConfigureComponents = [cert, subCert, topicList];
                }
            }
        }
    });
}