import React, { useEffect, useState } from 'react';
import SRangeSliderComponent from './RangeSlider.module.scss';
import { LRangeSliderComponent } from './RangeSlider.logic';
import { InputComponent } from '../Input/Input.component';

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
    const [rangeInPercent, setRangeInPercent] = useState({
        min: min.toString(),
        max: max.toString(),
    });

    const {
        handleStartMove,
        leftDvider,
        leftKnob,
        rightDvider,
        rightKnob,
        track,
        valueInPercent,
        leftKnobMoving,
        rightKnobMoving,
    } = LRangeSliderComponent({
        min,
        max,
        ref,
        minFromInput: Number(rangeInPercent.min),
        maxFromInput: Number(rangeInPercent.max),
    });

    useEffect(() => {
        if (leftKnobMoving) {
            setRangeInPercent({
                min: Math.round(
                    ((max - min) / 100) * valueInPercent[0] + min,
                ).toString(),
                max: rangeInPercent.max,
            });
        }
        if (rightKnobMoving) {
            setRangeInPercent({
                min: rangeInPercent.min,
                max: Math.round(
                    ((max - min) / 100) * valueInPercent[1] + min,
                ).toString(),
            });
        }
    }, [valueInPercent, leftKnobMoving, rightKnobMoving]);

    useEffect(() => {
        if (onChange) {
            onChange([
                rangeInPercent.min.replace(/\s/g, ''),
                rangeInPercent.max.replace(/\s/g, ''),
            ]);
        }
    }, [rangeInPercent]);

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
                        onChange={(event) => {
                            if (
                                Number(event.target.value) <=
                                    Number(rangeInPercent.max) &&
                                Number(event.target.value) >= 0
                            ) {
                                setRangeInPercent({
                                    min: event.target.value,
                                    max: rangeInPercent.max,
                                });
                            }
                        }}
                    />
                </div>
                <div className={SRangeSliderComponent.InputContainer}>
                    До:
                    <InputComponent
                        type="number"
                        styleType="gray"
                        className={SRangeSliderComponent.RangeInput}
                        value={rangeInPercent.max}
                        onBlur={(event) => {
                            if (
                                Number(event.target.value) <
                                Number(rangeInPercent.min)
                            ) {
                                setRangeInPercent({
                                    min: rangeInPercent.min,
                                    max: rangeInPercent.min,
                                });
                            }
                        }}
                        onChange={(event) => {
                            if (Number(event.target.value) <= max) {
                                setRangeInPercent({
                                    min: rangeInPercent.min,
                                    max: event.target.value,
                                });
                            } else if (Number(event.target.value) > max) {
                                setRangeInPercent({
                                    min: rangeInPercent.min,
                                    max: max.toString(),
                                });
                            }
                        }}
                    />
                </div>
            </div>
        </>
    );
});
