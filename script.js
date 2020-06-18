const fs = require('fs');
const newman = require('newman');
const path = require('path');
const prompt = require('prompt');

const testSuites = [
    { '1': 'Download File'},
    { '2': 'Project Setup'}
]

const schema = {
    properties: {
        testrun: {
            default: 1,
            description: `Enter test run number: ${JSON.stringify(testSuites)}`,
            type: 'integer',
            required: true
        }
    }
};

prompt.start();

prompt.get(schema, function(err, result) {
    if (err) { throw new Error(err); }
    Object.values(testSuites).forEach(function(value) {
        if (Object.keys(value) == result.testrun) {
            console.info(`  Starting testrun: ${value[result.testrun]}`);
            const options = setEnvironment(result.testrun);
            runScript(options);
        }
    });
});

function runScript(options) {
    newman.run({
        collection: require('./postman_collection.json'),
        environment: require(options.environment),
        folder: options.folders,
        reporters: 'cli'
    }, function (err) {
        if (err) { throw err; }
        console.info('Collection run complete!');
    }).on('request', function (err, execution) { // This is triggered when a response has been recieved
        if (err) { return console.error(err); }
        if (execution.item.name === 'Download File') {
            fs.writeFile(path.join(__dirname, 'Architecture.rvt'), execution.response.stream, function (error) {
                if (error) { console.error(error); }
            });
        }
    });
}

function setEnvironment(testrun) {
    let options = {};
    switch (testrun) {
        case 1:
            options.environment = './assets/environment/download_file.postman_environment.json';
            options.folders = ['Authentication', 'Downloads'];
            break;
        case 2:
            options.environment = './assets/environment/project_setup.postman_environment.json';
            options.folders = ['Authentication', 'Project Setup']
            break;
        default:
            break;
    }
    return options;
}
