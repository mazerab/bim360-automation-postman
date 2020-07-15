const { DataManagementClient, BIM360Client } = require('forge-server-utils');
const async = require('async');
const fs = require('fs');
const path = require('path');
const util = require('util');

class NodeUpload {

    constructor() {
        this.options = this.readEnvironment();
        this.bim = new BIM360Client({ client_id: this.options.client_id, client_secret: this.options.client_secret });
        this.data = new DataManagementClient({ client_id: this.options.client_id, client_secret: this.options.client_secret });
    }

    async nodeUploadFile(file, options, callback) {
        try {
            const storage = await this.bim.createStorageLocation(options.project_id, path.basename(file), 'folders', options.folder_id, options.x_user_id);
            const readFile = util.promisify(fs.readFile);
            const buffer = await readFile(file);
            await this.data.uploadObject(options.bucket_key, path.basename(storage.id), 'application/octet-stream', buffer);
            const version = await this.bim.createVersion(options.project_id, path.basename(file), options.folder_id, storage.id);
            callback(null, { name: path.basename(file), urn: version.id });
        } catch (error) {
            console.error(error);
        }
    }
    
    async nodeUploadLinkedFiles() {
        try {
            const dataFilesJson = JSON.parse(fs.readFileSync('./assets/models/data_files.json', 'utf8'));
            const files = dataFilesJson.map(function(file) {
                return `${file.path}/${file.name}`;
            });
            const hubs = await this.bim.listHubs(this.options.x_user_id);
            const account = hubs.filter(function(hub) {
                return hub.name === this.options.hub_name;
            }, this);
            this.options.hub_id = account[0].id;
            const projects = await this.bim.listProjects(this.options.hub_id, this.options.x_user_id);
            const project = projects.filter(function(hubProject) {
                return hubProject.name === this.options.project_name;
            }, this);
            this.options.project_id = project[0].id;
            const topFolders = await this.bim.listTopFolders(this.options.hub_id, this.options.project_id, this.options.x_user_id);
            const topFolder = topFolders.filter(function(projectFolder) {
                return projectFolder.name === 'Project Files';
            }, this);
            this.options.top_folder_id = topFolder[0].id;
            const folders = await this.bim.listContents(this.options.project_id, this.options.top_folder_id, this.options.x_user_id);
            const folder = folders.filter(function (subFolder) {
                return subFolder.name === this.options.upload_folder_name;
            }, this);
            this.options.folder_id = folder[0].id;
            const calls = [];
            files.map(function(file) {
                calls.push(callback => {
                    this.nodeUploadFile(file, this.options, function(err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, result);
                        }
                    });
                });
            }, this);
            async.series(calls, function(err, results) {
                if (err) {
                    console.error(err);
                    return console.error(err);
                }
                console.info(results);
            });
        } catch (error) {
            console.error(error);
        }
    }

    readEnvironment() {
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
                case 'hub_name':
                    options.hub_name = value['value'];
                    break;
                case 'project_name':
                    options.project_name = value['value'];
                    break;
                case 'scope':
                    options.scope = value['value'];
                    break;
                case 'upload_folder_name':
                    options.upload_folder_name = value['value'];
                    break;
                case 'x_user_id':
                    options.x_user_id = value['value'];
                    break;
                default:
                    break;
                }
        });
        return options;
    }

}

module.exports = NodeUpload;