import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

import StarRating from "./components/StarRating.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating maxRating={10} />
    <StarRating maxRating={0} />
  </StrictMode>
);
