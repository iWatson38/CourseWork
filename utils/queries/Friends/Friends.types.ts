// All friends
export interface IFriendLinkInput {
    link: string;
}

export interface IFriend {
    vk_id: number;
    first_name: string;
    last_name: string;
    photo_100: string;
}

export interface IFriends {
    current_page: number;
    last_page: number;
    items: Array<IFriend>;
}

export interface IFriendsResponse {
    success: boolean;
    data: IFriends;
    message: string;
}

// One friend
export interface IOneFriendRespose {
    success: boolean;
    data: IFriend;
    message: string;
}
