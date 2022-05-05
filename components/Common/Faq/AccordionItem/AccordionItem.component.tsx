import React, { useRef } from 'react';
import SAccordionItem from './AccordionItem.module.scss';

const Plus = 'Faq/Plus.svg';
const Minus = 'Faq/Minus.svg';

interface IAccordionItemProps {
    index: number;
    title: string;
    value: string;
    isActive: boolean;
    handleToggle: (element: number) => void;
}

export const AccordionItem: React.FC<IAccordionItemProps> = ({
    index,
    isActive,
    title,
    value,
    handleToggle,
}) => {
    const elemRef = useRef<HTMLLIElement>(null);

    return (
        <li
            ref={elemRef}
            className={[SAccordionItem.AccordionItem].join(' ')}
            style={{
                maxHeight: isActive ? elemRef.current?.scrollHeight : undefined,
            }}
            onClick={() => handleToggle(index)}
            onKeyPress={() => handleToggle(index)}
            role="presentation"
        >
            <div className={SAccordionItem.AccordionItemTitle}>
                {index}. {title}
                <img
                    className={SAccordionItem.ItemIcon}
                    src={isActive ? Minus : Plus}
                    alt="Toggle Accordion"
                />
            </div>
            <div className={SAccordionItem.AccordionItemDescription}>
                {value}
            </div>
        </li>
    );
};
