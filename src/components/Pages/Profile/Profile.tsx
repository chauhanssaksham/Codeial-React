import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, AuthStateType } from '../../../types';
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

    render(){
        return (
            <div>{this.props.match.params.userID}</div>
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