var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Certificate = new Schema({
    TopicListId: { type: Schema.Types.ObjectId },
    Name: { type: Schema.Types.String },
    Subcategories: [
        {
            Id: { type: Schema.Types.Number },
            Name: { type: Schema.Types.String },
            TopicListId: { type: Schema.Types.ObjectId }
        }
    ],
    State: { type: Schema.Types.Number }
});

mongoose.model("Certificate", Certificate, "Certificates");