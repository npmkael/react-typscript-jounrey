import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
import { useState } from "react";

import StarRating from "./components/StarRating.tsx";
import App from "./App.tsx";
import "./index.css";

function Test() {
    const [movieRating, setMovieRating] = useState<number>(0);

    return (
        <div>
            <StarRating
                color="blue "
                maxRating={10}
                onSetRating={setMovieRating}
            />
            <p>This movies was rated {movieRating} Stars</p>
        </div>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
