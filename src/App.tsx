import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, PostType } from './types';
import {fetchPosts} from './store/actions/posts'
import Navbar from './components/Layout/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Layout/Pages/Home';
import Page404 from './components/Layout/Pages/Page404';

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

const Login = () => {
    return <div>Login</div>;
}
const SignUp = () => {
    return <div>SignUp</div>;
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
                <Route path='/signup' component={SignUp} />
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