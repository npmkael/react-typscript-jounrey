import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import StarRating from "./components/StarRating.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
