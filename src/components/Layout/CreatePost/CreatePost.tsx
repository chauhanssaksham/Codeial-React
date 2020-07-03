import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType } from '../../../types';

interface OwnState{
    content: string
}

interface StateProps{

}

interface DispatchProps{

}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;

class CreatePost extends Component<Props, OwnState>{
    constructor(props:Props){
        super(props);
        this.state = {
            content: ''
        }
    }
    handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    handleOnClick = () => {
        //TODO: ADD ACTION DISPATCH
    }

    render(){
        
        return (<div className="create-post">
            <textarea 
                className="add-post" 
                value={this.state.content} 
                onChange={this.handleInputChange}
                name="content" />
            <div>
                <button id="add-post-btn" onClick={this.handleOnClick}>Add Post</button>
            </div>
        </div>);
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps)(CreatePost)