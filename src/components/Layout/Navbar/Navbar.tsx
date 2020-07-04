import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootStateType, AuthStateType, SearchStateType } from '../../../types';
import {logout} from '../../../store/actions/auth'
import { searchUsers } from '../../../store/actions/search';

interface OwnState{
    searchText: string
}

interface StateProps{
    auth: AuthStateType,
    search: SearchStateType
}

interface DispatchProps{
    logout: () => void,
    searchUsers: (searchString: string) => void
}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;


class Navbar extends Component<Props, OwnState> {

    constructor(props: Props){
        super(props);
        this.state = {
            searchText: ''
        }
    }

    logOut = () => {
        this.props.logout();
    }

    handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchText: e.target.value
        }, () => {
            this.props.searchUsers(this.state.searchText);
        });
    }

    render() {
        const {auth, search} = this.props;

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
                <input placeholder="Search" value={this.state.searchText} onChange={this.handleSearch} />
                {this.state.searchText !== '' && search.results.length > 0 && 
                <div className="search-results">
                    <ul>
                        {search.results.map(user => (
                            <Link to={`/users/${user._id}`} key={user._id}>
                                <li className="search-results-row">
                                    <img
                                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                                    alt="user-dp"
                                    />
                                    <span>{user.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>}
                
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
        auth: state.auth,
        search: state.search
    }
}

const mapDispatchToProps:DispatchProps = {
    logout,
    searchUsers
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);