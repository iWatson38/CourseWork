import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IRangeSliderRef } from './RangeSlider.component';

interface ILRangeSliderComponentProps {
    onChange?: (newValue: [string, string]) => void;
    min: number;
    max: number;
    ref: React.ForwardedRef<IRangeSliderRef>;
}

export const LRangeSliderComponent = ({
    max,
    min,
    onChange,
    ref,
}: ILRangeSliderComponentProps) => {
    const [leftKnobMoving, setLeftKnobMoving] = useState(false);
    const [rightKnobMoving, setRightKnobMoving] = useState(false);
    const [valueInPercent, setValueInPercent] = useState([0, 100]);

    // REFS
    const track = useRef<HTMLDivElement>(null);
    const leftDvider = useRef<HTMLDivElement>(null);
    const rightDvider = useRef<HTMLDivElement>(null);
    const leftKnob = useRef<HTMLDivElement>(null);
    const rightKnob = useRef<HTMLDivElement>(null);

    // IMPERATIVE HANDLER
    useImperativeHandle(ref, () => ({
        reset: () => {
            if (
                leftKnob.current &&
                rightKnob.current &&
                leftDvider.current &&
                rightDvider.current
            ) {
                leftKnob.current.style.left = '0%';
                rightKnob.current.style.right = '0%';
                leftDvider.current.style.width = '0px';
                rightDvider.current.style.width = '0px';
            }
            setValueInPercent([0, 100]);
            if (onChange) {
                onChange([`${min || 0}`, `${max || 20000}`]);
            }
        },
    }));

    // HANDLERS
    const handleStartMove = (
        e:
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | React.TouchEvent<HTMLDivElement>,
        type: 'left' | 'right',
    ) => {
        if ('clientX' in e) {
            e.preventDefault();
        }
        if (type === 'left') {
            setLeftKnobMoving(true);
        } else {
            setRightKnobMoving(true);
        }
    };

    const handleEndMove = () => {
        setLeftKnobMoving(false);
        setRightKnobMoving(false);
    };

    const handleOnChange = (percent: [number, number]) => {
        const changeValue: [string, string] = [
            Math.round(((max - min) / 100) * percent[0] + min).toLocaleString(
                'ru-Ru',
            ),
            Math.round(((max - min) / 100) * percent[1] + min).toLocaleString(
                'ru-Ru',
            ),
        ];
        if (onChange) {
            onChange(changeValue);
        }
    };

    // EFFECTS
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (
                track.current &&
                rightKnob.current &&
                rightDvider.current &&
                leftKnob.current &&
                track.current &&
                leftDvider.current
            ) {
                const trackWidth = track.current.clientWidth;
                const trackOffsetLeft =
                    track.current.getBoundingClientRect().left;
                const leftKnobWidth = leftKnob.current.clientWidth;
                const leftKnobPercentSize =
                    ((leftKnobWidth + 4) * 100) / trackWidth;
                const rightKnobWidth = rightKnob.current.clientWidth;
                const rightKnobPercentSize =
                    ((rightKnobWidth + 4) * 100) / trackWidth;

                const leftKnobPercent = Number(
                    leftKnob.current.style.left.replace('%', ''),
                );

                const rightKnobPercent = Number(
                    rightKnob.current.style.right.replace('%', ''),
                );

                const clientX =
                    'clientX' in e ? e.clientX : e.touches[0].clientX;

                // LEFT KNOB ACTION
                if (leftKnobMoving) {
                    const percentValue =
                        ((clientX - trackOffsetLeft - leftKnobWidth / 2) *
                            100) /
                        trackWidth;

                    if (
                        percentValue + leftKnobPercentSize <= 100 &&
                        percentValue >= 0
                    ) {
                        if (
                            percentValue + leftKnobPercentSize <=
                                100 - rightKnobPercent ||
                            percentValue <= leftKnobPercent
                        ) {
                            leftKnob.current.style.left = `${percentValue}%`;
                            setValueInPercent((prev) => [
                                percentValue,
                                prev[1],
                            ]);

                            handleOnChange([percentValue, valueInPercent[1]]);

                            leftDvider.current.style.width = `${
                                clientX - trackOffsetLeft
                            }px`;
                        } else {
                            leftKnob.current.style.left = `${
                                100 - rightKnobPercent - leftKnobPercentSize
                            }%`;
                            setValueInPercent((prev) => [
                                100 - rightKnobPercent + leftKnobPercentSize,
                                prev[1],
                            ]);

                            handleOnChange([
                                100 - rightKnobPercent + leftKnobPercentSize,
                                valueInPercent[1],
                            ]);

                            leftDvider.current.style.width = `${trackWidth}px`;
                        }
                    } else if (
                        percentValue + leftKnobPercentSize <=
                        100 - rightKnobPercent
                    ) {
                        leftKnob.current.style.left = `${
                            percentValue <= 0 ? 0 : 100 - leftKnobPercentSize
                        }%`;
                        setValueInPercent((prev) => [
                            percentValue <= 0 ? 0 : 100,
                            prev[1],
                        ]);
                        handleOnChange([
                            percentValue <= 0 ? 0 : 100,
                            valueInPercent[1],
                        ]);
                        leftDvider.current.style.width = `${
                            percentValue <= 0 ? 0 : trackWidth
                        }px`;
                    }
                }

                // RIGHT KNOB ACTION
                if (rightKnobMoving) {
                    const percentValue =
                        100 -
                        ((clientX - trackOffsetLeft + rightKnobWidth / 2) *
                            100) /
                            trackWidth;

                    if (
                        percentValue + rightKnobPercentSize <= 100 &&
                        percentValue >= 0
                    ) {
                        if (
                            100 - percentValue - rightKnobPercentSize >=
                                leftKnobPercent ||
                            100 - percentValue >= rightKnobPercent
                        ) {
                            rightKnob.current.style.right = `${percentValue}%`;
                            setValueInPercent((prev) => [
                                prev[0],
                                100 - percentValue - rightKnobPercentSize,
                            ]);

                            handleOnChange([
                                valueInPercent[0],
                                100 - percentValue - rightKnobPercentSize,
                            ]);

                            rightDvider.current.style.width = `${
                                trackWidth - (clientX - trackOffsetLeft)
                            }px`;
                        } else {
                            rightKnob.current.style.right = `${
                                100 - leftKnobPercent - rightKnobPercentSize
                            }%`;
                            setValueInPercent((prev) => [
                                prev[0],
                                100 -
                                    (100 -
                                        leftKnobPercent +
                                        rightKnobPercentSize),
                            ]);

                            handleOnChange([
                                valueInPercent[0],
                                100 -
                                    (100 -
                                        leftKnobPercent +
                                        rightKnobPercentSize),
                            ]);

                            rightDvider.current.style.width = `${trackWidth}px`;
                        }
                    } else if (
                        100 - percentValue - rightKnobPercentSize >=
                        leftKnobPercent
                    ) {
                        rightKnob.current.style.right = `${
                            percentValue <= 0 ? 0 : 100 - rightKnobPercentSize
                        }%`;
                        setValueInPercent((prev) => [
                            prev[0],
                            percentValue <= 0 ? 100 : 0,
                        ]);
                        handleOnChange([
                            valueInPercent[0],
                            percentValue <= 0 ? 100 : 0,
                        ]);
                        rightDvider.current.style.width = `${
                            percentValue <= 0 ? 0 : trackWidth
                        }px`;
                    }
                }
            }
        };

        if (window.innerWidth > 769) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleEndMove);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleEndMove);
            };
        }
        document.addEventListener('touchmove', handleMouseMove);
        document.addEventListener('touchend', handleEndMove);
        return () => {
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleEndMove);
        };
    }, [leftKnobMoving, handleEndMove, valueInPercent]);

    return {
        track,
        leftDvider,
        leftKnob,
        rightDvider,
        rightKnob,
        handleStartMove,
        valueInPercent,
    };
};
