import { FriendsStateType } from "../../types";
import { FriendsActionTypes, FETCH_FRIENDS_SUCCESS, ADD_FRIEND, REMOVE_FRIEND } from "../actions/friends";

const initialAuthState:FriendsStateType = [];

function friends(state = initialAuthState, action: FriendsActionTypes):FriendsStateType{
    switch(action.type){
        case FETCH_FRIENDS_SUCCESS:
            return [...action.friends];
        case ADD_FRIEND:
            return [...state, action.friend];
        case REMOVE_FRIEND:
            return state.filter(friend => friend._id !== action.id);
        default:
            return state;
    }
}

export default friends;