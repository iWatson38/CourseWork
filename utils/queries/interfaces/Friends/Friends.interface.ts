export interface IFriendLinkInput {
    link: string;
}

export interface IFriend {
    vk_id: number;
    first_name: string;
    last_name: string;
    photo_100: string;
}

export interface IFriendsList {
    current_page: number;
    last_page: number;
    items: Array<IFriend> | [];
}

export interface IFriendsResponse {
    success: boolean;
    data: IFriendsList;
    message: string;
}
