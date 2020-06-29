import { AnyAction } from "redux";
import { Dispatch } from "react";
import { AppActions, RootStateType, UserType } from "../../types";
import { getFormBody } from "../../helpers/utils";
import { APIUrls } from "../../helpers/URLs";
import axios from 'axios';
import setAuthToken from "../../helpers/setAuthTokenAxiosHeader";

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
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export type AUTHENTICATE_USER = typeof AUTHENTICATE_USER;
export const CLEAR_AUTH_ERRORS = 'CLEAR_AUTH_ERRORS'
export type CLEAR_AUTH_ERRORS = typeof CLEAR_AUTH_ERRORS;
export const LOG_OUT = 'LOG_OUT';
export type LOG_OUT = typeof LOG_OUT;
export const SET_USER_LOADING = 'SET_USER_LOADING';
export type SET_USER_LOADING = typeof SET_USER_LOADING;
export const EDIT_USER_SUCCESSFUL = 'EDIT_USER_SUCCESSFUL';
export type EDIT_USER_SUCCESSFUL = typeof EDIT_USER_SUCCESSFUL;
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';
export type EDIT_USER_FAILED = typeof EDIT_USER_FAILED;

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
export interface authenticateUserAction extends AnyAction{
    type: AUTHENTICATE_USER,
    user: UserType
}
export interface logoutAction extends AnyAction{
    type: LOG_OUT
}
export interface clearAuthErrorsAction extends AnyAction{
    type: CLEAR_AUTH_ERRORS
}
export interface setUserLoadingAction extends AnyAction{
    type: SET_USER_LOADING
}
export interface editUserSuccessfulAction extends AnyAction{
    type: EDIT_USER_SUCCESSFUL,
    user: UserType
}
export interface editUserFailedAction extends AnyAction{
    type: EDIT_USER_FAILED,
    error: string
}

export type AuthActionTypes = startLoginAction | loginFailedAction | loginSuccessAction | startSingupAction | signupFailedAction | signupSuccessAction | authenticateUserAction | logoutAction | clearAuthErrorsAction | setUserLoadingAction | editUserSuccessfulAction | editUserFailedAction;


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

export function authenticateUser(user: UserType):authenticateUserAction{
    return {
        type:AUTHENTICATE_USER,
        user
    }
}

export function logout():logoutAction{
    localStorage.removeItem('token');
    return {
        type: LOG_OUT
    }
}

export function clearAuthErrors():clearAuthErrorsAction{
    return {
        type: CLEAR_AUTH_ERRORS
    }
}

export function setUserLoading():setUserLoadingAction{
    return {
        type: SET_USER_LOADING
    }
}

export function editUserSuccessful(user: UserType):editUserSuccessfulAction{
    return {
        type: EDIT_USER_SUCCESSFUL,
        user
    }
}

export function editUserFailed(error: string):editUserFailedAction{
    return {
        type: EDIT_USER_FAILED,
        error
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
                localStorage.setItem('token', response.data.data.token);
                setAuthToken(response.data.data.token);
                dispatch(loginSuccess(response.data.data.user));
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
            if (response.data.success){
                localStorage.setItem('token', response.data.data.token);
                setAuthToken(response.data.data.token);
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

export function editUser(formBody: {name: string, userId:string, password: string, confirm_password:string}):any{
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        const url = APIUrls.editProfile();
        if (formBody.password !== formBody.confirm_password){
            dispatch(editUserFailed("Passwords don't match"));
            return;
        }
        const {userId, ...restBody} = formBody;
        axios.post(url, getFormBody({
            ...restBody,
            id: userId
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.data.success){
                dispatch(editUserSuccessful(response.data.data.user));
                alert('Edit user successful');
            }
            if (response.data.data.token){
                localStorage.setItem('token', response.data.data.token);
                setAuthToken(response.data.data.token);
            }
            if (!response.data.success) {
                dispatch(editUserFailed(response.data.message));
            }
        }).catch(err => {
            dispatch(editUserFailed(err.response.data.message));
        });
    }
}