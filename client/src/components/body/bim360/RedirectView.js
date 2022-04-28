import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import { use } from 'bcrypt/promises';
const Autodesk = window.Autodesk;

function RedirectView() {

    const [data, setData] = useState({})
    const [token, setToken] = useState('')
    const history = useHistory()

    useEffect( () => {
        history.push('/')
        console.log(document.location.href.split('?code=')[1])
        setToken(document.location.href.split('?code=')[1])
    }, [setToken, token] )


    return (
        <>
        </>
    );
}

export default RedirectView;