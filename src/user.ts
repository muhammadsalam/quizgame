import { create } from 'zustand';

export interface UserState {
    token: string | null;
    user_id: number | null;
    username: string;
    level_name: string;
    category_name: string;
    level_photo: string;
    category_photo: string;
    subscription_end_date: Date;
    learn_words: number;
    user_photo?: string;
    words_day?: number;
}

export const useUserStore = create<UserState>(() => ({
    token: null,
    user_id: window.Telegram.WebApp.initDataUnsafe.user?.id || import.meta.env.VITE_INITUSERID,
    username: '',
    level_name: '',
    category_name: '',
    level_photo: '',
    category_photo: '',
    subscription_end_date: new Date(),
    learn_words: 0
}));