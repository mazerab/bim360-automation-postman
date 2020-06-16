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
* [Newman](https://github.com/postmanlabs/newman) installed
* [Forge](https://forge.autodesk.com) application credentials
* [Access to a BIM 360 Account](https://forge.autodesk.com/en/docs/bim360/v1/tutorials/getting-started/get-access-to-account/)

## Getting Started

This section will guide you through getting the Postman collection up and running on your own system.

## The anatomy of a Postman Request

TBD

### Running the Postman Collection

The postman collection provided in this repository covers different BIM360 automation use cases.

#### Revit Linked Files Transfer

##### BIM360 Docs Setup

1. Create a new project
1. Create two folders under that project *Architecture* and *Structural*
1. Upload as linked files to your BIM360 Docs site the three Revit sample files found in the assets directory
1. Set the rac_basic_sample_project.rvt file as the parent
![Upload Linked Files](/assets/media/upload-linked-files.png)

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
