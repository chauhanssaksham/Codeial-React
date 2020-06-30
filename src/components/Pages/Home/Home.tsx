import React, {Component} from 'react'
import { PostType } from '../../../types';
import { RouteComponentProps } from 'react-router-dom';
import Posts from '../../Layout/Posts/Posts';

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
                <Posts posts={posts} />
            </div>
        )
    }
}

export default Home