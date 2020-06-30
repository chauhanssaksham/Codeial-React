import React, { Component } from 'react'
import { PostType } from '../../../types';
import PostItem from './PostItem';

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
                    {posts.map((post) => (
                        <PostItem post={post} key={post._id} />
                    ))}
            </div>
        )
    }
}

export default Posts;