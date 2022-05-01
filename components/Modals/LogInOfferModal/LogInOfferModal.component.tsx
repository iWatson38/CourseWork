import { ButtonComponent } from 'components/UI/Button/Button.component';
import React from 'react';
import SResponseModal from '../ResponseModal/ResponseModal.module.scss';
import SLogInOfferModalComponent from './LogInOfferModal.module.scss';

interface ILogInOfferModal {
    startPartMessage: string;
    link: string;
    finishPartMessage: string;
    visible: boolean;
    handleAuthClick: () => void;
    onClose?: () => void;
}

export const LogInOfferModalComponent: React.FC<ILogInOfferModal> = ({
    startPartMessage,
    link,
    finishPartMessage,
    visible,
    handleAuthClick,
    onClose,
}) => {
    return (
        <div
            className={[
                SResponseModal.Modal,
                visible && SResponseModal.Visible,
            ].join(' ')}
        >
            <div
                className={[
                    SResponseModal.Content,
                    SLogInOfferModalComponent.Content,
                    visible && SResponseModal.ContentVisible,
                ].join(' ')}
            >
                <p className={SResponseModal.Message}>
                    {startPartMessage}
                    <button
                        className={SLogInOfferModalComponent.AuthButton}
                        onClick={handleAuthClick}
                    >
                        {link}
                    </button>
                    {` ${finishPartMessage}`}
                </p>
                <ButtonComponent
                    className={SLogInOfferModalComponent.Button}
                    type="submit"
                    onClick={onClose}
                >
                    Ок
                </ButtonComponent>
            </div>
        </div>
    );
};
