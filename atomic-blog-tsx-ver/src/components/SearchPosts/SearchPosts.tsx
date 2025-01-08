import React from "react";

type SearchPostsProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchPosts = ({ searchQuery, setSearchQuery }: SearchPostsProps) => {
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
};

export default SearchPosts;
