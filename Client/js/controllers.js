materialAdmin
// =========================================================================
// Base controller for common functions
// =========================================================================

    .controller('materialadminCtrl', function ($timeout, $state, growlService) {
        //Welcome Message
        growlService.growl('Welcome back Mallinda!', 'inverse')
        
        
        // Detact Mobile Browser
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            angular.element('html').addClass('ismobile');
        }

        // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        this.sidebarToggle = {
            left: false,
            right: false
        }

        // By default template has a boxed layout
        this.layoutType = localStorage.getItem('ma-layout-status');
        
        // For Mainmenu Active Class
        this.$state = $state;    
        
        //Close sidebar on click
        this.sidebarStat = function (event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        }
    })


// =========================================================================
// Header
// =========================================================================
    .controller('headerCtrl', function ($timeout, messageService) {
    
        // Top Search
        this.openSearch = function () {
            angular.element('#header').addClass('search-toggled');
            //growlService.growl('Welcome back Mallinda Hollaway', 'inverse');
        }

        this.closeSearch = function () {
            angular.element('#header').removeClass('search-toggled');
        }
        
        // Get messages and notification for header
        this.img = messageService.img;
        this.user = messageService.user;
        this.user = messageService.text;

        this.messageResult = messageService.getMessage(this.img, this.user, this.text);


        //Clear Notification
        this.clearNotification = function ($event) {
            $event.preventDefault();

            var x = angular.element($event.target).closest('.listview');
            var y = x.find('.lv-item');
            var z = y.size();

            angular.element($event.target).parent().fadeOut();

            x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
            x.find('.grid-loading').fadeIn(1500);
            var w = 0;

            y.each(function () {
                var z = $(this);
                $timeout(function () {
                    z.addClass('animated fadeOutRightBig').delay(1000).queue(function () {
                        z.remove();
                    });
                }, w += 150);
            })

            $timeout(function () {
                angular.element('#notifications').addClass('empty');
            }, (z * 150) + 200);
        }
        
        // Clear Local Storage
        this.clearLocalStorage = function () {
            
            //Get confirmation, if confirmed clear the localStorage
            swal({
                title: "Are you sure?",
                text: "All your saved localStorage values will be removed",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F44336",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
                localStorage.clear();
                swal("Done!", "localStorage is cleared", "success");
            });

        }
        
        //Fullscreen View
        this.fullScreen = function () {
            //Launch
            function launchIntoFullscreen(element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            //Exit
            function exitFullscreen() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }

            if (exitFullscreen()) {
                launchIntoFullscreen(document.documentElement);
            }
            else {
                launchIntoFullscreen(document.documentElement);
            }
        }
    })

// =========================================================================
// Task Template Table
// =========================================================================

    .controller('taskTemplateCtrl', function (taskTemplateService) {
        this.ttResults = taskTemplateService.getAllTaskTemplates();
    })

//=================================================
// LOGIN
//=================================================
    .controller('loginCtrl', function () {
        //Status
        this.login = 1;
        this.register = 0;
        this.forgot = 0;
    })

    .controller('userDetailsCtrl', ['$stateParams', '$location', 'usersService', 'gender', 'country', 'language', 'userType', 'userStatus',
        function ($stateParams, $location, usersService, gender, country, language, userType, userStatus) {

            this.user = usersService.getUser($stateParams.userId);

            this.genderList = gender;
            this.countryList = country;
            this.languageList = language;

            var getYearsArray = function () {
                var arr = Array.apply(null, Array(100));
                return arr.map(function (x, i) { return i + 1915 });
            };
            this.yearList = getYearsArray();

            this.typeList = userType;
            this.statusList = userStatus;

            this.saveButtonEnabled = false;

            this.enableSaveButton = function () {
                this.saveButtonEnabled = true;
            }

            this.disableSaveButton = function () {
                this.saveButtonEnabled = false;
            }

            this.saveUser = function () {
                usersService.saveUserInfo(this.user);

                $location.url('/users');
            };

        }])
    
    .controller('topicsListCtrl', ['$scope', 'topicsService', function($scope, topicsService) {
        $scope.$on('TABLE_LOADED', function (event, element) {
            $scope.tableElement = element;
            console.log($scope.tableElement);
        });
        
        $scope.$on('REFRESH_TEMPLATES', function() {
            $scope.tableElement.bootgrid('reload');
        });
    }])
    
    .controller('newTopicModalCtrl', ['$scope', 'topicsService', function($scope, topicsService) {
        this.addButtonEnabled = false;
        
        this.imageAdded=false;
        
        this.addTopic = function() {
            topicsService.addTopic(
                {
                    Name: this.topicName
                }
            );
            
            $scope.$emit('REFRESH_TEMPLATES');
        }
    }])
    
    .controller('topicDetailsCtrl', ['$stateParams', '$location', '$scope', '$document','topicsService', function ($stateParams, $location, $scope, $document, topicsService) {

        this.topic = topicsService.getTopic($stateParams.topicId);
        
        this.newTemplates = [];
        
        $scope.tmpTemplatesToAdd = [];
        
        $scope.$on('ITEM_SELECTED', function (event, items) {
            _.each(items, function (item) {
                item.new = true;
                $scope.tmpTemplatesToAdd.push(item);
            });
        });

        $scope.$on('ITEM_DESELECTED', function (event, items) {
            _.each(items, function (item) {
                $scope.tmpTemplatesToAdd = 
                    _.without($scope.tmpTemplatesToAdd, _.findWhere($scope.tmpTemplatesToAdd, item));
            });
        });
        
        $scope.$on('TABLE_LOADED', function (event, element) {
            $scope.tableElement = element;
        });
        
        this.addTemplates = function () {
            _.each($scope.tmpTemplatesToAdd, function (item) {
                var template = _.findWhere(this.topic.list[0].TaskTemplates, {_id: item._id});
                if(template == null) {
                    this.topic.list[0].TaskTemplates.push(item);
                    this.newTemplates.push(item);
                }
            }, this);
            
            console.log('New templates: ' + this.newTemplates.length);
            
        };

        this.saveTopic = function () {
            topicsService.saveTopic(this.topic);
            $location.url('/topics');
        };
        
        this.removeTopic = function(id) {
            this.topic.list[0].TaskTemplates = 
                _.without(this.topic.list[0].TaskTemplates, _.findWhere(this.topic.list[0].TaskTemplates, {_id: id}));
            this.newTemplates = 
                _.without(this.newTemplates, _.findWhere(this.newTemplates, {_id: id}));
                
        };
        
        this.resetTemplateTableSelection = function() {
            $scope.tableElement.bootgrid('deselect');
        }
        
    }])
    
    .controller('SandboxCtrl', ['$scope', function($scope) {
        $scope.configurationModel = null;
        // $scope.configurationModel = {
        //     Certificate : {
        //         Id: 1,
        //         Name : "Cambridge"
        //     },
        //     Subcertificate : {
        //         Id: 2,
        //         Name: "IELTS"
        //     },
        //     TopicList: {
        //         Id: 3,
        //         Name: "Topic X"
        //     }
        // }
        $scope.configurationChangeCallback = function(isValid){
            console.log(isValid);
        }
    }])