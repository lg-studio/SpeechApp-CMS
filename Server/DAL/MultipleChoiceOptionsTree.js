var _ = require('underscore');
var Async = require('async');
var ObjectID = require('mongodb').ObjectID;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MultipleChoiceOptionsTree = new Schema({
    DisplayText : Schema.Types.String,
    Type: Schema.Types.String,
    Options: {type: [
        {
            Id: Schema.Types.Number,
            Type: Schema.Types.String,
            Properties: {
                Text: Schema.Types.Mixed
            },
            InnerOptions: { type: [
                {
                    Id: Schema.Types.Number,
                    Type: Schema.Types.String,
                    Properties: Schema.Types.Mixed
                }
            ]}
        }
    ]}
});

mongoose.model("MultipleChoiceOptionsTree", MultipleChoiceOptionsTree, "MultipleChoiceOptionsTrees");