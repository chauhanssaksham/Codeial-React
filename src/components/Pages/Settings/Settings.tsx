import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, AuthStateType } from '../../../types';

interface OwnState{
    name: string,
    email: string,
    password: string,
    confirm_password: string,
    editMode: boolean
}

const initialState:OwnState = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    editMode: false
}

interface StateProps{
    auth: AuthStateType
}

interface DispatchProps{

}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;

class Settings extends Component<Props, OwnState>{
    constructor(props:Props){
        super(props);
        this.state = initialState;
    }

    handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    toggleEditMode = () => {
        this.setState(prevState => ({
            ...prevState,
            editMode: !prevState.editMode
        }))
    }

    render(){
        const {user} = this.props.auth;
        const {editMode} = this.state;

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
                    <div className="field-label">Email: {user?.email}</div>
                    
                    {editMode? 
                        <>
                        Name
                        <input 
                            type="text" 
                            value={this.state.name}  
                            onChange={this.handleInputChange}
                            name='name'
                        /> 
                        </>:
                        <div className="field-label">Name: {user?.name}</div>
                    }
                </div>
                {editMode && 
                <>
                    <div className="field">
                        <div className="field-label">New Password</div>
                        <input 
                            type="password"
                            onChange={this.handleInputChange}
                            name='password'
                        />
                    </div>
                    <div className="field">
                        <div className="field-label">Confirm Password</div>
                        <input 
                            type="password"
                            onChange={this.handleInputChange}
                            name='confirm_password'
                        />
                    </div>
                </>
                }
                <div className="btn-grp">
                    {editMode? 
                        <button className="button save-btn">Save</button>:
                        <button className="button edit-btn" onClick={this.toggleEditMode}>Edit Profile</button>
                    }
                    {editMode && 
                        <div className="go-back" onClick={this.toggleEditMode}>
                            Go back
                        </div>
                    }
                </div>

            </div>
            );
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        auth: state.auth
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps)(Settings)