import React, {useState, useEffect} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import './home.css'
import FeatureServices from '../../../widgets/featurebox/services';
import Herosection from '../../../widgets/herosection/herosection';
import { getForgeAccess, getForgeAccessFromStart, getForgeAccessShared } from "../../../redux/actions/forgeAuthActions";
import {useSelector, useDispatch} from 'react-redux'

function Home() {
    const auth = useSelector(state => state.auth)
    const {user, isLogged} = auth
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


    return (
        <div>
            <div className="landing-page">
            <div className="container">
                <div className="info">
                <h1>Draft Viewer</h1>
                <h4>Press Start to continue</h4>
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
                <p>The best communication tool between Office and Contractors on site. </p>
                

                </div>
                <div className="image">
                    <img src="https://image.ibb.co/c7grYb/image3015.png" />
                </div>
                <div className="clearfix"></div>
            </div>
            </div>

        </div>
    )
}

export default Home
