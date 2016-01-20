var _ = require('underscore');
var Async = require('async');
var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var Config = require('./Config/Config.global');
var EnvironmentConfig = Config.Environment;

var ObjectID = require('mongodb').ObjectID;

var CertificateConfigurationController = require('./Controllers/CertificateConfigurationController');
var CompetenceNodeHandlingStrategies = require('./Tree/NodeHandlingStategies/CompetenceNodeHandlingStrategies');

var App = express();

App.set('port', process.env.PORT || 3000);
App.use(express.logger('dev'));
App.use(express.json());
App.use(express.urlencoded());
App.use(express.methodOverride());

App.use(App.router);

App.use(express.static(path.join(__dirname, '../Client')));
// development only
if ('development' == App.get('env')) {
    App.use(express.errorHandler());
}

var connect = function () {
    mongoose.connect(EnvironmentConfig.DatabaseConnectionString);
}

connect();

var MongooseInitializer = require('./Utils/MongooseInitializer');
MongooseInitializer.LoadModels();

App.get('/', function(req, res){
    var dir = path.resolve(__dirname, '../Client/');
    res.sendfile('index.html', { root: dir });
});

var usersList = [
        {
            "_id": "55b7ed03f6493af8cbfb68bf",
            "UserName": "ionut.paraschiv",
            "Password": "$2a$10$Oi.wm7K5f8xWdFJQRAMQquEH01OMB/P.sHwadokUKpbWUU89L5gl.",
            "Type": "Regular",
            "RatingSkills": 2.45,
            "Email": "a",
            "ProfileImageUrl": "<%HOST.ORIGIN%>/Resource/55cb2047e2758cb407bc0a9d",
            "FirstName": "UserA",
            "LastName": "Regular UserA",
            "LastSeenDate": 1438004284428,
            "BornYear": 1989,
            "Gender": "Female",
            "HomeCountry": "French Polynesia",
            "NativeLanguage": "Maltese",
            "RegistrationDate": 1438004274428,
            "AccountState": 1,
            "PushNotification": {
                "MobileNotificationKey": "144558b1a7233986c22085d5f1720c5952973df6769e52290ca9da69b7262c77",
                "MobileType": "iOS"
            }
        },
        {
            "_id": "55b7ed49f6493af8cbfb68c0",
            "UserName": "dobre.catalin",
            "Password": "$2a$04$p/BJa8xdvYe21RTL5/MNHeLBoY1/uJkye0XdsC0FIQ7YTbY/QFEP6",
            "Type": "Regular",
            "RatingSkills": 4,
            "Email": "b",
            "ProfileImageUrl": "<%HOST.ORIGIN%>/Resource/55cb2047e2758cb407bc0a9b",
            "FirstName": "Regular UserB",
            "LastName": "Regular UserB",
            "LastSeenDate": "1438004284428",
            "BornYear": 1988,
            "Gender": "Male",
            "HomeCountry": "Romania",
            "NativeLanguage": "Romanian",
            "RegistrationDate": "1438004274428",
            "AccountState": 1,
            "PushNotification": {
                "MobileNotificationKey": "144558b1a7233986c22085d5f1720c5952973df6769e52290ca9da69b7262c77",
                "MobileType": "iOS"
            }
        }
    ];


var topicsList = [
        {
            "_id": "55b7ed03f6493af8cbfb68bf",
			"Name": "Interview",
			"IconUrl": "http://46.4.214.252:8080/interview_logo.png"
        },
        {
            "_id": "55b7ed49f6493af8cbfb68c0",
			"Name": "Opinion",
			"IconUrl": "http://46.4.214.252:8080/interview_logo.png"
        }
    ];

var getPaginatedDataset = function(req, res, rows, filter) {
	var current = parseInt(req.body.current),
		rowCount = parseInt(req.body.rowCount),
		searchPhrase = req.body.searchPhrase;
	
	if (searchPhrase != "") {
		rows = filter(rows, searchPhrase);
	}
	
	var total = rows.length;
	
	rows = rows.slice( (current - 1) * rowCount, current * rowCount);
	return {
		current : current,
		rowCount : rowCount,
		rows: rows,
		total : total
	}
};

