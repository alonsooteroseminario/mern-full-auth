import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import { use } from 'bcrypt/promises';
const Autodesk = window.Autodesk;

function Bim360Viewer() {

    const [data, setData] = useState({})
    const [token, setToken] = useState('')
    const history = useHistory()

    useEffect( () => {
        // SignIn()
        // prepareUserHubsTree()
        // console.log(document.location.href.split('?')[1].split('=')[1])
        // setToken(document.location.href.split('?')[1].split('=')[1])
    }, [] )

    async function SignIn() {
        var res = await axios.get('/api/forge/oauth/url')
        // fetch('/api/forge/oauth/url').then(function (req, res) {
        //     // document.location.href = req.url;
        //     console.log(req.url)
        //     console.log(document.location.href)
        //   })
        // setToken(res.data)
        console.log(res.data)
        document.location.href = res.data;
        // history.push('/')
        // prepareUserHubsTree(res.data)
    }
    var viewer;
    // @urn the model to show
    // @viewablesId which viewables to show, applies to BIM 360 Plans folder
    function launchViewer(urn, viewableId) {

        var options = {
        env: 'AutodeskProduction',
        getAccessToken: getForgeToken,
        api: 'derivativeV2' + (atob(urn.replace('_', '/')).indexOf('emea') > -1 ? '_EU' : '') // handle BIM 360 US and EU regions
        };

        Autodesk.Viewing.Initializer(options, () => {
        viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: [ 'Autodesk.DocumentBrowser'] });
        viewer.start();
        var documentId = 'urn:' + urn;
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        });

        function onDocumentLoadSuccess(doc) {
        // if a viewableId was specified, load that view, otherwise the default view
        var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
        viewer.loadDocumentNode(doc, viewables).then(i => {
            // any additional action here?
        });
        }

        function onDocumentLoadFailure(viewerErrorCode) {
        console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
        }
    }

    function getForgeToken(callback) {
            fetch('/api/forge/oauth/token').then(res => {
            res.json().then(data => {
                callback(data.access_token, data.expires_in);
            });
        });
    }

    async function PrepareTree(){ 

        console.log(await fetch('/api/forge/datamanagement'))
        // var res = await axios.get('/api/forge/datamanagement')

        // res.data.forEach(node => {
        //     // console.log(node.id)
        //     console.log(node.links.self.href)
        //     console.log(node.attributes.name)
        //     console.log('hubs')
        //     console.log(
        //         createTreeNode(
        //         node.links.self.href,
        //         node.attributes.name,
        //         'hubs',
        //         true
        //     ))
        //     console.log(node.relationships.projects.links.related)
        // });
    }

    // Format data for tree
    function createTreeNode(_id, _text, _type, _children) {
        return {  
            id: _id, 
            text: _text, 
            type: _type, 
            children: _children 
        };
    }

    return (
        <>
        <div>
            <div>
                <div className="container-fluid fill">
                    <div className="row fill">
                    <div className="col-sm-4 fill">
                        <div className="panel panel-default fill">
                        <div className="panel-heading" data-toggle="tooltip" >
                            <span id="userInfo"></span>
                            <span id="refreshHubs" className="glyphicon glyphicon-refresh"  title="Refresh list of files"></span>
                            <span id="signOut" className="glyphicon glyphicon-log-out"  title="Sign out"> </span>
                        </div>
                        <div id="userHubs">
                            <div >
                            <button className="btn btn-lg btn-default" id="autodeskSigninButton" onClick={()=>SignIn()}>
                                <img src="https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/raw/master/img/autodesk_text.png"
                                height="20" /> Sign in
                            </button>
                            <button className="btn btn-lg btn-default" id="autodeskSigninButton" onClick={()=>PrepareTree()}>
                                <img src="https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/raw/master/img/autodesk_text.png"
                                height="20" /> Prepare Tree
                            </button>
                            {/* <button onClick={() => history.goBack()} className="go_back">
                                <i className="fas fa-long-arrow-alt-left"></i> Go Back
                            </button> */}
                            <br/>
                            <br/>
                            <br/> You may also need to provision your<br/> BIM 360 Docs account for this app.<br/>
                            <a href="https://forge.autodesk.com/blog/bim-360-docs-provisioning-forge-apps">Learn more</a>.
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-8 fill">
                        <div id="forgeViewer"></div>
                    </div>
                    </div>
                </div>
            </div>
            <div>
                <iframe id="hiddenFrame"  />
            </div>
        </div>

        </>
    );
}

export default Bim360Viewer;