import { PostsStateType } from "../../types.d";
import { PostsActionType, UPDATE_POSTS, ADD_POST } from "../actions/posts";

const initialPostsState: PostsStateType =  [];

function posts(state = initialPostsState, action:PostsActionType):PostsStateType{
    switch(action.type){
        case ADD_POST:
            return [action.post, ...state]
        case UPDATE_POSTS:
            return action.posts;
        default:
            return state;
    }
}

export default posts;