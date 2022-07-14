import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'

import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'
import Buckets from "../buckets/Buckets";
import CreateBucket from "../buckets/CreateBucket";
import Models from "../models/Models";
import Main from "../main2/Main";
import Dashboard from "./dashboard/Dashboard"

import Home from '../body/home/Home'

import {useSelector} from 'react-redux'

function Body() {
    const auth = useSelector(state => state.auth)
    const forgeAuth = useSelector(state => state.forgeAuth)

    const {isLogged, isAdmin} = auth
    const { isAuthenticated} = forgeAuth


    return (
        <section>
            <Switch>
                <Route path="/" component={ (isLogged && isAuthenticated) ? Home: Home} exact />

                <Route path="/login" component={isLogged ? Home : Login} exact />
                <Route path="/register" component={isLogged ? Home : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : Home} exact />
                <Route path="/dashboard" component={isLogged ? Dashboard : Home} exact />
                <Route path="/edit_user/:id" component={(isAdmin && isAuthenticated) ? EditUser : Home} exact />
                
                <Route path="/buckets" component={isAuthenticated ? Buckets : Home} exact />
                <Route path="/bucket/create" component={isAuthenticated ? CreateBucket : Home} exact />

                <Route path="/bucket/detail/:bucketKey" component={isAuthenticated ? Models : Home} exact />
                <Route path="/bucket/detail/:bucketKey/:objectId/:filename" component={isAuthenticated ? Main : Home} exact />


            </Switch>
        </section>
    )
}

export default Body
