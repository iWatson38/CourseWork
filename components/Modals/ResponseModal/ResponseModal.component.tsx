import React from 'react';
import { ButtonComponent } from 'components/UI/Button/Button.component';
import SResponseModal from './ResponseModal.module.scss';

const Success = '/ResponseModal/Success.svg';
const Error = '/ResponseModal/Error.svg';

export enum EResponseModalType {
    SUCCESS = 'success',
    ERROR = 'error',
}

interface IResponseModalComponentProps {
    visible: boolean;
    type?: EResponseModalType;
    title?: string;
    description: string;
    onClose?: () => void;
}

export const ResponseModalComponent: React.FC<IResponseModalComponentProps> = ({
    visible,
    type,
    title,
    description,
    onClose,
}) => (
    <div
        className={[
            SResponseModal.Modal,
            visible && SResponseModal.Visible,
        ].join(' ')}
    >
        <div
            className={[
                SResponseModal.Content,
                visible && SResponseModal.ContentVisible,
            ].join(' ')}
        >
            {type === EResponseModalType.SUCCESS && (
                <img
                    className={SResponseModal.Image}
                    src={Success}
                    alt="succes"
                />
            )}
            {type === EResponseModalType.ERROR && (
                <img className={SResponseModal.Image} src={Error} alt="error" />
            )}
            <div
                className={[
                    type === EResponseModalType.SUCCESS && SResponseModal.Green,
                    type === EResponseModalType.ERROR && SResponseModal.Red,
                ].join(' ')}
            >
                <p className={SResponseModal.Message}>{title}</p>
                <p className={SResponseModal.Message}>{description}</p>
            </div>
            <ButtonComponent
                className={SResponseModal.Button}
                type="submit"
                onClick={onClose}
            >
                Ок
            </ButtonComponent>
        </div>
    </div>
);
