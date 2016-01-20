var Environment = {
    //TODO: create separate databse for logging on Heroku
    LogDatabaseConnectionString : "mongodb://angletech:TestTest01@ds047124.mongolab.com:47124/heroku_3fqb9bt8",
    DatabaseConnectionString : "mongodb://angletech:TestTest01@ds047124.mongolab.com:47124/heroku_3fqb9bt8",
    Port: null,
    BaseUrl: "https://leuphanaspeechapp.herokuapp.com"
}

module.exports = Environment;