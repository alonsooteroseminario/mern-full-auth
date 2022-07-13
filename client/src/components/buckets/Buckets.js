import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import { getBuckets } from "../../redux/actions/forgeManagementActions";
import Spinner from "../common/Spinner";
import BucketItem from "./BucketItem";
import { createBucket } from "../../redux/actions/forgeManagementActions";


function Buckets() {
  const auth = useSelector(state => state.auth)
  const forgeAuth = useSelector(state => state.forgeAuth)
  const forgeManagement = useSelector( state => state.forgeManagement)
  const users = useSelector(state => state.users)
  const [id, setId] = useState('')
  
  const dispatch = useDispatch()
  const history = useHistory()

  const { user, isLogged, isAdmin} = auth
  const { isAuthenticated, forgeUser} = forgeAuth
  const { buckets, loading } = forgeManagement
  // console.log('buckets------>',buckets)
  const [bucketKey, SetBucketKey] = useState(`${user._id}_transient`)
  const [policyKey, SetPolicyKey] = useState('transient')
  const [bucketKey2, SetBucketKey2] = useState(`${user._id}_persistent`)
  const [policyKey2, SetPolicyKey2] = useState('persistent')


  let bucketsContent;
  let bucketsContent2;

  const onSubmit =(e) => {
    e.preventDefault();
    createBucket(bucketKey, policyKey, history, dispatch);
    createBucket(bucketKey2, policyKey2, history, dispatch);
  }
  let bucketsContentButton;

  useEffect( () => {
    if (localStorage.access_token) {
        getBuckets(dispatch)

        setId(user._id)
    }

  }, [getBuckets, dispatch] )

  useEffect(()=>{
    // console.log(id)
  }, [id])

  if (buckets === null || loading){
      bucketsContent = <Spinner />;
  } else {
      // Check if logged forge user has buckets
      if (Object.keys(buckets).length > 0) {
        if (id == undefined){
          if(isLogged){
            bucketsContentButton = (
              <div>
                  <form className="form-signin" onSubmit={onSubmit}>
                    <button className="btn btn-primary btn-block text-uppercase" type="submit">
                       Activar Buckets 
                    </button>
                    
                  </form>
              </div>
            );
          }
          bucketsContent = (
            <div>
              {
                buckets.map((bucket, index) => {
                    if(bucket.bucketKey.includes(`persistencia`) ){
                      return (<BucketItem key={index} bucket={bucket} />)
                    }
                })
                
              }
            </div>
          );
        }
        else{
          // console.log('AQUI')
          if(isLogged){
            bucketsContentButton = (
              <div>
                  <form className="form-signin" onSubmit={onSubmit}>
                    <button className="btn btn-primary btn-block text-uppercase" type="submit">
                       Activar Bucket 
                    </button>
                    
                  </form>
              </div>
            );
          }
          bucketsContent = (
            <div>
              {
                buckets.map((bucket, index) => {
                    if(bucket.bucketKey.includes(`${id}`) ){
                      return (<BucketItem key={index} bucket={bucket} />)
                    }
                })
                
              }
            </div>
          );

          let output = 0
          for (let n = 0; n < buckets.length; n++) {
            const bucket = buckets[n];
            if(!bucket.bucketKey.includes(`${id}`) ){
              output ++
            }
          }

          if(output == buckets.length){
            bucketsContent = (
              <div>
                {bucketsContentButton}
              </div>
            )
          }
        }

      } 
      else 
      {
          bucketsContent = <h2> There are no buckets created yet </h2>;
      }
  }

  return ( 
      <>
        <div className="buckets">
          {/* <h1> buckets </h1> */}
          {bucketsContent}

        </div>
      </> 
  );


}

export default Buckets;
