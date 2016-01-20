var _ = require('underscore');
var mongoose = require('mongoose');

ConfigurationCertificatesViewModel = function(req, res){
    mongoose.model("Certificate").find({}).exec(function (err, certificates) {
        var viewModelList = _.map(certificates, function(certificate){
            return  {
                Id : certificate._id,
                Name: certificate.Name
            }
        });
        res.json(viewModelList);
    });
};

ConfigurationSubcertificatesViewModel = function(req, res){
    var certificateId = req.query.certificateId;
    mongoose.model("Certificate").findById(certificateId).exec(function (err, certificate) {
        var viewModelList = _.map(certificate.Subcategories, function(subcategorie){
            return  {
                Id : subcategorie.Id,
                Name: subcategorie.Name
            }
        });
        res.json(viewModelList);
    });
}

ConfigurationTopicListViewModel = function(req, res){
    var certificateId = req.query.certificateId;
    var subcertificateId = parseInt(req.query.subcertificateId);
    
    mongoose.model("Certificate").findById(certificateId).exec(function (err, certificate) {
        if (!certificate){
            res.json([]);
            return;
        }
        
        var subcertificate = _.find(certificate.Subcategories, function(subcategorie){
            return subcategorie.Id == subcertificateId;
        });
        
        var topicId = certificate.TopicListId;
        if (subcertificate){
            topicId = subcertificate.TopicListId;
        }
        
        if (topicId){
            mongoose.model('Topic').findById(topicId).exec(function(err, topic){
                var viewModelList = _.map(topic.TopicList, function(topicListItem){
                    return  {
                        Id : topicListItem.Id,
                        Name: topicListItem.Name
                    }
                });
                
                res.json(viewModelList);
            });
        }
        else{
                res.json([]);
        }
    });
}

exports.ConfigurationCertificatesViewModel = ConfigurationCertificatesViewModel;
exports.ConfigurationSubcertificatesViewModel = ConfigurationSubcertificatesViewModel;
exports.ConfigurationTopicListViewModel = ConfigurationTopicListViewModel;