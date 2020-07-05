import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType } from '../../../types';
import '../../../chat.css';

interface OwnState{
    messages: Array<{content:string, self:boolean}>,
    typedMessage: string
}

interface StateProps{

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
    constructor(props:Props){
        super(props);
        this.state= initialState;
    }

    handleSubmit = () => {
        //TODO: handle Submit
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
                {messages.map(message => (
                    <div className={message.self ? 
                                        'chat-bubble self-chat'
                                        :
                                        'chat=bubble other-chat'
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
                />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        
    }
}

const mapDispatchToProps:DispatchProps = {
    
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(ChatBox)