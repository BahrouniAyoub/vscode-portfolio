import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme before render to prevent flicker
const savedTheme = localStorage.getItem('theme') || 'ayoub-dark';
document.documentElement.dataset.theme = savedTheme;

createRoot(document.getElementById("root")!).render(<App />);
