import { FriendsStateType } from "../../types";
import { FriendsActionTypes, FETCH_FRIENDS_SUCCESS } from "../actions/friends";

const initialAuthState:FriendsStateType = [];

function friends(state = initialAuthState, action: FriendsActionTypes):FriendsStateType{
    switch(action.type){
        case FETCH_FRIENDS_SUCCESS:
            return [...action.friends];
        default:
            return state;
    }
}

export default friends;