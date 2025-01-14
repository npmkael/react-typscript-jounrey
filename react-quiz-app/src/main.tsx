import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ReactQuizContext } from "./contexts/QuizContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQuizContext>
      <App />
    </ReactQuizContext>
  </StrictMode>
);
