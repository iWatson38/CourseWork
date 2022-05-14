import React from 'react';
import { IFriendsList } from 'utils/queries/interfaces/Friends/Friends.interface';
import { Friend } from './Friend/Friend.component';

import SFriendsAreaComponent from './FriendsArea.module.scss';

interface IFriendsAreaComponentProps {
    users: IFriendsList['items'];
    className?: string;
}

export const FriendsAreaComponent: React.FC<IFriendsAreaComponentProps> = ({
    users,
    className,
}) => {
    return (
        <div
            className={[className, SFriendsAreaComponent.FriendsArea].join(' ')}
        >
            {users.map((user) => (
                <Friend
                    id={user.vk_id}
                    key={`${user.vk_id}${user.first_name}Friend`}
                    userAvatar={user.photo_100}
                    userName={`${user.first_name} ${user.last_name}`}
                />
            ))}
        </div>
    );
};
