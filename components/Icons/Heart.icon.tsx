import React from 'react';

interface IHeartIconProps {
    className?: string;
    strokeColor?: string;
    onClick?: () => void;
}

export const HeartIcon: React.FC<IHeartIconProps> = ({
    className,
    strokeColor = '#C9D1D1',
    onClick,
}) => (
    <svg
        className={className}
        onClick={onClick}
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13 26L12.5412 25.5623C2.67647 16.3704 0 13.1313 0 7.87879C0 3.50168 3.05882 0 6.88235 0C10.0176 0 11.7765 2.01347 13 3.58923C14.2235 2.01347 15.9824 0 19.1176 0C22.9412 0 26 3.50168 26 7.87879C26 13.1313 23.3235 16.3704 13.4588 25.5623L13 26ZM6.88235 1.75084C3.9 1.75084 1.52941 4.46465 1.52941 7.87879C1.52941 12.3434 3.97647 15.3199 13 23.7239C22.0235 15.3199 24.4706 12.3434 24.4706 7.87879C24.4706 4.46465 22.1 1.75084 19.1176 1.75084C16.4412 1.75084 14.9882 3.58923 13.8412 5.07744L13 6.21549L12.1588 5.07744C11.0118 3.58923 9.55882 1.75084 6.88235 1.75084Z"
            fill={strokeColor}
        />
    </svg>
);
