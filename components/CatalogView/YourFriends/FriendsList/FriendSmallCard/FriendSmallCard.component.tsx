import React from 'react';

import SFriendSmallCard from './FriendSmallCard.module.scss';

interface IFriendSmallCardProps {
    userAvatar: string;
    userName: string;
    onClick?: () => void;
}

export const FriendSmallCardComponent: React.FC<IFriendSmallCardProps> = ({
    userAvatar,
    userName,
    onClick,
}) => (
    <div
        className={SFriendSmallCard.FriendSmallCardContainer}
        onClick={onClick}
        role="presentation"
    >
        <img
            className={SFriendSmallCard.Avatar}
            src={userAvatar}
            alt="Avatar"
        />
        <p className={SFriendSmallCard.UserName}>{userName}</p>
    </div>
);
