import React, {useEffect, useState, useMemo, useRef } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getViewerAccess } from "../../../redux/actions/forgeAuthActions";
import jQuery from "jquery";
import isEmpty from "../../../redux/validation/is-empty";
import isValid from "../../../redux/validation/is-valid";

function ViewerItem (props) {

  const { displayViewer, urn } = props;

  console.log('urn---->', urn)

  const [viewerApp, setViewerApp] = useState(null)
  const [viewer, setViewer] = useState(null)
  const [itemSelected, setItemSelected] = useState(null)

  const forgeViewer = useSelector( state => state.forgeViewer)
  const dispatch = useDispatch()
  
  const aa = async (callback) => {
      setViewerApp(new window.Autodesk.Viewing.ViewingApplication(
        "MyViewerDiv"
      ))
      await callback()
  }
  const bb = () => {
      let enviroment = {
        env: "AutodeskProduction",
        api: "derivativeV2", // TODO: for models uploaded to EMEA change this option to 'derivativeV2_EU'
        getAccessToken: getForgeToken
      }
      window.Autodesk.Viewing.Initializer(
        enviroment,
        () => {
          
          const documentId = `urn:${urn}`;
          // console.log(viewerApp)
          if (viewerApp) {
            // console.log('viewerApp--->',viewerApp)
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
        }
      )
  }
  const cc = async (viewer, callback) => {
    console.log(viewer)
    setViewer(viewer)
    await callback()
  }
  const dd = () => {
    setEvents()
  }

  useEffect( 
    () => {

      getViewerAccess(dispatch);

      if (viewer) {
        viewer.impl.selector.setSelection(
          [forgeViewer.itemSelected],
          viewer.model
        );
      }


    return () => {
      if (viewer) {
        viewer.finish();
      }
    };

  }, [viewer])


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
      // console.log(viewerApp)
      const viewables = viewerApp.bubble.search({ type: "geometry" });
    

      // Selects the viewable that will be displayed, in this case the first, [0], in the array viewables
      viewerApp.selectItem(
        viewables[0],
        onItemLoadSuccess,
        onItemLoadFail
      );
  };

  const onItemLoadSuccess = (viewer, item) => {
      // Event fired if the viewer is setup without error, sets the viewer to the state
      cc(viewer, dd)
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
      jQuery("#MyViewerDiv").html(
        "<p>There is an error fetching the translated SVF file. Please try refreshing the page.</p>"
      );
  };

  const setEvents = () => {
      // Event for selection
      let onSelectionBinded = onSelectionEvent()
      viewer.addEventListener(
        window.Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        onSelectionBinded
      );
  }

  const onSelectionEvent = () => {
      // console.log('viewer--->',viewer)
      let currSelection = viewer.getSelection();
      setItemSelected(currSelection)
  }
    
  const canvasStyle = {
    position: "fixed",
    left: "40vw",
    right: "0px",
    top: "100px",
    bottom: "0px",
    zIndex: "1",
    backgroundColor: "#D8E1EA"
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
