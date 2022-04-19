import React from 'react';
import SRequestSurveyComponent from './RequestSurvey.module.scss';

interface IRequestSurveyComponent {
    className?: string;
}

export const RequestSurveyComponent: React.FC<IRequestSurveyComponent> = ({
    className,
}) => {
    return (
        <div
            className={[
                SRequestSurveyComponent.RequestSurveyContainer,
                className,
            ].join(' ')}
        >
            <p className={SRequestSurveyComponent.RequestSurvey}>
                Проект находится на стадии бета-тестирования. Будем благодарны
                за вашу{' '}
                <a
                    className={SRequestSurveyComponent.SurveyLink}
                    href="https://docs.google.com/forms/d/e/1FAIpQLScdsh3YZkHEuicnPDsxp2ouX_usZ9iVZzXRXRxirxzhuPBTeg/viewform"
                >
                    обратную связь
                </a>
                , она помогает нам в развитии сервиса!
            </p>
        </div>
    );
};
