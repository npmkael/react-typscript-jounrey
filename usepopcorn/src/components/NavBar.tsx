import React, { useEffect, useRef } from "react";
import { tempMovieDataType, tempWatchedDataType } from "../models";

interface Props {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    movie: tempMovieDataType[] | tempWatchedDataType[];
}

const NavBar = ({ query, setQuery, movie }: Props) => {
    const inputEl = useRef<HTMLInputElement | null>(null);

    useEffect(
        function () {
            if (inputEl.current) {
                inputEl.current.focus();
            }

            function callback(e: KeyboardEvent) {
                // if (document.activeElement === inputEl.current) return
                if (e.code === "Enter") {
                    if (inputEl.current) {
                        inputEl.current.focus();
                        setQuery("");
                    }
                }
            }

            document.addEventListener("keydown", callback);
            return () => document.addEventListener("keydown", callback);
        },
        [setQuery]
    );

    return (
        <nav className="nav-bar">
            <div className="logo">
                <span role="img">🍿</span>
                <h1>usePopcorn</h1>
            </div>
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputEl}
            />
            <p className="num-results">
                Found <strong>{movie ? movie.length : "0"}</strong> results
            </p>
        </nav>
    );
};

export default NavBar;
