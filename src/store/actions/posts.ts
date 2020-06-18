import { PostType, PostsActionType, ADD_POSTS } from "../../types";

export const addPosts = (posts:PostType[]):PostsActionType => {
    return {
        type: ADD_POSTS,
        posts
    }
}