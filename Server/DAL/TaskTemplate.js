var _ = require('underscore');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskTemplateSchema = new Schema({
    Caption: { type: String, defaults: '', trim: true },
    CreatedById: Schema.Types.ObjectId,
    Type: { type: String },
    MultipleChoiceOptionsTreeId: { type: Schema.Types.ObjectId },
    CompetenceId: {type : Schema.Types.ObjectId},
    IconUrl: {type: String},
    Nodes: {
        type: [
            {
                Id: { type : Number },
                Type: { type: String },
                Properties: { type: Schema.Types.Mixed }
            }
        ]
    }
});

TaskTemplateSchema.methods = {
    FindLinkedTopic : function (callback) {
        var id = this._id;
        mongoose.model('Topic').findOne({ TopicList : {$elemMatch : { TaskTemplatesIds : { $elemMatch : {$eq : id } }}}}).
        exec(function(err, topic){
            var topicList = null;
            if (topic){
                topicList = _.find(topic.TopicList, function(topicList){
                        var found = _.find(topicList.TaskTemplatesIds, function(ttid){
                            return (ttid.toString() === id.toString());
                        });
                        return (found)? true: false;
                });
            }
            var response = {
                Topic: topic,
            };
            if (topic){
                response.TopicSummary = {
                    Id: topic._id.toString(),
                    TopicList: {
                        Id : topicList.Id,
                        Name: topicList.Name
                    }
                }
            }
            callback(response);
        });
    }
}

mongoose.model("TaskTemplate", TaskTemplateSchema, "TaskTemplates");