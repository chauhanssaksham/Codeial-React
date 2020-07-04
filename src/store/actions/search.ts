import { AnyAction } from "redux";
import { Dispatch } from "react";
import { UserType, AppActions, RootStateType } from "../../types";
import { APIUrls } from "../../helpers/URLs";
import Axios from "axios";

export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';
export type FETCH_SEARCH_RESULTS_SUCCESS = typeof FETCH_SEARCH_RESULTS_SUCCESS;

export interface searchResultsSuccessAction extends AnyAction{
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users: UserType[]
}

export type SearchActionTypes = searchResultsSuccessAction; 

export function searchResultsSucces(users: UserType[]):searchResultsSuccessAction{
    return {
        type: FETCH_SEARCH_RESULTS_SUCCESS,
        users
    }
}

export function searchUsers(searchString: string){
    return (dispatch: Dispatch<AppActions>, getState: () => RootStateType) => {
        const url = APIUrls.userSearch(searchString);

        Axios.get(url, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log('SEARCH DATA:', response.data);
            if (response.data.success){
                dispatch(searchResultsSucces(response.data.data.users));
            } else {
                dispatch(searchResultsSucces([]));
            }
        }).catch(err => {
            //TODO: Handle error
        })
    }
}

