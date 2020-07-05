import React, {Component} from 'react'
import { PostType } from '../../../types';
import { RouteComponentProps } from 'react-router-dom';
import Posts from '../../Layout/Posts/Posts';
import FriendsList from '../../Layout/Friends/FriendsList';
import ChatBox from '../../Layout/Chat/ChatBox';

interface Props extends RouteComponentProps{
    posts: PostType[],
    isLoggedIn: boolean,
}

interface State{

}

class Home extends Component<Props, State>{

    render(){
        const {posts, isLoggedIn } = this.props;
        return (
            <div className="home">
                <Posts posts={posts} />
                {isLoggedIn && <FriendsList />}
                {isLoggedIn && <ChatBox />}
            </div>
        )
    }
}

export default Home