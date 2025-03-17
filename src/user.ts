import { create } from 'zustand';

export interface UserState {
    token: string | null;
}

export const useUserStore = create<UserState>(() => ({
    token: null,
}));