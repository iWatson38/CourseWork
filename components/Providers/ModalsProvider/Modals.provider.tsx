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
                title="???????????????????? ???????????? ?????????????? ???? ?????????????????"
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
                title="??????????????!"
                description="?????????? ????????????????????!"
                onClose={toggleSuccessModal}
            />
            <ResponseModalComponent
                visible={errorModal}
                type={EResponseModalType.ERROR}
                title="??????!"
                description="?????????? ???? ??????????????????????!"
                onClose={toggleErrorModal}
            />
            <LogInOfferModalComponent
                startPartMessage="????????????, ?? ???????????? ?????????? ???????????????? ????????????????, ?????????? ?????????????? ???????????????????????? ??????????????, ???????????? "
                link="????????????????????????????"
                finishPartMessage=". ?????? ???????????????? ?????????????? ????????-???????????? ??????."
                visible={closedFriendModal}
                handleAuthClick={signInRedirect}
                onClose={toogleClosedFriendModal}
            />
            <LogInOfferModalComponent
                startPartMessage="?? ??????????????????, ???????????? ???????? ???? ?????????? ???????????? ?????????????? ???? ??????????, ???? ???? ???????????????? ?????? ????????! ?? ???????? ???????????? "
                link="????????????????????????????"
                finishPartMessage="?????? ???????????????? ???????????? ???? ???????????????? ?????????? ?? ????."
                visible={searchNameModal}
                handleAuthClick={signInRedirect}
                onClose={toogleSearchNameModal}
            />
            <LogInOfferModalComponent
                startPartMessage="???? ????????????????, ?????? ???????? ???????????????????? ?????? ????????????, ????????????????????, "
                link="??????????????????????"
                finishPartMessage=", ?????????? ?????????? ???????????????????????????? ???????????????????? ??????????????."
                visible={logInOfferModal}
                handleAuthClick={signInRedirect}
                onClose={toogleLogInOfferModal}
            />
            <LogInOfferModalComponent
                startPartMessage="???? ????????????????, ?????? ???????? ???????????????????? ?????? ????????????, ????????????????????, "
                link="??????????????????????"
                finishPartMessage=', ?????????? ?????????? ?????????????????????? ?????????????????? ?????????????? ?? "??????????????????".'
                visible={addToFavoritesModal}
                handleAuthClick={signInRedirect}
                onClose={toogleAddToFavoritesModal}
            />
        </ModalsContext.Provider>
    );
};
