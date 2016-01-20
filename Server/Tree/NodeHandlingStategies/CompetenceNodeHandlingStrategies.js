var _ = require('underscore');
var mongoose = require('mongoose');
var TaskStateType = require('../../Core/Enums').TaskStateType;

var FetchProperties = function (node, context, callback) {
    if (node.ResourceId) {
        mongoose.model("Competence").findById(node.ResourceId).exec(function (err, competence) {
            node.Properties = {
                Name: competence.Name,
                Description: competence.Description
            };
            callback(null, node);
        });
    }
    else {
        callback(null, node);
    }
};

var ComputeRating = function (node, context, callback) {
    var Helper = require('../../Utils/Helper');
    if (node.IsLeaf) {
        mongoose.model("Task").find({
            PlayerId: context.PlayerId,
            "Template.CompetenceId" : node.ResourceId,
            State: TaskStateType.Closed,
        }).exec(function (err, tasks) {
            var averageRating = Helper.ComputeAverage(tasks, function (task) { return task._doc.TAS });
            node.Properties.Rating = averageRating;

            callback(null, node);
        });
    }
    else {  
        var averageRating = Helper.ComputeAverage(node.Children, function (child) { return child.Properties.Rating });
        node.Properties.Rating = averageRating;
        
        callback(null, node);
    }
}

var BuildJsonForMobile = function (node, context, callback) {
    var json = {
        Name: node.Properties.Name,
        Description: node.Properties.Description,
        Rating: node.Properties.Rating,
        Children: []
    };

    if (!node.IsLeaf) {
        node.Children.forEach(function (child) {
            json.Children.push(child.Properties.MobileJsonRepresentation);
        });
    }

    node.Properties.MobileJsonRepresentation = json;
    callback(null, node);
}

exports.FetchProperties = FetchProperties;
exports.ComputeRating = ComputeRating;
exports.BuildJsonForMobile = BuildJsonForMobile;