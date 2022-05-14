import React from 'react';
import { ButtonComponent } from 'components/UI/Button/Button.component';
import { InputComponent } from 'components/UI/Input/Input.component';
import { useForm } from 'react-hook-form';
import SSearchBlockComponent from './SearchBlock.module.scss';

const Leaf = '/SearchBlock/Leaf.svg';
const SearchIcon = '/SearchBlock/Magnifier.svg';

export interface ISearchFields {
    search: string;
}

interface ISearchBlockComponentProps {
    className?: string;
    onSearch: (values: ISearchFields) => void;
}

export const SearchBlockComponent: React.FC<ISearchBlockComponentProps> = ({
    className,
    onSearch,
}) => {
    const { register, handleSubmit } = useForm<ISearchFields>();

    const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
        e,
    ) => {
        onSearch({ search: e.target.value });
    };

    return (
        <div className={className}>
            <form
                className={SSearchBlockComponent.Form}
                onSubmit={handleSubmit(onSearch)}
            >
                <img
                    className={SSearchBlockComponent.Leaf}
                    src={Leaf}
                    alt="Leaf"
                />
                <div className={SSearchBlockComponent.FormImputContainer}>
                    <InputComponent
                        className={SSearchBlockComponent.FormInput}
                        type="text"
                        styleType="gray"
                        placeholder="Найти ..."
                        iconLeft={SearchIcon}
                        {...register('search')}
                        onChange={
                            typeof window !== 'undefined' &&
                            window.innerWidth > 768
                                ? undefined
                                : handleSearchChange
                        }
                    />
                </div>
                <ButtonComponent
                    className={SSearchBlockComponent.Button}
                    type="submit"
                >
                    Найти
                </ButtonComponent>
            </form>
        </div>
    );
};
