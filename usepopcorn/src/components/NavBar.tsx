import React from "react";
import { tempMovieDataType, tempWatchedDataType } from "../models";

interface Props {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    movie: tempMovieDataType[] | tempWatchedDataType[];
}

const NavBar = ({ query, setQuery, movie }: Props) => {
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
            />
            <p className="num-results">
                Found <strong>{movie ? movie.length : "0"}</strong> results
            </p>
        </nav>
    );
};

export default NavBar;
