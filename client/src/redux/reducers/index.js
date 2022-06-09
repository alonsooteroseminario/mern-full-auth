import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import forgeAuth from "./forgeAuthReducer";
import forgeManagement from "./forgeManagementReducer";

export default combineReducers({
    forgeManagement,
    forgeAuth,
    auth,
    token,
    users
})