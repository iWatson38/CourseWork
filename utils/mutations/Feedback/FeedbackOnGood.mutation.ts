import { API } from 'utils/api/api.util';
import { useMutation } from 'react-query';
import { IFeedbackOnGoodPostInput } from '../interfaces/Feedback/FeedbackOnGoodPost/FeedbackOnGoodPostInput.interface';
import { IFeedbackOnGoodPostRespose } from '../interfaces/Feedback/FeedbackOnGoodPost/FeedbackOnGoodPostResponse.interface';

const postFeedbackOnGood = async (
    feedbackOnGoodPostInput: IFeedbackOnGoodPostInput,
): Promise<boolean> => {
    const { data } = await API.post<IFeedbackOnGoodPostRespose>(
        `api/v1/feedback/${feedbackOnGoodPostInput.vk_friend_id}/${feedbackOnGoodPostInput.product_id}/dislike`,
        { text: feedbackOnGoodPostInput.text },
    );
    if (data.success) {
        return true;
    }
    return false;
};

export const usePostFeedbackOnGoodMutation = (
    onSuccess?: () => void,
    onError?: () => void,
    onClose?: () => void,
) => {
    return useMutation(postFeedbackOnGood, {
        onSuccess: (data) => {
            if (data) {
                if (onClose) {
                    onClose();
                }
                if (onSuccess) {
                    onSuccess();
                }
            }
        },
        onError: () => {
            if (onClose) {
                onClose();
            }
            if (onError) {
                onError();
            }
        },
    });
};
