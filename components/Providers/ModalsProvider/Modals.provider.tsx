import { FeedbackModalComponent } from 'components/Modals/FeedbackModal/FeedbackModal.component';
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
    toogleLogInOfferModal: () => void;
};
const ModalsContext = createContext<TModalsContext>({
    toggleErrorModal: noop,
    toggleFeedbackModal: noop,
    toggleSuccessModal: noop,
    toogleLogInOfferModal: noop,
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
    const { isAuth } = useAuth();

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

    const [logInOfferModal, setLogInOfferModal] = useState(false);
    const toogleLogInOfferModal = () => {
        if (!isAuth) {
            setLogInOfferModal((prev) => !prev);
        }
    };

    const context = {
        toggleErrorModal,
        toggleSuccessModal,
        toggleFeedbackModal,
        toogleLogInOfferModal,
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
        </ModalsContext.Provider>
    );
};
