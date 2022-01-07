import React from 'react';

const users = useSelector(state => state.users)
const token = useSelector(state => state.token)

function BasicViewer() {
    return ( 
        <>
            <div class="container-fluid fill">
                <div class="row fill">
                    <div class="col-sm-4 fill">
                        <div class="panel panel-default fill">
                            <div class="panel-heading" data-toggle="tooltip">
                                Buckets &amp; Objects
                                <span id="refreshBuckets" class="glyphicon glyphicon-refresh" style={{}}></span>
                                <button class="btn btn-xs btn-info" style={{}} id="showFormCreateBucket" data-toggle="modal" data-target="#createBucketModal">
                                <span class="glyphicon glyphicon-folder-close"></span> New bucket
                                </button>
                            </div>
                            <div id="appBuckets">
                                tree here
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8 fill">
                        <div id="forgeViewer"></div>
                    </div>
                </div>
            </div>
            <form id="uploadFile" method='post' enctype="multipart/form-data">
                <input id="hiddenUploadField" type="file" name="theFile" style={{}} />
            </form>
            <div class="modal fade" id="createBucketModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title" id="myModalLabel">Create new bucket</h4>
                        </div>
                        <div class="modal-body">
                            <input type="text" id="newBucketKey" class="form-control" /> For demonstration purposes, objects (files)
                            are NOT automatically translated. After you upload, right click on
                            the object and select "Translate". Note: Technically your bucket name is required to be globally unique across
                            the entire platform - to keep things simple with this tutorial your client ID will be prepended by default to
                            your bucket name and in turn masked by the UI so you only have to make sure your bucket name is unique within
                            your current Forge app.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="createNewBucket">Go ahead, create the bucket</button>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}

export default BasicViewer;