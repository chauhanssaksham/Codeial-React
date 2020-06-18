import React, {Component} from 'react'

interface Props{

}

interface State{

}

class Login extends Component<Props, State>{
    emailInputRef: React.RefObject<HTMLInputElement>;
    passwordInputRef: React.RefObject<HTMLInputElement>;
    constructor(props:Props){
        super(props);
        this.emailInputRef = React.createRef<HTMLInputElement>();
        this.passwordInputRef = React.createRef<HTMLInputElement>();
    }

    handleFormSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log('this.emailInputRef: ', this.emailInputRef.current?.value);
        console.log('this.passwordInputRef: ', this.passwordInputRef.current?.value);
    }

    render(){
        return (
            <form className="login-form">
                <span className="login-signup-header">Log In</span>
                <div className="field">
                    <input type="email" placeholder="Email" required ref={this.emailInputRef} />
                </div>
                <div className="field">
                    <input type="password" placeholder="Password" required ref={this.passwordInputRef} />
                </div>
                <div className="field">
                    <button onClick={this.handleFormSubmit}>Log In</button>
                </div>
            </form>
        );
    }
}

export default Login