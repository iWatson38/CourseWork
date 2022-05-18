import React from 'react';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';
import { LabelComponent } from 'components/UI/Label/Label.component';
import { TextAreaComponent } from 'components/UI/TextArea/TextArea.component';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SFeedbackModal from './FeedbackModal.module.scss';
import { usePostFeedbackOnGoodMutation } from 'utils/mutations/Feedback/FeedbackOnGood.mutation';

const Cross = '/FeedbackModal/Сross.svg';

export enum EModalType {
    SUCCESS = 'success',
    ERROR = 'error',
}

interface IFeedbackModalComponentProps {
    className?: string;
    visible: boolean;
    title: string;
    onClose?: () => void;
    id?: number;
    friendId?: number;
    onSuccess?: () => void;
    onError?: () => void;
}

interface IFormFields {
    text: string;
}

const schema = yup.object({
    text: yup.string(),
});

export const FeedbackModalComponent: React.FC<IFeedbackModalComponentProps> = ({
    className,
    visible,
    title,
    onClose,
    id,
    friendId,
    onError,
    onSuccess,
}) => {
    const { mutate, data } = usePostFeedbackOnGoodMutation(
        onSuccess,
        onError,
        onClose,
    );

    const { register, handleSubmit } = useForm<IFormFields>({
        resolver: yupResolver(schema),
    });

    const submit = (values: IFormFields) => {
        if (id && friendId) {
            mutate({
                vk_friend_id: friendId,
                product_id: id,
                text: values.text,
            });
        }
    };

    return (
        <div
            className={[
                className,
                SFeedbackModal.FeedbackModal,
                visible && SFeedbackModal.Visible,
            ].join(' ')}
        >
            <div
                className={[
                    SFeedbackModal.Content,
                    visible && SFeedbackModal.ContentVisible,
                ].join(' ')}
            >
                <ButtonComponent
                    className={SFeedbackModal.Cross}
                    type="submit"
                    styleType={EButtonStyleType.WHITE}
                    onClick={onClose}
                >
                    <img
                        className={SFeedbackModal.CloseIcon}
                        src={Cross}
                        alt="close"
                    />
                </ButtonComponent>

                <p className={SFeedbackModal.Title}>{title}</p>
                <form
                    className={SFeedbackModal.Form}
                    onSubmit={handleSubmit(submit)}
                >
                    <LabelComponent className={SFeedbackModal.Label}>
                        Сообщение:
                        <TextAreaComponent
                            className={SFeedbackModal.FormInput}
                            placeholder="Данный подарок ..."
                            {...register('text')}
                        />
                    </LabelComponent>
                    <ButtonComponent
                        className={SFeedbackModal.Button}
                        type="submit"
                    >
                        Отправить
                    </ButtonComponent>
                </form>
            </div>
        </div>
    );
};
