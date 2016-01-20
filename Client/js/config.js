var loadPluginJson = {
    loadPlugin: function ($ocLazyLoad) {
        return $ocLazyLoad.load([
            {
                name: 'css',
                insertBefore: '#app-level',
                files: [
                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                ]
            },
            {
                name: 'vendors',
                insertBefore: '#app-level-js',
                files: [
                    'vendors/sparklines/jquery.sparkline.min.js',
                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                    'vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js'
                ]
            }
        ])
    }
}

var states = [
    { name: "home" },
    { name: "user-info",
      loadPluginJson: { 
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([   
                    {
                        name: 'css',
                        insertBefore: '#app-level',
                        files: [
                            'vendors/bower_components/bootstrap-select/dist/css/bootstrap-select.css',
                            'vendors/chosen_v1.4.2/chosen.min.css',
                            'vendors/bower_components/nouislider/distribute/jquery.nouislider.min.css',
                            'vendors/farbtastic/farbtastic.css',
                            'vendors/bower_components/summernote/dist/summernote.css',
                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
                        ]
                    },
                    {
                        name: 'vendors',
                        files: [
                            'vendors/input-mask/input-mask.min.js',
                            'vendors/bower_components/bootstrap-select/dist/js/bootstrap-select.js',
                            'vendors/chosen_v1.4.2/chosen.jquery.min.js',
                            'vendors/bower_components/nouislider/distribute/jquery.nouislider.all.min.js',
                            'vendors/bower_components/moment/min/moment.min.js',
                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                            'vendors/farbtastic/farbtastic.min.js',
                            'vendors/bower_components/summernote/dist/summernote.min.js',
                            'vendors/fileinput/fileinput.min.js',
                            'vendors/bower_components/underscore/underscore-min.js'
                        ]
                    }
                ])
            }
        },
        url: '/users/{userId}',
        templateUrl: 'views/user-info.html'
    },
    { name: "certificates" },
    { name: "competences" },
    { name: "topic-info",
      loadPluginJson: { 
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([   
                    {
                        name: 'css',
                        insertBefore: '#app-level',
                        files: [
                            'vendors/bower_components/bootstrap-select/dist/css/bootstrap-select.css',
                            'vendors/chosen_v1.4.2/chosen.min.css',
                            'vendors/bower_components/nouislider/distribute/jquery.nouislider.min.css',
                            'vendors/farbtastic/farbtastic.css',
                            'vendors/bower_components/summernote/dist/summernote.css',
                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid.min.css'
                        ]
                    },
                    {
                        name: 'vendors',
                        files: [
                            'vendors/input-mask/input-mask.min.js',
                            'vendors/bower_components/bootstrap-select/dist/js/bootstrap-select.js',
                            'vendors/chosen_v1.4.2/chosen.jquery.min.js',
                            'vendors/bower_components/nouislider/distribute/jquery.nouislider.all.min.js',
                            'vendors/bower_components/moment/min/moment.min.js',
                            'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                            'vendors/farbtastic/farbtastic.min.js',
                            'vendors/bower_components/summernote/dist/summernote.min.js',
                            'vendors/fileinput/fileinput.min.js',
                            'vendors/bower_components/underscore/underscore-min.js',
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid-override.min.js'
                        ]
                    }
                ])
            }
        },
        url: '/topics/{topicId}',
        templateUrl: 'views/topic-info.html'
    },
    
    { name: "taskTemplates",
        loadPluginJson:
        {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        name: 'css',
                        insertBefore: '#app-level',
                        files: [
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid.min.css'
                        ]
                    },
                    {
                        name: 'vendors',
                        files: [
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid-override.min.js',
                        ]
                    }
                ])
            }
        }    
     },
    { name: "multipleChoiceText" },
    { name: "multipleChoiceImage" }
];

materialAdmin.run(function ($templateCache, $http) {
    console.log('Application Run');
}).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    states.forEach(function(state){
       var name = state.name;
       var pluginJson = state.loadPluginJson || loadPluginJson;
       $stateProvider.state(name, {
            url: (state.url) ? state.url : '/' + name,
            templateUrl : state.templateUrl || ('views/' + name + '.html'),
            resolve: pluginJson
        });
    });
    $stateProvider.state("users", 
    {
        url: '/users',
        templateUrl : 'views/users.html',
        params : { id: null},
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        name: 'css',
                        insertBefore: '#app-level',
                        files: [
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid.min.css',
                        ]
                    },
                    {
                        name: 'vendors',
                        files: [
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid-override.min.js'
                        ]
                    }
                ])
            }
        }    
    })
    .state("topics",
    {
        url: '/topics',
        templateUrl : 'views/topics.html',
        params : { id: null},
        controller : 'topicsListCtrl',
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        name: 'css',
                        insertBefore: '#app-level',
                        files: [
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid.min.css',
                        ]
                    },
                    {
                        name: 'vendors',
                        files: [
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid-override.min.js',
                            'vendors/fileinput/fileinput.min.js'
                        ]
                    }
                ])
            }
        }       
    })
    .state("taskTemplateEditor",
    {
        url: '/taskTemplateEditor',
        templateUrl : 'views/taskTemplateEditor.html',
        params : { id: null , metadata: null},
        controller : 'taskTemplateEditorCtrl',
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        name: 'css',
                        insertBefore: '#app-level',
                        files: [
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid.min.css',
                        ]
                    },
                    {
                        name: 'vendors',
                        files: [
                            'vendors/fileinput/fileinput.min.js',
                        ]
                    }
                ])
            }
        }       
    })
    .state("sandbox",
    {
        url: '/sandbox',
        templateUrl : 'views/sandbox.html',
        controller : 'SandboxCtrl',
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        name: 'css',
                        insertBefore: '#app-level',
                        files: [
                            'vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid.min.css',
                        ]
                    },
                    {
                        name: 'vendors',
                        files: [
                            'vendors/fileinput/fileinput.min.js',
                        ]
                    }
                ])
            }
        }       
    })
});
