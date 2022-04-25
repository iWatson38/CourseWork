import React from 'react';
import SCommon from 'styles/Common.module.scss';
import { MenuConstant } from 'constants/Menu.constant';
import { RequestSurveyComponent } from 'components/Layout/RequestSurvey/RequestSurvey.component';
import { FooterComponent } from '../Footer/Footer.component';
import { NavBarComponent } from '../NavBar/NavBar.component';

interface IMainLayoutComponent {
    isAuth?: boolean;
    children: React.ReactNode;
}

export const MainLayoutComponent: React.FC<IMainLayoutComponent> = ({
    isAuth,
    children,
}) => {
    return (
        <>
            <NavBarComponent
                isAuth={isAuth || false}
                className={SCommon.Container}
                menuItems={MenuConstant(isAuth || false)}
            />
            <RequestSurveyComponent />

            {children}
            <FooterComponent />
        </>
    );
};
