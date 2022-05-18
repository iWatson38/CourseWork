import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';
import SErrorView from './404.module.scss';
import SCommon from 'styles/Common.module.scss';

const Illustration = '/404/MainBg.svg';
const Logo = '/404/ShamanLogo.svg';

const MainView: React.FC = () => {
    const router = useRouter();

    const handleNavigateToHome = () => {
        router.push('/');
    };

    return (
        <div className={SErrorView.Main}>
            <div className={SCommon.Container}>
                <header className={SErrorView.Header}>
                    <Link href={'/'}>
                        <a>
                            <img
                                src={Logo}
                                alt="Шаман: умный поиск подарков для друзей"
                            />
                        </a>
                    </Link>
                </header>
                <img
                    className={SErrorView.Illustration}
                    src={Illustration}
                    alt="Illustration"
                />
                <div className={SErrorView.ActionBlock}>
                    <h3 className={SErrorView.Title}>
                        Oops... У нас почти получилось справиться!
                    </h3>
                    <ButtonComponent
                        onClick={handleNavigateToHome}
                        styleType={EButtonStyleType.WHITE}
                        className={SErrorView.Button}
                    >
                        На главную
                    </ButtonComponent>
                </div>
            </div>
        </div>
    );
};

export default MainView;
