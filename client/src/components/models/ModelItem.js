import React, {useState} from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import { deleteModel } from "../../redux/actions/forgeManagementActions";
import {useSelector, useDispatch} from 'react-redux'
import CopyToClipboardButton from './CopyToClipboardButton'

const initialState = {
  name: '',
  email: '',
  err: '',
}

function ModelItem(props) {

  const auth = useSelector(state => state.auth)
  const { isLogged, isAdmin} = auth
  const dispatch = useDispatch()
  const {token} = useParams()
  const [user, setUser] = useState(initialState)
  const {name, email, err} = user

  const handleClick = (bucketKey, objectKey, dispatch) => {
    deleteModel(bucketKey, objectKey, dispatch);
  }

  const handleDelete = () => {
    handleClick(bucketKey, objectKey, dispatch)
  }


  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: ''})
}


  const { objectKey, objectId, size, bucketKey } = props;

  let url = `/bucket/detail/${bucketKey}/${objectId}`
  let urlWindow = window.location
  // console.log(urlWindow.origin)
  
  const handleSendEmail = async () => {
    try {
      const res = await axios.post('/user/share/viewer', {
        email,
        url
      })


    } catch (err) {
      
    }
  }


  const style = {
    zIndex: "-1",
  };

  return ( 
      <>
        <div className="container border rounded" style={style}>
          <div className="row">
            <div className="col-md-10">
              <div className="row">
                <span className="col-lg-6">Project Name: {objectKey}</span>
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

            { isLogged ? 
            <Link
              className="btn btn-sm btn-danger col-md-1"
              onClick={
                handleDelete
              }
            >
              Delete
            </Link>: 
            ''}
            
            <input 
                type="text" 
                placeholder="Enter email address"
                name="email"
                value={email}
                onChange={handleChangeInput} />

            <button 
              className="btn btn-sm btn-secondary col" 
              type="button"
              onClick={handleSendEmail}>Send by Email</button>

            {/* <button className="btn btn-sm btn-secondary col" type="button">Send SMS</button>

            <button className="btn btn-sm btn-secondary col" type="button">Send WhatsApp</button> */}

            <CopyToClipboardButton url={`${urlWindow.origin}/bucket/detail/${bucketKey}/${objectId}`}/>

          </div>
        </div>
      </> 
  );
}

export default ModelItem;
