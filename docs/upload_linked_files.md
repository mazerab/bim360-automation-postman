# Upload Linked Files

In this scenario, we are automating the upload of Revit files to a BIM360 Docs folder.

Due to a limitation with Postman, a separate script had to be written in Node.js to workaround the limitation.

## Steps to run the single file upload

1. Open in your favorite text editor [assets/environment/upload_linked_files.postman_environment.json](../assets/environment/upload_linked_files.postman_environment.json) and edit the environment variables' values

    ```client_id=<your Forge app client ID>``` \
    ```client_secret=<your Forge app client secret>``` \
    ```hub_name=<your BIM360 hub name>``` \
    ```project_name=<your BIM360 project name>``` \
    ```upload_folder_name=<your BIM360 folder name>``` \
    ```upload_file_name=<your BIM360 folder name>``` \
    ```scope=data:read data:create data:write``` \
    ```x-user-id=<your user ID>``` \

1. Open a terminal and change directory to the repository

1. Run the command `npm test`

1. Input **3** for executing the **Upload Linked Files (Node)** test run

![Node Script](./media/node_upload_linked_files.png)

1. Check BIM360 Docs folder for new uploaded drawing

![BIM360 Docs Folder](./media/result_upload_linked_files.png)