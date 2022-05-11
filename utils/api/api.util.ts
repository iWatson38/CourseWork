import axios from 'axios';

export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const friendsIdApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FRIENDS_ID_API_URL,
});
