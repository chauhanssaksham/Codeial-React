import { PostsStateType } from "../../types.d";
import { PostsActionType, UPDATE_POSTS, ADD_POST, ADD_COMMENT, UPDATE_POST_LIKE } from "../actions/posts";

const initialPostsState: PostsStateType =  [];

function posts(state = initialPostsState, action:PostsActionType):PostsStateType{
    switch(action.type){
        case ADD_POST:
            return [action.post, ...state]
        case UPDATE_POSTS:
            return action.posts;
        case ADD_COMMENT:
            return state.map(post => {
                if (post._id === action.postId){
                    return {
                        ...post,
                        comments: [...post.comments, action.comment]
                    };
                }
                return post;
            });
        case UPDATE_POST_LIKE:
            return state.map(post => {
                if (post._id === action.postId){
                    if (action.deleted){
                        return {
                            ...post,
                            likes: post.likes.filter(likeID => likeID !== action.userId)
                        }
                    } else {
                        return {
                            ...post,
                            likes: [...post.likes, action.userId]
                        }
                    }
                }
                return post;
            })
        default:
            return state;
    }
}

export default posts;