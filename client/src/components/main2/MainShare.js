import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useParams, useHistory  } from "react-router-dom";
import {
  convertModel,
  getTreeInfo
} from "../../redux/actions/forgeDerivativeActions";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import isEmpty from "../../redux/validation/is-empty";
import CircleSpinner from "../common/CircleSpinner";
import Viewer from "./viewer/Viewer";
import { getForgeAccessShared } from "../../redux/actions/forgeAuthActions";


function MainShare() {
  const dispatch = useDispatch()
  const { objectId, filename, access_token } = useParams()
  const history = useHistory()

  useEffect( () => {

    // console.log(this.props.match.params)
    convertModel(objectId, filename, dispatch);
    getTreeInfo(objectId, filename, dispatch);

  }, [])
  useEffect( () => {
    getForgeAccessShared(history, `/bucket/detail/persistencia/${objectId}/mainshared`, dispatch)

  }, [])
    
  const forgeDerivative = useSelector( state => state.forgeDerivative)
  const { objectInfo, urn, loading } = forgeDerivative;

  // console.log('objectInfo---->', objectInfo)
  // console.log('loading---->', loading)

  let mainContent;

  if (isEmpty(objectInfo) || loading) {
    mainContent = <CircleSpinner />;
  } else {
    mainContent = (
      <Viewer objectInfo={objectInfo} urn={urn} />
    );
  }
  return ( 
      <>
      <div>{mainContent}</div>
      </> 
  );
}

export default MainShare;