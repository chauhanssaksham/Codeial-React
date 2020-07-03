import React, { Component } from 'react'
import { PostType } from '../../../types';
import PostItem from './PostItem';
import CreatePost from '../CreatePost/CreatePost';

interface Props {
    posts: PostType[]
}
interface State {
    
}

class Posts extends Component<Props, State> {
    render() {
        const {posts} = this.props;
        return (
            <div className="posts-list">
                    <CreatePost />
                    {posts.map((post) => (
                        <PostItem post={post} key={post._id} />
                    ))}
            </div>
        )
    }
}

export default Posts;