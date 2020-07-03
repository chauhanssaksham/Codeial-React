import { PostType, AppActions, RootStateType, CommentType } from "../../types.d";
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
                const post = response.data.data.post;
                const postToSendToReducer:PostType = {
                    ...post,
                    createdAt: new Date(post.createdAt),
                    updatedAt: new Date(post.updatedAt),
                    comments: post.comments.map((comment:CommentType) => ({
                        ...comment, 
                        createdAt: new Date(comment.createdAt),
                        updatedAt: new Date(comment.updatedAt),
                    }))
                };
                dispatch(addPost(postToSendToReducer));
            }
            //TODO: ADD ERROR HANDLING
        }).catch(err => {
            //todo: ADD ERROR HANDLING
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
                const postsToSendToReducer:PostType[] = data.data.posts.map((post:PostType) => ({
                    ...post,
                    createdAt: new Date(post.createdAt),
                    updatedAt: new Date(post.updatedAt),
                    comments: post.comments.map(comment => ({
                        ...comment, 
                        createdAt: new Date(comment.createdAt),
                        updatedAt: new Date(comment.updatedAt),
                    }))
                }));
                console.log(postsToSendToReducer);
                dispatch(updatePosts(postsToSendToReducer));
            })
    }
}