var taskTemplatesFilter = function(rows, searchPhrase) {
	return _.filter(rows, function (row) {
				if (row.Caption.indexOf(searchPhrase) != -1) {
					return true;
				}
				return false;
			});
};

var usersFilter = function(rows, searchPhrase) {
	return _.filter(rows, function (row) {
				if (row.Email.indexOf(searchPhrase) != -1) {
					return true;
				}
				return false;
			});
}

var topicsFilter = function(rows, searchPhrase) {
	return _.filter(rows, function (row) {
				if (row.Name.indexOf(searchPhrase) != -1) {
					return true;
				}
				return false;
			});
}

//TODO: rewrite with Async
App.get('/taskTemplateViewModel/:id', function(req,res){
    var id = req.params.id;
    mongoose.model('TaskTemplate').findById(id).exec(function (err, taskTemplate) {
        taskTemplate.FindLinkedTopic(function(response){
                var topic = response.Topic;
                var topicSummary = response.TopicSummary;
                // TODO: Handle when they are not defined
                if (topic){
                    topic.FindLinkedCertificate(function(linkedCertificateResult){
                        mongoose.model('Competence').findById(taskTemplate.CompetenceId).exec(function(err, competence){
                            var json = {
                                CertificatesConfiguration : {
                                    Certificate : {
                                        Id: linkedCertificateResult.CertificateSummary.Id,
                                        Name: linkedCertificateResult.CertificateSummary.Name
                                    },
                                    Subcertificate: linkedCertificateResult.CertificateSummary.Subcertificate,
                                    TopicList: topicSummary.TopicList
                                },
                                Competence : {
                                    Id: competence._id,
                                    Name : competence.Name
                                },
                                Active: true,
                                Template: taskTemplate
                            }
                            res.json(json);
                        });
                    });
                }
                else {
                    mongoose.model('Competence').findById(taskTemplate.CompetenceId).exec(function(err, competence){
                        var json = {
                            CertificatesConfiguration : null,
                            Competence : {
                                Id: competence._id,
                                Name : competence.Name
                            },
                            Active: false,
                            Template: taskTemplate
                        }
                        res.json(json);
                    });
                }
            });
    });
});

App.post('/taskTemplates', function(req, res){
    mongoose.model('TaskTemplate').find({}).exec(function (err, taskTemplatesList) {
	    res.json(getPaginatedDataset(req, res, taskTemplatesList, taskTemplatesFilter));
	});
});

App.post('/users', function(req, res){
    mongoose.model('User').find({}).exec(function (err, usersList) {
    	res.json(getPaginatedDataset(req, res, usersList, usersFilter));
    });
});

App.post('/topics', function(req, res) {
    mongoose.model('Topic').find({}).exec(function (err, topicsList) {
    	res.json(getPaginatedDataset(req, res, topicsList, topicsFilter));
    });
})

App.get('/configurationCertificatesViewModel', CertificateConfigurationController.ConfigurationCertificatesViewModel);
App.get('/configurationSubcertificatesViewModel', CertificateConfigurationController.ConfigurationSubcertificatesViewModel);
App.get('/configurationTopicListViewModel', CertificateConfigurationController.ConfigurationTopicListViewModel);

var Enums = require('./Core/Enums');
App.get('/linkableCompetences' , function(req, res){
    mongoose.model('TreeStructure').findOne({ Type: Enums.TreeStructureType.Competence}).exec(function (err, tree) {
        tree.FetchTree(function (err, tree) {
            tree.WalkTree(CompetenceNodeHandlingStrategies.FetchProperties, null, function (err, tree) {
                var nodes = tree.RootNode.GetLeafs();
                var leafCompetences = _.map(nodes, function(node){
                    var leaf =_.extend({ Id: node._id}, node.Properties);
                    return leaf;
                })
                res.json(leafCompetences);
            });
        });
    });            
});

http.createServer(App).listen(process.env.PORT || App.get('port'), function () {
    console.log('Express server listening on port ' + (process.env.PORT || App.get('port')));
});