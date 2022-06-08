import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'

function Buckets() {
  const auth = useSelector(state => state.auth)
  const forgeAuth = useSelector(state => state.forgeAuth)

  const {isLogged, isAdmin} = auth
  const { isAuthenticated, forgeUser} = forgeAuth



  useEffect( () => {
    if (localStorage.access_token) {

    }

  }, [] )

  return ( 
      <>
          <h1>hola Buckets</h1>
      </> 
  );
}

export default Buckets;
