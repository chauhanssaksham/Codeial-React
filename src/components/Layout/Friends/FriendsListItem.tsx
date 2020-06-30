import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { UserType } from '../../../types';


interface Props {
    friend: UserType
}
interface State {
    
}

class FriendsListItem extends Component<Props, State> {
    render() {
        const {friend} = this.props;
        return (
            <div>
                <Link className="friends-item" to={`users/${friend._id}`}>
                    <div className="friends-img">
                    <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-pic"
                    />
                    </div>
                    <div className="friends-name">{friend.email}</div>
                </Link>
            </div>
        )
    }
}

export default FriendsListItem;