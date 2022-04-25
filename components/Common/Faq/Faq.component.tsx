import { IFaqResponse } from 'utils/queries/interfaces/Faq/Faq.interface';
import React, { useState } from 'react';
import { AccordionItem } from './AccordionItem/AccordionItem.component';

import SFaqComponent from './Faq.module.scss';

interface IFaqComponentProps {
    faq?: IFaqResponse['data'];
    className?: string;
}

export function FaqComponent({ faq, className }: IFaqComponentProps) {
    const [activeItems, setActiveItems] = useState<Array<number>>([]);

    const handleToggleElement = (element: number) => {
        const index = activeItems.findIndex((item) => item === element);
        if (index === -1) {
            setActiveItems((prev) => [...prev, element]);
        } else {
            const repl = [...activeItems];
            repl.splice(index, 1);
            setActiveItems(repl);
        }
    };

    return (
        <div id="faq" className={[className, SFaqComponent.Faq].join(' ')}>
            <h4 className={SFaqComponent.Title}>Есть вопросы?</h4>
            <p className={SFaqComponent.Description}>
                Предлагаем посмотреть часто задаваемые вопросы
            </p>
            <ul className={SFaqComponent.Accordion}>
                {faq?.map((question, index) => (
                    <AccordionItem
                        key={question.id}
                        index={index + 1}
                        isActive={activeItems.includes(index + 1)}
                        title={question.question}
                        value={question.answer}
                        handleToggle={handleToggleElement}
                    />
                ))}
            </ul>
        </div>
    );
}
