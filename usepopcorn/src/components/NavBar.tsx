import React from "react";
import { useState } from "react";
import { tempMovieDataType } from "../tempMovieModel";

interface Props {}

type tempMovieDataProps = {
  movie: tempMovieDataType[];
};

const NavBar = ({ movie }: tempMovieDataProps) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchInputField />
      <NumResults movie={movie} />
    </nav>
  );
};

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchInputField() {
  const [query, setQuery] = useState<string>("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movie }: tempMovieDataProps) {
  return (
    <p className="num-results">
      Found <strong>{movie.length}</strong> results
    </p>
  );
}

export default NavBar;
