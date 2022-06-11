import React from "react";
import { Link } from "react-router-dom";
import { deleteModel } from "../../redux/actions/forgeManagementActions";
import {useSelector, useDispatch} from 'react-redux'

function ModelItem(props) {

  const dispatch = useDispatch()

  const handleClick = (bucketKey, objectKey) => {
    deleteModel(bucketKey, objectKey);
  }

  const { objectKey, objectId, size, bucketKey } = props;

  return ( 
      <>
        <div className="container border rounded">
          <div className="row">
            <div className="col-md-10">
              <div className="row">
                <span className="col-lg-6"> ObjectKey: {objectKey}</span>
                <span className="col-lg-6"> Size: {size} bytes</span>
              </div>
            </div>
            <Link
              className="btn btn-sm btn-primary col-md-1"
              to={`/bucket/detail/${bucketKey}/${objectId}`}
              // ObjectId Format: urn:adsk.objects:os.object:duvgrzriu_tutorial_bucket/rst_basic_sample_project.rvt
              // So it will be splitted in two different params objectid and filename
            >
              Load App
            </Link>
            <button
              className="btn btn-sm btn-danger col-md-1"
              onClick={handleClick(bucketKey, objectKey)}
            >
              Delete
            </button>
          </div>
        </div>
      </> 
  );
}

export default ModelItem;
