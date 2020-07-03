import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, CommentType } from '../../../types';

interface OwnState{

}

interface StateProps{

}

interface DispatchProps{

}

interface OwnProps{
    comment: CommentType
    postId: string
}

type Props = StateProps & DispatchProps & OwnProps;

class Comment extends Component<Props, OwnState>{
    render(){
        const {comment} = this.props;
        return (
            <div className="post-comment-item">
            <div className="post-comment-header">
              <span className="post-comment-author">{comment.user.name}</span>
            <span className="post-comment-time">{comment.createdAt.toLocaleString()}</span>
              <span className="post-comment-likes">{comment.likes.length} likes</span>
            </div>
      
            <div className="post-comment-content">{comment.content}</div>
          </div>
          );
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps)(Comment)