import React from 'react';
import SCommon from 'styles/Common.module.scss';
import { MenuConstant } from 'constants/Menu.constant';
import { useAuth } from 'components/Providers/AuthProvider/Auth.provider';
import { RequestSurveyComponent } from 'components/Layout/RequestSurvey/RequestSurvey.component';
import { FooterComponent } from '../Footer/Footer.component';
import { NavBarComponent } from '../NavBar/NavBar.component';

export const MainLayoutComponent: React.FC = ({ children }) => {
    const { isAuth } = useAuth();

    return (
        <>
            <NavBarComponent
                className={SCommon.Container}
                menuItems={MenuConstant(isAuth)}
            />
            <RequestSurveyComponent />

            {children}
            <FooterComponent />
        </>
    );
};
