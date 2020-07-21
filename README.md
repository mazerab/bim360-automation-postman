# Getting Postman to service your (BIM 360) automation needs

![Postman Version](https://img.shields.io/badge/postman-v7.26.0-green.svg)
![Platforms](https://img.shields.io/badge/platform-Windows|MacOS-lightgray.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2010.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

[![BIM360](https://img.shields.io/badge/BIM360-v1-green.svg)](http://autodesk-forge.github.io)
[![Data-Management](https://img.shields.io/badge/Data%20Management-v2-green.svg)](http://autodesk-forge.github.io)
[![OSS](https://img.shields.io/badge/OSS-v2-green.svg)](http://autodesk-forge.github.io)

![Intermediate](https://img.shields.io/badge/Level-Intermediate-blue.svg)

## Table of Contents

* [Description](#description)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [The anatomy of a Postman Request](#the-anatomy-of-a-postman-request)
* [Documentation](#documentation)
* [Sample Data](#sample-data)
* [License](#license)
* [Written By](#written-by)

## Description

This project aims at documenting ways to automate tasks in BIM360 Docs.
The automation is powered by combining the Forge [BIM360](https://forge.autodesk.com/en/docs/bim360/v1/reference/http/) and [Data Management](https://forge.autodesk.com/en/docs/data/v2/reference/http/) APIs.

It focuses on the process of writing, documenting, running, and automating API tests with [Postman](https://www.postman.com/).

## Prerequisites

* [Postman](https://www.postman.com/downloads/) installed
* [Node](https://nodejs.org/en/) LTS version installed
* [Newman](https://github.com/postmanlabs/newman) installed
* [Forge](https://forge.autodesk.com) application credentials
* [Access to a BIM 360 Account](https://forge.autodesk.com/en/docs/bim360/v1/tutorials/getting-started/get-access-to-account/)

## Getting Started

This section will guide you through getting the Postman collection up and running on your own system, as well as running your Postman collection as a command line using newman NPM library.

## The anatomy of a Postman Request

Throughout the course of this document, we will use Postman requests to call the Forge APIs. A request requires an url, an HTTP verb, and other inputs. To successfully call the Forge APIs, please refer to the [Forge documentation](https://forge.autodesk.com/developer/documentation) for each API endpoint to learn more about their specific requirements.

To learn more about Postman, please refer to the [Postman documentation](https://learning.postman.com/docs/postman/launching-postman/introduction/).

### Running the Postman Collection

The postman collection provided in this repository covers different BIM360 automation use cases.

After installing Postman, launch the tool and import the postman collection located in `./postman_collection.json`.

Depending on which automation task you wish to run, different environments will need to be imported into Postman.

The current environment templates JSON files are located under `./assets/environment`.

#### Revit Files Transfer Automation

To successfully download files from BIM360 Docs, one cannot use Postman as it does not support downloading files to disc. Instead, one can use Newman to run Postman collection in a command line and write the response binary to a file on you local disk.

##### Downloading a Revit Published File

[Download Revit Published File Documentation](docs/download_published_file)

##### Downloading Revit Linked Files

[Download Revit Linked Files Documentation](docs/download_linked_files)

##### Uploading Single File

[Upload Single File Documentation](docs/upload_single_file)

##### Uploading Revit Linked Files

[Upload Revit Linked Files Documentation](docs/upload_linked_files)

#### BIM360 Docs Project Setup Automation

[Project Setup Documentation](docs/project_setup)

### Generating the Postman Collection Docs

The online help for this application can be served through docsify.

To install docsify, please navigate to <https://docsify.js.org/#/quickstart>

The documentation markup files for this application are located under the ```./docs``` folder.

To preview the online help, simply run the command ```docsify serve ./docs``` to start the local server.
You can then preview your online help site in your browser on ```http://localhost:3000```.

## Sample Data

The Revit models used in the live demo can be obtained from [here](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2020/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html).

## License

> You can check out the full license [here](LICENSE)

This project is licensed under the terms of the **MIT** license.

## Written By

Bastien Mazeran ([@BastienMazeran](https://twitter.com/BastienMazeran)), Autodesk Customer Success
