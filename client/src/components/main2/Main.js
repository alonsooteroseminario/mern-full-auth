import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from "react-router-dom";
import {
  convertModel,
  getTreeInfo
} from "../../redux/actions/forgeDerivativeActions";
// import "react-tabs/style/react-tabs.css";
import isEmpty from "../../redux/validation/is-empty";
import CircleSpinner from "../common/CircleSpinner";
import Viewer from "./viewer/Viewer";

function Main() {
  const dispatch = useDispatch()
  const { objectId, filename } = useParams()

  useEffect( () => {

    convertModel(objectId, filename, dispatch);
    getTreeInfo(objectId, filename, dispatch);

  }, [])
    
  const forgeDerivative = useSelector( state => state.forgeDerivative)
  const { objectInfo, urn, loading } = forgeDerivative;

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