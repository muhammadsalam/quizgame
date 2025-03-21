import { http } from "../shared/utils/http";
// import { tgApp } from "../shared/utils/telegram-app";
import { useUserStore } from "../user";

export const fetchToken: (retry?: number) => Promise<string | null> = (retry = 0) => {
    const MAX_RETRIES = 3;

    return new Promise(async (resolve, reject) => {
        try {
            // const initData = import.meta.env.VITE_INITDATA || tgApp.initData;

            // const { data, status } = await http.post('/auth/telegram-login', { telegram_init_data: initData });
            const { data, status } = await http.post(`/auth/test_login?user_id=${useUserStore.getState().user_id}`);

            if (status !== 200) {
                throw new Error('status code: ' + status);
            }

            useUserStore.setState({ token: data.access_token });

            resolve(data.access_token)
        } catch (error: any) {
            if (error.code === "ERR_NETWORK" && error.message.includes("Network Error") && retry < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                fetchToken(retry + 1);
            }
            reject();
        }
    })
};