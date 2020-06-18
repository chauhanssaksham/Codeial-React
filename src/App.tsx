import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, PostType } from './types';
import {fetchPosts} from './store/actions/posts'

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
        console.log('Props: ', this.props);
        return (<div>Hello</div>);
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