import { PostType, PostsActionType, ADD_POSTS, AppActions, RootStateType, UPDATE_POSTS } from "../../types.d";
import { Dispatch } from "react";

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