import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, PostType } from './types';
import {fetchPosts} from './store/actions/posts'
import PostItem from './components/Posts/PostItem';

interface OwnState{

}

interface StateProps{
    posts: PostType[]
}

interface DispatchProps{
    fetchPosts: () => void
}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;

class App extends Component<Props, OwnState>{
    componentDidMount() {
        this.props.fetchPosts();
    }

    render(){
        const {posts} = this.props;

        return (<div className="posts-list">
        {posts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>);
    }
}

const mapStateToProps = (state: RootStateType):StateProps => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps:DispatchProps = {
    fetchPosts
}


export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(App)