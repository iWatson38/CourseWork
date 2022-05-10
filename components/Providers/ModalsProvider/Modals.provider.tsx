import { FeedbackModalComponent } from 'components/Modals/FeedbackModal/FeedbackModal.component';
import { LogInOfferModalComponent } from 'components/Modals/LogInOfferModal/LogInOfferModal.component';
import {
    EResponseModalType,
    ResponseModalComponent,
} from 'components/Modals/ResponseModal/ResponseModal.component';
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../AuthProvider/Auth.provider';

const noop = () => {
    debugger;
};

export type TModalsContext = {
    toggleErrorModal: () => void;
    toggleSuccessModal: () => void;
    toggleFeedbackModal: (
        id: number,
        friendId: number,
        onSuccess: () => void,
        onError: () => void,
    ) => void;
    toogleClosedFriendModal: () => void;
    toogleSearchNameModal: () => void;
    toogleLogInOfferModal: () => void;
    toogleAddToFavoritesModal: () => void;
};
const ModalsContext = createContext<TModalsContext>({
    toggleErrorModal: noop,
    toggleFeedbackModal: noop,
    toggleSuccessModal: noop,
    toogleClosedFriendModal: noop,
    toogleSearchNameModal: noop,
    toogleLogInOfferModal: noop,
    toogleAddToFavoritesModal: noop,
});

export const useModals = () => {
    return useContext(ModalsContext);
};

interface IFeedbackModalState {
    visible: boolean;
    id?: number;
    friendId?: number;
    onSuccess?: () => void;
    onError?: () => void;
}

export const ModalsProvider: React.FC = ({ children }) => {
    const { isAuth, signInRedirect } = useAuth();

    const [errorModal, setErrorModal] = useState(false);
    const toggleErrorModal = () => {
        setErrorModal((prev) => !prev);
    };

    const [successModal, setSuccessModal] = useState(false);
    const toggleSuccessModal = () => {
        setSuccessModal((prev) => !prev);
    };

    const [feedbackModal, setFeedbackModal] = useState<IFeedbackModalState>({
        visible: false,
    });
    const toggleFeedbackModal = (
        id?: number,
        friendId?: number,
        onSuccess?: () => void,
        onError?: () => void,
    ) => {
        setFeedbackModal((prev) => ({
            visible: !prev.visible,
            id,
            friendId,
            onError,
            onSuccess,
        }));
    };

    const [closedFriendModal, setClosedFriendModal] = useState(false);
    const toogleClosedFriendModal = () => {
        setClosedFriendModal((prev) => !prev);
    };

    const [searchNameModal, setSearchNameModal] = useState(false);
    const toogleSearchNameModal = () => {
        setSearchNameModal((prev) => !prev);
    };

    const [logInOfferModal, setLogInOfferModal] = useState(false);
    const toogleLogInOfferModal = () => {
        setLogInOfferModal((prev) => !prev);
    };

    const [addToFavoritesModal, setAddToFavoritesModal] = useState(false);
    const toogleAddToFavoritesModal = () => {
        if (!isAuth) {
            setAddToFavoritesModal((prev) => !prev);
        }
    };

    const context = {
        toggleErrorModal,
        toggleSuccessModal,
        toggleFeedbackModal,
        toogleClosedFriendModal,
        toogleSearchNameModal,
        toogleLogInOfferModal,
        toogleAddToFavoritesModal,
    };

    return (
        <ModalsContext.Provider value={context}>
            {children}
            <FeedbackModalComponent
                title="Расскажите почему подарок не подходит?"
                onClose={toggleFeedbackModal}
                visible={feedbackModal.visible}
                id={feedbackModal.id}
                friendId={feedbackModal.friendId}
                onError={feedbackModal.onError}
                onSuccess={feedbackModal.onSuccess}
            />
            <ResponseModalComponent
                visible={successModal}
                type={EResponseModalType.SUCCESS}
                title="Спасибо!"
                description="Форма отправлена!"
                onClose={toggleSuccessModal}
            />
            <ResponseModalComponent
                visible={errorModal}
                type={EResponseModalType.ERROR}
                title="Упс!"
                description="Форма не отправилась!"
                onClose={toggleErrorModal}
            />
            <LogInOfferModalComponent
                startPartMessage="Прости, у твоего друга закрытая страница, чтобы увидеть предложенные подарки, можешь "
                link="авторизоваться"
                finishPartMessage=". Или посмотри подарок кому-нибудь ещё."
                visible={closedFriendModal}
                handleAuthClick={signInRedirect}
                onClose={toogleClosedFriendModal}
            />
            <LogInOfferModalComponent
                startPartMessage="К сожалению, сервис пока не умеет искать подарки по имени, но мы работаем над этим! А пока можешь "
                link="авторизоваться"
                finishPartMessage="или вставить ссылку на страницу друга в ВК."
                visible={searchNameModal}
                handleAuthClick={signInRedirect}
                onClose={toogleSearchNameModal}
            />
            <LogInOfferModalComponent
                startPartMessage="Мы надеемся, что тебе понравился наш сервис, пожалуйста, "
                link="авторизуйся"
                finishPartMessage=", чтобы иметь неограниченное количество поисков."
                visible={logInOfferModal}
                handleAuthClick={signInRedirect}
                onClose={toogleLogInOfferModal}
            />
            <LogInOfferModalComponent
                startPartMessage="Мы надеемся, что тебе понравился наш сервис, пожалуйста, "
                link="авторизуйся"
                finishPartMessage=', чтобы иметь возможность добавлять подарки в "Избранное".'
                visible={addToFavoritesModal}
                handleAuthClick={signInRedirect}
                onClose={toogleAddToFavoritesModal}
            />
        </ModalsContext.Provider>
    );
};
