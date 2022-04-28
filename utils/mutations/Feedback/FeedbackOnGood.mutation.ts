import { API } from 'utils/api/api.util';
import { useMutation } from 'react-query';
import { IFeedbackOnGoodPostInput } from '../interfaces/Feedback/FeedbackOnGoodPost/FeedbackOnGoodPostInput.interface';
import { IFeedbackOnGoodPostRespose } from '../interfaces/Feedback/FeedbackOnGoodPost/FeedbackOnGoodPostResponse.interface';

const postFeedbackOnGood = async (
    feedbackOnGoodPostInput: IFeedbackOnGoodPostInput,
) => {
    return API.post<IFeedbackOnGoodPostRespose>(
        `api/v1/feedback/${feedbackOnGoodPostInput.vk_friend_id}/${feedbackOnGoodPostInput.product_id}/dislike`,
        { text: feedbackOnGoodPostInput.text },
    );
};

export const usePostFeedbackOnGoodMutation = () => {
    return useMutation(postFeedbackOnGood);
};
