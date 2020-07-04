import { PostsActionType } from "./store/actions/posts";
import { AuthActionTypes } from "./store/actions/auth";
import { ProfileActionTypes } from "./store/actions/profile";
import { FriendsActionTypes } from "./store/actions/friends";
import { SearchActionTypes } from "./store/actions/search";

export type UserType = {
    _id: string,
    email: string,
    name: string
}

type LikeType = any;

export type CommentType = {
    user: UserType,
    likes: Like[],
    content:string,
    __v: number,
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    post: string
}

export type FriendshipType = UserType;

export type CommentType = {
    content: string,
    createdAt: Date,
    updatedAt: Date,
    post: string,
    likes: LikeType[],
    __v: number,
    _id: string,
    user: UserType,
    comments?: CommentType[]
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

export type ProfileStateType = {
    user: UserType | null,
    success: boolean,
    inProgress: boolean,
    error: null|string
}

export type FriendsStateType = Array<FriendshipType>;

export type SearchStateType = {
    results: UserType[]
}

export type RootStateType = {
    posts: PostsStateType,
    auth: AuthStateType,
    profile: ProfileStateType,
    friends: FriendsStateType,
    search: SearchStateType
}

export type AppActions = PostsActionType | AuthActionTypes | ProfileActionTypes | FriendsActionTypes | SearchActionTypes;