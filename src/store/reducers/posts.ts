import { PostsStateType, PostsActionType } from "../../types";

const initialPostsState: PostsStateType =  [];

function posts(state = initialPostsState, action:PostsActionType):PostsStateType{
    return state;
}

export default posts;