import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import forgeAuth from "./forgeAuthReducer";

export default combineReducers({
    forgeAuth,
    auth,
    token,
    users
})