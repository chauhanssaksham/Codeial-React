import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, AuthStateType } from '../../../types';
import '../../../chat.css';
import io from 'socket.io-client'

type MessageType = {
    content:string,
    self:boolean
}

interface OwnState{
    messages: Array<MessageType>,
    typedMessage: string
}

interface StateProps{
    auth: AuthStateType
}

interface DispatchProps{

}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;

const initialState:OwnState = {
    messages: [],
    typedMessage: ''
}

class ChatBox extends Component<Props, OwnState>{
    socket:SocketIOClient.Socket;
    userEmail: string;

    constructor(props:Props){
        super(props);
        this.state= initialState;        this.socket = io.connect('http://54.237.158.65:5000');
        this.userEmail = this.props.auth.user!.email;
    }

    componentDidMount(){
        this.setupConnections();
    }

    setupConnections = () => {
        this.socket.on('connect', () => {
            // console.log('CONNECTION ESTABLISHED');
            this.socket.emit('join_room', {
                user_email: this.userEmail,
                chatroom: 'codeial'
            })
        });

        this.socket.on('user_joined', (data: any) => {
            // console.log("New user joined!", data);
        });

        this.socket.on('receive_message', (data: any)=> {
            //add message to state
            const {messages} = this.state;
            const messageObject:MessageType = {
                content: data.message,
                self: data.user_email === this.userEmail
            }
            this.setState({
                messages: [...messages, messageObject]
            })
        })
    }

    handleSubmit = () => {
        //TODO: handle Submit
        const {typedMessage} = this.state;
        if (typedMessage && this.userEmail){
            this.socket.emit('send_message', {
                message: typedMessage,
                user_email: this.userEmail,
                chatroom: 'codeial'
            });
        }
        this.setState({
            typedMessage: ''
        })
    }

    render(){
        const {typedMessage, messages} = this.state;
        
        return (
        <div className='chat-container'>
            <div className="chat-header">
                Chat
                <img src="http://www.iconsdb.com/icons/preview/white/minus-5-xxl.png" alt="X" height={17} width={17} />
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.self ? 
                                        'chat-bubble self-chat'
                                        :
                                        'chat-bubble other-chat'
                                    }>
                                        {message.content}
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    value={typedMessage} 
                    onChange={(e)=> this.setState({typedMessage: e.target.value})}
                    onKeyPress={(e)=>{if (e.key === 'Enter'){
                            this.handleSubmit();
                        }}}
                />
                <button onClick={this.handleSubmit}>Submit</button>
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

const mapDispatchToProps:DispatchProps = {
    
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(ChatBox)