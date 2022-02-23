import React, {useEffect, useState} from 'react';
import axios from 'axios'
const Autodesk = window.Autodesk;

function Bim360Viewer() {

    const [data, setData] = useState({})

    useEffect( () => {

        isSignedIn()
        prepareUserHubsTree()
    }, [] )

    function createScript(src) {
        const script = document.createElement("script");
        script.src = [ `./js/${src}`];
        script.async = true;
        document.body.appendChild(script);
    }

    async function isSignedIn() {
        var viewer;
        var options = {
            env: 'AutodeskProduction',
            api: 'derivativeV2',
            getAccessToken: function(onTokenReady) {
                fetch(
                        '/api/forge/oauth/token', //!<<< You own server backend endpoint for obtaining Forge access token from Forge OAuth
                        {
                            method: 'get',
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        })
                    .then(function(response) {
                        if (response.status === 200) {
                            console.log(response)
                            return response.json();
                        } else {
                            return Promise.reject(
                                new Error('Failed to fetch token from server (status: ' + response.status + ', message: ' + response.statusText + ')')
                            );
                        }
                    })
                    .then(function(data) {
                        if (!data)
                            return Promise.reject(new Error('Empty token response'));
                        onTokenReady(data.access_token, data.expires_in);
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
            }
        };
        
        Autodesk.Viewing.Initializer(options, function() {
            var htmlDiv = document.getElementById('forgeViewer');
            viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
            var startedCode = viewer.start();
            if (startedCode > 0) {
                console.error('Failed to create a Viewer: WebGL not supported.');
                return;
            }
            console.log('Initialization complete, loading a model next...');
        });
        
    }

    async function prepareUserHubsTree() {

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
                            <button className="btn btn-lg btn-default" id="autodeskSigninButton">
                                <img src="https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/raw/master/img/autodesk_text.png"
                                height="20" /> Sign in
                            </button>
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