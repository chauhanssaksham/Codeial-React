import { AnyAction } from "redux";
import { Dispatch } from "react";
import { AppActions, RootStateType } from "../../types";
import { getFormBody } from "../../helpers/utils";

export const LOGIN_START = 'LOGIN_START';
export type LOGIN_START = typeof LOGIN_START;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export const LOGIN_FAILED = 'LOGIN_FAILED';
export type LOGIN_FAILED = typeof LOGIN_FAILED;

export interface startLoginAction extends AnyAction{
    type: LOGIN_START;
}

export type UserActionTypes = any;

export function startLogin():startLoginAction{
    return {
        type: LOGIN_START
    }
}

export function login(email:string, password: string):any{
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        const url = `http://codeial.com:8000/api/v2/users/login`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-url-encoded'
            },
            body: getFormBody({email, password})
        }).then(response => {
                // Do something
            });
    }
}