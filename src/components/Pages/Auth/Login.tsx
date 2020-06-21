import React, {Component} from 'react'
import {login, clearAuthErrors} from '../../../store/actions/auth';
import { RootStateType, AuthStateType } from '../../../types';
import { connect } from 'react-redux';

interface StateProps{
    auth: AuthStateType
}

interface DispatchProps{
    login: (formBody: {email: string, password:string}) => void,
    clearAuthErrors: () => void
}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;


interface State{
    email: string,
    password: string
}

const initialState: State = {
    email: '',
    password: ''
}

class Login extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state = initialState;
    }
    componentWillUnmount() {
        this.props.clearAuthErrors();
    }
    

    handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {email, password} = this.state;
        if (email && password && !this.props.auth.inProgress){
            console.log("here");
            this.props.login(this.state);
        }
    }

    render(){
        const {error, inProgress} = this.props.auth;

        return (
            <form className="login-form" onSubmit={this.handleFormSubmit}>
                <span className="login-signup-header">Log In</span>
                {error && <div className='alert error-dailog'>{error}</div>}
                <div className="field">
                    <input
                        name="email"
                        type="email" 
                        placeholder="Email" 
                        required 
                        // ref={this.emailInputRef} 
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
                        // ref={this.passwordInputRef} 
                        onChange={this.handleInputChange}
                        value={this.state.password}
                    />
                </div>
                <div className="field">
                    {inProgress? 
                        <button disabled={inProgress}>Loggging In...</button>:
                        <button>Log In</button>
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
    login,
    clearAuthErrors
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(Login)