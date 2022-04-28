import React from 'react';
import SRangeSliderComponent from './RangeSlider.module.scss';
import { LRangeSliderComponent } from './RangeSlider.logic';

export interface IRangeSliderProps {
    min: number;
    max: number;
    currency: string;
    onChange?: (newValue: [string, string]) => void;
}

export interface IRangeSliderRef {
    reset: () => void;
}

export const RangeSliderComponent = React.forwardRef<
    IRangeSliderRef,
    IRangeSliderProps
>(({ min, max, currency, onChange }, ref) => {
    const {
        handleStartMove,
        leftDvider,
        leftKnob,
        rightDvider,
        rightKnob,
        track,
        valueInPercent,
    } = LRangeSliderComponent({
        min,
        max,
        onChange,
        ref,
    });

    return (
        <div ref={track} className={SRangeSliderComponent.RangeSlider}>
            <div
                tabIndex={0}
                ref={leftKnob}
                aria-valuenow={valueInPercent[0]}
                role="slider"
                onMouseDown={(e) => handleStartMove(e, 'left')}
                onTouchMove={(e) => handleStartMove(e, 'left')}
                className={SRangeSliderComponent.Knob}
            >
                <span
                    className={[
                        SRangeSliderComponent.KnobValue,
                        SRangeSliderComponent.MinKnobValue,
                    ].join(' ')}
                >
                    {Math.round(
                        ((max - min) / 100) * valueInPercent[0] + min,
                    ).toLocaleString('ru-Ru')}
                    {currency}
                </span>
            </div>
            <div ref={leftDvider} className={SRangeSliderComponent.Dvider} />

            <div className={SRangeSliderComponent.ProgressLine} />

            <div
                tabIndex={0}
                ref={rightKnob}
                aria-valuenow={valueInPercent[1]}
                role="slider"
                onMouseDown={(e) => handleStartMove(e, 'right')}
                onTouchMove={(e) => handleStartMove(e, 'right')}
                className={[
                    SRangeSliderComponent.Knob,
                    SRangeSliderComponent.KnobRight,
                ].join(' ')}
            >
                <span
                    className={[
                        SRangeSliderComponent.KnobValue,
                        SRangeSliderComponent.MaxKnobValue,
                    ].join(' ')}
                >
                    {Math.round(
                        ((max - min) / 100) * valueInPercent[1] + min,
                    ).toLocaleString('ru-Ru')}
                    {currency}
                </span>
            </div>
            <div ref={rightDvider} className={SRangeSliderComponent.Dvider} />
        </div>
    );
});
