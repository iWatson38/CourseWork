import { IFaqResponse } from './Faq.types';
import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';

export const getFaq = async () => {
    const { data } = await API.get<IFaqResponse>('api/v1/faq');
    return data;
};

export const useGetFaq = () => {
    return useQuery<IFaqResponse, Error>('faq', getFaq, {
        refetchOnWindowFocus: false,
        retry: false,
    });
};
