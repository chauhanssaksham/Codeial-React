import React, {Component} from 'react'

interface Props{

}

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
    handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        }, ()=>{
            console.log(this.state);
        });
    }

    render(){
        return (
            <form className="login-form">
                <span className="login-signup-header">Log In</span>
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
                    <button>Log In</button>
                </div>
            </form>
        );
    }
}

export default Login