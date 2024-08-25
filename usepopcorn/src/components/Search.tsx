import React from "react";
import { useState } from "react";

const Search = () => {
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
};

export default Search;
