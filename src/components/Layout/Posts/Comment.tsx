import React, {Component} from 'react'
import {connect} from 'react-redux'
import { RootStateType, CommentType, AuthStateType } from '../../../types';
import { addLikeToStore } from '../../../store/actions/posts';

interface OwnState{

}

interface StateProps{
    auth: AuthStateType
}

interface DispatchProps{
    addLikeToStore: (id: string, likeType: 'Comment', userId: string, parentPostId: string) => void
}

interface OwnProps{
    comment: CommentType
    postId: string
}

type Props = StateProps & DispatchProps & OwnProps;

class Comment extends Component<Props, OwnState>{

    handleCommentLike = () => {
        console.log("Called");
        this.props.addLikeToStore(this.props.comment._id, 'Comment', this.props.auth.user!._id, this.props.comment.post);
    }

    render(){
        const {comment} = this.props;
        const isCommentLikedByUser:boolean = comment.likes.includes(this.props.auth.user!._id);

        return (
            <div className="post-comment-item">
            <div className="post-comment-header">
              <span className="post-comment-author">{comment.user.name}</span>
              <span className="post-comment-time">{comment.createdAt.toLocaleString()}</span>
              {isCommentLikedByUser? 
                    <img
                        src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
                        alt="unlike-post"
                        onClick={this.handleCommentLike}
                        style={{height:'18px', marginLeft:'10px'}}
                    /> :
                    <img
                        src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                        alt="like-post"
                        onClick={this.handleCommentLike}
                        style={{height:'18px', marginLeft:'10px'}}
                    />
              }
              <span className="post-comment-likes">{comment.likes.length} likes</span>
            </div>
      
            <div className="post-comment-content">{comment.content}</div>
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
    addLikeToStore
}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(Comment)