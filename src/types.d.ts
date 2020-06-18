export type PostType = {
    
}

export type PostsStateType = PostType[];


export type RootStateType = {
    posts: PostsStateType,
}


//TODO:
//TODO: just a todo 


export const ADD_POSTS = 'ADD_POSTS';
export type ADD_POSTS = typeof ADD_POSTS;


export interface addPostsAction extends AnyAction{
    type: ADD_POSTS,
    posts: PostType[]
}

export type PostsActionType = addPostsAction;

export type AppActions = PostsActionType ;