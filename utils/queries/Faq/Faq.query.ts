import { IFaqResponse } from '../interfaces/Faq.interface';
import { useQuery } from 'react-query';
import { API } from 'utils/api/api.util';

export const getFaq = async (): Promise<IFaqResponse> => {
    const respose = await API.get<IFaqResponse>('api/v1/faq');
    const faq = respose.data;
    return faq;
};

export const useGetFaq = (faq: IFaqResponse) => {
    return useQuery<IFaqResponse>('faq', getFaq, { initialData: faq });
};
