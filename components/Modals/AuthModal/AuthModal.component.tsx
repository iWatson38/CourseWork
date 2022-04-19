import { ButtonComponent } from 'components/UI/Button/Button.component';
import React from 'react';
import SModal from '../StandartModal/Modal.module.scss';
import SAuthModalComponent from './AuthModal.module.scss';

interface IAuthModalComponent {
    startPartMessage: string;
    link: string;
    finishPartMessage: string;
    visible: boolean;
    handleAuthClick: () => void;
    onClose?: () => void;
}

export const AuthModalComponent: React.FC<IAuthModalComponent> = ({
    startPartMessage,
    link,
    finishPartMessage,
    visible,
    handleAuthClick,
    onClose,
}) => {
    return (
        <div className={[SModal.Modal, visible && SModal.Visible].join(' ')}>
            <div
                className={[
                    SModal.Content,
                    visible && SModal.ContentVisible,
                    SModal.InformationContent,
                ].join(' ')}
            >
                <p className={SModal.Message}>
                    {startPartMessage}
                    <button
                        className={SAuthModalComponent.AuthButton}
                        onClick={handleAuthClick}
                    >
                        {link}
                    </button>
                    {` ${finishPartMessage}`}
                </p>
                <ButtonComponent
                    className={[SModal.Button, SModal.InformationButton].join(
                        ' ',
                    )}
                    type="submit"
                    onClick={onClose}
                >
                    Ок
                </ButtonComponent>
            </div>
        </div>
    );
};
