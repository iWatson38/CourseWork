import { IFriend } from './Friends.interface';

export interface IOneFriendRespose {
    success: boolean;
    data: Array<IFriend>;
    message: string;
}
