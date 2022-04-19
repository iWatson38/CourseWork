import SSearchBlockComponent from './SearchBlock.module.scss';
import { useForm } from 'react-hook-form';
import { InputComponent } from 'components/UI/Input/Input.component';
import { ButtonComponent } from 'components/UI/Button/Button.component';

const Leaf = '/SearchBlock/Leaf.svg';
const SearchIcon = '/SearchBlock/Magnifier.svg';
const LogoVK = '/SearchBlock/LogoVK.svg';
const Gift = '/SearchBlock/Gift.svg';

export interface ISearchFields {
    [link: string]: string;
}

interface ISearchBlockComponentProps {
    className?: string;
    onSearch: (value: ISearchFields) => void;
}

export const SearchBlockComponent: React.FC<ISearchBlockComponentProps> = ({
    className,
    onSearch,
}) => {
    const { register, handleSubmit, reset } = useForm();
    const searchFriend = (values: ISearchFields) => {
        onSearch(values);
        reset();
    };

    return (
        <form
            className={[className, SSearchBlockComponent.Form].join(' ')}
            onSubmit={handleSubmit(searchFriend)}
        >
            <img className={SSearchBlockComponent.Leaf} src={Leaf} alt="Leaf" />
            <div className={SSearchBlockComponent.FormImputContainer}>
                <InputComponent
                    className={SSearchBlockComponent.FormInput}
                    type="text"
                    styleType="gray"
                    iconLeft={SearchIcon}
                    {...register('link')}
                />
            </div>
            <ButtonComponent
                className={SSearchBlockComponent.Button}
                type="submit"
            >
                Найти
            </ButtonComponent>
            <div
                className={[
                    SSearchBlockComponent.Hint,
                    SSearchBlockComponent.Instruction,
                ].join(' ')}
            >
                <img src={LogoVK} alt="vk" />
                <p>Укажите ник друга в ВК или ссылку на его профиль</p>
            </div>
        </form>
    );
};
