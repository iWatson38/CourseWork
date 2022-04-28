import { IFriend } from './Friends.interface';

export interface IOneFriendRespose {
    success: boolean;
    data: IFriend;
    message: string;
}
