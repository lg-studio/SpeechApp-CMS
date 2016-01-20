var path = require('path');
var appDir = path.dirname(require.main.filename);

var Config = {
    LogConfig: {
        appenders: [
            {
                type: 'file',
                filename: appDir + '/Logs/States.log',
                category: 'States'
            }
        ]
    },
    EmailProvider: {
        User: "3angletechspeechapp@gmail.com",
        Password: "leuphana",
        Smtp: "smtp.gmail.com"
    }
}
var environmentType = process.env.NODE_ENV;
var environment = null;

if (environmentType == "production") {
    environment = require('./EnvironmentConfig.heroku.js');
}
else if (environmentType == "Test"){
    environment = require('./EnvironmentConfig.test.js');
}
else {
    environment = require('././EnvironmentConfig.development.js');
}

environment.Origin = environment.BaseUrl;

if (environment.Port){
    environment.Origin += ":" + environment.Port;    
}

Config.Environment = environment;


module.exports = Config;