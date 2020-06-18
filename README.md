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
Edit the `Site 1` environment to specify your Forge client ID, client secret and other required variables.

#### Revit Linked Files Transfer

##### BIM360 Docs Setup

1. Create a new project
1. Create two folders under that project *Architecture* and *Structural*
1. Upload as linked files to your BIM360 Docs site the three Revit sample files found in the `./assets` directory
1. Set the *rac_basic_sample_project.rvt* file as the parent
![Upload Linked Files](/assets/media/upload-linked-files.png)

##### Downloading Revit Linked Files

To successfully download files from BIM360 Docs, one cannot use Postman as it does not support downloading files to disc. Instead, one can use Newman to run Postman collection in a command line and write the response binary to a file on you local disk.

Steps to run the download of a single Revit file:

1. Launch Postman
1. Set `Site 1` environment variables \
    ```arch_file_name=Architecture.rvt``` \
    ```arch_folder_name=Architecture``` \
    ```base_url=https://developer.api.autodesk.com``` \
    ```client_id=<your Forge app client ID>``` \
    ```client_secret=<your Forge app client secret>``` \
    ```scope=data:read``` \
    ```x-user-id=<your user ID>```
1. Export `Site 1` environment to new file `./site_1.postman_environment.json`
1. Open a terminal and change directory to the repository
1. Run the command `node script.js`
1. Check current directory for new file `./Architecture.rvt`

##### Uploading Revit Files

#### Project Setup

### Generating the Postman Collection Docs

1. TBD

## Documentation

The online help for this application can be served through docsify.

## Sample Data

The Revit models used in the live demo can be obtained from [here](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2020/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html).

## License

> You can check out the full license [here](LICENSE)

This project is licensed under the terms of the **MIT** license.

## Written By

Bastien Mazeran ([@BastienMazeran](https://twitter.com/BastienMazeran)), Autodesk Customer Success
