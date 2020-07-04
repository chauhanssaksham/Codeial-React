import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, ProfileStateType, FriendsStateType, FriendshipType } from '../../../types';
import { RouteComponentProps } from 'react-router-dom';
import { fetchUserProfile } from '../../../store/actions/profile';
import { APIUrls } from '../../../helpers/URLs';
import Axios from 'axios';
import { addFriend, removeFriend } from '../../../store/actions/friends';

interface OwnState{
    success: null | boolean,
    error: null | string
}

interface StateProps{
    profile: ProfileStateType,
    friends: FriendsStateType
}

interface DispatchProps{
    fetchUserProfile: (userId: string) => void,
    addFriend: (friend: FriendshipType) => void,
    removeFriend: (id: string) => void
}

interface HomeRouterProps {
    userID: string;   // This one is coming from the router
}

interface OwnProps extends RouteComponentProps<HomeRouterProps>{

}

type Props = StateProps & DispatchProps & OwnProps;

class Profile extends Component<Props, OwnState>{

    constructor(props: Props){
        super(props);
        this.state = {
            success: null,
            error: null
        }
    }

    componentDidMount() {
        const {match} = this.props;

        if (match.params.userID){
            //Fetch the user by dispatching action
            this.props.fetchUserProfile(match.params.userID);
        }
    }

    componentDidUpdate(prevProps: Props){
        const prevParams =  prevProps.match.params;
        const params = this.props.match.params;
        if (prevParams && params && prevParams.userID !== params.userID){
            this.props.fetchUserProfile(params.userID);
        }
    }

    handleAddFriendClick = async () => {
        try {
            const {userID} = this.props.match.params;
            const url = APIUrls.addFriend(userID);
            const res = await Axios.post(url, {}, {
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            });
            if (res.data.success){
                this.setState({
                    success: true
                });
                this.props.addFriend(res.data.data.friendship.to_user);
                
            } else {
                this.setState({
                    success: false,
                    error: res.data.message
                });
            }
        } catch (error) {
            this.setState({
                success: false,
                error: error.response.data.message
            });
        }
    }
    handleRemoveFriendClick = async () => {
        try {
            const {userID} = this.props.match.params;
            const url = APIUrls.removeFriend(userID);
            const res = await Axios.post(url, {}, {
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            });
            if (res.data.success){
                this.setState({
                    success: true
                });
                this.props.removeFriend(userID);
            } else {
                this.setState({
                    success: false,
                    error: res.data.message
                });
            }
        } catch (error) {
            this.setState({
                success: false,
                error: error.response.data.message
            });
        }
    }

    checkIfUserIsFriend():boolean{
        const currentProfileId = this.props.match.params.userID;
        const {friends} = this.props;
        return (friends.some(friend => friend._id === currentProfileId));
    }
    
    render(){
        const {inProgress, user} = this.props.profile;
        const isUserFriend = this.checkIfUserIsFriend();
        if (inProgress){
            return <h1>Loading user...</h1>
        }
        return (
            <div className="settings">
                <div className="img-container">
                    <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                        id="user-dp"
                    />
                </div>
                <div className="field">
                    <div className="field-label">Email: </div>
                    <div className="field-value">{user?.email}</div>
                </div>
                <div className="field">
                    <div className="field-label">Name: </div>
                    <div className="field-value"> {user?.name}</div>
                </div>
                <div className="btn-grp">
                    {isUserFriend? 
                        <button className="button save-btn" onClick={this.handleRemoveFriendClick}>Remove Friend</button>
                        :
                        <button className="button save-btn" onClick={this.handleAddFriendClick}>Add Friend</button>
                    }
                    {this.state.success && <div className="alert success-dailog">User added as a friend!</div>}
                    {this.state.error && <div className="alert error-dailog">{this.state.error}</div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        profile: state.profile,
        friends: state.friends
    }
}
const mapDispatchToProps: DispatchProps = {
    fetchUserProfile,
    addFriend,
    removeFriend
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(Profile)