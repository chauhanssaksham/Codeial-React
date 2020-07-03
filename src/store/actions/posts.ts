import { PostType, AppActions, RootStateType } from "../../types.d";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { APIUrls } from "../../helpers/URLs";
import Axios from "axios";
import { getFormBody } from "../../helpers/utils";

export const ADD_POST = 'ADD_POST';
export type ADD_POST = typeof ADD_POST;
export const UPDATE_POSTS = 'UPDATE_POSTS';
export type UPDATE_POSTS = typeof UPDATE_POSTS;

export interface addPostAction extends AnyAction{
    type: ADD_POST,
    post: PostType
}

export interface updatePostsAction extends AnyAction{
    type: UPDATE_POSTS,
    posts: PostType[]
}

export type PostsActionType = addPostAction | updatePostsAction;

export const addPost = (post:PostType):PostsActionType => {
    return {
        type: ADD_POST,
        post
    }
}

export const updatePosts = (posts:PostType[]):PostsActionType => {
    return {
        type: UPDATE_POSTS,
        posts
    }
}

export const createPost = (content:string):any => {
    return (dispatch:Dispatch<AppActions>, getState: () => RootStateType ) => {
        const url = APIUrls.createPost();

        Axios.post(url, getFormBody({content}), {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.success){
                dispatch(addPost(response.data.data.post));
            }
        }).catch(err => {

        });
    }
}

export const fetchPosts = ():any => {
    return (dispatch:Dispatch<AppActions>, getState: () => RootStateType ) => {
        const url = APIUrls.fetchPosts();
        fetch(url)
            .then(response => {
                // console.log('response');
                return response.json();
            }).then(data => {
                dispatch(updatePosts(data.data.posts));
            })
    }
}