import { PostsActionType } from "./store/actions/posts";
import { AuthActionTypes } from "./store/actions/auth";

export type UserType = {
    _id: string,
    email: string,
    name: string
}

export type CommentType = {
    content: string,
    createdAt: Date,
    updatedAt: Date,
    post: string,
    likes: any[],
    __v: number,
    _id: string,
    user: UserType
}

export type PostType = {
    content: string,
    createdAt: Date,
    likes: any[],
    updatedAt: Date,
    __v: number,
    _id: string,
    user: UserType,
    comments: CommentType[]
}

export type PostsStateType = PostType[];

export type AuthStateType = {
    user: UserType | null,
    error: string | null,
    isLoggedIn: boolean,
    inProgress: boolean,
    user_loading: boolean
}

export type RootStateType = {
    posts: PostsStateType,
    auth: AuthStateType
}

export type AppActions = PostsActionType | AuthActionTypes ;