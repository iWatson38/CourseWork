const Timothy = 'GiftsForStars/Timothy.svg';
const Sobchak = 'GiftsForStars/Sobchak.svg';
const Instosamka = 'GiftsForStars/Instosamka.svg';
const Saeva = 'GiftsForStars/Saeva.svg';
const Dava = 'GiftsForStars/Dava.svg';
const Milokhin = 'GiftsForStars/Milokhin.svg';
const Pokrov = 'GiftsForStars/Pokrov.svg';

interface IStar {
    id: number;
    name: string;
    img: string;
}

export const StarsConstant: Array<IStar> = [
    {
        id: 69371195,
        name: 'Дава',
        img: Dava,
    },
    {
        id: 517356333,
        name: 'Даня Милохин',
        img: Milokhin,
    },
    {
        id: 47903500,
        name: 'Аня Покров',
        img: Pokrov,
    },
    {
        id: 418377661,
        name: 'Дина Саева',
        img: Saeva,
    },
    {
        id: 399053643,
        name: 'Инстасамкa',
        img: Instosamka,
    },
    {
        id: 11547416,
        name: 'Тимати',
        img: Timothy,
    },
    {
        id: 453382669,
        name: 'Ксения Собчак',
        img: Sobchak,
    },
];
