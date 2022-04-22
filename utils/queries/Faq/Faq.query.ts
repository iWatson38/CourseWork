import { IFaqResponse } from '../interfaces/Faq.interface';
import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';

export const getFaq = async (): Promise<IFaqResponse> => {
    const response = await API.get<IFaqResponse>('api/v1/faq');
    if (response.data.success) {
        return response.data;
    }
    throw new Error('Network response with Error');
};

export const useGetFaq = () => {
    return useQuery<IFaqResponse, Error>('faq', getFaq);
};
