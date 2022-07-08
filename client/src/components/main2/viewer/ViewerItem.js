import React, {useEffect, useState, useMemo, useRef, useCallback } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getViewerAccess } from "../../../redux/actions/forgeAuthActions";
import jQuery from "jquery";
import isEmpty from "../../../redux/validation/is-empty";
import isValid from "../../../redux/validation/is-valid";

function ViewerItem (props) {

  const { displayViewer, urn } = props;

  const [viewerApp, setViewerApp] = useState(new window.Autodesk.Viewing.ViewingApplication(
    "MyViewerDiv"
  ))
  const [viewer, setViewer] = useState(null)
  const [itemSelected, setItemSelected] = useState(null)

  const forgeViewer = useSelector( state => state.forgeViewer)
  const dispatch = useDispatch()
  
  const someFunc = useCallback(() => {
    const { itemSelected } = forgeViewer;

    if (viewer) {
      viewer.impl.selector.setSelection(
        [itemSelected],
        viewer.model
      );
    }
    
  }, []);
  const someFunc2 = useCallback(() => {
    window.Autodesk.Viewing.Initializer(
      {
        env: "AutodeskProduction",
        api: "derivativeV2", // TODO: for models uploaded to EMEA change this option to 'derivativeV2_EU'
        getAccessToken: getForgeToken
      },
      callback(viewerApp)
    )
    
  }, [viewerApp]);


  useEffect( 
    () => {

      getViewerAccess(dispatch);

      return () => {
        if (viewer) {
          viewer.finish();
        }
      };

  }, [])

  useEffect(
    () => {
      someFunc(forgeViewer.itemSelected)
  }, [forgeViewer.itemSelected, someFunc])

  useEffect(
    () => {

      setViewerApp(new window.Autodesk.Viewing.ViewingApplication(
        "MyViewerDiv"
      ))
      someFunc2(forgeViewer.viewer_token)

  }, [forgeViewer.viewer_token])


  useEffect(
    () => {

      if(viewer != null){
        // console.log('viewer----->>>>>>' , viewer)
        viewer.addEventListener(
          window.Autodesk.Viewing.SELECTION_CHANGED_EVENT,
          () => {
            let currSelection = viewer.getSelection();
            setItemSelected(currSelection)
          }
        );
      }

  }, [viewer])

  const callback = (viewerApp) => {

    // console.log('MyViewerDiv: ------> ', viewerApp)
    // console.log(viewerApp.k3D)
    // console.log(viewerApp)
    // console.log(forgeViewer)
    // console.log(displayViewer)
    console.log(props.urn)
    const documentId = `urn:${props.urn}`;
    if (viewerApp) {
      
      viewerApp.registerViewer(
        viewerApp.k3D,
        window.Autodesk.Viewing.Private.GuiViewer3D
      );
      viewerApp.loadDocument(
        documentId,
        onDocumentLoadSuccess,
        onDocumentLoadFailure
      );
    }
  };

  const getForgeToken = (callback) => {
      const { viewer_token } = forgeViewer;

      if (!isEmpty(viewer_token) && isValid(viewer_token)) {
        callback(viewer_token.access_token, viewer_token.expires_in);
      } else {
        getViewerAccess(dispatch);

      }
  };

  const onDocumentLoadSuccess = (doc) => {
      // Gets all the possibles viewables

      
      
      const viewables = viewerApp.bubble.search({ type: "geometry" });
      // console.log('doc---------->>' , viewables)
      
      // Selects the viewable that will be displayed, in this case the first, [0], in the array viewables
      viewerApp.selectItem(
        viewables[0],
        onItemLoadSuccess,
        onItemLoadFail
      );
  };

  const onItemLoadSuccess = (viewer, item) => {
      // Event fired if the viewer is setup without error, sets the viewer to the state
      // console.log('viewer----->>>>>>' , viewer)
      setViewer(viewer)
      
      // console.log('item----->>>>>>' , item)
  };

  const onItemLoadFail = (viewerErrorCode) => {
      // Error if translation is in progress
      console.log(viewerErrorCode);

      jQuery("#MyViewerDiv").html(
        "<p>Translation in progress... Please try refreshing the page.</p>"
      );
  };

  const onDocumentLoadFailure = (viewerErrorCode) => {
      // Fires if the loaded of the svf file failes
      console.log(viewerErrorCode);
      // jQuery("#MyViewerDiv").html(
      //   "<p>There is an error fetching the translated SVF file. Please try refreshing the page.</p>"
      // );
      jQuery("#MyViewerDiv").html(
        "<p>Waiting to translate the SVF file. If take to much time, please try refreshing the page.</p>"
      );
  };

  const canvasStyle = {
    position: "fixed",
    left: "0px",
    right: "0px",
    top: "100px",
    bottom: "0px",
    zIndex: "0",
    backgroundColor: "#D8E1EA",
    display: "flex"
  };
  return (
    <div style={!displayViewer ? { visibility: "hidden" } : {}}>
      <div style={canvasStyle}>
        {/* <span style={textStyle}> Item: {itemSelected}</span> */}
        <div id="MyViewerDiv" />
      </div>
    </div>
  );
}
export default ViewerItem;
