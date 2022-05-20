import React from 'react';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';
import SFriend from './Friend.module.scss';

const GiftIcon = '/Friend/Gift.svg';
const GiftIconActive = '/GoodCard/WhiteGift.svg';

interface IFriendProps {
    userAvatar: string;
    userName: string;
    id: number;
    setVisibleLoader: () => void;
}

export const Friend: React.FC<IFriendProps> = ({
    userAvatar,
    userName,
    id,
    setVisibleLoader,
}) => {
    const handleSearchGoods = () => {
        setVisibleLoader();
        window.location.pathname = `/catalog/${id}`;
    };

    return (
        <div className={SFriend.FriendContainer}>
            <img className={SFriend.Avatar} src={userAvatar} alt="Avatar" />
            <p className={SFriend.UserName}>{userName}</p>
            <ButtonComponent
                className={SFriend.Button}
                type="submit"
                styleType={EButtonStyleType.OUTLINED}
                onClick={handleSearchGoods}
            >
                Найти подарок
            </ButtonComponent>
            <ButtonComponent
                className={SFriend.MobileButton}
                styleType={EButtonStyleType.WHITE}
                onClick={handleSearchGoods}
            >
                Найти
                <img className={SFriend.GiftIcon} src={GiftIcon} alt="Gift" />
                <img
                    className={SFriend.GiftIconActive}
                    src={GiftIconActive}
                    alt="Gift"
                />
            </ButtonComponent>
        </div>
    );
};
