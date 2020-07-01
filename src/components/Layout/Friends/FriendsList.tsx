import React, { Component } from 'react'
import { FriendsStateType, FriendshipType, RootStateType } from '../../../types';
import FriendsListItem from './FriendsListItem';
import { connect } from 'react-redux';

interface OwnState{

}

interface StateProps{
    friends: FriendsStateType
}

interface DispatchProps{

}

interface OwnProps{

}

type Props = StateProps & DispatchProps & OwnProps;

class FriendsList extends Component<Props, OwnState> {

    render() {
        const {friends} = this.props;
        return (
            <div className="friends-list">
            <div className="header">Friends</div>

            {friends && friends.length === 0 && (
                <div className="no-friends">No friends found!</div>
            )}

            {friends &&
                friends.map((friend: FriendshipType) => (
                <FriendsListItem friend={friend} key={friend._id} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state: RootStateType):StateProps => {
    return {
        friends: state.friends
    }
}

const mapDispatchToProps:DispatchProps = {

}

export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(FriendsList);