var _ = require('underscore');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Topic = new Schema({
    TopicList: { type: Schema.Types.Mixed }
});

Topic.methods = {
    FindLinkedCertificate : function (callback) {
        var id = this._id;
        mongoose.model('Certificate').findOne(
            { $or : [
            { TopicListId : id},
            { Subcategories : {$elemMatch : { TopicListId : id }}}
        ]}).
        exec(function(err, certificate){
            var subcategoriesList = certificate.Subcategories;
            var subcertificate = null;
            if (subcategoriesList){
                var subcategory = _.find(subcategoriesList, function(item){
                    return item.TopicListId.toString() === id.toString();
                });
                subcertificate = {
                    Id : subcategory.Id,
                    Name: subcategory.Name
                }
            }
            var result = {
                Certificate : certificate,
                CertificateSummary: {
                    Id : certificate._id.toString(),
                    Name: certificate.Name, 
                    Subcertificate : subcertificate
                }                
            }
            callback(result); 
        })
    }
}

mongoose.model("Topic", Topic, "Topics");