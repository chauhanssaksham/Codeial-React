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
export const ADD_COMMENT = 'ADD_COMMENT';
export type ADD_COMMENT = typeof ADD_COMMENT;
export const UPDATE_POST_LIKE = 'UPDATE_POST_LIKE';
export type UPDATE_POST_LIKE = typeof UPDATE_POST_LIKE;
export const UPDATE_COMMENT_LIKE = 'UPDATE_COMMENT_LIKE';
export type UPDATE_COMMENT_LIKE = typeof UPDATE_COMMENT_LIKE;

export interface addPostAction extends AnyAction{
    type: ADD_POST,
    post: PostType
}

export interface updatePostsAction extends AnyAction{
    type: UPDATE_POSTS,
    posts: PostType[]
}

export interface addCommentAction extends AnyAction{
    type: ADD_COMMENT,
    comment: CommentType,
    postId: string
}

export interface updatePostLikeAction extends AnyAction{
    type: UPDATE_POST_LIKE,
    postId: string,
    userId: string,
    deleted: boolean
}

export interface updateCommentLikeAction extends AnyAction{
    type: UPDATE_COMMENT_LIKE,
    postId: string,
    userId: string,
    deleted: boolean,
    commentId: string
}

export type PostsActionType = addPostAction | updatePostsAction | addCommentAction | updatePostLikeAction | updateCommentLikeAction;

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

export const addComment = (comment:CommentType, postId: string):PostsActionType => {
    return {
        type: ADD_COMMENT,
        comment,
        postId
    }
}

export const updatePostLike = (postId: string, userId: string, deleted: boolean):PostsActionType => {
    return {
        type: UPDATE_POST_LIKE,
        postId,
        userId,
        deleted
    }
}

export const updateCommentLike = (commentId:string, postId: string, userId: string, deleted: boolean):PostsActionType => {
    return {
        type: UPDATE_COMMENT_LIKE,
        postId,
        userId,
        deleted,
        commentId
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
                // console.log(postsToSendToReducer);
                dispatch(updatePosts(postsToSendToReducer));
            })
    }
}

export const createComment = (content:string, postId: string):any => {
    return (dispatch:Dispatch<AppActions>, getState: () => RootStateType ) => {
        const url = APIUrls.createComment();

        Axios.post(url, getFormBody({content, post_id: postId}), {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.success){
                // console.log("DATA: ", response.data);
                const comment = response.data.data.comment;
                const commentToSendToReducer:CommentType = {
                    ...comment,
                    createdAt: new Date(comment.createdAt),
                    updatedAt: new Date(comment.updatedAt)
                };
                // console.log(commentToSendToReducer);
                dispatch(addComment(commentToSendToReducer, commentToSendToReducer.post));
            }
            //TODO: ADD ERROR HANDLING
        }).catch(err => {
            //todo: ADD ERROR HANDLING
        });
    }
}
export function addLikeToStore(id: string, likeType: 'Comment', userId: string, parentPostId: string):void;
export function addLikeToStore(id: string, likeType: 'Post', userId: string):void;
export function addLikeToStore<T extends 'Post' | 'Comment'>(id: string, likeType: T, userId: string, parentPostId?: string){
    return (dispatch:Dispatch<AppActions>, getState: () => RootStateType ) => {
        const url = APIUrls.toggleLike(id, likeType);
        Axios.post(url, {},{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(response => {
            // console.log('Data: ', response.data);
            if (response.data.success){
                if (likeType === 'Post'){
                    dispatch(updatePostLike(id, userId, response.data.data.deleted));
                } else {
                    dispatch(updateCommentLike(id, parentPostId as string, userId, response.data.data.deleted));
                }
            }
            //TODO: ADD ERROR HANDLING
        }).catch(err => {
            //TODO: ADD ERROR HANDLING
        });
       
    }
}