import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useHistory} from 'react-router-dom'
import { getBuckets } from "../../redux/actions/forgeManagementActions";
import Spinner from "../common/Spinner";
import BucketItem from "./BucketItem";
import axios from 'axios'
import { createBucket } from "../../redux/actions/forgeManagementActions";


function Buckets() {
  const auth = useSelector(state => state.auth)
  const forgeManagement = useSelector( state => state.forgeManagement)
  const [id, setId] = useState('')
  const token = useSelector(state => state.token)
  
  const dispatch = useDispatch()
  const history = useHistory()

  const { user, isLogged, isAdmin} = auth
  const { buckets, loading } = forgeManagement


 
  const bucketKey = useState(`${user._id}_transient`)
  const policyKey = useState('transient')
  const bucketKey2 = useState(`${user._id}_persistent`)
  const policyKey2 = useState('persistent')

  const [err, setErr] = useState(false)

  const [verifyBucket, setVerifyBucket] = useState(true);

  let bucketsContent;

  const onSubmit = async (e) => {
    e.preventDefault();

    createBucket(bucketKey[0], policyKey[0], history, dispatch);
    createBucket(bucketKey2[0], policyKey2[0], history, dispatch);

    try{
      await axios.post(`/user/activebucket`, {
        id: user._id,
        active: 1
      }, {
          headers: {Authorization: token}
      })
      // console.log(user._id);
      // console.log(bucketKey);
      // console.log(policyKey);
      // console.log(bucketKey2);
      // console.log(policyKey2);
    }catch (err){
      err.response.data.msg && setErr(err.response.data.msg)
    }
  }
  let bucketsContentButton;
  bucketsContentButton = ( isLogged ?
        <div>
            <form className="form-signin" onSubmit={onSubmit}>
              <button className="btn btn-primary btn-block text-uppercase" type="submit">
                 Activar Bucket 
              </button>
            </form>
        </div>:
        ''); 

  useEffect( () => {
    if (localStorage.access_token) {
        getBuckets(dispatch)
        setId(user._id)
    }
    func()
  }, [getBuckets, dispatch] )

  const func = async () => {
    try{
      const res = await axios.post(`/user/verifybucket`,  {
        id: user._id
      },{
          headers: {Authorization: token}
      })
      setVerifyBucket(res.data)
    }catch (err){
      err.response.data.msg && setErr(err.response.data.msg)
    }
  }


  if (buckets === null || loading){
      bucketsContent = <Spinner />;
  } else {
      // Check if logged forge user has buckets
      if (Object.keys(buckets).length > 0) {
        bucketsContent = (
          <>
            {
                          buckets.map((bucket, index) => {
                              
                              if(bucket.bucketKey.includes(`${user._id}_persistent`)){
                                return (<BucketItem key={index} bucket={bucket} />)
                              }
                              if(bucket.bucketKey.includes(`${user._id}_transient`)){
                              return (<BucketItem key={index} bucket={bucket} />)
                              }
                          })
                          
            }
          </>
        );
      } 
      else 
      {
          bucketsContent = <h2> There are no buckets created yet </h2>;
      }
  }

  return ( 
      <>
        <div className="buckets">
          {!verifyBucket?'':bucketsContentButton}
          {bucketsContent}
        </div>
      </> 
  );


}

export default Buckets;
