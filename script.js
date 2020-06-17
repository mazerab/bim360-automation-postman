const fs = require('fs');
const newman = require('newman');
const path = require('path');

newman.run({
    collection: require('./postman_collection.json'),
    environment: require('./site_1.postman_environment.json'),
    folder: ['Authentication', 'Downloads'],
    reporters: 'cli'
}, function (err) {
    if (err) { throw err; }
    console.info('Collection run complete!');
}).on('request', function (err, execution) { // This is triggered when a response has been recieved
    if (err) { return console.error(err); }
    if (execution.item.name === 'Download File') {
        fs.writeFile(path.join(__dirname, 'rac_basic_sample_project.rvt'), execution.response.stream, function (error) {
            if (error) { console.error(error); }
        });
    }
});
