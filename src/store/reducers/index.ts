import { combineReducers } from "redux";
import posts from './posts'
import auth from './auth'
import profile from './profile'
import friends from './friends'


const rootReducer = combineReducers({
    posts,
    auth,
    profile,
    friends
});

export default rootReducer