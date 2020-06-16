# Getting Postman to service your (BIM 360) automation needs

![Postman Version](https://img.shields.io/badge/postman-v6.2.3-green.svg)
![Platforms](https://img.shields.io/badge/platform-Windows|MacOS-lightgray.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2010.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

[![Viewer](https://img.shields.io/badge/Viewer-v7-green.svg)](http://developer.autodesk.com/)
[![Data-Management](https://img.shields.io/badge/Data%20Management-v1-green.svg)](http://autodesk-forge.github.io)
[![OSS](https://img.shields.io/badge/OSS-v2-green.svg)](http://autodesk-forge.github.io)
[![Model-Derivative](https://img.shields.io/badge/Model%20Derivative-v2-green.svg)](http://autodesk-forge.github.io)

[![koa2](https://img.shields.io/badge/koa-2-green.svg)](https://github.com/koajs/koa)
![vue2](https://img.shields.io/badge/vue-2.6.6-green.svg)
[![vuetify](https://img.shields.io/badge/Vuetify-2.0-blue.svg)](https://github.com/vuetifyjs/vuetify)
[![oauth](https://img.shields.io/badge/passport--oauth-1-brightgreen.svg)](https://github.com/jaredhanson/passport-oauth)

![Intermediate](https://img.shields.io/badge/Level-Intermediate-blue.svg)

## Table of Contents

* [Description](#description)
* [Site](#site)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [Build and Test](#build-and-test)
* [Deployment](#deployment)
* [Documentation](#documentation)
* [Sample Data](#sample-data)
* [License](#license)
* [Written By](#written-by)

## Description

The digital catalog project is a Forge-powered responsive web application that enables companies to publish key models (Inventor, Fusion360) from Fusion Team or BIM360 Docs
to their proprietary catalog. Companies can create the catalog structure they need as well as retire products, which have reached end-of-life, from the catalog.

External users can search the catalog and view a 3D representation of each catalog item using the Forge Viewer.

This digital catalog solution also delivers interactive instructions workflow (assembly / disassembly instructions) by supporting animations authored in Fusion 360 in the Forge Viewer.

This web application can act as a foundation for more advanced workflows, such as digital twin initiatives.

## Site

### Landing Page

![Landing Page](/src/client/public/thumbnail.png)

### Administration Console

![Admin Page](/src/client/public/settings.png)

### Publisher Console

![Publisher Page](/src/client/public/publisher.png)

### Interactive Instructions

![Animation Page](/src/client/public/interactive_instructions.png)

### AR/VR Toolkit

The AR/VR Toolkit feature enables translation of SVF to [glTF](https://www.khronos.org/gltf/) file format.

![ARVR Page](/src/client/public/arvr_toolkit.png)

To learn how to author augmented reality machine instructions, please go to: [Augmented Virtual Reality](arvr)

### Live Demo

[Digital Catalog](https://forge-digital-catalog.herokuapp.com)

## Prerequisites

- Node.js v10+
- [Forge](https://forge.autodesk.com) application credentials
- MongoDB database
  - for example, use the free tier of [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - or run it locally: <https://docs.mongodb.com/manual/installation>

## Getting Started

This section will guide you through getting the code up and running on your own system.

1. Installation process

    ```git clone https://github.com/Autodesk-Forge/forge-digital-catalog digital-catalog```\
    ```cd digital-catalog``` \
    ```npm install```

2. Software dependencies

    Please check `dependencies` in [package.json](package.json).

## Build and Test

Because our frontend app (./src/client) is developed separately from our backend (./src/server) - i.e. our backend exposes an
API for our frontend to talk to, then our frontend is essentially a purely static app. We can deploy
the built content in the ```www``` directory to any static file server, but we need to make sure to set the correct
publicPath.

You can review how the frontend app will be built by reading the configuration in the ```./vue.config.js``` file.

To build the frontend app: ```npm run build```

This will create a new directory ```./www``` with the static files.

### Development build

1. Set environment variables

    ```FORGE_CALLBACK_URL=http://localhost:3000/api/forge/callback/oauth``` \
    ```FORGE_CLIENT_ID=<Your Forge Client ID>``` \
    ```FORGE_CLIENT_SECRET=<Your Forge Client Secret>``` \
    ```MONGODB_URI=<Your MongoDB Uri>``` \
    ```NODE_ENV=development``` \
    ```USE_LOAD_BALANCER=false```

2. Compile TypeScript

    ```npm run tsbuild```

3. Start Vue.js front-end app

    ```npm run serve```

4. Start Koa.js back-end app

    On first run (only once): \
    ```npm run init```\
    ```npm run setadmin init```

    Any time you start the server: \
    ```npm run dev``` (on mac) \
    ```npm run windev``` (on windows)

If you run into an error connecting to MongoDB, make sure you specify the database name in your connection string.
`mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});`

To learn how to configure the WebHooks locally, please follow this link: [Local WebHooks Instructions](webhooks)

### Test build

1. Set environment variables

    ```FORGE_CALLBACK_URL=http://localhost:3000/api/forge/callback/oauth``` \
    ```FORGE_CLIENT_ID=<Your Forge Client ID>``` \
    ```FORGE_CLIENT_SECRET=<Your Forge Client Secret>``` \
    ```MONGODB_URI=<Your MongoDB Uri>``` \
    ```NODE_ENV=test``` \
    ```USE_LOAD_BALANCER=false```

2. Compile TypeScript

    ```npm run tsbuild```

3. Run the tests

    On first run (only once): \
    ```npm run init``` \
    ```npm run setadmin add <email>``` \
    ```npm run tsbuild:test```

    Any time you run the tests: \
    ```npm test``` (on mac) \
    ```npm run wintest``` (on windows)

### Production build

1. Set environment variables

    ```FORGE_CALLBACK_URL=https://<Your Web Server>/api/forge/callback/oauth``` \
    ```FORGE_CLIENT_ID=<Your Forge Client ID>``` \
    ```FORGE_CLIENT_SECRET=<Your Forge Client Secret>``` \
    ```MONGODB_URI=<Your MongoDB Uri>``` \
    ```NODE_ENV=production``` \
    ```USE_LOAD_BALANCER=false``` \
    ```VUE_APP_KOA_HOST=<Your Web Server>``` \
    ```VUE_HOST=<Your Web Server>```

2. Compile TypeScript

    ```npm run tsbuild```

3. Build Vue.js front-end app

    ```npm run build```

4. Start Koa.js back-end app

    On first run (only once): \
    ```npm run init```\
    ```npm run setadmin add <email>```

    Any time you start the server: \
    ```npm start``` (on mac) \
    ```npm start``` (on windows)

## Deployment

To learn how to deploy this Forge application, please follow this link: [Deployment Instructions](deployment)

## Documentation

The online help for this application can be served through docsify.

To install docsify, please navigate to <https://docsify.js.org/#/quickstart>

The documentation markup files for this application are located under the ```./docs``` folder.

To preview the online help, simply run the command ```docsify serve ./docs``` to start the local server.
You can then preview your online help site in your browser on ```http://localhost:3000```.

## Sample Data

The models used in the live demo can be obtained from \
<https://knowledge.autodesk.com/support/inventor/troubleshooting/caas/downloads/content/inventor-sample-files.html>

## License

> You can check out the full license [here](LICENSE)

This project is licensed under the terms of the **MIT** license.

## Written By

Bastien Mazeran ([@BastienMazeran](https://twitter.com/BastienMazeran)), Autodesk Customer Success

# Getting Postman to service your (BIM 360) automation needs.

This project aims at documenting ways to automate tasks in BIM360 Docs. 
The automation is powered by combining the Forge BIM360 and Data Management APIs. 

It focuses on the process of writing, documenting, running, and automating API tests with Postman.

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)


Learning objectives
Creating collections
Creating GET, POST, PUT, and DELETE requests
Using environment variables
Easy Postman assertions
Advanced Postman assertions
Running collections with the collection runner and Newman
Automating test collections as Jenkins projects



