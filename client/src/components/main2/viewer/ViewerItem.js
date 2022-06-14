import React, {useEffect, useState, useMemo, useRef, useCallback } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getViewerAccess } from "../../../redux/actions/forgeAuthActions";
import jQuery from "jquery";
import isEmpty from "../../../redux/validation/is-empty";
import isValid from "../../../redux/validation/is-valid";

function ViewerItem (props) {

  const { displayViewer, urn } = props;

  console.log('urn---->', urn)

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
    
  }, []);


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

      setViewerApp({
        viewerApp: new window.Autodesk.Viewing.ViewingApplication(
          "MyViewerDiv"
        )
      })
      someFunc2(forgeViewer.viewer_token)

  }, [someFunc2])



  // useEffect(
  //   () => {

  // }, [viewerApp])
  const someFunc3 = useCallback(() => {
    console.log('viewerUseEffect----->>>>>>' , viewer)
    viewer.addEventListener(
      window.Autodesk.Viewing.SELECTION_CHANGED_EVENT,
      () => {
        let currSelection = viewer.getSelection();
        setItemSelected(currSelection)
      }
    );
    
  }, [viewer]);


  useEffect(
    () => {

      setViewer(viewer)
      someFunc3(viewer)

  }, [viewer, someFunc3])

  const callback = () => {

    // console.log('MyViewerDiv: ------> ', viewerApp)
    // console.log(viewerApp.k3D)
    console.log(viewerApp)
    // console.log(forgeViewer)
    // console.log(displayViewer)
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

  // const setEvents = () => {
  //     // Event for selection

  //     // viewer.addEventListener(
  //     //   window.Autodesk.Viewing.SELECTION_CHANGED_EVENT,
  //     //   () => {
  //     //     let currSelection = viewer.getSelection();
  //     //     setItemSelected(currSelection)
  //     //   }
  //     // );
      
  // }

    
  const canvasStyle = {
    position: "fixed",
    left: "100px",
    right: "120px",
    top: "180px",
    bottom: "100px",
    zIndex: "-1",
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
