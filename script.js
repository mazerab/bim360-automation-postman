const async = require('async');
const { DataManagementClient } = require('forge-server-utils');
const fs = require('fs');
const newman = require('newman');
const path = require('path');
const prompt = require('prompt');
const util = require('util');

const testSuites = [
    { '1': 'Download Published File' },
    { '2': 'Upload Single File' },
    { '3': 'Upload Linked Files (Newman)' },
    { '4': 'Upload Linked Files (Node)' },
    { '5': 'Download Linked Files' },
    { '6': 'Project Setup' }
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
            console.info(`  Starting Test Run: ${value[result.testrun]}`);
            if (result.testrun === 4) {
                nodeUploadLinkedFiles();
            } else {
                const options = setEnvironment(result.testrun);
                runScript(options);
            }
        }
    });
});

async function nodeUploadFile(file, options, callback) {
    try {
        const data = new DataManagementClient({ client_id: options.client_id, client_secret: options.client_secret });
        const readFile = util.promisify(fs.readFile);
        const buffer = await readFile(file);
        const upload = await data.uploadObject(options.bucket_key, path.basename(file), 'application/octet-stream', buffer);
        console.info(`upload: ${JSON.stringify(upload)}`);
    } catch (error) {
        console.error(error);
    }
}

function nodeUploadLinkedFiles() {
    try {
        const dataFilesJson = JSON.parse(fs.readFileSync('./assets/models/data_files.json', 'utf8'));
        const files = dataFilesJson.map(function(file) {
            return `${file.path}/${file.name}`;
        });
        const environmentJson = JSON.parse(fs.readFileSync('./assets/environment/upload_linked_files.postman_environment.json', 'utf8'))
        const options = {};
        Object.values(environmentJson.values).forEach(function(value) {
            switch (value.key) {
                case 'base_url':
                    options.base_url = value['value'];
                    break;
                case 'bucket_key':
                    options.bucket_key = value['value'];
                    break;
                case 'client_id':
                    options.client_id = value['value'];
                    break;
                case 'client_secret':
                    options.client_secret = value['value'];
                    break;
                case 'x_user_id':
                    options.x_user_id = value['value'];
                    break;
                default:
                    break;
            }
        });
        console.info(`options: ${JSON.stringify(options)}`);
        const calls = [];
        files.forEach(function(file) {
            calls.push(function(callback) {
                nodeUploadFile(file, options, function(err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result);
                    }
                });
            });
        });
        async.parallel(calls, function(err, result) {
            if (err) {
                console.error(err);
                return console.error(err);
            }
            console.info(result);
        });
    } catch (error) {
        console.error(error);
    }
}

function runScript(options) {
    newman.run({
        collection: require('./postman_collection.json'),
        environment: require(options.environment),
        insecureFileRead: ( options.insecureFileRead ? options.insecureFileRead: false ),
        iterationCount: ( options.iterationCount ? options.iterationData: 1),
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
        case 5:
            options.environment = './assets/environment/download_linked_files.postman_environment.json';
            options.folders = ['Two Legged', 'Download Linked Files'];
            break;
        case 6:
            options.environment = './assets/environment/project_setup.postman_environment.json';
            options.folders = ['Two Legged', 'Project Setup']
            break;
        default:
            break;
    }
    return options;
}