import { FriendsStateType, AppActions, RootStateType } from "../../types";
import { AnyAction, Dispatch } from "redux";
import { APIUrls } from "../../helpers/URLs";
import axios from 'axios'

export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export type FETCH_FRIENDS_SUCCESS = typeof FETCH_FRIENDS_SUCCESS;

export interface fetchFriendsSuccessAction extends AnyAction {
    type: FETCH_FRIENDS_SUCCESS,
    friends: FriendsStateType
}

export type FriendsActionTypes = fetchFriendsSuccessAction; 

export function fetchFriendsSuccess(friends: FriendsStateType):fetchFriendsSuccessAction{
    return {
        type: FETCH_FRIENDS_SUCCESS,
        friends
    }
}

export function fetchUserFriends(){
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        const url = APIUrls.userFriends();
        axios.get(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            const toSendToReducer = response.data.data.friends.map((friend: any) => ({
                from_user: friend.from_user._id,
                to_user: friend.to_user
            }));
            dispatch(fetchFriendsSuccess(response.data.data.friends));
        });
    }
}