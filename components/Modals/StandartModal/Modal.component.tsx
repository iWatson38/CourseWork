import React from 'react';
import { ButtonComponent } from 'components/UI/Button/Button.component';
import SModal from './Modal.module.scss';

const Success = '/Modal/Success.svg';
const Error = '/Modal/Error.svg';

export enum EModalType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFORMATION = 'information',
}

interface IModalComponentProps {
    visible: boolean;
    type?: EModalType;
    title?: string;
    description: string;
    onClose?: () => void;
}

export const ModalComponent: React.FC<IModalComponentProps> = ({
    visible,
    type,
    title,
    description,
    onClose,
}) => (
    <div className={[SModal.Modal, visible && SModal.Visible].join(' ')}>
        <div
            className={[
                SModal.Content,
                visible && SModal.ContentVisible,
                type === EModalType.INFORMATION && SModal.InformationContent,
            ].join(' ')}
        >
            {type === EModalType.SUCCESS && (
                <img className={SModal.Image} src={Success} alt="succes" />
            )}
            {type === EModalType.ERROR && (
                <img className={SModal.Image} src={Error} alt="error" />
            )}
            <div
                className={[
                    type === EModalType.SUCCESS && SModal.Green,
                    type === EModalType.ERROR && SModal.Red,
                ].join(' ')}
            >
                <p className={SModal.Message}>{title}</p>
                <p className={SModal.Message}>{description}</p>
            </div>
            <ButtonComponent
                className={[
                    SModal.Button,
                    type === EModalType.INFORMATION && SModal.InformationButton,
                ].join(' ')}
                type="submit"
                onClick={onClose}
            >
                Ок
            </ButtonComponent>
        </div>
    </div>
);
