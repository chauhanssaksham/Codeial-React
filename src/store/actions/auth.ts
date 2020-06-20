import { AnyAction } from "redux";
import { Dispatch } from "react";
import { AppActions, RootStateType, UserType } from "../../types";
import { getFormBody } from "../../helpers/utils";
import { APIUrls } from "../../helpers/URLs";
import axios from 'axios';

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


export function login(formBody: {email: string, password:string}):any{
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        dispatch(startLogin());
        const url = APIUrls.login();
        axios.post(url, getFormBody(formBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.data.success){
                dispatch(loginSuccess(response.data.user));
                //TODO: STORE JWT in local storage
                return;
            } else {
                dispatch(loginFailed(response.data.message));
            }
        }).catch(err => {
            dispatch(loginFailed(err.response.data.message));
        });
    }
}

export function signup(formBody: {name: string, email:string, password: string, confirm_password:string}):any{
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        dispatch(startSignup());
        const url = APIUrls.signup();
        if (formBody.password !== formBody.confirm_password){
            dispatch(signupFailed("Passwords don't match"));
            return;
        }
        axios.post(url, getFormBody(formBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response);
            if (response.data.success){
                dispatch(signupSuccess(response.data.data.user));
                return;
            } else {
                dispatch(signupFailed(response.data.message));
            }
        }).catch(err => {
            dispatch(signupFailed(err.response.data.message));
        });
    }
}