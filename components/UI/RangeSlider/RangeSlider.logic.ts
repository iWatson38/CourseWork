import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IRangeSliderRef } from './RangeSlider.component';

interface ILRangeSliderComponentProps {
    min: number;
    max: number;
    ref: React.ForwardedRef<IRangeSliderRef>;
    minFromInput: number;
    maxFromInput: number;
}

export const LRangeSliderComponent = ({
    max,
    min,
    ref,
    minFromInput,
    maxFromInput,
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

    useEffect(() => {
        if (
            leftKnob.current &&
            rightKnob.current &&
            leftDvider.current &&
            track.current
        ) {
            const trackWidth = track.current.clientWidth;
            const leftKnobWidth = leftKnob.current.clientWidth;
            const leftKnobPercentSize =
                ((leftKnobWidth + 4) * 100) / trackWidth;
            const rightKnobPercent = Number(
                rightKnob.current.style.right.replace('%', ''),
            );
            const leftKnobPercent = (minFromInput * 100) / max;

            if (leftKnobPercent <= 100 - rightKnobPercent) {
                const leftKnobPercentValue =
                    leftKnobPercent > 92
                        ? leftKnobPercent -
                          leftKnobPercentSize -
                          rightKnobPercent
                        : leftKnobPercent;
                console.log(leftKnobPercentValue);
                leftKnob.current.style.left = `${leftKnobPercentValue}%`;
                leftKnob.current.style.zIndex = '10';
                rightKnob.current.style.zIndex = '9';
                leftDvider.current.style.width = `${
                    (trackWidth * leftKnobPercent) / 100
                }px`;
            }
        }
    }, [minFromInput]);

    useEffect(() => {
        if (
            rightKnob.current &&
            leftKnob.current &&
            rightDvider.current &&
            track.current
        ) {
            const trackWidth = track.current.clientWidth;
            const rightKnobWidth = rightKnob.current.clientWidth;
            const rightKnobPercent = 100 - (maxFromInput * 100) / max;
            const dviderWidth =
                (track.current.clientWidth / 100) * rightKnobPercent;
            const rightKnobPercentSize =
                ((rightKnobWidth + 4) * 100) / trackWidth;

            if (minFromInput <= maxFromInput) {
                if (rightKnobPercent < rightKnobPercentSize) {
                    leftKnob.current.style.zIndex = '9';
                    rightKnob.current.style.zIndex = '10';
                    rightKnob.current.style.right = `${rightKnobPercent}%`;
                    rightDvider.current.style.width = `${dviderWidth}px`;
                } else {
                    leftKnob.current.style.zIndex = '9';
                    rightKnob.current.style.zIndex = '10';
                    rightKnob.current.style.right = `${
                        rightKnobPercent - rightKnobPercentSize
                    }%`;
                    rightDvider.current.style.width = `${dviderWidth}px`;
                }
            }
        }
    }, [maxFromInput]);

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
                        percentValue + rightKnobPercentSize <=
                            100 - rightKnobPercent &&
                        percentValue >= 0
                    ) {
                        leftKnob.current.style.zIndex = '10';
                        rightKnob.current.style.zIndex = '9';
                        leftKnob.current.style.left = `${percentValue}%`;
                        setValueInPercent((prev) => [percentValue, prev[1]]);

                        leftDvider.current.style.width = `${
                            clientX - trackOffsetLeft
                        }px`;
                    } else if (
                        percentValue + leftKnobPercentSize >=
                        100 - rightKnobPercent
                    ) {
                        leftKnob.current.style.left = `${
                            percentValue <= 0
                                ? 0
                                : 100 - rightKnobPercentSize - rightKnobPercent
                        }%`;
                        setValueInPercent((prev) => [
                            percentValue <= 0
                                ? 0
                                : rightKnobPercent === 0
                                ? 100
                                : 100 - rightKnobPercentSize - rightKnobPercent,
                            prev[1],
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
                        percentValue + rightKnobPercentSize <=
                            100 - leftKnobPercent &&
                        percentValue >= 0
                    ) {
                        if (
                            100 - percentValue - leftKnobPercentSize >=
                                leftKnobPercent ||
                            100 - percentValue >= rightKnobPercent
                        ) {
                            rightKnob.current.style.zIndex = '10';
                            leftKnob.current.style.zIndex = '9';
                            rightKnob.current.style.right = `${percentValue}%`;
                            setValueInPercent((prev) => [
                                prev[0],
                                100 - percentValue - rightKnobPercentSize,
                            ]);

                            rightDvider.current.style.width = `${
                                trackWidth - (clientX - trackOffsetLeft)
                            }px`;
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
        leftKnobMoving,
        rightKnobMoving,
    };
};
