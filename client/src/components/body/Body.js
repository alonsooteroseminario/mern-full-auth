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
import BasicViewer from './basicviewer/BasicViewer'
import Bim360Viewer from './bim360/Bim360';
import RedirectView from './bim360/RedirectView';
import Buckets from "../buckets/Buckets";

import Home from '../body/home/Home'

import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

function Body() {
    const auth = useSelector(state => state.auth)
    const forgeAuth = useSelector(state => state.forgeAuth)

    const {isLogged, isAdmin} = auth
    const { isAuthenticated, forgeUser} = forgeAuth


    return (
        <section>
            <Switch>
                <Route path="/" component={ (isLogged && isAuthenticated) ? Bim360Viewer : Home} exact />

                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
                
                <Route path="/buckets" component={(isLogged && isAuthenticated) ? Buckets : NotFound} exact />
                <Route path="/basicviewer" component={(isLogged && isAuthenticated) ? BasicViewer : NotFound} exact />
                {/* <Route path="/bim360" component={isLogged ? Bim360Viewer : NotFound} exact /> */}

                <Route path="/api/forge/callback/oauth" component={isLogged ? RedirectView : NotFound} exact />


            </Switch>
        </section>
    )
}

export default Body
