import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootStateType, AuthStateType } from '../../../types';
import {logout} from '../../../store/actions/auth'

interface OwnState{

}

interface StateProps{
    auth: AuthStateType
}

interface DispatchProps{
    logout: () => void
}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;


class Navbar extends Component<Props, OwnState> {

    logOut = () => {
        this.props.logout();
    }

    render() {
        const {auth} = this.props;

        return (
            <nav className="nav">
                <div className="left-div">
                <img
                    src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                    alt="logo"
                />
                </div>
                <div className="search-container">
                <img
                    className="search-icon"
                    src="https://image.flaticon.com/icons/svg/483/483356.svg"
                    alt="search-icon"
                />
                <input placeholder="Search" />
    
                <div className="search-results">
                    <ul>
                    <li className="search-results-row">
                        <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                        />
                        <span>John Doe</span>
                    </li>
                    <li className="search-results-row">
                        <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                        />
                        <span>John Doe</span>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="right-nav">
                {auth.isLoggedIn && 
                    <div className="user">
                        <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                        id="user-dp"
                        />
                        <span><Link to='/settings'>{auth.user?.name}</Link></span>
                        
                    </div>
                }
                <div className="nav-links">
                    <ul>
                    {!auth.isLoggedIn && 
                        <>
                        <li><Link to='/login'>Log in</Link></li>
                        <li><Link to='/signup'>Register</Link></li>
                        </>
                    }
                    {auth.isLoggedIn && 
                        <li onClick={this.logOut}>Log out</li>
                    }
                    </ul>
                </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state: RootStateType):StateProps => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps:DispatchProps = {
    logout
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);