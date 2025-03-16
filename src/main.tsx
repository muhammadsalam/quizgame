import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { init } from "@telegram-apps/sdk-react";

init();

createRoot(document.getElementById("root")!).render(<App />);
