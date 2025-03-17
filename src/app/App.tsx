import { useEffect } from "react";
import { fetchToken } from "../features/fetchToken";
import { useUserStore } from "../user";

function App() {
    useEffect(() => {
        (async () => {
            const token = await fetchToken();
            if (token) {
                useUserStore.setState({ token });
            }
        })();
    }, []);

    return <div className=""></div>;
}

export default App;
