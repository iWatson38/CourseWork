import React from 'react';
import SCommon from 'styles/Common.module.scss';
import SFooterComponent from './Footer.module.scss';
import { LinksRulesProtectionInformation } from 'components/Layout/LinksRulesProtectionInformation/LinksRulesProtectionInformation.component';

const VKIcon = '/small/social/Vk.svg';
const TelegramIcon = '/small/social/Telegram.svg';
const FooterBackground = '/Footer/FooterBackground.svg';

interface IFooterComponentProps {
    className?: string;
}

export const FooterComponent: React.FC<IFooterComponentProps> = ({
    className,
}) => (
    <footer className={[className, SFooterComponent.Footer].join(' ')}>
        <img
            className={SFooterComponent.FooterBackground}
            src={FooterBackground}
            alt="background"
        />
        <div
            className={[SFooterComponent.FooterContent, SCommon.Container].join(
                ' ',
            )}
        >
            <ul
                className={[
                    SFooterComponent.FooterList,
                    SCommon.Container,
                ].join(' ')}
            >
                <li className={SFooterComponent.FooterItem}>
                    <h4 className={SFooterComponent.FooterTitle}>О нас</h4>
                    <p className={SFooterComponent.FooterDescription}>
                        Шаман помогает тысячам людей найти подарки для своих
                        коллег, друзей и близких. Но на данный момент проект
                        находится на стадии бета-тестировании. Будем благодарны
                        за вашу обратную связь.
                    </p>
                </li>
                <li className={SFooterComponent.FooterItem}>
                    <h4 className={SFooterComponent.FooterTitle}>Почта</h4>
                    <a
                        href="mailto:info@shaman.to"
                        className={SFooterComponent.FooterLink}
                        rel="noreferrer"
                    >
                        info@shaman.to
                    </a>
                </li>
                <li className={SFooterComponent.FooterItem}>
                    <h4 className={SFooterComponent.FooterTitle}>
                        Подпишитесь
                    </h4>
                    <ul className={SFooterComponent.Social}>
                        <li>
                            <a
                                className={SFooterComponent.FooterLink}
                                href="https://vk.com/shamanto"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className={SFooterComponent.VkIcon}
                                    src={VKIcon}
                                    alt="vk"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                className={SFooterComponent.FooterLink}
                                href="https://t.me/shaman_podarki"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className={SFooterComponent.TelegramIcon}
                                    src={TelegramIcon}
                                    alt="telegram"
                                />
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div className={SFooterComponent.Line} />
        <LinksRulesProtectionInformation
            className={SFooterComponent.InformationForUser}
        />
    </footer>
);
