import React, {Component} from 'react'
import {signup} from '../../../store/actions/auth';
import { RootStateType, AuthStateType } from '../../../types';
import { connect } from 'react-redux';

interface StateProps{
    auth: AuthStateType
}

interface DispatchProps{
    signup: (name: string, email: string, password:string, confirm_password:string) => void
}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;


interface State{
    name: string,
    email: string,
    password: string,
    confirm_password: string
}

const initialState: State = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
}

class Signup extends Component<Props, State>{
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

    handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, email, password, confirm_password} = this.state;

        if (email && password && !this.props.auth.inProgress){
            console.log("here");
            this.props.signup(name, email, password, confirm_password);
        }
    }

    render(){
        const {error, inProgress} = this.props.auth;

        return (
            <form className="login-form" onSubmit={this.handleFormSubmit}>
                <span className="login-signup-header">Signup</span>
                {error && <div className='alert error-dailog'>{error}</div>}
                <div className="field">
                    <input
                        name="name"
                        type="text" 
                        placeholder="Full Name" 
                        required 
                        onChange={this.handleInputChange}
                        value={this.state.name}
                    />
                </div>
                <div className="field">
                    <input
                        name="email"
                        type="email" 
                        placeholder="Email" 
                        required 
                        onChange={this.handleInputChange}
                        value={this.state.email}
                    />
                </div>
                <div className="field">
                    <input 
                        name="password"
                        type="password" 
                        placeholder="Password" 
                        required 
                        onChange={this.handleInputChange}
                        value={this.state.password}
                    />
                </div>
                <div className="field">
                    <input 
                        name="confirm_password"
                        type="password" 
                        placeholder="Confirm Password" 
                        required 
                        onChange={this.handleInputChange}
                        value={this.state.confirm_password}
                    />
                </div>
                <div className="field">
                    {inProgress? 
                        <button disabled={inProgress}>Signing Up...</button>:
                        <button>Sign Up</button>
                    }
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state: RootStateType):StateProps => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps:DispatchProps = {
    signup
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(Signup)