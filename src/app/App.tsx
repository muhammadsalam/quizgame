import { useEffect, useState } from "react";
import { fetchToken } from "../features/fetchToken";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { Nav } from "../widgets/Nav";
import Pin from "../pages/Pin";
import { http } from "../shared/utils/http";
import { useUserStore } from "../user";
import Profile from "../pages/Profile";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchToken().then(() => {
            http.get("/api/users/me")
                .then(({ data }) => {
                    useUserStore.setState({ ...data });
                })
                .then(() => setIsLoading(false));
        });
    }, []);

    if (isLoading) return "Загрузка";

    return (
        <div className="pb-25 min-h-screen flex flex-col">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pin" element={<Pin />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <Nav />
            </BrowserRouter>
        </div>
    );
}

export default App;
