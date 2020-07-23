# Upload Linked Files

In this scenario, we are automating the upload of Revit files to a BIM360 Docs folder.

## Steps to run the upload linked files

1. Open in your favorite text editor [assets/environment/upload_linked_files.postman_environment.json](../assets/environment/upload_linked_files.postman_environment.json) and edit the environment variables' values

    ```client_id=<your Forge app client ID>``` \
    ```client_secret=<your Forge app client secret>``` \
    ```hub_name=<your BIM360 hub name>``` \
    ```project_name=<your BIM360 project name>``` \
    ```upload_folder_name=<your BIM360 folder name>``` \
    ```scope=data:read data:create data:write``` \
    ```x-user-id=<your user ID>``` \

1. Open in your text editor [assets/models/data_files.json](../assets/models/data_files.json) and specify the list of files to upload.

    The *object_key* attribute is used to store the filename \
    The *object_src* attribute is used to store the filepath on your local disc

1. Open a terminal and change directory to the repository

1. Run the command `npm test`

1. Input **3** for executing the **Upload Linked Files (Newman)** test run

![Node Script](./media/node_upload_linked_files.png)

1. Check BIM360 Docs folder for new uploaded drawing

![BIM360 Docs Folder](./media/result_upload_linked_files.png)