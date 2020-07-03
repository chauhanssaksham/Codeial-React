import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType } from '../../../types';
import { createPost } from '../../../store/actions/posts';

interface OwnState{
    content: string
}

interface StateProps{

}

interface DispatchProps{
    createPost: (content: string) => void
}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;

const initialState:OwnState = {
    content: ''
}

class CreatePost extends Component<Props, OwnState>{
    constructor(props:Props){
        super(props);
        this.state = initialState;
    }
    handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    handleOnClick = () => {
        this.props.createPost(this.state.content);
        this.setState(initialState);
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

const mapDispatchToProps:DispatchProps = {
    createPost
}


export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(CreatePost)