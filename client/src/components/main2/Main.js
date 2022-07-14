import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from "react-router-dom";
import {
  convertModel,
  getTreeInfo
} from "../../redux/actions/forgeDerivativeActions";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import isEmpty from "../../redux/validation/is-empty";
import CircleSpinner from "../common/CircleSpinner";
import Viewer from "./viewer/Viewer";

function Main() {
  const dispatch = useDispatch()
  const { objectId, filename } = useParams()

  useEffect( () => {

    // console.log(this.props.match.params)
    convertModel(objectId, filename, dispatch);
    getTreeInfo(objectId, filename, dispatch);

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

export default Main;