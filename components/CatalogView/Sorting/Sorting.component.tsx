import {
    ButtonComponent,
    EButtonStyleType,
} from 'components/UI/Button/Button.component';
import React, { useRef } from 'react';
import {
    IRangeSliderRef,
    RangeSliderComponent,
} from 'components/UI/RangeSlider/RangeSlider.component';
import { UseBodyClick } from 'hooks/BodyClick.hook';
import { LabelComponent } from 'components/UI/Label/Label.component';
import { CheckboxButton } from 'components/UI/CheckboxButton/CheckboxButton.component';
import { Controller, useForm } from 'react-hook-form';
import SSorting from './Sorting.module.scss';
import { IFiltersResponse } from 'utils/queries/interfaces/Filters/Filters.interface';
import { LSortingComponent } from './Sorting.logic';

const Filter = '/Sorting/Filter.svg';

export interface ISortingFields {
    interests: Array<{ id: number; value: boolean }>;
    range: [string, string];
}

export interface IInterests {
    id: number;
    name: string;
}

export interface ISortingComponentProps {
    filters: IFiltersResponse['data'];
    onSubmit: (values: ISortingFields) => void;
}

export const SortingComponent: React.FC<ISortingComponentProps> = ({
    filters,
    onSubmit,
}) => {
    const { isActive, toggleIsActive } = UseBodyClick();
    const currencySign = '₽';

    const { handleSubmit, handleReset, control, rangeSliderRef } =
        LSortingComponent({ filters, onSubmit });

    return (
        <>
            <ButtonComponent
                styleType={EButtonStyleType.WHITE}
                className={SSorting.ButtonFilters}
                onClick={!isActive ? toggleIsActive : undefined}
            >
                Фильтры
                <img className={SSorting.Filter} src={Filter} alt="filter" />
            </ButtonComponent>

            <div
                className={[
                    SSorting.SortingArea,
                    isActive && SSorting.Visible,
                ].join(' ')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                role="presentation"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className={SSorting.TitleFilters}>Интересы</p>
                    <div className={SSorting.BlokFilter}>
                        {filters?.generics.map((generic) => (
                            <LabelComponent
                                key={`${generic.id}LabelCheckboxButton`}
                                className={SSorting.Label}
                            >
                                <Controller
                                    control={control}
                                    name={`interests.${generic.id}`}
                                    render={({ field }) => (
                                        <CheckboxButton {...field} />
                                    )}
                                />
                                {generic.name}
                            </LabelComponent>
                        ))}
                    </div>
                    {/*
                    TODO: This layout is in charge of sort ascending, descending and the like.
                        Uncomment the component when sort ascending, descending will be finalized in the project.

                    <p className={SSorting.TitleFilters}>Сортировать цены по:</p>
                    <div className={SSorting.BlokFilter}>
                        {listFilters2.map((filter, index) => (
                            <LabelComponent
                                className={SSorting.Label}
                                key={`${index}RadioLabel`}
                            >
                                <RadioButton
                                    key={`${index}RadioButton`}
                                    checked={!!pushed}
                                    name="Категории"
                                    value={filter.filter}
                                    onClick={toogleCheckButton}
                                />
                                {filter.filter}
                            </LabelComponent>
                        ))}
                    </div>
                    */}
                    <p className={SSorting.TitleFilters}>Диапазон цен</p>
                    <div className={SSorting.RangeSliderContainer}>
                        <Controller
                            control={control}
                            name="range"
                            render={({ field }) => (
                                <RangeSliderComponent
                                    min={filters?.min_price || 0}
                                    max={filters?.max_price || 20000}
                                    currency={currencySign}
                                    {...field}
                                    ref={rangeSliderRef}
                                />
                            )}
                        />
                    </div>

                    <div className={SSorting.ButtonArea}>
                        <ButtonComponent
                            className={SSorting.ButtonApply}
                            type="submit"
                        >
                            Применить
                        </ButtonComponent>
                        <ButtonComponent
                            className={SSorting.ButtonCancel}
                            styleType={EButtonStyleType.WHITE}
                            onClick={handleReset}
                            type="button"
                        >
                            Отменa
                        </ButtonComponent>
                        <ButtonComponent
                            className={SSorting.MobileButtonCancel}
                            styleType={EButtonStyleType.WHITE}
                            onClick={handleReset}
                            type="button"
                        >
                            Отменa
                        </ButtonComponent>
                    </div>
                </form>
            </div>
        </>
    );
};
