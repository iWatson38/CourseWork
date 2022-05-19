import Script from 'next/script';

interface IShareBlockComponent {
    className?: string;
}

export const ShareBlockComponent: React.FC<IShareBlockComponent> = ({
    className,
}) => {
    return (
        <>
            <Script
                src="https://yastatic.net/share2/share.js"
                strategy="afterInteractive"
            />
            <div
                className={['ya-share2', className].join(' ')}
                data-curtain
                data-services="vkontakte,odnoklassniki,telegram,whatsapp"
            />
        </>
    );
};
