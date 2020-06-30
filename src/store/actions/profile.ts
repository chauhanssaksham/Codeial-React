import { AnyAction } from "redux";
import { Dispatch } from "react";
import { AppActions, RootStateType, UserType } from "../../types";
import { APIUrls } from "../../helpers/URLs";
import axios from 'axios';

export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export type USER_PROFILE_SUCCESS = typeof USER_PROFILE_SUCCESS;
export const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE';
export type USER_PROFILE_FAILURE = typeof USER_PROFILE_FAILURE;
export const START_FETCH_USER_PROFILE = 'START_FETCH_USER_PROFILE';
export type START_FETCH_USER_PROFILE = typeof START_FETCH_USER_PROFILE;

export interface userProfileSuccessAction extends AnyAction{
    type: USER_PROFILE_SUCCESS,
    user: UserType
}
export interface userProfileFailureAction extends AnyAction{
    type: USER_PROFILE_FAILURE,
    error: string
}
export interface startUserProfileFetchAction extends AnyAction{
    type: START_FETCH_USER_PROFILE
}


export type ProfileActionTypes = userProfileSuccessAction | userProfileFailureAction | startUserProfileFetchAction; 


export function userProfileSuccessAction(user: UserType):userProfileSuccessAction{
    return {
        type: USER_PROFILE_SUCCESS,
        user
    }
}

export function userProfileFailureAction(error: string):userProfileFailureAction{
    return {
        type: USER_PROFILE_FAILURE,
        error
    }
}

export function startUserProfileFetch(): startUserProfileFetchAction{
    return {
        type: START_FETCH_USER_PROFILE
    }
}

export function fetchUserProfile(userId: string){
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        dispatch(startUserProfileFetch());
        const url = APIUrls.fetchProfile(userId);
        axios.get(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.data.success){
                dispatch(userProfileSuccessAction(response.data.data.user));
            } else {
                dispatch(userProfileFailureAction(response.data.message));
            }
        }).catch(err => {
            console.log(err.response.data);
            dispatch(userProfileFailureAction(err.response.data.message));
        });
    }
}