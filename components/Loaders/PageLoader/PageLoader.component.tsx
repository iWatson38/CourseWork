import React from 'react';
import SPageLoaderComponent from './PageLoader.module.scss';

const Spinner = '/small/loaders/spinner.svg';

export const PageLoaderComponent: React.FC = () => {
    return (
        <div className={SPageLoaderComponent.Loader}>
            <img src={Spinner} alt="loader" />
        </div>
    );
};
