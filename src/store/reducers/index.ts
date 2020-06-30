import { combineReducers } from "redux";
import posts from './posts'
import auth from './auth'
import profile from './profile'


const rootReducer = combineReducers({
    posts,
    auth,
    profile
});

export default rootReducer