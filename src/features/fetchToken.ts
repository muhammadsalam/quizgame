import { http } from "../shared/utils/http";
import { tgApp } from "../shared/utils/telegram-app";
import { useUserStore } from "../user";

export const fetchToken: (retry?: number) => Promise<string | null> = async (retry = 0) => {
    const MAX_RETRIES = 3;

    try {
        const telegramInitData = import.meta.env.VITE_INITDATA || tgApp.initData;

        const { data, status } = await http.post('/auth/telegram-login', { telegram_init_data: telegramInitData });

        if (status !== 200) {
            throw new Error('status code: ' + status);
        }

        useUserStore.setState({ token: data.token });

        return data.token;
    } catch (error: any) {
        if (error.code === "ERR_NETWORK" && error.message.includes("Network Error") && retry < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return fetchToken(retry + 1);
        } else {
            return null;
        }
    }
};