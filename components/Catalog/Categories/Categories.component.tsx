import React from 'react';
import {
    ESceletonCardType,
    SceletonCardComponent,
} from 'components/Cards/Skeletoncard/SkeletonCard.component';
import SCategoriesComponent from './Categories.module.scss';
import { CategoryCardComponent } from './CategoryCardComponent/CategoryCard.component';

export interface ICategoryCardComponentProps {
    id: number;
    name: string;
    description: string;
    img: string;
}

export interface ICategoriesComponentProps {
    categories: Array<ICategoryCardComponentProps>;
    loading: boolean;
    vk_friend_id: number;
}

export const CategoriesComponent: React.FC<ICategoriesComponentProps> = ({
    categories,
    loading,
    vk_friend_id,
}) => {
    const skeletonCards = Array.from({ length: 6 });

    return (
        <ul className={SCategoriesComponent.CategoriesList}>
            {loading
                ? skeletonCards.map((_, index) => (
                      <li
                          key={`${index}SceletonCardComponent`}
                          className={SCategoriesComponent.ListItem}
                      >
                          <SceletonCardComponent
                              type={ESceletonCardType.CATEGORY}
                          />
                      </li>
                  ))
                : categories?.map((category) => (
                      <li
                          key={`${category.id}CategoryCardComponent`}
                          className={SCategoriesComponent.ListItem}
                      >
                          <CategoryCardComponent
                              vk_friend_id={vk_friend_id}
                              category_id={category.id}
                              name={category.name}
                              description={category.description}
                              img={category.img}
                          />
                      </li>
                  ))}
        </ul>
    );
};
