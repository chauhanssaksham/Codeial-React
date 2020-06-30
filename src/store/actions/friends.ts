import { FriendsStateType, AppActions, RootStateType, FriendshipType, UserType } from "../../types";
import { AnyAction, Dispatch } from "redux";
import { APIUrls } from "../../helpers/URLs";
import axios from 'axios'

export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export type FETCH_FRIENDS_SUCCESS = typeof FETCH_FRIENDS_SUCCESS;
export const ADD_FRIEND = 'ADD_FRIEND';
export type ADD_FRIEND = typeof ADD_FRIEND;

export interface fetchFriendsSuccessAction extends AnyAction {
    type: FETCH_FRIENDS_SUCCESS,
    friends: FriendsStateType
}

export interface addFriendAction extends AnyAction {
    type: ADD_FRIEND,
    friend: FriendshipType
}

export type FriendsActionTypes = fetchFriendsSuccessAction | addFriendAction; 

export function fetchFriendsSuccess(friends: FriendsStateType):fetchFriendsSuccessAction{
    return {
        type: FETCH_FRIENDS_SUCCESS,
        friends
    }
}

export function addFriend(friend: FriendshipType):addFriendAction{
    return {
        type: ADD_FRIEND,
        friend
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
            const toSendToReducer = response.data.data.friends.map((friend: any) => friend.to_user);
            dispatch(fetchFriendsSuccess(toSendToReducer));
        });
    }
}