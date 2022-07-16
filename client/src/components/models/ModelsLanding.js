import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import { Link } from "react-router-dom";
import { getModels, uploadModel } from "../../redux/actions/forgeManagementActions";
import ModelItem from "./ModelItem";
import Spinner from "../common/Spinner";
import "./models.css";

function ModelsLanding() {

  const [uploadFile, setUploadFile] = useState(null)
  const auth = useSelector(state => state.auth)
  const { isLogged} = auth

  useEffect( () => {
    getModels(bucketKey, dispatch);
  }, [])

  useEffect( () => {
    setUploadFile(uploadFile)
  }, [uploadFile])

  const handleFile = (e) => {
    setUploadFile(e.target.files[0])
  }

  const handleUpload = () => {
      uploadModel(uploadFile, bucketKey, dispatch);
  }


  const { bucketKey } = useParams()

  const dispatch = useDispatch()

  const forgeManagement = useSelector( state => state.forgeManagement)
  const { models, loading } = forgeManagement

  let bucketContent;
  let bucketPersistencia;

  if (models === null || loading) {
    bucketContent = <Spinner />;
    
  } else {
    if (models.length > 0) {
      bucketContent = models
        .filter(model => model.objectKey.indexOf("zzz") === -1)
        .map(model => (
          <ModelItem
            key={model.objectId}
            bucketKey={bucketKey}
            objectKey={model.objectKey}
            objectId={model.objectId}
            size={model.size}
          />
        ));
    } else {
      bucketContent = <p>There are no models available</p>;
    }
  }

  if(bucketKey === "persistencia"){
    bucketPersistencia = <div></div>
  }
  else{
    bucketPersistencia = <div className="form-group m-5">
                            <label htmlFor="uploadModel"> Upload NEW Project File</label>
                              <input
                                type="file"
                                id="uploadModel"
                                onChange={handleFile}
                                placeholder="Upload file..."
                              />
                              <button className="btn btn-dark" onClick={handleUpload}>
                                {" "}
                                Upload{" "}
                              </button>
                        </div>
  }

  return ( 
      <>
        <div className="container">
          {bucketPersistencia}
        </div>
      </> 
  );
}

export default ModelsLanding;
