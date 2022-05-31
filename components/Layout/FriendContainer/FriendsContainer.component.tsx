import React from 'react';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';
import { UseBodyClick } from 'hooks/BodyClick.hook';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import SFiendsContainer from './FriendsContainer.module.scss';

const Arrow = '/YourFriends/Arrow.svg';
const SmallArrow = '/YourFriends/SmallArrow.svg';

interface IFiendsContainerComponentProps {
    isAuth: boolean;
    onLoadMore?: () => void;
}

export const FriendsContainerComponent: React.FC<
    IFiendsContainerComponentProps
> = ({ isAuth, onLoadMore, children }) => {
    const { isActive, toggleIsActive } = UseBodyClick();

    return (
        <div className={SFiendsContainer.YourfriendsPlace}>
            <div className={SFiendsContainer.YourFriendsContainer}>
                <div
                    className={[
                        SFiendsContainer.YourFriendsArea,
                        isActive && SFiendsContainer.ActiveYourFriendsArea,
                    ].join(' ')}
                >
                    <ButtonComponent
                        className={SFiendsContainer.ButtonFriends}
                        type="submit"
                        styleType={EButtonStyleType.WHITE}
                        onClick={
                            !isActive
                                ? (e) => {
                                      e.stopPropagation();
                                      toggleIsActive();
                                  }
                                : undefined
                        }
                    >
                        <img
                            className={SFiendsContainer.SmallArrow}
                            src={SmallArrow}
                            alt="arrow"
                        />
                    </ButtonComponent>
                    <p className={SFiendsContainer.Title}>Ваши друзья</p>
                    <div
                        className={[
                            SFiendsContainer.HiddenContent,
                            isActive && SFiendsContainer.Visible,
                        ].join(' ')}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        role="presentation"
                    >
                        {children}
                    </div>
                    {isAuth === true && (
                        <ButtonComponent
                            onClick={onLoadMore || undefined}
                            className={SFiendsContainer.Button}
                        >
                            <img src={Arrow} alt="Arrow" />
                        </ButtonComponent>
                    )}
                </div>
            </div>
        </div>
    );
};
