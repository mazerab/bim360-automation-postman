const newman = require('newman');
const { existsSync, mkdirSync, writeFile } = require('fs');
const { join } = require('path');
const prompt = require('prompt');

const testSuites = [
    { '1': 'Download Published File (Newman)' },
    { '2': 'Upload Single File (Newman)' },
    { '3': 'Upload Linked Files (Newman)' },
    { '4': 'Download Linked Files (Newman)' },
    { '5': 'Project Setup (Newman)' },
    { '6': 'Overwrite Linked Files (Newman)' }
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
    createOutputFolder();
    Object.values(testSuites).forEach(function(value) {
        if (Object.keys(value) == result.testrun) {
            console.info(`  Starting Test Run: ${value[result.testrun]}`);
            const options = setEnvironment(result.testrun);
            runScript(options);
        }
    });
});

function createOutputFolder() {
    const outputDir = join(__dirname, 'output');
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir);
    }
}

function runScript(options) {
    newman.run({
        collection: require('./postman_collection.json'),
        color: 'on',
        environment: require(options.environment),
        insecureFileRead: ( options.insecureFileRead ? options.insecureFileRead: false ),
        iterationCount: ( options.iterationCount ? options.iterationCount: 1),
        iterationData: (options.iterationData? require(options.iterationData): ''),
        folder: options.folders,
        reporters: 'cli'
    }, function (err) {
        if (err) { throw err; }
        console.info('Collection run complete!');
    }).on('request', function (err, execution) { // This is triggered when a response has been received
        if (err) { return console.error(err); }
        switch (execution.item.name) {
            case 'Download File':
                writeFile(join(__dirname, 'output', 'Architecture.zip'), execution.response.stream, function (error) {
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
                writeFile(join(__dirname, 'output', xref.file_name), execution.response.stream, function(error) {
                    if (error) { console.error(error); }
                });
                break;
            }
            case 'Download Parent File':
                writeFile(join(__dirname, 'output', 'Architecture.rvt'), execution.response.stream, function (error) {
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
            options.environment = './assets/environment/upload_single_file.postman_environment.json';
            options.folders = ['Two Legged', 'Upload Single File'];
            break;
        case 3:
            options.environment = './assets/environment/upload_linked_files.postman_environment.json';
            options.folders = ['Two Legged', 'Upload Linked Files'];
            options.insecureFileRead = true;
            options.iterationCount = 3;
            options.iterationData = './assets/models/data_files.json';
            break;
        case 4:
            options.environment = './assets/environment/download_linked_files.postman_environment.json';
            options.folders = ['Two Legged', 'Download Linked Files'];
            break;
        case 5:
            options.environment = './assets/environment/project_setup.postman_environment.json';
            options.folders = ['Two Legged', 'Project Setup']
            break;
        case 6:
            options.environment = './assets/environment/overwrite_linked_files.postman_environment.json';
            options.folders = ['Two Legged', 'Overwrite Linked Files'];
            options.insecureFileRead = true;
            options.iterationCount = 3;
            options.iterationData = './assets/models/data_files.json';
            break;
        default:
            break;
    }
    return options;
}