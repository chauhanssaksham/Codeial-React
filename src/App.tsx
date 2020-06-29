import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, UserType, PostsStateType, AuthStateType } from './types';
import {fetchPosts} from './store/actions/posts'
import Navbar from './components/Layout/Navbar/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Pages/Home/Home';
import Page404 from './components/Pages/Page404/Page404';
import Login from './components/Pages/Auth/Login';
import Signup from './components/Pages/Auth/Signup';
import jwtDecode from 'jwt-decode';
import {authenticateUser} from './store/actions/auth'
import PrivateRoute from './components/routing/PrivateRoute';
import Settings from './components/Pages/Settings/Settings';
import setAuthToken from './helpers/setAuthTokenAxiosHeader';
import Profile from './components/Pages/Profile/Profile';

interface OwnState{

}

interface StateProps{
    posts: PostsStateType,
    auth: AuthStateType
}

interface DispatchProps{
    fetchPosts: () => void,
    authenticateUser: (user: UserType) => void
}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;

class App extends Component<Props, OwnState>{
    componentDidMount() {
        this.props.fetchPosts();

        const token = localStorage.token;
        if (token){
            const user:UserType = jwtDecode(token);
            this.props.authenticateUser({
                _id: user._id,
                name: user.name,
                email: user.email
            });
            setAuthToken(localStorage.token);
        }
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
                <PrivateRoute path='/settings' component={Settings} isLoggedIn={this.props.auth.isLoggedIn} loading={this.props.auth.user_loading} />
                <PrivateRoute path='/users/:userID' component={Profile} isLoggedIn={this.props.auth.isLoggedIn} loading={this.props.auth.user_loading} />
                <Route component={Page404} />
            </Switch>
        </Router>
        );
    }
}

const mapStateToProps = (state: RootStateType):StateProps => {
    return {
        posts: state.posts,
        auth: state.auth
    }
}

const mapDispatchToProps:DispatchProps = {
    fetchPosts,
    authenticateUser
}


export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(App)