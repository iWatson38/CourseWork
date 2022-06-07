import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IRangeSliderRef } from 'components/UI/RangeSlider/RangeSlider.component';
import { IFiltersResponse } from 'utils/queries/Filters/Filters.types';

export interface ISortingFields {
    interests: Array<{ id: number; value: boolean }>;
    range: [string, string];
}

interface LSortingComponent {
    filters: IFiltersResponse['data'];
    onSubmit: (values: ISortingFields) => void;
}

export const LSortingComponent = ({ filters, onSubmit }: LSortingComponent) => {
    const defaultFilterData: ISortingFields['interests'] = [];

    const { register, handleSubmit, reset, control } = useForm<ISortingFields>({
        defaultValues: {
            interests: defaultFilterData,
            range: [
                filters?.min_price.toString(),
                filters?.max_price.toString(),
            ],
        },
    });

    const handleFiltersReset = handleSubmit(async () => {
        onSubmit({
            interests: [],
            range: [
                filters ? filters.min_price.toString() : '0',
                filters ? filters.max_price.toString() : '100',
            ],
        });
    });

    const onReset = () => {
        handleFiltersReset();
        reset();
    };

    const rangeSliderRef = useRef<IRangeSliderRef>(null);
    const [resetStatus, setResetStatus] = useState(false);
    const handleReset = () => {
        rangeSliderRef.current?.reset();
        setResetStatus(true);
        onReset();
    };

    return {
        register,
        handleSubmit,
        handleReset,
        control,
        reset,
        rangeSliderRef,
        resetStatus,
        setResetStatus,
    };
};
