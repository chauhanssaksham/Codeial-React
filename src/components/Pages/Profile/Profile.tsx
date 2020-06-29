import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType } from '../../../types';
import { RouteComponentProps } from 'react-router-dom';

interface OwnState{

}

interface StateProps{

}

interface DispatchProps{
    
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
        }
    }
    
    render(){
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
                    <div className="field-value">Some Email</div>
                </div>
                <div className="field">
                    <div className="field-label">Name: </div>
                    <div className="field-value">Some Name</div>
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
        
    }
}
const mapDispatchToProps: DispatchProps = {

}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(Profile)