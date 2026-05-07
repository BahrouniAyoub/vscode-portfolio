import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { getStoredThemeId } from "./data/themes";

// Initialize theme before render to prevent flicker
const savedTheme = getStoredThemeId();
document.documentElement.dataset.theme = savedTheme;

createRoot(document.getElementById("root")!).render(<App />);
