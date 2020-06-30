import { FriendsStateType } from "../../types";
import { FriendsActionTypes, FETCH_FRIENDS_SUCCESS, ADD_FRIEND } from "../actions/friends";

const initialAuthState:FriendsStateType = [];

function friends(state = initialAuthState, action: FriendsActionTypes):FriendsStateType{
    switch(action.type){
        case FETCH_FRIENDS_SUCCESS:
            return [...action.friends];
        case ADD_FRIEND:
            return [...state, action.friend]
        default:
            return state;
    }
}

export default friends;