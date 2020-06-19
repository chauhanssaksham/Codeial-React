import { AnyAction } from "redux";
import { Dispatch } from "react";
import { AppActions, RootStateType, UserType } from "../../types";
import { getFormBody } from "../../helpers/utils";
import { APIUrls } from "../../helpers/URLs";

export const LOGIN_START = 'LOGIN_START';
export type LOGIN_START = typeof LOGIN_START;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export const LOGIN_FAILED = 'LOGIN_FAILED';
export type LOGIN_FAILED = typeof LOGIN_FAILED;

export interface startLoginAction extends AnyAction{
    type: LOGIN_START;
}
export interface loginSuccessAction extends AnyAction{
    type: LOGIN_SUCCESS,
    user: any 
}
export interface loginFailedAction extends AnyAction{
    type: LOGIN_FAILED,
    message: string
}

export type AuthActionTypes = startLoginAction | loginFailedAction | loginSuccessAction;


export function startLogin():startLoginAction{
    return {
        type: LOGIN_START
    }
}

export function loginSuccess(user: UserType):loginSuccessAction{
    return {
        type: LOGIN_SUCCESS,
        user: user
    }
}

export function loginFailed(msg: string):loginFailedAction{
    return {
        type: LOGIN_FAILED,
        message: msg
    }
}


export function login(email:string, password: string):any{
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        dispatch(startLogin());
        const url = APIUrls.login();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-url-encoded'
            },
            body: getFormBody({email, password})
        }).then(response => response.json())
        .then(data => {
            if (data.success){
                dispatch(loginSuccess(data.data.user));
                //TODO: CHECK WITH A CORRECT ID-PW AND STORE JWT in local storage
                return;
            } else {
                dispatch(loginFailed(data.message));
            }
        });
    }
}