var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.IONIC_ENV;
var app = process.app;
console.log(env);
useDefaultConfig.prod.resolve.alias = {
    "@app/env": path.resolve(environmentPath('prod'))
};

useDefaultConfig.dev.resolve.alias = {
    "@app/env": path.resolve(environmentPath('dev'))
};


if (env !== 'prod' && env !== 'dev') {
    // Default to dev config
    useDefaultConfig[env] = useDefaultConfig.dev;
    useDefaultConfig[env].resolve.alias = {
        "@app/env": path.resolve(environmentPath(env))
    };
}

function environmentPath(env) {
    if (env == "prod"){
        var filePath = './src/environments/environment.ts';
    } else if (env == "dev"){
        var filePath = './src/environments/environment.dev.ts';
    }
    if (app && app == "test") {
        var filePath = './src/environments/environment.test.ts';
    }
    if (!fs.existsSync(filePath)) {
        console.log(chalk.red('\n' + filePath + ' does not exist!'));
    } else {
        return filePath;
    }
}

module.exports = function () {
    return useDefaultConfig;
};