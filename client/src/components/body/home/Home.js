import React, {useEffect} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import './home.css'
import { getForgeAccess, getForgeAccessFromStart, getForgeAccessShared } from "../../../redux/actions/forgeAuthActions";
import {useSelector, useDispatch} from 'react-redux'
import ModelsLanding from "../../models/ModelsLanding";

function Home() {
    const auth = useSelector(state => state.auth)
    const {isLogged} = auth
    const dispatch = useDispatch()
    const history = useHistory()
    const { objectId, filename, bucketKey } = useParams()
    let persistencia

    if(bucketKey){
        persistencia = bucketKey
    }else{
        persistencia = "persistencia"
    }

    useEffect(() => {
        if(isLogged){
            getForgeAccess(history, dispatch);
        }
    },[ isLogged])


    const handleDefaultLogin = (e) => {
        getForgeAccess(history, dispatch);
    }
    const handleDefaultLoginFromStart = (e) => {

        if(objectId || filename){
            getForgeAccessShared(history, `/bucket/detail/${persistencia}/${objectId}/${filename}`, dispatch);

        }
        else {
            getForgeAccessFromStart(history, dispatch);

        }
    }

    const handleDefaultUpload = () => {
        getForgeAccessShared(history, '/bucket/detail/temporal', dispatch);
    }


    return (
        <div>
            <div className="landing-page">
            <div className="container">
                <div className="info">
                <h2>Share 2D or 3D Views Online</h2>
                <h4>Press to continue</h4>
               { isLogged ? <Link
                    className="btn btn-primary"
                    to={`/buckets`}
                    onClick={handleDefaultLogin}
                    >
                    Start
                </Link> :
                <Link
                    className="btn btn-primary"
                    onClick={handleDefaultLoginFromStart }
                    >
                    Start
                </Link>}
                <br/>
                <p>The best communication tool between Office and Foremen on site. </p>
                <br/>
                <li>No software installation!</li>
                <li>Upload a file then share the URL</li>
                {/* <Link
                    className="btn btn-primary"
                    onClick={handleDefaultUpload}
                    to={`/bucket/detail/temporal`}
                    >
                    Upload File to Share
                </Link> */}
                {/* <ModelsLanding/> */}


                </div>
                <div className="image">
                    <img src="https://image.ibb.co/c7grYb/image3015.png" alt='' />
                </div>
                <div className="clearfix"></div>
            </div>
            </div>

        </div>
    )
}

export default Home
