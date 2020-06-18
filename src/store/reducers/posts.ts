import { PostsStateType, PostsActionType, UPDATE_POSTS } from "../../types.d";

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