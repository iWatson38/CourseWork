import React from 'react';
import SLoaderComponent from './Loader.module.scss';

const Spinner = '/small/loaders/spinner.svg';

interface ILoaderComponentProps {
    visible: boolean;
}

export const LoaderComponent: React.FC<ILoaderComponentProps> = ({
    visible,
}) => {
    return (
        <div
            className={[
                SLoaderComponent.LoaderContainer,
                visible && SLoaderComponent.Visible,
            ].join(' ')}
        >
            <img
                src={Spinner}
                alt="loader"
                className={SLoaderComponent.Spinner}
            />
        </div>
    );
};
