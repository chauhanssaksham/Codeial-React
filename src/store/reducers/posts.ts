import { PostsStateType } from "../../types.d";
import { PostsActionType, UPDATE_POSTS } from "../actions/posts";

const initialPostsState: PostsStateType =  [];

function posts(state = initialPostsState, action:PostsActionType):PostsStateType{
    switch(action.type){
        case UPDATE_POSTS:
            return action.posts;
        default:
            return state;
    }
}

export default posts;