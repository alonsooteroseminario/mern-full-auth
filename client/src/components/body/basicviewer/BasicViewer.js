import React, {useEffect, useState} from 'react';
// import TreeView from 'react-simple-jstree';
import {useSelector} from 'react-redux'
import axios from 'axios'

function BasicViewer() {
    const auth = useSelector(state => state.auth)
    const forgeAuth = useSelector(state => state.forgeAuth)

    const {isLogged, isAdmin} = auth
    const { isAuthenticated, forgeUser} = forgeAuth



    useEffect( () => {


    }, [] )

    return ( 
        <>
            <h1>hola basic viewer</h1>
        </> 
    );
}

export default BasicViewer;