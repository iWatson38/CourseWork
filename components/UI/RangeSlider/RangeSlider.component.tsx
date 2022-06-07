import React, { useEffect, useRef, useState } from 'react';
import SRangeSliderComponent from './RangeSlider.module.scss';
import { LRangeSliderComponent } from './RangeSlider.logic';
import { InputComponent } from '../Input/Input.component';

export interface IRangeSliderProps {
    min: number;
    max: number;
    currency: string;
    onChange?: (newValue: [string, string]) => void;
    resetStatus: boolean;
    setResetStatus: (state: boolean) => void;
}

export interface IRangeSliderRef {
    reset: () => void;
}

export const RangeSliderComponent = React.forwardRef<
    IRangeSliderRef,
    IRangeSliderProps
>(({ min, max, currency, onChange, resetStatus, setResetStatus }, ref) => {
    const {
        handleStartMove,
        leftDvider,
        leftKnob,
        rightDvider,
        rightKnob,
        track,
        valueInPercent,
        handleMinInputOnChange,
        handleMaxinputOnBlur,
        handleMaxInputOnChange,
        rangeInPercent,
    } = LRangeSliderComponent({
        min,
        max,
        ref,
        resetStatus,
        setResetStatus,
        onChange,
    });

    return (
        <>
            <div ref={track} className={SRangeSliderComponent.RangeSlider}>
                <div
                    tabIndex={0}
                    ref={leftKnob}
                    aria-valuenow={valueInPercent[0]}
                    role="slider"
                    onMouseDown={(e) => handleStartMove(e, 'left')}
                    onTouchMove={(e) => handleStartMove(e, 'left')}
                    className={SRangeSliderComponent.Knob}
                ></div>
                <div
                    ref={leftDvider}
                    className={SRangeSliderComponent.Dvider}
                />

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
                ></div>
                <div
                    ref={rightDvider}
                    className={SRangeSliderComponent.Dvider}
                />
            </div>
            <div className={SRangeSliderComponent.InputsArea}>
                <div className={SRangeSliderComponent.InputContainer}>
                    От:
                    <InputComponent
                        type="number"
                        styleType="gray"
                        className={SRangeSliderComponent.RangeInput}
                        value={rangeInPercent.min}
                        onChange={handleMinInputOnChange}
                    />
                </div>
                <div className={SRangeSliderComponent.InputContainer}>
                    До:
                    <InputComponent
                        type="number"
                        styleType="gray"
                        className={SRangeSliderComponent.RangeInput}
                        value={rangeInPercent.max}
                        onBlur={handleMaxinputOnBlur}
                        onChange={handleMaxInputOnChange}
                    />
                </div>
            </div>
        </>
    );
});
