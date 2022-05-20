import React from 'react';
import { InputComponent } from 'components/UI/Input/Input.component';
import { FriendsContainerComponent } from 'components/Layout/FriendContainer/FriendsContainer.component';
import SYourFriends from './YourFriends.module.scss';
import { FriendSmallCardComponent } from './FriendsList/FriendSmallCard/FriendSmallCard.component';
import { IFriends } from 'utils/queries/Friends/Friends.types';
import { useRouter } from 'next/router';

const SearchIcon = '/SearchBlock/Magnifier.svg';

interface IYourFriendsComponentProps {
    isAuth: boolean;
    friends?: IFriends['items'];
    onLoadMore: () => void;
    onSearch: (val: string) => void;
    setLoader?: () => void;
}

export const YourFriendsComponent: React.FC<IYourFriendsComponentProps> = ({
    isAuth,
    friends,
    onLoadMore,
    onSearch,
    setLoader,
}) => {
    const router = useRouter();

    const computedFriendName = (name: string) => {
        return name;
    };

    const handleChooseFriend = (vk_friend_id: number) => {
        setLoader && setLoader();
        router.push(`/catalog/${vk_friend_id}`, undefined, { scroll: false });
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <FriendsContainerComponent isAuth={isAuth} onLoadMore={onLoadMore}>
            <div className={SYourFriends.InputContainer}>
                <InputComponent
                    className={SYourFriends.FormInput}
                    type="text"
                    styleType="gray"
                    placeholder="Найти ..."
                    iconLeft={SearchIcon}
                    onChange={handleOnChange}
                />
            </div>
            <div>
                {friends?.map((friend) => (
                    <FriendSmallCardComponent
                        key={`${friend.vk_id}FriendSmallCardComponent`}
                        userAvatar={friend.photo_100}
                        userName={computedFriendName(
                            `${friend.first_name} ${friend.last_name}`,
                        )}
                        onClick={() => handleChooseFriend(friend.vk_id)}
                    />
                ))}
            </div>
        </FriendsContainerComponent>
    );
};
