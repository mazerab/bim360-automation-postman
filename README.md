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

#### Revit Files Transfer

To successfully download files from BIM360 Docs, one cannot use Postman as it does not support downloading files to disc. Instead, one can use Newman to run Postman collection in a command line and write the response binary to a file on you local disk.

##### Downloading a Revit Published File

In this scenario, the Revit linked files were setup in Revit desktop and published to BIM360 Docs.

Steps to run the download of a single Revit file:

1. Open in your favorite text editor `./assets/environment/download_published_file.postman_environment.json` and edit the environment variables' values \
    ```arch_file_name=Architecture.rvt``` \
    ```arch_folder_name=Architecture``` \
    ```base_url=https://developer.api.autodesk.com``` \
    ```client_id=<your Forge app client ID>``` \
    ```client_secret=<your Forge app client secret>``` \
    ```hub_name=<your BIM360 hub name>``` \
    ```project_name=<your BIM360 project name>``` \
    ```scope=data:read``` \
    ```x-user-id=<your user ID>```
1. Open a terminal and change directory to the repository
1. Run the command `npm test`
1. Input **1** for executing the **Download Published File** test run
1. Check current directory for new file `./Architecture.rvt`

##### Downloading Revit Linked Files

This method only works when the Revit host model and linked files are uploaded using the **Upload as linked files** command in BIM360 Docs.

![Upload Linked Files](/assets/media/upload-linked-files.png)

In this scenario, the **Architecture.rvt** file is the parent model. The **Mechanical.rvt** and **Structural.rvt** models are the linked files.

Steps to run the download of Revit Linked Files:

1. Open in your favorite text editor `./assets/environment/download_linked_files.postman_environment.json` and edit the environment variables' values \
    ```arch_file_name=Architecture.rvt``` \
    ```arch_folder_name=<your Docs folder>``` \
    ```base_url=https://developer.api.autodesk.com``` \
    ```client_id=<your Forge app client ID>``` \
    ```client_secret=<your Forge app client secret>``` \
    ```hub_name=<your BIM360 hub name>``` \
    ```project_name=<your BIM360 project name>``` \
    ```scope=data:read``` \
    ```x-user-id=<your user ID>```
1. Open a terminal and change directory to the repository
1. Run the command `npm test`
1. Input **1** for executing the **Download Published File** test run
1. Check current directory for new file `./Architecture.rvt`

##### Uploading Revit Files

TBD

#### Project Setup

Steps to create a new project in BIM360:

1. Open in your favorite text editor `./assets/environment/project_setup.postman_environment.json` and edit the environment variables' values \
    ```business_unit_name=<your BIM360 business unit>``` \
    ```base_url=https://developer.api.autodesk.com``` \
    ```client_id=<your Forge app client ID>``` \
    ```client_secret=<your Forge app client secret>``` \
    ```construction_type=<your new project construction type>``` \
    ```contract_type=<your new project contract type>``` \
    ```currency=<your new project currency>``` \
    ```hub_name=<your BIM360 hub name>``` \
    ```project_type=<your new project type>``` \
    ```service_type=<your new project service type>``` \
    ```scope=data:read account:read account:write``` \
    ```timezone=<your new project timezone>``` \
    ```x-user-id=<your user ID>``` \
   If unsure what values to input, please refer to the [parameters](https://forge.autodesk.com/en/docs/bim360/v1/overview/parameters/) documentation page.
1. Open a terminal and change directory to the repository
1. Run the command `npm test`
1. Input **2** for executing the **Project Setup** test run
1. Go to BIM360 Admin console and verify new project has been created

### Generating the Postman Collection Docs

1. TBD

## Sample Data

The Revit models used in the live demo can be obtained from [here](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2020/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html).

## License

> You can check out the full license [here](LICENSE)

This project is licensed under the terms of the **MIT** license.

## Written By

Bastien Mazeran ([@BastienMazeran](https://twitter.com/BastienMazeran)), Autodesk Customer Success
