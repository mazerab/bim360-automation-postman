const fs = require('fs');
const newman = require('newman');
const path = require('path');
const prompt = require('prompt');

const testSuites = [
    { '1': 'Download Published File' },
    { '2': 'Upload Linked Files' },
    { '3': 'Download Linked Files' },
    { '4': 'Project Setup' }
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
    }).on('request', function (err, execution) { // This is triggered when a response has been received
        if (err) { return console.error(err); }
        switch (execution.item.name) {
            case 'Download File':
                fs.writeFile(path.join(__dirname, 'output', 'Architecture.zip'), execution.response.stream, function (error) {
                    if (error) { console.error(error); }
                });
                break;
            case 'Download Linked File': { // We stored index and xrefs array into request header to determine filenames
                let xref_index = execution.request.headers.filter((header) => {
                    return header.key === 'xref_index';
                });
                xref_index = xref_index[0].value;
                const xrefs = execution.request.headers.filter((header) => {
                    return header.key === 'xrefs';
                });
                let xref = JSON.parse(xrefs[0].value);
                xref = xref[xref_index];
                fs.writeFile(path.join(__dirname, 'output', xref.file_name), execution.response.stream, function(error) {
                    if (error) { console.error(error); }
                });
                break;
            }
            case 'Download Parent File':
                fs.writeFile(path.join(__dirname, 'output', 'Architecture.rvt'), execution.response.stream, function (error) {
                    if (error) { console.error(error); }
                });
                break;
            default:
                break;
        }
    });
}

function setEnvironment(testrun) {
    let options = {};
    switch (testrun) {
        case 1:
            options.environment = './assets/environment/download_published_file.postman_environment.json';
            options.folders = ['Two Legged', 'Download Published File'];
            break;
        case 2:
            options.environment = './assets/environment/upload_linked_files.postman_environment.json';
            options.folders = ['Two Legged', 'Upload Linked Files'];
            break;
        case 3:
            options.environment = './assets/environment/download_linked_files.postman_environment.json';
            options.folders = ['Two Legged', 'Download Linked Files'];
            break;
        case 4:
            options.environment = './assets/environment/project_setup.postman_environment.json';
            options.folders = ['Two Legged', 'Project Setup']
            break;
        default:
            break;
    }
    return options;
}
