import { PostType, AppActions, RootStateType } from "../../types.d";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const ADD_POSTS = 'ADD_POSTS';
export type ADD_POSTS = typeof ADD_POSTS;
export const UPDATE_POSTS = 'UPDATE_POSTS';
export type UPDATE_POSTS = typeof UPDATE_POSTS;

export interface addPostsAction extends AnyAction{
    type: ADD_POSTS,
    posts: PostType[]
}

export interface updatePostsAction extends AnyAction{
    type: UPDATE_POSTS,
    posts: PostType[]
}

export type PostsActionType = addPostsAction | updatePostsAction;

export const addPosts = (posts:PostType[]):PostsActionType => {
    return {
        type: ADD_POSTS,
        posts
    }
}

export const updatePosts = (posts:PostType[]):PostsActionType => {
    return {
        type: UPDATE_POSTS,
        posts
    }
}

export const fetchPosts = ():any => {
    return (dispatch:Dispatch<AppActions>, getState: () => RootStateType ) => {
        const url = `http://codeial.com:8000/api/v2/posts?page=1&limit=5`;
        fetch(url)
            .then(response => {
                // console.log('response');
                return response.json();
            }).then(data => {
                dispatch(updatePosts(data.data.posts));
            })
    }
}