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
export const SIGNUP_START = 'SIGNUP_START';
export type SIGNUP_START = typeof SIGNUP_START;
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export type SIGNUP_SUCCESS = typeof SIGNUP_SUCCESS;
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export type SIGNUP_FAILED = typeof SIGNUP_FAILED;

export interface startLoginAction extends AnyAction{
    type: LOGIN_START;
}
export interface loginSuccessAction extends AnyAction{
    type: LOGIN_SUCCESS,
    user: UserType 
}
export interface loginFailedAction extends AnyAction{
    type: LOGIN_FAILED,
    message: string
}
export interface startSingupAction extends AnyAction{
    type: SIGNUP_START;
}
export interface signupSuccessAction extends AnyAction{
    type: SIGNUP_SUCCESS,
    user: UserType
}
export interface signupFailedAction extends AnyAction{
    type: SIGNUP_FAILED,
    message: string
}

export type AuthActionTypes = startLoginAction | loginFailedAction | loginSuccessAction | startSingupAction | signupFailedAction | signupSuccessAction;


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

export function startSignup():startSingupAction{
    return {
        type: SIGNUP_START
    }
}

export function signupSuccess(user: UserType):signupSuccessAction{
    return {
        type: SIGNUP_SUCCESS,
        user: user
    }
}

export function signupFailed(msg: string):signupFailedAction{
    return {
        type: SIGNUP_FAILED,
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

export function signup(name: string, email:string, password: string, confirm_password:string):any{
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        dispatch(startSignup());
        const url = APIUrls.signup();
        if (password !== confirm_password){
            dispatch(signupFailed("Passwords don't match"));
            return;
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-url-encoded'
            },
            body: getFormBody({name,email, password, confirm_password})
        }).then(response => response.json())
        .then(data => {
            if (data.success){
                dispatch(signupSuccess(data.data.user));
                return;
            } else {
                dispatch(signupFailed(data.message));
            }
        });
    }
}