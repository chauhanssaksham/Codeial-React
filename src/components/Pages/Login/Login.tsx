import React, {Component} from 'react'

interface Props{

}

interface State{

}

class Login extends Component<Props, State>{
    constructor(props:Props){
        super(props);

    }

    render(){
        
        return (
            <form className="login-form">
                <span className="login-signup-header">Log In</span>
                <div className="field">
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="field">
                    <input type="password" placeholder="Password" required />
                </div>
                <div className="field">
                    <button>Log In</button>
                </div>
            </form>
        );
    }
}

export default Login