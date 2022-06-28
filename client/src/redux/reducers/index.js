import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import forgeAuth from "./forgeAuthReducer";
import forgeManagement from "./forgeManagementReducer";
import forgeDerivative from "./forgeDerivativeReducer";
import forgeViewer from "./forgeViewerReducer";

export default combineReducers({
    forgeViewer,
    forgeDerivative,
    forgeManagement,
    forgeAuth,
    auth,
    token,
    users
})