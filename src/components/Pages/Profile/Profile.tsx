import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, ProfileStateType } from '../../../types';
import { RouteComponentProps } from 'react-router-dom';
import { fetchUserProfile } from '../../../store/actions/profile';

interface OwnState{

}

interface StateProps{
    profile: ProfileStateType
}

interface DispatchProps{
    fetchUserProfile: (userId: string) => void,
}

interface HomeRouterProps {
    userID: string;   // This one is coming from the router
}

interface OwnProps extends RouteComponentProps<HomeRouterProps>{

}

type Props = StateProps & DispatchProps & OwnProps;

class Profile extends Component<Props, OwnState>{
    componentDidMount() {
        const {match} = this.props;

        if (match.params.userID){
            //Fetch the user by dispatching action
            this.props.fetchUserProfile(match.params.userID);
        }
    }
    componentWillUnmount(){

    }
    
    render(){
        const {inProgress, user} = this.props.profile;
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
                    <button className="button save-btn">Add Friend</button>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        profile: state.profile
    }
}
const mapDispatchToProps: DispatchProps = {
    fetchUserProfile
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(Profile)