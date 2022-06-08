import React from 'react';
import SCommon from 'styles/Common.module.scss';
import SLinksRulesProtectionInformation from './LinksRulesProtectionInformation.module.scss';

interface ILinksRulesProtectionInformationProps {
    className?: string;
}

export const LinksRulesProtectionInformation: React.FC<
    ILinksRulesProtectionInformationProps
> = ({ className }) => {
    return (
        <ul
            className={[
                className,
                SLinksRulesProtectionInformation.InformationForUser,
                SCommon.Container,
            ].join(' ')}
        >
            <li className={SLinksRulesProtectionInformation.LeftGridArea}>
                <a
                    className={SLinksRulesProtectionInformation.LinkForUser}
                    href="/privacy"
                >
                    <span
                        className={
                            SLinksRulesProtectionInformation.LinkUnderLine
                        }
                    >
                        Правила защиты информации о пользователях сайта
                    </span>
                </a>
            </li>

            <li
                className={[
                    SLinksRulesProtectionInformation.CopyRight,
                    SLinksRulesProtectionInformation.CenterGridArea,
                ].join(' ')}
            >
                Все права защищены 2021
            </li>
            <li className={SLinksRulesProtectionInformation.BottomGridArea}>
                <a
                    className={SLinksRulesProtectionInformation.LinkForUser}
                    href="https://capu.st/shaman.to"
                >
                    <span
                        className={
                            SLinksRulesProtectionInformation.LinkUnderLine
                        }
                    >
                        Поддержать проект
                    </span>
                </a>
            </li>
            <li className={SLinksRulesProtectionInformation.RightGridArea}>
                <a
                    className={SLinksRulesProtectionInformation.LinkForUser}
                    href="/terms"
                >
                    <span
                        className={
                            SLinksRulesProtectionInformation.LinkUnderLine
                        }
                    >
                        Пользователькое соглашение
                    </span>
                </a>
            </li>
        </ul>
    );
};
