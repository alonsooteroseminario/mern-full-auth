import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getBuckets } from "../../redux/actions/forgeManagementActions";
import Spinner from "../common/Spinner";
import BucketItem from "./BucketItem";

function Buckets() {
  const auth = useSelector(state => state.auth)
  const forgeAuth = useSelector(state => state.forgeAuth)
  const forgeManagement = useSelector( state => state.forgeManagement)

  const dispatch = useDispatch()

  const {isLogged, isAdmin} = auth
  const { isAuthenticated, forgeUser} = forgeAuth
  const { buckets, loading } = forgeManagement

  let bucketsContent;

  useEffect( () => {
    if (localStorage.access_token) {
        getBuckets(dispatch)
        
    }

  }, [getBuckets, dispatch] )

  if (buckets === null || loading){
      bucketsContent = <Spinner />;
  } else {
      // Check if logged forge user has buckets
      if (Object.keys(buckets).length > 0) {
            bucketsContent = (
              <div>
                {
                  buckets.map((bucket, index) => {
                      if(bucket.bucketKey.includes('vpeq0gtce0timv0vbhy5s1yqpj8a2eag-weclash')){
                        return (<BucketItem key={index} bucket={bucket} />)
                      }
                  })
                }
              </div>
            );
      } else {
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
