import { useEffect, useState } from 'react';

export const UseBodyClick = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleIsActive = () => {
        setIsActive((prev) => !prev);
    };

    const handleClose = () => {
        if (isActive) {
            toggleIsActive();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClose);
        return () => {
            document.removeEventListener('click', handleClose);
        };
    }, [handleClose]);

    return {
        isActive,
        toggleIsActive,
    };
};
