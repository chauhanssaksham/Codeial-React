import React, { Component } from 'react'
import { FriendsStateType, FriendshipType } from '../../../types';
import FriendsListItem from './FriendsListItem';

//TODO: REMOVE THIS
const friends: FriendsStateType = [
    {
        "_id": "5efb79756f2c9a4fb532e50d",
        "from_user": "5eedd9d66f2c9a4fb532e463",
        "to_user": {
            "_id": "5eeb61c76f2c9a4fb532e449",
            "email": "nilanknikhil@gmail.com",
            "name": "Nilank Nikhil"
        }
    },
    {
        "_id": "5efb79d36f2c9a4fb532e50e",
        "from_user": "5eedd9d66f2c9a4fb532e463",
        "to_user": {
            "_id": "5ef0d56a6f2c9a4fb532e46c",
            "email": "abhi.jrt12@gmail.com",
            "name": "Abhay Jirati"
        }
    },
    {
        "_id": "5efb79e16f2c9a4fb532e50f",
        "from_user": "5eedd9d66f2c9a4fb532e463",
        "to_user": {
            "_id": "5ee3310a6f2c9a4fb532e3e3",
            "email": "dhanuufc.dk@gmail.com",
            "name": "Dhanu"
        }
    }
];
interface Props {

}
interface State {
    
}

class FriendsList extends Component<Props, State> {
    render() {
        
        return (
            <div className="friends-list">
            <div className="header">Friends</div>

            {friends && friends.length === 0 && (
                <div className="no-friends">No friends found!</div>
            )}

            {friends &&
                friends.map((friend: FriendshipType) => (
                <FriendsListItem friend={friend.to_user} key={friend._id} />
                ))}
            </div>
        )
    }
}

export default FriendsList;