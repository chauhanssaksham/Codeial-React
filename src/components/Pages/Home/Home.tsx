import React, {Component} from 'react'
import PostItem from '../../Layout/Posts';
import { PostType } from '../../../types';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps{
    posts: PostType[]
}

interface State{

}

class Home extends Component<Props, State>{

    render(){
        const {posts} = this.props;
        return (
            <div className="home">
                <div className="posts-list">
                    {posts.map((post) => (
                        <PostItem post={post} key={post._id} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Home