import React, { Component, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import { createBucket } from "../../redux/actions/forgeManagementActions";

// Delete this component and functionality, Create three buckets and keep those forever, create new api
function CreateBucket () {

  const dispatch = useDispatch()
  const history = useHistory()

  const [bucketKey, SetBucketKey] = useState('')
  const [policyKey, SetPolicyKey] = useState('transient')

  const handleChange = (e) => {
    SetBucketKey(e.target.value)
  }
  const handleChangePolicyKey = (e) => {
    SetPolicyKey(e.target.value)
  }

  const onSubmit =(e) => {
    e.preventDefault();

    createBucket(bucketKey, policyKey, history, dispatch);
  }
  return ( 
      <>
              <div className="container">
                <div className="row">
                  <div className="col">
                      <div className="card-body">
                        <form className="form-signin" onSubmit={onSubmit}>
                          <div className="form-label-group text-center">
                            <label htmlFor="bucketKey"> Bucket Key </label>
                            <input
                              type="text"
                              id="bucketKey"
                              className="form-control"
                              placeholder="Bucket Key"
                              required
                              autoFocus
                              name="bucketKey"
                              value={bucketKey}
                              onChange={handleChange}
                            />
                          </div>
                          <br />
                          <div className="form-label-group text-center">
                            <label htmlFor="policyKey">Policy Key</label>
                            <select
                              className="form-control form-control-lg"
                              name="policyKey"
                              value={policyKey}
                              onChange={handleChangePolicyKey}
                              id="policyKey"
                            >
                              <option value="transient"> transient </option>
                              <option value="temporary"> temporary </option>
                              <option value="persistent"> persistent </option>
                            </select>
                          </div>
                          <button
                            className="btn btn-primary btn-block text-uppercase"
                            type="submit"
                          >
                            Create
                          </button>
                        </form>
                      </div>
                  </div>
                </div>
              </div>
      </> 
  );
}

export default CreateBucket 