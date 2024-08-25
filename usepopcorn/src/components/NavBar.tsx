import React from "react";
import { useState } from "react";

interface Props {}

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchInputField />
      <NumResults />
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

function NumResults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}

export default NavBar;
