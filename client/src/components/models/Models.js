import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import { Link } from "react-router-dom";
import { getModels, uploadModel } from "../../redux/actions/forgeManagementActions";
import ModelItem from "./ModelItem";
import Spinner from "../common/Spinner";

function Models() {

  const [uploadFile, setUploadFile] = useState(null)
  const auth = useSelector(state => state.auth)
  const {user, isLogged} = auth

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
      // console.log(uploadFile)
      uploadModel(uploadFile, bucketKey, dispatch);
  }


  const { bucketKey } = useParams()

  const dispatch = useDispatch()

  const forgeManagement = useSelector( state => state.forgeManagement)
  const { models, loading } = forgeManagement

  let bucketContent;
  let bucketPersistencia;


  // console.log(loading)

  if (models === null || loading) {
    bucketContent = <Spinner />;
    
  } else {
    if (models.length > 0) {
      console.log(models)
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

  if(bucketKey=="persistencia"){
    bucketPersistencia = <div></div>
  }else{
    bucketPersistencia = <div className="form-group m-5">
                            <label htmlFor="uploadModel"> Upload a Model</label>
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

          {isLogged ?
                  <div className="row">
                    <Link to="/buckets" className="btn btn-sm btn-light mb-3 text-left">
                      Back To Bucket List
                    </Link>
                  </div>:
                  <div></div>
          }


          {bucketContent}
          {bucketPersistencia}

        </div>
      </> 
  );
}

export default Models;
