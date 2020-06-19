import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, PostType } from './types';
import {fetchPosts} from './store/actions/posts'
import Navbar from './components/Layout/Navbar/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Pages/Home/Home';
import Page404 from './components/Pages/Page404/Page404';
import Login from './components/Pages/Auth/Login';
import Signup from './components/Pages/Auth/Signup';

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

        return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/' render={(props)=>{
                    return <Home {...props} posts={posts} />
                }} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route component={Page404} />
            </Switch>
        </Router>
        );
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