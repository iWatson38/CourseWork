import React from 'react';
import Link from 'next/link';
import SBreadcrumbsComponent from './Breadcrumbs.module.scss';

export interface ICrumb {
    name: string;
    path: string;
}

interface IBreadcrumbsComponentProps {
    crumbList: Array<ICrumb>;
    className: string;
}

export const BreadcrumbsComponent: React.FC<IBreadcrumbsComponentProps> = ({
    crumbList,
    className,
}) => {
    return (
        <ul className={[SBreadcrumbsComponent.Breadcrumb, className].join(' ')}>
            <li key="MainCrumb" className={SBreadcrumbsComponent.Crumb}>
                <Link href="/">
                    <a
                        className={[
                            SBreadcrumbsComponent.Link,
                            crumbList.length === 0 &&
                                SBreadcrumbsComponent.Disabled,
                        ].join(' ')}
                    >
                        Главная
                    </a>
                </Link>
                {crumbList.length > 0 && (
                    <div className={SBreadcrumbsComponent.Slash}>/</div>
                )}
            </li>
            {crumbList?.map((crumb, index) => (
                <li
                    key={`${index}Crumb`}
                    className={SBreadcrumbsComponent.Crumb}
                >
                    <Link href={crumb.path}>
                        <a
                            className={[
                                SBreadcrumbsComponent.Link,
                                index === crumbList.length - 1 &&
                                    SBreadcrumbsComponent.Disabled,
                            ].join(' ')}
                        >
                            {crumb.name}
                        </a>
                    </Link>
                    {index !== crumbList.length - 1 && (
                        <div className={SBreadcrumbsComponent.Slash}>/</div>
                    )}
                </li>
            ))}
        </ul>
    );
};
